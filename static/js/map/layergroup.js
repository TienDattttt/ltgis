// 4.Điều khiển các maker trên bản đồ như ẩn hiện maker
let pointsCafe = [
    [10.79627784233827, 106.6692171944823, "Cổ Tea House & Coffee"],
    [10.79607043221434, 106.6674328521939, "Cối Xưa Cafe"],
    [10.79570325699937, 106.66683504293746, "BÌNH COFFEE & TEA"],
    [10.795117136725134, 106.66643199662028, "Sung Cà Phê"],
];

const pointsNhaHang = [
    [10.7957853464128, 106.671800068287, "Hương Câu 2"],
    [10.7955575825159, 106.66622580412363, "Lẩu dê Trí Ký"],
    [10.79598756687268, 106.6658825403235, "Phở Phú Vương"],
    [10.79694006846232, 106.66523263808238, "Nhà hàng Quán Ngon"],
    [10.7962784226903, 106.6655838790941, "Bánh mì Hà Lùa"],
    [10.79618641235653, 106.665566441416, "Wulao"],
    [10.79625205146217, 106.66548974107106, "Kí BBQ Lê Văn Sỹ"],
    [10.7962856478421, 106.665442318612, "OriFood BBQ & Hotpot Lê Văn Sỹ"],
];

// Sử dụng 'LayerGroup' để thực hiện
const pA = new L.FeatureGroup();
const pB = new L.FeatureGroup();

const allMarkers = new L.FeatureGroup();

// Thêm marker đến layer pointsCafe
for (let i = 0; i < pointsCafe.length; i++) {
    marker = L.marker([pointsCafe[i][0], pointsCafe[i][1]]).bindPopup(pointsCafe[i][2]);
    pA.addLayer(marker);
}

// Thêm marker đến layer pointsNhaHang
for (let i = 0; i < pointsNhaHang.length; i++) {
    marker = L.marker([pointsNhaHang[i][0], pointsNhaHang[i][1]]).bindPopup(pointsNhaHang[i][2]);
    pB.addLayer(marker);
}

const overlayMaps = {
    "Cà phê": pA,
    "Nhà hàng/quán ăn": pB,
};

map.on("layeradd layerremove", function () {
    // tạo các đường biên rỗng
    let bounds = new L.LatLngBounds();

    // Lặp lại các layer của bản đồ
    map.eachLayer(function (layer) {
        // Kiểm tra xem lớp có phải là FeatureGroup không
        if (layer instanceof L.FeatureGroup) {
            // Extend bounds with group's bounds
            bounds.extend(layer.getBounds());
        }
    });

    // Kiểm tra xem các đường biên có hợp lệ không
    if (bounds.isValid()) {
        map.flyToBounds(bounds);
    }
});

L.Control.CustomButtons = L.Control.Layers.extend({
    onAdd: function () {
        this._initLayout();
        this._addMarker();
        this._removeMarker();
        this._update();
        return this._container;
    },

    _addMarker: function () {
        this.createButton("Thêm", "add-button");
    },

    _removeMarker: function () {
        this.createButton("Xóa", "remove-button");
    },

    createButton: function (type, className) {
        const elements = this._container.getElementsByClassName("leaflet-control-layers-list");
        const button = L.DomUtil.create("button", `btn-markers ${className}`, elements[0]);
        button.textContent = `${type} markers`;
        L.DomEvent.on(button, "click", function (e) {
            const checkbox = document.querySelectorAll(".leaflet-control-layers-overlays input[type=checkbox]");
            [].slice.call(checkbox).map((el) => {
                el.checked = type === "Thêm" ? false : true;
                el.click();
            });
        });
    },
});

new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);