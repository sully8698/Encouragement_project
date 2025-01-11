# Generated by Django 5.1.4 on 2025-01-10 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sentence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sentence', models.CharField(max_length=200, unique=True)),
                ('genre', models.CharField(default='generic', max_length=50)),
            ],
        ),
    ]