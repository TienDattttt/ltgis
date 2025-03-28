//2.TAO NHIEU MARKER TREN BAN DO
let points = [
    [10.796277842333827, 106.66692171944823, "CỐ Tea House & Coffee"],
    [10.79607043221434, 106.6674328521939, "Cội Xưa Cafe"],
    [10.795703256889937, 106.66683564293746, "BINISUN COFFEE & TEA"],
    [10.795117136725134, 106.66643199662028, "Sung Cà Phê"],
]; //mảng chứa danh sách các quán cafe

// Tạo 1 vòng lặp để thực hiện thêm nhiều marker vào bản đồ

for (let i = 0; i < points.length; i++) {
    const [lat, lng, popupText] = points[i];
                                             //lấy từng giá trị trong mảng points[i] và gán vào 3 biến
                                             // i = 0 => points[0] => points[10.796277842333827, 106.66692171944823, "CỐ Tea House & Coffee"]
    marker = new L.marker([lat, lng]).bindPopup(popupText).addTo(map);
}