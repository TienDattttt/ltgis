from django.shortcuts import render

def simplemap(request):
    return render(request, 'simple-map.html')