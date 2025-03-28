// Cấu hình bản đồ
let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
};

// Vị trí và mức zoom ban đầu
const zoom = 18;
const lat = 10.796501883372228;
const lng = 106.666880416611385;

// Khởi tạo bản đồ
const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

// Tải tile layer từ OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="#">LT GIS</a> cơ bản',
}).addTo(map);

// Tạo icon tùy chỉnh
const funny = L.icon({
    iconUrl: "/static/assets/img/3d-map.png",
    iconSize: [50, 58],
    iconAnchor: [20, 58],
    popupAnchor: [0, -60],
});

// Tạo nội dung popup
const customPopup =
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/M3pDnDRWjdw"' +
    ' title="YouTube video player" frameborder="0"' +
    ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
    ' referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

// Tùy chọn popup
const customOptions = {
    maxWidth: "auto",
    className: "customPopup description",
};

// Thêm marker ban đầu
L.marker([lat, lng], {
    icon: funny,
})
    .bindPopup(customPopup, customOptions)
    .addTo(map);

// Định vị vị trí người dùng
map.locate({
    setView: true,
    enableHighAccuracy: true,
})
    .on("locationfound", (e) => {
        // Marker cho vị trí người dùng
        const marker = L.marker([e.latitude, e.longitude], {
            icon: funny, // Áp dụng icon funny
        }).bindPopup(
            "You are here :)",
            { className: "description" }
        );
        // Vòng tròn biểu thị độ chính xác
        const circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
            weight: 2,
            color: "red",
            fillColor: "red",
            fillOpacity: 0.1,
        });
        // Thêm marker và vòng tròn vào bản đồ
        map.addLayer(marker);
        map.addLayer(circle);
    })
    .on("locationerror", (e) => {
        alert("Location access denied.");
    });

// Thêm control zoom ở góc trên bên phải
L.control.zoom({ position: "topright" }).addTo(map);

// Tìm kiếm địa chỉ
window.addEventListener("DOMContentLoaded", function () {
    new Autocomplete("search", {
        delay: 1000,
        selectFirst: true,
        howManyCharacters: 2,

        onSearch: function ({ currentValue }) {
            const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q=${encodeURI(currentValue)}`;
            return new Promise((resolve) => {
                fetch(api, {
                    headers: {
                        "User-Agent": "MyApp/1.0 (your-email@example.com)",
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Nominatim API Response:", data);
                        resolve(data.features || []);
                    })
                    .catch((error) => {
                        console.error("Error fetching Nominatim API:", error);
                    });
            });
        },

        onResults: ({ currentValue, matches, template }) => {
            const regex = new RegExp(currentValue, "i");
            return matches === 0
                ? template
                : matches
                      .map((element) => {
                          const displayName = element.properties?.display_name || "Unknown Location";
                          return `
                            <li class="loupe" role="option">
                                ${displayName.replace(regex, (str) => `<b>${str}</b>`)}
                            </li>`;
                      })
                      .join("");
        },

        onSubmit: ({ object }) => {
            const { display_name } = object.properties;
            const cord = object.geometry.coordinates;
            const customId = Math.random();
            const marker = L.marker([cord[1], cord[0]], {
                title: display_name,
                id: customId,
                icon: funny, // Áp dụng icon funny
            });
            marker.addTo(map).bindPopup(display_name, {
                className: "description",
            });
            map.setView([cord[1], cord[0]], 8);
            map.eachLayer(function (layer) {
                if (layer.options && layer.options.pane === "markerPane") {
                    if (layer.options.id !== customId) {
                        map.removeLayer(layer);
                    }
                }
            });
        },

        onSelectedItem: ({ index, element, object }) => {
            console.log("onSelectedItem:", index, element, object);
        },

        noResults: ({ currentValue, template }) =>
            template(`<li>No results found: "${currentValue}"</li>`),
    });

    // Tạo legend ở góc dưới bên trái
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "description");
        L.DomEvent.disableClickPropagation(div);
        const text =
            "<b>Thu Điếu - Nguyễn Khuyến</b><br>" +
            "Ao thu lạnh lẽo nước trong veo,<br>" +
            "Một chiếc thuyền câu bé tẻo teo.<br>" +
            "Sóng biếc theo làn hơi gợn tí,<br>" +
            "Lá vàng trước gió sẽ đưa vèo.<br>" +
            "Tầng mây lơ lửng trời xanh ngắt,<br>" +
            "Ngõ trúc quanh co khách vắng teo.<br>" +
            "Tựa gối, ôm cần lâu chẳng được,<br>" +
            "Cá đâu đớp động dưới chân bèo.<br>";
        div.insertAdjacentHTML("beforeend", text);
        return div;
    };

    legend.addTo(map);
});