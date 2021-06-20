from django.db import models
from django.db import models
from django.shortcuts import reverse
from phonenumber_field.modelfields import PhoneNumberField
from PIL import Image
from django.utils import timezone
from colorfield.fields import ColorField
from django.core.mail import send_mail, EmailMessage
from datetime import timedelta
from django.contrib.auth.models import User
from ckeditor_uploader.fields import RichTextUploadingField
from parler.models import TranslatableModel, TranslatedFields
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
# Create your models here.


class Products(models.Model):
    choice2 = [
        ("Fashion & Beauty", _("Fashion & Beauty")),
        ("Kids & Babies Clothes", _("Kids & Babies Clothes")),
        ("Men & Women  Clothes", _("Men & Women  Clothes")),
        ("Gadgets & Accessories", _("Gadgets & Accessories")),
        ("Electronics & Accessories", _("Electronics & Accessories"))
    ]
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(_("Name of product:"), max_length=500)
    color = models.CharField(_('Color of the product'), max_length=100)
    desc = models.TextField(_("Full Description:"))
    price = models.PositiveIntegerField(_("Price"))
    sale = models.BooleanField(_("Sale"), default=False)
    price_in_sale = models.PositiveIntegerField(_("Price in sale:"), help_text=_(
        "if sale is not true,You do not need to input smth to this .if vice versa,it is mandatory "), default=1, blank=True, null=True)
    quantity = models.PositiveIntegerField()
    img = models.ImageField(_('Main Image'), blank=True, null=True)
    size = models.CharField(_('Size of the product'),
                            max_length=100)
    date = models.DateTimeField(default=timezone.now)
    category = models.CharField(_("Category:"), max_length=100,
                                choices=choice2)
    brand = models.CharField("Mahsulot Brandi:", max_length=100)
    v = models.PositiveIntegerField(blank=True, null=True, default=1)
    bought = models.PositiveIntegerField(blank=True, null=True, default=1)

    def get_absolute_url(self):
        return reverse('add_views', kwargs={'id': self.id})

    def __str__(self):
        return self.name

    def new(self):
        now = timezone.now()
        return now-timedelta(days=5) < self.date < now

    class Meta:
        verbose_name = _('Product')
        verbose_name_plural = _('Products')


class Cart(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=500)
    quantity = models.PositiveIntegerField(null=True)
    price = models.PositiveIntegerField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    quantity1 = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        ordering = ['product']

    def __str__(self):
        return self.name


class Wishlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    list = models.ManyToManyField(Products)

    class Meta:
        verbose_name = ("Wishlist")
        verbose_name_plural = ("Wishlist")


class picture(models.Model):
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, related_name='picture')
    picture = models.ImageField()

    def __str__(self):
        return self.picture.name
