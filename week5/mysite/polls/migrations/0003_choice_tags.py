# Generated by Django 4.2.1 on 2023-05-25 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_rename_pub_data_question_pub_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='choice',
            name='tags',
            field=models.CharField(default='Happy', max_length=20),
        ),
    ]
