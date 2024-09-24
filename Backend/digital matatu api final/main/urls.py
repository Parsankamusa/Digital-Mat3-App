from django.urls import path
from . import views


app_name = "main"

urlpatterns = [
	
	path('', views.route, name="route"),
	path('map', views.map, name="map"),
    path('search', views.search_feature, name="search"),
	path('dashboard', views.sacco_dashboard, name="dashboard"),
    path('get-nearest-station/', views.nearest_station, name="get-nearest-station"),

	]