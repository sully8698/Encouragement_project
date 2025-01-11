from django.db import models

# Create your models here.
class Sentence(models.Model):
    sentence = models.CharField(max_length=200, unique=True)
    genre = models.CharField(max_length=50, default='generic')

    def change_sentence(self, new_sentence):
        self.sentence = new_sentence
        self.save()