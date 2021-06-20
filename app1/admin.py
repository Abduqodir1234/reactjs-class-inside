from django.contrib import admin
from .models import *
# Register your models here.
from parler.admin import TranslatableAdmin, TranslatableTabularInline


class pictureInline(admin.StackedInline):
    model = picture
    extra = 1


class ProductsAdmin(admin.ModelAdmin):
    list_display = ['name', 'quantity', 'price', 'sale',
                    'price_in_sale', 'color', 'category', 'brand', 'user']
    fieldsets = (
        ('Main informations about Products', {'fields': [
         'name', 'quantity', 'price', 'sale', 'price_in_sale', 'img', 'user']}),
        ('Additional Information', {'fields': [
         'size', 'color', 'desc', 'category', 'brand']}),
    )
    list_editable = ['price', 'sale', 'price_in_sale']
    inlines = [pictureInline]


admin.site.register(Products, ProductsAdmin)
admin.site.register(Cart)
admin.site.register(Wishlist)
