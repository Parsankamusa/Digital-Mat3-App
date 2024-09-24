from django.shortcuts import render, get_object_or_404
from django.http import Http404
from django.http import JsonResponse
from geopy.distance import geodesic
from .models import Sacco, Matatu, Route, Street, EVChargingLocation

# from django.conf import settings
# from .mixins import Directions

def map(request):
    stations = list(EVChargingLocation.objects.values('latitude', 'longitude')[:100])

    # print(stations[:2])
    context = {
        'stations': stations,
    }
    return render(request, 'main/map.html', context)



def nearest_station(request):
    latitude = request.GET.get('latitude')
    longitude = request.GET.get('longitude')
    user_location = latitude, longitude
    station_distances = {}
    
    for station in EVChargingLocation.objects.all()[:100]:
        station_location = station.latitude, station.longitude
        distance = geodesic(user_location, station_location).km
        station_distances[distance] = station_location
    
    min_distance = min(station_distances)
    station_cords = station_distances[min_distance]
    
    return JsonResponse({
        'coordinates': station_cords,
        'distance': min_distance
    })
    


def sacco_dashboard(request):
    saccos = Sacco.objects.all()
    matatus = Matatu.objects.all()
    routes = Route.objects.all()
    streets = Street.objects.all()
    return render(request, 'main/sacco_dashboard.html', {
        'saccos': saccos,
        'matatus': matatus,
        'routes': routes,
        'streets': streets,
    })

def homepage(request):
    return render(request, 'main/base.html')

def search_feature(request):
    if request.method == 'POST':
        search_query = request.POST['search_query']
        try:
            # Attempt to find Saccos, Matatus, Routes, and Streets based on the search query
            saccos = Sacco.objects.filter(name__icontains=search_query)
            matatus = Matatu.objects.filter(name__icontains=search_query).select_related('sacco')
            routes = Route.objects.filter(name__icontains=search_query).select_related('matatu__sacco')
            streets = Street.objects.filter(name__icontains=search_query).select_related('sacco')
            if not saccos and not matatus and not routes and not streets:
                # If no Saccos, Matatus, Routes, or Streets are found, raise a 404 error
                raise Http404("No data found matching your search.")
        except Http404 as e:
            # Handle the exception and pass the error message to the template
            return render(request, 'main/search.html', {'error': str(e)})
        else:
            # If any data is found, render the search results
            return render(request, 'main/search.html', {
                'query': search_query,
                'saccos': saccos,
                'matatus': matatus,
                'routes': routes,
                'streets': streets,
            })
    else:
        # If the request method is not POST, render the search page without any results
        return render(request, 'main/search.html', {})


# '''
# Basic view for routing 
# '''
def route(request):
	return render(request, 'main/route.html')


# '''
# Basic view for displaying a map 
# '''
# def map(request):

# 	lat_a = request.GET.get("lat_a")
# 	long_a = request.GET.get("long_a")
# 	lat_b = request.GET.get("lat_b")
# 	long_b = request.GET.get("long_b")
# 	directions = Directions(
# 		lat_a= lat_a,
# 		long_a=long_a,
# 		lat_b = lat_b,
# 		long_b=long_b
# 		)

# 	context = {
# 	"google_api_key": settings.GOOGLE_API_KEY,
# 	"lat_a": lat_a,
# 	"long_a": long_a,
# 	"lat_b": lat_b,
# 	"long_b": long_b,
# 	"origin": f'{lat_a}, {long_a}',
# 	"destination": f'{lat_b}, {long_b}',
# 	"directions": directions,

# 	}
# 	return render(request, 'main/map.html', context)
