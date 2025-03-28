// 5. Vẽ các đối tượng lên bản độ dựa vào các tọa độ của đối tượng đó

const Truong = L.polygon([
    [10.796646346406142, 106.66708527087582],
    [10.79673235249826, 106.6664600955578],
    [10.797240865498882, 106.66655116283911],
    [10.797198709914803, 106.666837478557],
    [10.797189483379063, 106.666837478557],
    [10.79716511778125, 106.6669962633887],
    [10.797178949481602, 106.666968916697189],
    [10.797148263935389, 106.66718226562031],
    [10.79733762852362, 106.667123993410631],
    [10.79674880680173, 106.667159558709],
], {
    color: "blue",
    className: "Truong",
});

const Place = L.polygon([
    [10.795818637312593, 106.66679660215691],
    [10.795785703186535, 106.666260915355],
    [10.795771799946411, 106.66690925534726],
    [10.79567767885358, 106.66694412406434],
    [10.79550552766729, 106.6669146197534],
    [10.795795348900932, 106.6668218686813],
    [10.795491271140351, 106.666787885189],
    [10.79554989488206, 106.66671948900511],
], {
    color: "red",
    className: "place",
});

const truong = new L.FeatureGroup();
const place = new L.FeatureGroup();

// Thêm các polygon đến bản đồ
truong.addLayer(Truong);
place.addLayer(Place);

const overlayMaps = {
    Truong: truong,
    Place: place,
};

map.on("layeradd", function () {
    let bounds = new L.LatLngBounds();

    map.eachLayer((layer) => {
        if (layer instanceof L.FeatureGroup) {
            bounds.extend(layer.getBounds());
        }
    });

    if (bounds.isValid()) {
        map.flyToBounds(bounds);
    } else {
        // Invalid, fit world
        map.fitWorld();
    }
});

L.Control.CustomButtons = L.Control.Layers.extend({
    onAdd: function () {
        this._initLayout();
        this._removePolygons();
        this._update();
        return this._container;
    },

    _removePolygons: function () {
        this.createButton("Xóa tất cả các vùng", "remove-button");
    },

    createButton: function (type, className) {
        const elements = this._container.getElementsByClassName("leaflet-control-layers-list");
        const button = L.DomUtil.create(
            "button",
            `btn-markers ${className}`,
            elements[0]
        );
        button.textContent = className;
        L.DomEvent.on(button, "click", function (e) {
            const checkbox = document.querySelectorAll(
                `.leaflet-control-layers-overlays input[type="checkbox"]`
            );
            // Xóa/tắt các layer khi click button
            Array.from(checkbox).map((el) => {
                el.checked = type === "add" ? false : true;
                el.click();
            });
        });
    },
});

new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);