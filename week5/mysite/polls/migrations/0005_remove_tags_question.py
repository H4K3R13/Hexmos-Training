# Generated by Django 4.2.1 on 2023-05-25 15:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0004_remove_choice_tags_tags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tags',
            name='question',
        ),
    ]