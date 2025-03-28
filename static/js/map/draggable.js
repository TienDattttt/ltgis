//3. TẠO MARKER CÓ THỂ KÉO THẢ
for (let i = 0; i < points.length; i++) {
    const lat = points[i][0];
    const lng = points[i][1];
    const popupText = points[i][2];

    // Thêm marker đến bản đồ
    // Mỗi marker có thể kéo thả
    const marker = new L.marker([lat, lng], {
        draggable: true, //draggable: true: Cho phép kéo thả marker trên bản đồ
        autoPan: true,   //autoPan: true: Khi kéo marker, bản đồ sẽ tự động di chuyển theo
    })
        .bindPopup(popupText)
        .addTo(map);

    // Kéo thả marker
    marker.on("dragend", function (e) { //Lắng nghe sự kiện "dragend", tức là khi người dùng kéo marker xong và thả ra.
        const markerPlace = document.querySelector(".marker-position"); //biến markerPlace sẽ đại diện cho phần tử <div> này.
        markerPlace.textContent = `${marker.getLatLng().lat}, ${marker.getLatLng().lng}`;
    });
}
