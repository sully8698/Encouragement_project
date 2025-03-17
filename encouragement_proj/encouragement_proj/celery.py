from __future__ import absolute_import, unicode_literals
import os
import environ
from celery import Celery

env = environ.Env()

environ.Env.read_env(os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', '.env'))

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'encouragement_proj.settings')

app = Celery('encouragement_proj')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()