from celery import shared_task
from sms_builder import build_message, get_random_encouragement
from customer_app.models import Customer
import datetime
import pytz

trilio_test_num = '+18445485076' #change to verified twillio number when ready

pacific_tz = pytz.timezone('US/Pacific')
eastern_tz = pytz.timezone('US/Eastern')
central_tz = pytz.timezone('US/Central')


@shared_task
def send_sms_to_customers():
    all_customers = Customer.objects.all()
    current_time_utc = datetime.datetime.now(pytz.utc) #time zone for universal time

    # Only send messages at a specific time based on user database
    for customer in all_customers:
        customer_timezone = pytz.timezone(customer.timezone)
        current_customer_time = current_time_utc.astimezone(customer_timezone) #put current time into the users selected time zone based on data base
        if current_customer_time.hour == customer.message_hour:
            sentence = get_random_encouragement()
            build_message(trilio_test_num, sentence, customer.phone_number)
            print(f'Sent message to {customer.first_name} at {customer.phone_number}')
        else:
            print(f'Message scheduled to be sent for {customer.first_name} {customer.last_name} @ {customer.message_hour} O\'Clock')

    

@shared_task
def test_add(x, y): # function to test celery server worker in shell is operating
    return x+y
