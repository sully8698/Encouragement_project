from twilio.rest import Client
import time
from django.db import connection # qurries the database from the script
import random
from dotenv import load_dotenv
import os
import requests
import certifi

load_dotenv()

# Django settings module set
os.environ.setdefault('DJANGO_SETTINGS_MODULE',  'encouragement_proj.settings')
import django
django.setup()

from customer_app.models import Customer
from sentence_app.models import Sentence

trilio_test_num = '+18445485076'

def build_message(from_num, message, to_num):
    account_sid = os.getenv('ACCOUNT_SID')
    auth_token = os.getenv('AUTH_TOKEN')

    if not account_sid or not auth_token:
        raise ValueError("Twilio credentials are missing from the environment variables.")

    client = Client(account_sid, auth_token)
    
    message = client.messages.create(
        from_=f'{from_num}',
        body=f'{message}',
        to=f'{to_num}'
    )
    
    return print(message.sid)

def qoutable_api_sentence():
    url = "https://zenquotes.io/api/random/"
    response = requests.get(url)
    data = response.json()
    if response.status_code==200 and data[0]['a'] != "zenquotes.io":
        data = response.json()
        sentence = f'{data[0]["a"]} said {data[0]["q"]}'
        return sentence
    else:
        return False

def database_sentence():
    all_sentences = Sentence.objects.all()
    random_sentence = random.choice(all_sentences)
    return random_sentence.sentence

def get_random_encouragement():
    sentence_db = database_sentence()
    api_sentence = qoutable_api_sentence()
    if api_sentence != False:
        sentence = random.choice([sentence_db, api_sentence])
        return sentence
    else:
        return sentence_db






