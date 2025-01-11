from django.test import TestCase
from django.urls import reverse, resolve

from customer_app.views import AllCustomers, SelectCustomer

class Test_urls(TestCase):
    # testing to see if the endpoint to AllCustomers in urls.py works
    def test_001_all_customers(self):
        url = resolve(reverse('all_customers'))

        with self.subTest():
            self.assertEqual(url.route, 'api/v1/encouragement/')
        self.assertTrue(url.func.view_class is AllCustomers)

    # testing to see if the endpoint to SelectCustomer in urls.py works
    def test_002_select_customer(self):
        url = resolve(reverse('select_customer', args=['SullySaltbear@AOC.com']))

        with self.subTest():
            self.assertEqual(url.route, 'api/v1/encouragement/<int_or_str:id>/')
        self.assertTrue(url.func.view_class is SelectCustomer)