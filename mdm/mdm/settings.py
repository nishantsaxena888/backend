import os
from pathlib import Path
import dj_database_url
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BASE_DIR.parent
sys.path.insert(0, str(PROJECT_ROOT))

SECRET_KEY = 'django-insecure-38998r!fru8%4azg58cu!r(a+ej+f5u0-qea1(105s0w(%&(bh)'

# -----------------------------------------------------
# DEBUG + ALLOWED_HOSTS
# -----------------------------------------------------
if os.environ.get("ENV") == "production":
    DEBUG = False
    ALLOWED_HOSTS = ["*"]
else:
    DEBUG = True
    ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# -----------------------------------------------------
# DATABASE SETTINGS
# -----------------------------------------------------
HEROKU_DB_URL = os.environ.get("DATABASE_URL")

if HEROKU_DB_URL:
    DATABASES = {
        "default": dj_database_url.parse(HEROKU_DB_URL, conn_max_age=600)
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "pioneer_fresh",
            "USER": "postgres",
            "PASSWORD": "deepti",
            "HOST": "localhost",
            "PORT": "5432",
        }
    }

# -----------------------------------------------------
# INSTALLED APPS
# -----------------------------------------------------
INSTALLED_APPS = [
    'scrapper',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
]

# -----------------------------------------------------
# MIDDLEWARE
# -----------------------------------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mdm.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mdm.wsgi.application'

# -----------------------------------------------------
# AUTH
# -----------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -----------------------------------------------------
# INTERNATIONALIZATION
# -----------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -----------------------------------------------------
# STATIC FILES
# -----------------------------------------------------
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# -----------------------------------------------------
# MEDIA (Correct for Local + Heroku)
# -----------------------------------------------------
# Public URL path (ALWAYS RELATIVE)
MEDIA_URL = "/doc/"

# Actual disk location (Heroku → /app/doc)
DEFAULT_MEDIA_ROOT = os.path.join(PROJECT_ROOT, "doc")
MEDIA_ROOT = os.environ.get("MEDIA_ROOT", DEFAULT_MEDIA_ROOT)

# -----------------------------------------------------
# BASE URL for absolute paths
# -----------------------------------------------------
if os.environ.get("ENV") == "production":
    SITE_BASE_URL = os.environ.get(
        "SITE_BASE_URL",
        "https://nishify-mdm-backend-0fef467ee9f0.herokuapp.com"
    )
else:
    SITE_BASE_URL = "http://localhost:8000"

# -----------------------------------------------------
# REST + CORS
# -----------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 25,
}

CORS_ALLOW_ALL_ORIGINS = True










# import os
# from pathlib import Path
# import dj_database_url
# import sys
# from urllib import parse as urlparse

# BASE_DIR = Path(__file__).resolve().parent.parent
# PROJECT_ROOT = BASE_DIR.parent
# sys.path.insert(0, str(PROJECT_ROOT))

# SECRET_KEY = 'django-insecure-38998r!fru8%4azg58cu!r(a+ej+f5u0-qea1(105s0w(%&(bh)'


# # -----------------------------------------------------
# # DEBUG + ALLOWED_HOSTS (LOCAL aur HEROKU automatically)
# # -----------------------------------------------------
# if os.environ.get("ENV") == "production":
#     DEBUG = False
#     ALLOWED_HOSTS = ["*"]          # Heroku app domain automatically allow ho jayega
# else:
#     DEBUG = True
#     ALLOWED_HOSTS = ["127.0.0.1", "localhost"]


# # -----------------------------------------------------
# # DATABASE SETTINGS (LOCAL + HEROKU both)
# # -----------------------------------------------------
# # First try Heroku DATABASE_URL
# HEROKU_DB_URL = os.environ.get("DATABASE_URL")

# if HEROKU_DB_URL:
#     # ---- Running on Heroku ----
#     DATABASES = {
#         "default": dj_database_url.parse(HEROKU_DB_URL, conn_max_age=600)
#     }
# else:
#     # ---- Local PostgreSQL ----
#     DATABASES = {
#         "default": {
#             "ENGINE": "django.db.backends.postgresql",
#             "NAME": "pioneer_fresh",
#             "USER": "postgres",
#             "PASSWORD": "deepti",
#             "HOST": "localhost",
#             "PORT": "5432",
#         }
#     }


# # -----------------------------------------------------
# # INSTALLED APPS
# # -----------------------------------------------------
# INSTALLED_APPS = [
#     'scrapper',
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',
#     'rest_framework',
#     'corsheaders',
# ]


# # -----------------------------------------------------
# # MIDDLEWARE
# # -----------------------------------------------------
# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]


# ROOT_URLCONF = 'mdm.urls'

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# WSGI_APPLICATION = 'mdm.wsgi.application'


# # -----------------------------------------------------
# # AUTH
# # -----------------------------------------------------
# AUTH_PASSWORD_VALIDATORS = [
#     {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
#     {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
#     {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
#     {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
# ]


# # -----------------------------------------------------
# # INTERNATIONALIZATION
# # -----------------------------------------------------
# LANGUAGE_CODE = 'en-us'
# TIME_ZONE = 'UTC'
# USE_I18N = True
# USE_TZ = True

# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# # -----------------------------------------------------
# # STATIC FILES (Heroku Ready)
# # -----------------------------------------------------
# STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]


# # -----------------------------------------------------
# # MEDIA
# # -----------------------------------------------------
# if os.environ.get("ENV") == "production":
#     MEDIA_URL = 'https://nishify-mdm-backend-0fef467ee9f0.herokuapp.com/media/'
#     MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# else:
#     MEDIA_URL = "/doc/pioneer_fresh/"
#     MEDIA_ROOT = r"D:\project\nishify\doc\pioneer_fresh"



# # -----------------------------------------------------
# # SITE BASE URL (Heroku + Local)
# # -----------------------------------------------------
# if os.environ.get("ENV") == "production":
#     SITE_BASE_URL = os.environ.get(
#         "SITE_BASE_URL",
#         "https://nishify-mdm-backend-0fef467ee9f0.herokuapp.com"
#     )
# else:
#     SITE_BASE_URL = "http://localhost:8000"


# # -----------------------------------------------------
# # REST + CORS
# # -----------------------------------------------------
# REST_FRAMEWORK = {
#     "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
#     "PAGE_SIZE": 25,
# }

# CORS_ALLOWED_ORIGINS = [
#     "http://127.0.0.1:8000",
#     "http://localhost:8000",
#     "http://127.0.0.1:3000",
#     "http://localhost:3000",
# ]

# CORS_ALLOW_ALL_ORIGINS = True



# import os
# from pathlib import Path
# import dj_database_url   
# import sys
# from urllib import parse as urlparse
# BASE_DIR = Path(__file__).resolve().parent.parent
# PROJECT_ROOT = BASE_DIR.parent 
# sys.path.insert(0, str(PROJECT_ROOT))
# from backend.utils.db import DATABASE_URL
# SECRET_KEY = 'django-insecure-38998r!fru8%4azg58cu!r(a+ej+f5u0-qea1(105s0w(%&(bh'
# DEBUG = True
# ALLOWED_HOSTS = ["127.0.0.1", "localhost"]


# INSTALLED_APPS = [
#     'scrapper',
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',
#     'rest_framework',             # ✅ add this
#     'corsheaders', 
# ]
 



# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',  # ✅ add this first
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]

# ROOT_URLCONF = 'mdm.urls'

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# WSGI_APPLICATION = 'mdm.wsgi.application'

# parsed = urlparse.urlparse(DATABASE_URL)

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": parsed.path.lstrip("/"),
#         "USER": parsed.username,
#         "PASSWORD": parsed.password,
#         "HOST": parsed.hostname,
#         "PORT": parsed.port,
#     }
# }
# AUTH_PASSWORD_VALIDATORS = [
#     {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
#     {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
#     {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
#     {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
# ]

# LANGUAGE_CODE = 'en-us'
# TIME_ZONE = 'UTC'
# USE_I18N = True
# USE_TZ = True

# # STATIC_URL = 'static/'

# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'





# # --- Static files for Heroku ---
# STATIC_URL = '/static/'

# # Directory where collectstatic will copy all static files
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# # (Optional but useful for local dev)
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]





# # --- MEDIA CONFIG ---
# SITE_BASE_URL = "http://localhost:8000"
# MEDIA_URL = "/doc/pioneer_fresh/"
# MEDIA_ROOT = r"D:\project\nishify\uploads\pioneer_fresh"





# # --- DRF & CORS Config ---
# REST_FRAMEWORK = {
#     "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
#     "PAGE_SIZE": 25,
# }

# CORS_ALLOWED_ORIGINS = [
#     "http://127.0.0.1:8000",     # ✅ FastAPI backend (local)
#     "http://localhost:8000",
#     "http://127.0.0.1:3000",     # ✅ Frontend dev server (Next.js)
#     "http://localhost:3000",
# ]

# CORS_ALLOW_ALL_ORIGINS = True   # ✅ (for dev only — remove later in prod)

