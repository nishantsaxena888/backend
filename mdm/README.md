# for mdm (scrapper):

pip install -r requirements.txt
# add 'products' to INSTALLED_APPS in settings.py
# add db name in database settings.py

python manage.py makemigrations
python manage.py migrate


python manage.py scrape_all_sites --file "data/nishant_work_file.xlsx" --headless



python manage.py runserver    (for UI view)


http://127.0.0.1:8000/admin/ (admin view)


new mdm scrap commands

(.venv) D:\project\nishify\mdm\scripts>python collect_amazon_grocery_urls.py
(.venv) D:\project\nishify\mdm>python manage.py scrape_amazon_products --file D:\project\nishify\mdm\data\amazon_grocery_urls.xlsx --headless
✅ Loaded 4871 Amazon URLs.


