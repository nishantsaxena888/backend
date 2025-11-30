import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random

BASE_URL = "https://www.amazon.in"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Accept-Language": "en-US,en;q=0.9",
}

# Grocery category keywords
KEYWORDS = [
    "grocery",
    "spices",
    "masala",
    "dry+fruits",
    "seeds",
    "pulses",
    "snacks",
    "almonds",
    "cashew",
    "turmeric",
    "red+chilli+powder",
    "coriander+seeds",
    "flour",
    "atta",
    "rice",
    "tea",
]

def get_search_urls(keyword, pages=10):
    collected = []

    for page in range(1, pages + 1):
        url = f"{BASE_URL}/s?k={keyword}&page={page}"

        print("Scraping:", url)
        r = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(r.text, "lxml")

        # Collect product links
        for a in soup.select("a.a-link-normal.s-no-outline"):
            href = a.get("href")
            if href and "/dp/" in href:
                full = BASE_URL + href.split("?")[0]  # clean url
                collected.append(full)

        time.sleep(random.uniform(1.2, 2.0))

    return collected


all_urls = []

for kw in KEYWORDS:
    urls = get_search_urls(kw, pages=10)  # 10 pages × 25 items = 250 each
    all_urls.extend(urls)

# Remove duplicates
all_urls = list(set(all_urls))

print("Collected URLs:", len(all_urls))

# Save
df = pd.DataFrame({"amazon_url": all_urls})
df.to_excel(r"D:\project\nishify\mdm\data\amazon_grocery_urls.xlsx", index=False)

print("Saved → D:\\project\\nishify\\mdm\\data\\amazon_grocery_urls.xlsx")
