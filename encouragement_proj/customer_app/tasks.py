from celery import shared_task
from sms_builder import build_message, get_random_encouragement
from customer_app.models import Customer
import datetime
import pytz

trilio_test_num = '+18445485076'

pacific_tz = pytz.timezone('US/Pacific')
eastern_tz = pytz.timezone('US/Eastern')
central_tz = pytz.timezone('US/Central')


@shared_task
def send_sms_to_customers():
    all_customers = Customer.objects.all()
    current_time_utc = datetime.datetime.now(pytz.utc)

    # needs functionality to grab timezone from database of customer
    # an if else statement to pick the below statments
    current_time_pacific = current_time_utc.astimezone(pacific_tz)
    current_time_eastern = current_time_utc.astimezone(eastern_tz)
    current_time_central = current_time_utc.astimezone(central_tz) 

    # Only send messages at a specific time (e.g.,  AM eastern)
    if current_time_eastern.hour == 21:
        for customer in all_customers:
            sentence = get_random_encouragement()
            build_message(trilio_test_num, sentence, customer.phone_number)
            print(f'Sent message to {customer.first_name} at {customer.phone_number}')
    else:
        print(f'Not sending any messages, current time: {current_time}')

@shared_task
def test_add(x, y): # function to test celery server worker in shell is operating
    return x+y
