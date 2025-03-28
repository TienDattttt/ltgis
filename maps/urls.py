from django.urls import path
from . import views

app_name = 'maps'

urlpatterns = [
    path('',views.simplemap),
    path('co-ban/',views.simplemap, name="co-ban"),
    path('more-marker/',views.more_marker, name="more-marker"),
    path('draggable/',views.draggable, name="draggable"),
    path('layergroup/',views.layergroup, name="layergroup"),
    path('polygon/',views.polygon, name="polygon"),
     path('search/',views.search, name="search"),
     path('articles/', views.articles, name='articles'),
]
