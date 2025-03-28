let config = {
    minZoom: 7,  // Mức zoom nhỏ nhất của bản đồ là 7
    maxZoom:18,  // Mức zoom lớn nhất của bản đồ là 18
};


// Xác định vị trí và mức zoom ban đầu
const zoom = 18;
const lat = 10.796501883372228;
const lng = 106.666880416611385;


const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

//Tạo một bản đồ mới trong phần tử HTML có id="map" và áp dụng cấu hình config.
//Thiết lập vị trí trung tâm của bản đồ với tọa độ [lat, lng] và mức zoom = 18.
//Tắt hiển thị attribution mặc định của Leaflet

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="#">LT GIS</a> cơ bản',
}).addTo(map);


