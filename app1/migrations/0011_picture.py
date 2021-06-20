# Generated by Django 3.2 on 2021-06-11 12:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0010_alter_products_price_in_sale'),
    ]

    operations = [
        migrations.CreateModel(
            name='picture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture', models.ImageField(upload_to='')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='picture', to='app1.products')),
            ],
        ),
    ]