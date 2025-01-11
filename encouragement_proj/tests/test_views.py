from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status

import json

from customer_app.models import Customer
from customer_app.views import AllCustomers, SelectCustomer
from sentence_app.views import Sentence



class Test_views(TestCase):

    # creates a client that has data to use on every test
    # request looks like self.client.get()
    def setUp(self):
        sully = Customer(first_name='Sully', last_name='Saltbeard', email='SullySaltbear@AOC.com', phone_number='123-456-7890')
        sully.save()
        jilga = Customer(first_name='Jilga', last_name='Jaggedstone', email='JilgaJaggedstone@AOC.com', phone_number='098-765-4321')
        jilga.save()
        self.jilga_id = jilga.id
        
        sentence = Sentence(sentence='Your going to crush it today!')
        sentence.save()
        self.sentence_id = sentence.id

    def test_001_get_all_customers(self):
        response = self.client.get(reverse('all_customers'))
        response_body = json.loads(response.content)
        self.assertEqual(len(response_body), 2)

    def test_002_get_a_customer_by_email(self):
        
        response = self.client.get(reverse('select_customer', args=['SullySaltbear@AOC.com']))
        response_body = json.loads(response.content)
        self.assertEqual(response_body[0]["fields"]["first_name"], "Sully")
    
    def test_003_get_all_sentences(self):
        response = self.client.get(reverse('all_sentences'))
        response_body = json.loads(response.content)
        self.assertEqual(len(response_body), 1)
    
    def test_004_get_a_sentence(self):
        response = self.client.get(reverse('select_sentence', args=[self.sentence_id]))
        response_body = json.loads(response.content)
        self.assertEqual(response_body[0]['fields']['sentence'], 'Your going to crush it today!')
    
    def test_005_put_method_for_sentence(self):
        sentence_data = {
            'sentence' : "You have got this!"
        }   

        url = reverse('select_sentence', args=[self.sentence_id])
        response = self.client.put(url, data=sentence_data, format='json', content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_sentence = Sentence.objects.get(id=self.sentence_id)
        self.assertEqual(updated_sentence.sentence, 'You have got this!')
    
    def test_006_put_method_for_customer(self):
        customer_data = {
            'email' : 'jilgaSaltBeard@AOC.com'
        }

        url = reverse('select_customer', args=[self.jilga_id])
        response = self.client.put(url, data=customer_data, format='json', content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_customer_email = Customer.objects.get(id=self.jilga_id)
        self.assertEqual(updated_customer_email.email, 'jilgaSaltBeard@AOC.com')