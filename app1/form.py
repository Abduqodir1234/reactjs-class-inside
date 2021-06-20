
from django import forms
from django.db.models import fields
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm


class ProductSerializer(serializers.ModelSerializer):
    price_in_sale = serializers.IntegerField(required=False)
    img = serializers.ImageField(required=False, allow_null=True)
    picture = serializers.StringRelatedField(
        many=True)

    class Meta:
        model = Products
        fields = '__all__'


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    number = serializers.IntegerField()
    msg = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        User.objects.create(user=user)
        return user


class CartSerializer(serializers.ModelSerializer):
    """Form definition for Cart."""

    class Meta:
        """Meta definition for Cartform."""
        model = Cart
        fields = '__all__'


class User1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserChange(UserChangeForm):
    username = forms.CharField(
        max_length=100, widget=forms.TextInput(attrs={"class": "form-control"}))
    first_name = forms.CharField(
        max_length=100, widget=forms.TextInput(attrs={"class": "form-control"}))
    last_name = forms.CharField(
        max_length=100, widget=forms.TextInput(attrs={"class": "form-control "}))
    email = forms.EmailField(max_length=1000, widget=forms.TextInput(
        attrs={"class": "form-control", 'required': True}))

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username')
