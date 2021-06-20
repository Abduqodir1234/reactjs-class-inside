from django.db.models.fields import NullBooleanField
from django.http.response import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework.serializers import Serializer
from .models import *
from .form import *
import telebot
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

token = "1821169702:AAFSI_t5oinoIszVxqLI71VAD8H3kmxOlIg"

bot = telebot.TeleBot(token)
# Create your views here.


@api_view(['POST', 'GET'])
def api1(request):
    if request.method == 'GET':
        r = Products.objects.all()
        g = Products.objects.get(name='324523452')
        serializer3 = ProductSerializer(g)
        print(serializer3.data)
        serializer = ProductSerializer(r, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        print(request.data)
        t = request.data
        print(request.user, "Username")
        t['user'] = request.user.id
        data = ProductSerializer(data=t)
        if data.is_valid():
            data.save()
            return Response(data.data, status=status.HTTP_201_CREATED)
        print(data.errors)
        return Response(data.errors)


@api_view(['POST'])
def contact(request):
    if request.method == 'POST':
        info = ContactSerializer(data=request.data)
        if info.is_valid():
            sms = "Message from " + info.data["name"] + " whose phone number is " + str(
                info.data["number"]) + "\n\n Message: \n\n" + info.data["msg"]
            bot.send_message(1307088738, sms, parse_mode='HTML')
            return Response('We send your message to our admins successfully', status=status.HTTP_202_ACCEPTED)


@api_view(['GET', 'PUT'])
def detail(request, id):
    try:
        t = Products.objects.get(id=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProductSerializer(t)
        return Response(serializer.data)
    elif request.method == 'PUT':
        print(request.data)
        serializer = ProductSerializer(t, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("New Product was added successfully!!", status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response("Error", status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def loggedin(request):
    print(request.user)
    if request.user.is_authenticated:
        r = User.objects.defer('password').get(username=request.user)
        serializer = UserSerializer(r)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    else:
        return Response('False')


@api_view(['POST'])
def log_in_or(request):
    if request.method == 'POST':
        username = request.data["username"]
        password = request.data["password"]
        user1 = authenticate(request, username=username, password=password)
        if user1 is not None:
            login(request, user1)
            if Cart.objects.filter(user=request.user).exists():
                pass
            else:
                x = Cart.objects.create(user=request.user)
                x.save()
            if Wishlist.objects.filter(user=request.user).exists():
                pass
            else:
                x = Wishlist.objects.create(user=request.user)
                x.save()
            return Response('True')
        else:
            return Response('Please enter the correct username and password for a staff account. Note that both fields may be case-sensitive.')
    else:
        return Response('Please enter the correct username and password for a staff account. Note that both fields may be case-sensitive.')


@api_view(['POST'])
def check_l(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            return Response(True)
        else:
            return Response(False)


@api_view(['GET'])
def logout1(request):
    if request.method == 'GET':
        logout(request)
        return Response("False")


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        data = UserCreationForm(request.POST)
        if data.is_valid():
            data.save()

            return Response('True', status=status.HTTP_201_CREATED)
        else:
            print(data.errors)
            return Response(data.errors)


@api_view(['GET'])
def personal_announcement(request):
    if request.method == 'GET':
        print("GET method")
        r = Products.objects.filter(user=request.user)
        if r.count == 0 or r.count == 1:
            print("0 va 1")
            serializer = ProductSerializer(r)
        else:
            print("More than 1")
            serializer = ProductSerializer(r, many=True)
            print("After ProductSerializer")
        return Response(serializer.data)
        print("After return")
    else:
        return Response('Error')


@api_view(['POST'])
def delete_announce(request, id):
    print("Delete View")
    if request.method == 'POST':
        r = get_object_or_404(Products, pk=id)
        r.delete()
        print('Deleted')
        return Response("Deleted")


@api_view(['POST'])
def wishlist_add(request):
    try:
        if request.user.is_authenticated:
            id = request.data['id']
            y = get_object_or_404(Products, pk=id)
            z = get_object_or_404(Wishlist, user=request.user)
            z.list.add(y)
            return Response("OK")
        else:
            return Response("Nol")
    except:
        return Response("No")


@api_view(['GET'])
def cart_quantity(request):
    if request.user.is_authenticated:
        m = get_object_or_404(Wishlist, user=request.user)
        z = {'cart': Cart.objects.filter(
            user=request.user).count(), 'wishlist': m.list.count()}
        return Response(z)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def wishlist(request):
    if request.user.is_authenticated:
        x = Wishlist.objects.get(user=request.user).list.all()
        z = ProductSerializer(x, many=True)
        print(x)
        return Response(z.data)


@api_view(['POST'])
def remove_wishlist(request):
    if request.user.is_authenticated:
        print("Inside")
        id = request.data['id']
        f = get_object_or_404(Products, id=id)
        x = get_object_or_404(Wishlist, user=request.user)
        x.list.remove(f)
        return Response("Ok")


@api_view(['POST'])
def cart_add(request):
    try:
        if request.user.is_authenticated and request.method == 'POST':
            print("POST")
            print(request.data)
            id = request.data['id']
            product = Products.objects.get(id=id)
            if Cart.objects.filter(user=request.user, product=product).exists():
                return Response('before')
            else:
                if product.sale:
                    price = product.price_in_sale
                else:
                    price = product.price
                one = Cart.objects.create(user=request.user, name=product.name, product=product, quantity=1,
                                          price=price, image=product.img, quantity1=product.quantity)
                one.save()
                return Response("OK")
        else:
            return Response("Nol")

    except:
        return Response("No")


@api_view(['GET'])
def cart_posts(request):
    if request.user.is_authenticated:
        x = Cart.objects.filter(user=request.user)
        z = CartSerializer(x, many=True)
        return Response(z.data)


@api_view(['POST'])
def plus_cart(request):
    id = request.data['id']
    try:
        selected_choice = get_object_or_404(Cart, pk=id)
        if selected_choice.quantity >= selected_choice.quantity1:
            selected_choice.quantity = selected_choice.quantity1
            selected_choice.save()
            return Response('Amount of Product that you want to order is more than amount of Product in our stock ')
        else:
            selected_choice.quantity += 1
            selected_choice.save()
            return Response('1 was added to quantity of selected product in cart')
    except:
        return Response('Something went wrong')


@api_view(['POST'])
def minus_cart(request):

    try:
        id = request.data['id']
        selected_choice = get_object_or_404(Cart, pk=id)
        if selected_choice.quantity == 1:
            selected_choice.delete()
            return Response('You want to order 0 products.It means You do not need this product anymore.Therefore,This product was removed from your cart')
        if selected_choice.quantity > selected_choice.quantity1:
            selected_choice.quantity = selected_choice.quantity1
            selected_choice.save()
            return Response('Amount of Product that you want to order is more than amount of Product in our stock')
        else:
            selected_choice.quantity -= 1
            selected_choice.save()
            return Response('One was subtracted from quantity of selected product in cart')
    except:
        return Response("Something went wrong.")


@api_view(['POST'])
def remove_cart(request):
    try:
        id = request.data['id']
        selected = get_object_or_404(Cart, pk=id)
        selected.delete()
        return Response("Product is removed from cart successfully!!")
    except:
        return Response('Something went wrong')


@api_view(['POST'])
def message_order(request):
    try:
        yh = ''
        for i in Cart.objects.filter(user=request.user):
            yh += i.name + "        " + str(i.quantity) + '  items\n\n'
        subject = 'Product Order '
        msg = "Full Name:\n" + request.data['name'] + " "+request.data['surname'] + " " + "\n \nNumber: \n" + \
            str(request.data['tel_num']) + "\n \nFull Address: \n" + \
            request.data['address'] + "\n \nOrdered Product: \n" + yh
        sms = f"{subject}\n\n {msg}"
        bot.send_message(1307088738, sms, parse_mode='HTML')
        return Response("Ok")
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def profile(request):
    print('Came')
    z = get_object_or_404(User, username=request.user)
    if request.method == 'GET':
        s = User1(z)
        return Response(s.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        email = request.data['email']
        username = request.data['username']
        x = UserChange(request.data, instance=request.user)
        if x.is_valid():
            x.save()
            return Response(x.data, status=status.HTTP_200_OK)
        else:
            print(x.errors)
            return Response(x.errors)


@api_view(['POST'])
def checkout1(request):
    if request.method == 'POST':
        print('POST')
        id = request.data['id']
        print(id)
        i = get_object_or_404(Products, pk=int(id))
        print(i)
        yh = ''
        yh += i.name + "        " + \
            str(request.data['quantity']) + '  items\n\n'
        subject = 'Product Order '
        msg = "Full Name:\n" + request.data['name'] + " "+request.data['surname'] + " " + "\n \nNumber: \n" + str(
            request.data['tel_num']) + "\n \nFull Address: \n" + request.data['address'] + "\n \nOrdered Product: \n" + yh
        sms = f"{subject}\n\n {msg}"
        bot.send_message(1307088738, sms, parse_mode='HTML')
        return Response('ok')
