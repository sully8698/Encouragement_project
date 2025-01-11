from django.test import TestCase
from django.core.exceptions import ValidationError
from customer_app.validators import validate_name
from customer_app.models import Customer
from sentence_app.models import Sentence

# Create your tests here.
class customer_test(TestCase):
    
    # test to see if creating a customer object works
    def test_01_create_customer_instance(self):
        new_customer = Customer(first_name='Sully', last_name=('Saltbeard'), email=('SullySaltbear@AOC.com'), phone_number=('123-456-7891'))
        try:
            new_customer.full_clean()
            self.assertIsNotNone(new_customer)
        except ValidationError as e:
            self.fail()
    
    def test_02_create_customer_with_incorrect_first_name_format(self):
        new_customer = Customer(first_name='S8686', last_name=('Saltbeard'), email=('SullySaltbear@AOC.com'), phone_number=('123-456-7891'))
        try:
            new_customer.full_clean()
        except ValidationError as e:
            self.assertTrue('Name may only contain letters and start with a capital letter, example First name "Sean" or example last name "Johnson"' in e.message_dict['first_name'])
    
    def test_03_create_customer_with_incorrect_last_name_format(self):
        new_customer = Customer(first_name='Sully', last_name=('Salt Beard'), email=('SullySaltbear@AOC.com'), phone_number=('123-456-7891'))
        try:
            new_customer.full_clean()
        except ValidationError as e:
            self.assertTrue('Name may only contain letters and start with a capital letter, example First name "Sean" or example last name "Johnson"' in e.message_dict['last_name'])
        
    def test_04_check_customer_with_wrong_email_format(self):
        new_customer = Customer(first_name='Sully', last_name=('Saltbeard'), email=('SullySaltbeard@AOC.org.com'), phone_number=('123-456-7891'))
        try:
            new_customer.full_clean()
        except ValidationError as e:
            self.assertTrue('Enter a valid email address.' in e.message_dict['email'])
    
    def test_05_check_email_change_method_and_internal_email_validator(self):
        new_customer = Customer(first_name='Sully', last_name=('Saltbeard'), email=('SullySaltbear@AOC.com'), phone_number=('123-456-7891'))
        new_customer.change_email('SullyNoBeard@AOLcom')
        try:
            new_customer.full_clean()
        except ValidationError as e:
            self.assertTrue('Enter a valid email address.' in e.message_dict['email'])

class sentence_test(TestCase):
    
    def test_006_check_sentence_creation(self):
        new_sentence = Sentence(sentence='Your going to crush it today!!!')
        try:
            new_sentence.full_clean()
            self.assertIsNotNone(new_sentence)
        except ValidationError as e:
            self.fail()
    
    def test_007_check_change_sentence(self):
        new_sentence = Sentence(sentence='Not very encouraging...')
        new_sentence.change_sentence('The best encouragement!')
        self.assertNotEqual(new_sentence.sentence, 'Not very encouraging...')



