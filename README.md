# 🐍 PyMaster - Nền Tảng Học Lập Trình Python Tương Tác 100% Client-Side

**PyMaster** là nền tảng web học lập trình Python hiện đại, chạy hoàn toàn trên trình duyệt (Client-Side Only) thông qua **WebAssembly (Pyodide)** và được tối ưu hóa để triển khai miễn phí trên **GitHub Pages**.

---

## 🌟 Tính Năng Nổi Bật

1. **Python Trực Tiếp Trên Trình Duyệt (Web Worker + Pyodide v0.26.1)**:
   - Chạy CPython 3.12 thực thụ ngay trong trình duyệt mà không cần cài đặt bất kỳ backend/database hay server Python nào.
   - Luồng thực thi chạy trong Web Worker độc lập, tích hợp bộ đếm giờ (timeout 8s) bảo vệ trình duyệt khỏi bị treo khi người dùng lỡ viết vòng lặp vô tận (`while True`).
   - Bắt trọn vẹn `print()` / `sys.stdout`, `sys.stderr` và hiển thị traceback kèm lời khuyên sửa lỗi bằng tiếng Việt thân thiện với người mới.

2. **Giao Diện IDE Chia Đôi (Split-Pane Layout)**:
   - Lấy cảm hứng thiết kế từ Linear, Raycast và LeetCode: Dark Mode chuẩn dev, font JetBrains Mono / Fira Code.
   - Thanh kéo co giãn kích thước linh hoạt giữa cột Lý thuyết/Đề bài và Không gian code/Terminal.

3. **Hệ Thống Chấm Bài Tự Động (Auto-Grader)**:
   - Kiểm tra mã nguồn người dùng qua các Test Case (Bao gồm Test công khai và Test ẩn).
   - Bắn pháo hoa ăn mừng (`canvas-confetti`) và tự động lưu tiến độ vào `localStorage`.

4. **Lộ Trình Sư Phạm Bản Chất (5 Modules - 12 Bài Học Chuyên Sâu)**:
   - **Module 1**: Bản chất Biến & Kiểu dữ liệu (Name Binding, id(), F-String, Toán tử số học, BMI).
   - **Module 2**: Rẽ nhánh & Tư duy Logic (Truthy/Falsy, Short-circuit, Năm nhuận, Phân loại tam giác).
   - **Module 3**: Vòng lặp & Luồng thực thi (for & range(), while & chống lặp vô tận, Số nguyên tố, Tổng chữ số).
   - **Module 4**: Cấu trúc dữ liệu nền tảng (List Mutable & con trỏ tham chiếu, Tuple & Set $O(1)$, Dictionary & Hash table).
   - **Module 5**: Hàm (Functions) & Tái sử dụng (`return` vs `print`, Scope LEGB, Palindrome, Giai thừa đệ quy).

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Môi Trường Cục Bộ

### 1. Yêu cầu hệ thống
- Đã cài đặt **Node.js** (khuyên dùng Node 18+ hoặc 20+).

### 2. Cài đặt các gói phụ thuộc
```bash
cd pymaster
npm install
```

### 3. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Trình duyệt sẽ mở tại `http://localhost:3000`.

### 4. Build bản Production
```bash
npm run build
```
Thư mục `dist/` đã sẵn sàng để lưu trữ trên bất kỳ web server tĩnh nào.

---

## 🌐 Hướng Dẫn Triển Khai Lên GitHub Pages (Tự Động)

Dự án đã được tích hợp sẵn tệp cấu hình CI/CD tại `.github/workflows/deploy.yml`:

1. **Khởi tạo Git repo và push lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of PyMaster"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
   git push -u origin main
   ```

2. **Kích hoạt GitHub Pages**:
   - Truy cập vào repo trên GitHub: **Settings** -> **Pages**.
   - Tại mục **Build and deployment** -> **Source**: Chọn **GitHub Actions**.

3. Mỗi khi bạn push commit mới lên nhánh `main`, GitHub Actions sẽ tự động biên dịch và phát hành website lên địa chỉ:
   `https://<tai-khoan-cua-ban>.github.io/<ten-repo>/`

---

## 📁 Cấu Trúc Thư Mục

```text
pymaster/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow tự động deploy Pages
├── src/
│   ├── components/
│   │   ├── CelebrationModal.tsx# Modal chúc mừng + pháo hoa confetti
│   │   ├── ConsolePanel.tsx    # Terminal stdout/stderr + Kết quả Test Cases
│   │   ├── EditorPanel.tsx     # Monaco Editor + Action Bar + Hotkeys
│   │   ├── Header.tsx          # Thanh tiêu đề, thanh tiến độ, reset code
│   │   ├── ProblemPanel.tsx    # Tab Lý thuyết, Thử thách, Gợi ý, Lời giải
│   │   ├── Sidebar.tsx         # Drawer danh sách Module & Bài học
│   │   └── SplitLayout.tsx     # Layout chia đôi có thể kéo dãn kích thước
│   ├── data/
│   │   └── curriculum.ts       # 5 modules, 12 bài học bản chất & test cases
│   ├── hooks/
│   │   └── usePyodide.ts       # React Hook điều khiển Pyodide Worker & Timeout
│   ├── workers/
│   │   └── pyodide.worker.ts   # Web Worker chạy Pyodide WebAssembly & Grader
│   ├── types.ts                # TypeScript interfaces cho toàn bộ hệ thống
│   ├── App.tsx                 # Root application kết nối state & storage
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind CSS & Markdown theme
├── index.html                  # HTML entry point với font Inter & JetBrains Mono
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts              # Cấu hình base: './' tương thích mọi subpath Pages
```

---

## 🛠️ Công Nghệ Sử Dụng
- **React 18** + **Vite 6** + **TypeScript**
- **Monaco Editor** (`@monaco-editor/react`)
- **Pyodide v0.26.1** (CPython WebAssembly)
- **Tailwind CSS** + **Lucide Icons**
- **Framer Motion** + **Canvas Confetti**
