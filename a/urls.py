"""a URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from app1.views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('admin/', admin.site.urls),
    path('api1/', api1, name='api1'),
    path('contact/', TemplateView.as_view(template_name='index.html'), name='contact'),
    path('product_list/', TemplateView.as_view(template_name='index.html'),
         name='product_list'),
    path('product/detail/<int:slug>/',
         TemplateView.as_view(template_name='index.html'), name='detail'),
    path('detail/<int:id>/', detail, name='detail'),
    path('notfound/', TemplateView.as_view(template_name='index.html')),
    path('create/product/', TemplateView.as_view(template_name='index.html')),
    path('contact1/', contact, name='contact1'),
    path('logggedin/', loggedin, name='loggedin'),
    path('sadfasd/', log_in_or, name='login_or'),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('check_l/', check_l),
    path('logout1/', logout1),
    path('register/', register),
    path('signup/', TemplateView.as_view(template_name='index.html')),
    path('asdfasdf/', personal_announcement),
    path('announcement/', TemplateView.as_view(template_name='index.html')),
    path('update/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('asdhjhj/<int:id>/', delete_announce),
    path('sadfasdfgjkljk/', cart_add),
    path('sdasdfas7575df/', wishlist_add),
    path('sdlkewrws/', cart_quantity),
    path('sadfasfwr234/', wishlist),
    path('wishlist/', TemplateView.as_view(template_name='index.html')),
    path('sasdf5465/', remove_wishlist),
    path('32234jnk234324/', cart_posts),
    path('cart/', TemplateView.as_view(template_name='index.html')),
    path('12344t6789dfgdfg/', plus_cart),
    path('asdfasdf12312awdf12312/', minus_cart),
    path('asdfmnask32ui42398lk/', remove_cart),
    path('sefll123123lqmq2334412/', message_order),
    path('rtqkaq2345akdker24/', profile),
    path('profile/', TemplateView.as_view(template_name='index.html')),
    path('edit/', TemplateView.as_view(template_name='index.html')),
    path('animation/', TemplateView.as_view(template_name='index.html')),
    path('checkout/', TemplateView.as_view(template_name='index.html')),
    path('map/', TemplateView.as_view(template_name='index.html')),
    path('checkout/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('check1/', checkout1)
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
