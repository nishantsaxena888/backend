# Instruction & Glossary Guide: SSIS to MuleSoft Migration

This reference guide serves as a quick glossary for terms used in this migration, alongside instructions on how to "vibe code" in this repository.

> [!IMPORTANT]
> **CRITICAL RULE:**
> Always **keep updating the KI.md along with README.md and reference md files** (like this `instruction.md` file) as you write code, add configurations, or make changes.

---

## 📖 Glossary of Terms

If you are new to MuleSoft or ETL migration, here are the key concepts and terms explained simply:

### 1. SSIS (SQL Server Integration Services)
*   **What it is:** A Microsoft SQL Server tool used to perform ETL (Extract, Transform, Load) tasks—such as copying data, updating databases, and importing text files.
*   **Package (`.dtsx`):** The file format SSIS uses to save its workflows.

### 2. MuleSoft & Mule Runtime
*   **What it is:** A modern enterprise integration platform. Instead of just scheduled batch database scripts (like SSIS), MuleSoft allows you to connect systems together in real-time using APIs.
*   **Mule 4.x:** The current major version of the runtime engine that executes the flows.

### 3. DataWeave (DW / DWL)
*   **What it is:** MuleSoft's powerful programming language built specifically for data transformation. 
*   **Why it's important:** It is the direct equivalent of SSIS "Derived Column" or script tasks. It takes JSON, XML, Java objects, or Flat Files, and reshapes them into the target format.

### 4. RAML (RESTful API Modeling Language)
*   **What it is:** A human-readable language used to design APIs. You define the URLs (endpoints), parameters, and expected JSON responses before writing any code.

### 5. Anypoint Code Builder (ACB)
*   **What it is:** MuleSoft's new integrated development environment built directly as an extension package for **Visual Studio Code (VS Code)**. It is a lightweight alternative to Anypoint Studio.

### 6. MUnit
*   **What it is:** The testing framework built for Mule applications. It allows you to write unit and integration tests for your flows to ensure changes don't break existing logic.

### 7. JDBC (Java Database Connectivity)
*   **What it is:** The Java standard for connecting to databases. MuleSoft is Java-based and uses JDBC drivers (such as the Microsoft SQL Server JDBC driver) to read and write to databases, replacing OLEDB or ADO.NET connection managers.

## 🎨 How to Vibe Code in VS Code (A Guide for New Developers)

**Vibe Coding** is a modern development paradigm where you pair program with an AI coding assistant. Instead of manually writing every line of XML and DataWeave syntax, you act as the **Architect and Director**—guiding the AI, running the code, and feeding compilation or test results back to the AI to iterate.

Here is the exact step-by-step workflow a new developer should follow to vibe code in this repository:

### Step 1: The Setup
1. Open this project directory (`inventureai`) in Visual Studio Code.
2. To enable MuleSoft features inside VS Code, install the following extensions from the Marketplace:
   *   **Anypoint Code Builder (ACB)**: The official MuleSoft extension pack. It provides graphical flow design, debugging, and integration with the Anypoint Platform.
   *   **DataWeave 2.0**: Critical for linting, syntax highlighting, and live-previewing your `.dwl` data transformation mappings.
   *   **XML Tools**: Helpful for auto-formatting and navigating the main Mule configuration XML files.
3. Keep the integrated VS Code terminal open (`Ctrl + \`` or `Cmd + \``).

### Step 2: Feed the Source (SSIS Package Details)
To begin migrating an SSIS package, gather the details of the legacy package and paste them into the chat with the AI assistant. Useful source information includes:
*   SQL query scripts from the SSIS **Execute SQL Task** or **OLE DB Source**.
*   Formulas or expressions from the **Derived Column** transformation.
*   Data structures (column names, data types, database schemas).
*   Any XML snippets or screenshots of the legacy SSIS layout.

### Step 3: Tell the Agent What to Build
Prompt the AI assistant to write the equivalent MuleSoft code. For example:
> *"I have an SSIS task that extracts data from `Customers_Staging` where `IsProcessed = 0`, converts the `Phone` column to remove dashes, and inserts it into `Customers_Master`. Write the equivalent Mule 4 database flow and DataWeave mapping."*

### Step 4: Review Code Placement
The AI assistant will write:
1. **Mule XML Flows** in `src/main/mule/` (e.g., `migration-flows.xml`).
2. **DataWeave Scripts** in `src/main/resources/dwl/` (e.g., `phone-sanitization.dwl`).
Open these files and review the logic visually to ensure the layout matches your expectations.

### Step 5: Run the Verification Loop (Crucial!)
Always validate the code immediately. In the VS Code terminal, run:
```bash
# Verify that the code compiles successfully
mvn compile

# Run unit tests to verify data transformation mappings
mvn clean test
```

### Step 6: Iterate on Errors
If the terminal prints compilation errors or test failures, **do not debug them manually**. Simply copy the entire error stack trace, paste it back to the AI assistant, and ask:
> *"The build failed with this error: [paste error here]. How do we fix this?"*

The agent will analyze the stack trace, make corrected replacements, and ask you to test again. Repeat this loop until the tests pass!

### Step 7: Document and Commit
Once the flow is working and tested, follow the documentation rule:
1. Update **`KI.md`** with any new technical configurations, connections, or patterns discovered.
2. Update **`README.md`** if structural instructions change.
3. Commit your files to Git to checkpoint your progress.

