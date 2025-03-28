// Khởi tạo bản đồ
const map = L.map("map", {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
}).setView([52.22977, 21.01178], 12); // Vị trí trung tâm ban đầu (Warsaw, Ba Lan)

map.attributionControl.setPrefix(false);

// Tải tile layer từ OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="#">LT GIS</a> cơ bản',
}).addTo(map);

// Thêm control zoom ở góc trên bên phải
L.control.zoom({ position: "topright" }).addTo(map);

// Lấy tất cả các bài viết
const articles = document.querySelectorAll("article");

// Biến để lưu trữ marker hiện tại
let currentMarker = null;

// Hàm xóa marker hiện tại (nếu có)
function clearCurrentMarker() {
    if (currentMarker) {
        map.removeLayer(currentMarker);
        currentMarker = null;
    }
}

// Hàm đặt marker mới
function setMarker([lat, lng], title) {
    // Xóa marker cũ trước khi thêm marker mới
    clearCurrentMarker();
    // Tạo marker mới
    currentMarker = L.marker([lat, lng], { title });
    // Thêm marker vào bản đồ và tạo popup
    currentMarker.addTo(map).bindPopup(title, {
        className: "description",
    }).openPopup();
}

// Hàm di chuyển bản đồ đến vị trí
function centerMap([lat, lng], target, title) {
    const active = target.classList.contains("active");
    // Di chuyển bản đồ đến tọa độ
    map.setView([lat, lng], 16);
    // Nếu chưa có class active, đặt marker
    if (!active) {
        setMarker([lat, lng], title);
    }
}

// Hàm xử lý khi IntersectionObserver phát hiện thay đổi
function onChange(changes) {
    changes.forEach(function (change) {
        // Lấy dữ liệu tọa độ và tiêu đề từ bài viết
        const data = change.target.dataset.coordinates;
        const title = change.target.dataset.title;
        if (change.intersectionRatio > 0.5) { // Chỉ kích hoạt khi bài viết hiển thị hơn 50%
            // Di chuyển bản đồ và đặt marker
            centerMap(JSON.parse(data), change.target, title);
            // Xóa class active từ tất cả bài viết
            articles.forEach(article => article.classList.remove("active"));
            // Thêm class active cho bài viết hiện tại
            change.target.classList.add("active");
        }
    });
}

// Kiểm tra xem IntersectionObserver có được hỗ trợ không
if ("IntersectionObserver" in window) {
    const config = {
        root: null, // Sử dụng viewport làm root
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1], // Các mức độ hiển thị
    };
    let observer = new IntersectionObserver(onChange, config);
    articles.forEach(function (article) {
        observer.observe(article);
    });
} else {
    console.warn("IntersectionObserver is not supported in this browser.");
}