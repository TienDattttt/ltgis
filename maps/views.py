from django.shortcuts import render

def simplemap(request):
    return render(request, 'simple-map.html')

def more_marker(request):
    return render(request, 'more-marker.html')

def draggable(request):
    return render(request, 'draggable.html')

def layergroup(request):
    return render(request, 'layergroup.html')

def polygon(request):
    return render(request, 'polygon.html')

def search(request):
    return render(request, 'search.html')

def articles(request):
    return render(request, 'articles.html')