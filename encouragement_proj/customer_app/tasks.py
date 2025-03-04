from celery import shared_task
from sms_builder import build_message, get_random_encouragement
from customer_app.models import Customer
import datetime
import pytz

trilio_test_num = '+18445485076'

@shared_task
def send_sms_to_customers():
    all_customers = Customer.objects.all()
    current_time = datetime.datetime.now(pytz.utc)

    # Only send messages at a specific time (e.g., 9 AM UTC)
    if current_time.hour == 9:
        for customer in all_customers:
            sentence = get_random_encouragement()
            build_message(trilio_test_num, sentence, customer.phone_number)
            print(f'Sent message to {customer.first_name} at {customer.phone_number}')
    else:
        print(f'Not sending any messages, current time: {current_time}')

@shared_task
def test_add(x, y): # function to test celery server worker in shell is operating
    return x+y
