# Generated by Django 3.2 on 2021-05-31 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0009_cart_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='price_in_sale',
            field=models.PositiveIntegerField(blank=True, default=1, help_text='if sale is not true,You do not need to input smth to this .if vice versa,it is mandatory ', null=True, verbose_name='Price in sale:'),
        ),
    ]
