# Knowledge Item (KI): SSIS to MuleSoft Migration Guidelines

> [!IMPORTANT]
> **CRITICAL RULE FOR ALL DEVELOPERS & AGENTS:**
> **Keep updating the KI.md along with README.md and reference md files** on every major implementation step, architectural decision, or mapping modification. This ensures that the documentation remains a live, accurate representation of the repository's rules and migration patterns.

---

## 📌 Development Core Rules

1. **Keep documentation synchronized:** Whenever a new migration pattern is introduced or modified, update `README.md`, `KI.md`, and any related `.md` files in the workspace.
2. **DataWeave over Scripting:** Do not use Groovy, Javascript, or Java scripting components unless absolutely necessary. Perform 100% of data manipulation using **DataWeave 2.0**.
3. **Strict Folder Structure:** Follow the Mule API-led hierarchy. Keep target RAML schemas in `src/main/resources/api` and property YAMLs in `src/main/resources/properties`.
4. **Hydration and Connection Pooling:** Ensure database connection pools are defined globally in `global.xml` and specify explicit reconnection strategies.

---

## ⚡ SSIS to MuleSoft Integration Design Patterns

### 1. Data Flow & Batch Processing (High-Volume ETL)
In SSIS, Data Flow Tasks stream data from source to destination. In MuleSoft, we implement this using the **Batch Job** component.

#### SSIS Component:
*Source OLEDB -> Derived Column -> Target OLEDB*

#### MuleSoft Implementation Design:
```xml
<batch:job db:id="Batch_Job" jobName="SSIS_Migration_Batch_Job">
    <batch:process-records>
        <batch:step name="Extraction_Step">
            <!-- Fetch records from SQL Server -->
            <db:select config-ref="SQL_Server_Config">
                <db:sql>SELECT * FROM LegacySourceTable WHERE Processed = 0</db:sql>
            </db:select>
        </batch:step>
        <batch:step name="Transformation_Step">
            <!-- Derived Column / DataWeave Map -->
            <ee:transform>
                <ee:message>
                    <ee:set-payload><![CDATA[%dw 2.0
output application/java
---
payload map (record) -> {
    TargetColumnA: record.SourceColumnA,
    TargetColumnB: record.SourceColumnB ++ " - Migrated",
    ProcessedTimestamp: now()
}]]></ee:set-payload>
                </ee:message>
            </ee:transform>
        </batch:step>
        <batch:step name="Bulk_Insert_Step">
            <!-- Bulk Loading equivalent to SSIS Fast Load -->
            <db:bulk-insert config-ref="Target_SQL_Server_Config">
                <db:sql>INSERT INTO TargetTable (ColA, ColB, ProcessedAt) VALUES (:TargetColumnA, :TargetColumnB, :ProcessedTimestamp)</db:sql>
            </db:bulk-insert>
        </batch:step>
    </batch:process-records>
</batch:job>
```

---

## 📝 DataWeave Conversion Guide for SSIS Expressions

When migrating expressions from SSIS Derived Columns or Conditional Splits, refer to the following conversion chart:

| SSIS Expression | DataWeave 2.0 Equivalent | Example |
| :--- | :--- | :--- |
| `ISNULL(Col) ? "Default" : Col` | `payload.Col default "Default"` or `if (payload.Col == null) "Default" else payload.Col` | `payload.Email default "no-email@domain.com"` |
| `SUBSTRING(Col, 1, 5)` | `payload.Col[0 to 4]` | `payload.PostalCode[0 to 4]` |
| `UPPER(Col)` | `upper(payload.Col)` | `upper(payload.CountryCode)` |
| `FINDSTRING(Col, "@", 1)` | `indexOf(payload.Col, "@")` | `indexOf(payload.Email, "@")` |
| `(DT_WSTR, 50)Col` | `payload.Col as String {format: "..."}` | `payload.EmployeeID as String` |
| `GETDATE()` | `now()` | `now() as String {format: "yyyy-MM-dd HH:mm:ss"}` |
| `REPLACE(Col, "old", "new")` | `payload.Col replace "old" with "new"` | `payload.Phone replace "-" with ""` |

---

## 🚨 Error Handling Strategy (SSIS Event Handlers vs. MuleSoft Error Scopes)

In SSIS, packages handle errors at the task level or through package-level event handlers (`OnError`).
In MuleSoft, error handling is configured via **Error Handlers** utilizing `on-error-propagate` and `on-error-continue`.

### Mapping Guidelines:
- **On-Error-Propagate:** Translates to an SSIS package failure or halting condition. It rolls back transactions and registers the error to the parent flow/caller.
- **On-Error-Continue:** Translates to SSIS task-level failure routing where execution continues (e.g., writing failed rows to a flat file log and continuing with the next database script execution).

### MuleSoft Error Scoping Template:
```xml
<error-handler name="Global_Migration_Error_Handler">
    <!-- Catch DB Connectivity issues (e.g. database down during ETL run) -->
    <on-error-propagate type="DB:CONNECTIVITY" logException="true">
        <ee:transform>
            <ee:message>
                <ee:set-payload><![CDATA[%dw 2.0
output application/json
---
{
    status: "ERROR",
    message: "Critical connection error: " ++ error.description,
    timestamp: now()
}]]></ee:set-payload>
            </ee:message>
        </ee:transform>
        <!-- Custom notification flow (e.g., SMTP or Slack message) -->
        <flow-ref name="Notification_Sub_Flow"/>
    </on-error-propagate>

    <!-- Catch validation errors (e.g. invalid records from lookups) -->
    <on-error-continue type="VALIDATION:INVALID_BOOLEAN, EXPRESSION" logException="true">
        <!-- Log failed record to database audit table / skip execution -->
        <db:insert config-ref="Target_SQL_Server_Config">
            <db:sql>INSERT INTO MigrationErrorLogs (PackageName, ErrorMsg, Timestamp) VALUES ('SSIS_Package_XYZ', :error.description, GETDATE())</db:sql>
        </db:insert>
    </on-error-continue>
</error-handler>
```

---

## 📈 Optimization & Performance Tuning

1. **Batch Size Tuning:** SSIS defaults to a DefaultBufferMaxRows of 10,000. In MuleSoft DB Bulk Insert or Batch Job execution block, set the Batch Size parameters (`maxConcurrency` and block size) to match server memory availability. Start with **5,000 to 10,000 records** per batch block.
2. **Streaming Database Payloads:** Always check "Streaming" inside Mule DB Select connector configuration when extracting more than 100,000 rows. This avoids Java OutOfMemory (OOM) heap space errors.
3. **DataWeave Caching:** For static lookups (e.g. Country Codes, Currency conversions), utilize MuleSoft Cache Scopes or global Object Stores to prevent calling external databases or REST endpoints for every single transformed row.

---

## 🎨 Vibe Coding Setup with VS Code

"Vibe Coding" refers to an iterative, agent-assisted, fast-prototyping workflow. In MuleSoft, VS Code is the preferred editor for Vibe Coding because it is lightweight and integrates seamlessly with AI coding assistants (like me).

### 1. VS Code Extensions Setup
To set up VS Code for MuleSoft development:
- **Anypoint Code Builder (ACB):** Install the official extension pack from MuleSoft. This provides visual layout rendering, RAML/OAS API design editors, and debugging support.
- **DataWeave 2.0:** Install the standalone DataWeave extension for syntax highlighting, linting, code navigation, and live preview of transformations.
- **XML Tools:** Provides syntax highlighting, folding, and formatting for Mule XML files (`.xml`).

### 2. Vibe Coding Workflow
When pair programming with your AI assistant:
1. **Prompt the Agent for XML Configurations:** Provide the SSIS task definition, and let the agent generate the corresponding Mule XML configuration block (Flows, DB configurations, Choice routers).
2. **Isolate DataWeave Files:** Write transformations inside separate files in `src/main/resources/dwl/` (e.g. `transform-logic.dwl`). The agent can iterate on DataWeave code rapidly without touching the main XML flow structure.
3. **Interactive Testing:** Use the VS Code terminal to run fast validation loops:
   - Run unit tests: `mvn clean test`
   - Run compilation check: `mvn compile`
4. **Iterative Refinement:** If MUnit tests fail, feed the stack trace back to the agent to adjust DataWeave transformations or XML connections immediately.

