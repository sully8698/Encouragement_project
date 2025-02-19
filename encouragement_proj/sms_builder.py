from twilio.rest import Client
import time
from django.db import connection # qurries the database from the script
import random
from dotenv import load_dotenv
import os

load_dotenv()

# Django settings module set
os.environ.setdefault('DJANGO_SETTINGS_MODULE',  'encouragement_proj.settings')
import django
django.setup()

from customer_app.models import Customer
from sentence_app.models import Sentence

trilio_test_num = '+18445485076'

def build_message(from_num, message, to_num):
    account_sid = os.environ['ACCOUNT_SID']
    auth_token = os.environ['AUTH_TOKEN']
    client = Client(account_sid, auth_token)
    
    message = client.messages.create(
        from_=f'{from_num}',
        body=f'{message}',
        to=f'{to_num}'
    )
    
    return print(message.sid)

def get_random_encouragement():
    all_sentences = Sentence.objects.all()
    random_sentence = random.choice(all_sentences)
    return random_sentence.sentence

# a script to to check the data base for customers send messages when certain criteria met
def background_task(): 
    tasks = 2
    num = 0
    while num < tasks:
        all_customers = Customer.objects.all()
        
        # needs logic to check the current time
        # and only send a message if its 0900 else return not ready and current time
        for customer in all_customers: 
            sentence = get_random_encouragement()
            print(f'Customer: {customer.first_name}, Phone: {customer.phone_number}, Sentence: {sentence}')

            build_message(trilio_test_num, sentence, customer.phone_number)

        num += 1
        time.sleep(5)

background_task()




