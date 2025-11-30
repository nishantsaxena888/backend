"""
convert_to_amazon_batch.py

Usage:
    python convert_to_amazon_batch.py

What it does:
 - Reads D:\project\nishify\mdm\data\nishant_work_file.xlsx
 - Converts non-amazon links in column "Unnamed: 13" to Amazon product links
 - Cleans Amazon URLs to canonical form: https://www.amazon.in/dp/ASIN
 - Skips unnamed/broken products
 - Saves cleaned output to:
      D:\project\nishify\mdm\data\nishant_work_file_amazon_only.xlsx
"""

import time
import random
import os
import urllib.parse
import argparse
import re
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# =========== Config =============
INPUT_PATH = r"D:\project\nishify\mdm\data\nishant_work_file.xlsx"
OUTPUT_PATH = r"D:\project\nishify\mdm\data\nishant_work_file_amazon_only.xlsx"
URL_COL = "Unnamed: 13"
AMAZON_DOMAIN = "amazon.in"
HEADLESS = True
MIN_SLEEP = 1.8
MAX_SLEEP = 3.2
MAX_RETRIES = 2
CHUNK_SIZE = 500
# =================================

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)


# -------------------------------------------------------
# CLEAN AMAZON URL
# -------------------------------------------------------
def clean_amazon_url(url):
    """Normalize URL to https://www.amazon.in/dp/ASIN"""
    if not url or not isinstance(url, str):
        return url

    # 1. Remove redirect wrappers such as sspa/click
    try:
        if "sspa/click" in url or "spc/click" in url:
            parsed = urllib.parse.urlparse(url)
            qs = urllib.parse.parse_qs(parsed.query)
            if "url" in qs:
                url = qs["url"][0]
    except:
        pass

    # 2. Extract ASIN
    asin_match = re.search(r"/dp/([A-Z0-9]{10})", url)
    if asin_match:
        asin = asin_match.group(1)
        return f"https://www.amazon.in/dp/{asin}"

    asin_match = re.search(r"/gp/product/([A-Z0-9]{10})", url)
    if asin_match:
        asin = asin_match.group(1)
        return f"https://www.amazon.in/dp/{asin}"

    # 3. Remove query parameters
    try:
        url = url.split("?")[0]
        url = url.split("#")[0]
    except:
        pass

    return url


# -------------------------------------------------------
# SELENIUM DRIVER
# -------------------------------------------------------
def make_driver(headless=True):
    options = webdriver.ChromeOptions()
    if headless:
        options.add_argument("--headless=new")

    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-logging")
    options.add_argument("--log-level=3")
    options.add_argument("--window-size=1400,1000")
    options.add_argument(f"user-agent={USER_AGENT}")

    return webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )


# -------------------------------------------------------
# EXTRACT TITLE FROM NON-AMAZON PAGE
# -------------------------------------------------------
def extract_title_from_page(driver, url, timeout=6):
    try:
        driver.get(url)
        time.sleep(1.2)

        start = time.time()
        while time.time() - start < timeout:

            # meta og:title
            try:
                meta = driver.find_element(By.CSS_SELECTOR, "meta[property='og:title']")
                content = meta.get_attribute("content")
                if content and len(content.strip()) > 4:
                    return content.strip()
            except:
                pass

            # <title>
            if driver.title and len(driver.title.strip()) > 4:
                return driver.title.strip()

            # h1
            try:
                h1 = driver.find_element(By.TAG_NAME, "h1")
                if h1.text and len(h1.text.strip()) > 4:
                    return h1.text.strip()
            except:
                pass

            time.sleep(0.4)

    except:
        return None

    return None


# -------------------------------------------------------
# CONVERT ONE URL TO AMAZON PRODUCT
# -------------------------------------------------------
def convert_single_to_amazon(driver, source_url, amazon_domain=AMAZON_DOMAIN):

    if not source_url:
        return {"link": None, "status": "empty", "error": None}

    if "amazon." in source_url.lower():
        return {"link": clean_amazon_url(source_url), "status": "already_amazon", "error": None}

    try:
        title = extract_title_from_page(driver, source_url)

        if not title or len(title.strip()) < 4:
            return {"link": None, "status": "no_title", "error": "Title not found"}

        # Build Amazon search URL
        query = urllib.parse.quote_plus(title)
        search_url = f"https://{amazon_domain}/s?k={query}"
        driver.get(search_url)
        time.sleep(1.2)

        # Try first product
        try:
            first = driver.find_element(
                By.CSS_SELECTOR, "div.s-main-slot div[data-component-type='s-search-result'] h2 a"
            )
            product_link = first.get_attribute("href")
            return {"link": clean_amazon_url(product_link), "status": "converted", "error": None}
        except:
            return {"link": search_url, "status": "search_only", "error": "No product found"}

    except Exception as e:
        return {"link": None, "status": "error", "error": str(e)}


# -------------------------------------------------------
# PROCESS DATAFRAME
# -------------------------------------------------------
def process_dataframe(input_path=INPUT_PATH, output_path=OUTPUT_PATH,
                      headless=HEADLESS, url_col=URL_COL, max_rows=None):

    df = pd.read_excel(input_path)
    if url_col not in df.columns:
        raise KeyError(f"Column '{url_col}' not found in {input_path}")

    df[url_col] = df[url_col].fillna("").astype(str).str.strip()

    df["amazon_link"] = None
    df["convert_status"] = None
    df["convert_error"] = None

    driver = make_driver(headless=headless)

    try:
        rows = df.shape[0] if not max_rows else min(max_rows, df.shape[0])

        for i in range(rows):
            src = df.at[i, url_col]

            if not src or src.strip() == "":
                df.at[i, "convert_status"] = "empty"
                continue

            # Already Amazon
            if "amazon." in src.lower():
                df.at[i, "amazon_link"] = clean_amazon_url(src)
                df.at[i, "convert_status"] = "already_amazon"
                continue

            # Convert with retry
            result = None
            attempt = 0
            while attempt <= MAX_RETRIES:
                result = convert_single_to_amazon(driver, src)
                if result["status"] not in ["error", "no_title"]:
                    break
                attempt += 1
                time.sleep(1.5)

            # Apply result
            link = result["link"]

            # Skip unnamed or missing titles
            if result["status"] == "no_title" or not link:
                df.at[i, "convert_status"] = "skipped_no_title"
                df.at[i, "amazon_link"] = None
                continue

            # Clean final link
            link = clean_amazon_url(link)

            df.at[i, "amazon_link"] = link
            df.at[i, "convert_status"] = result["status"]
            df.at[i, "convert_error"] = result["error"]

            time.sleep(random.uniform(MIN_SLEEP, MAX_SLEEP))

            if (i + 1) % 50 == 0:
                print(f"[{i+1}/{rows}] processed → {result['status']}")

    finally:
        driver.quit()

    # Keep only rows with valid Amazon product URLs (dp/ASIN)
    df_out = df[df["amazon_link"].notnull() & df["amazon_link"].str.contains("/dp/")]

    df_out.reset_index(drop=True, inplace=True)
    df_out[url_col] = df_out["amazon_link"]

    base_dir = os.path.dirname(output_path)
    os.makedirs(base_dir, exist_ok=True)

    full_log = output_path.replace(".xlsx", "_full_log.xlsx")
    df.to_excel(full_log, index=False)
    print("Saved FULL LOG →", full_log)

    df_out.to_excel(output_path, index=False)
    print("Saved AMAZON ONLY →", output_path, "Rows:", len(df_out))

    return output_path


# -------------------------------------------------------
# MAIN
# -------------------------------------------------------
if __name__ == "__main__":
    print("Reading:", INPUT_PATH)
    saved = process_dataframe(INPUT_PATH, OUTPUT_PATH, headless=HEADLESS)
    print("Done. Output:", saved)
