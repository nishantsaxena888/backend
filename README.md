## Backend
docker-compose up


python -m venv .venv
.venv\Scripts\activate

set CLIENT_NAME=pioneer_fresh
set PYTHONPATH=%CD%


<!-- uvicorn backend.main:app --reload -->
uvicorn backend.main:app --host localhost --port 8000 --reload


# for mdm (scrapper):

pip install -r requirements.txt
# add 'products' to INSTALLED_APPS in settings.py
# add db name in database settings.py

python manage.py makemigrations
python manage.py migrate







## new mdm scrap commands

nishify\mdm\scripts>python collect_amazon_grocery_urls.py

nishify\mdm>python manage.py scrape_amazon_products --file 

nishify\mdm\data\amazon_grocery_urls.xlsx --headless
✅ Loaded 4871 Amazon URLs.


# Frontend

set CLIENT_NAME=pioneer_fresh
cd D:\project\nishify\nishify.io

npm run dev