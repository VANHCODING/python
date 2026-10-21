import { Module } from '../types';

export const CURRICULUM: Module[] = [
  {
    id: 'module-1',
    order: 1,
    title: 'Module 1: Bản chất Biến & Kiểu dữ liệu',
    description: 'Hiểu cội nguồn mô hình bộ nhớ của Python: Biến là nhãn dán, kiểu dữ liệu nguyên thủy và F-string.',
    icon: 'Box',
    lessons: [
      {
        id: 'lesson-1',
        moduleId: 'module-1',
        order: 1,
        title: 'Bài 1: Biến không phải chiếc hộp - Mô hình Nhãn dán',
        summary: 'Hiểu cơ chế Name Binding và con trỏ vùng nhớ trong CPython.',
        concept: 'Name Binding & Object Reference',
        theoryMarkdown: `### 🧠 Bản chất: Biến trong Python là "Nhãn dán" (Name Tag), không phải "Chiếc hộp"

Hầu hết các ngôn ngữ như C, C++ hay Java coi biến là một **ô nhớ cố định** (chiếc hộp) chứa giá trị bên trong:
\`\`\`text
[ C / Java ]: int a = 5;  ==>  Ô nhớ 0x7FFF chứa trực tiếp giá trị 5
\`\`\`

Trong **Python (CPython)**, mọi thứ đều là **Đối tượng (Object)** nằm trên vùng nhớ Heap. Biến thực chất chỉ là một **chiếc nhãn (Reference Pointer)** được dán vào đối tượng:

\`\`\`text
a = 5     ==>  Tạo Object(5) tại 0x100A, dán nhãn "a" vào đó.
b = a     ==>  Dán thêm nhãn "b" vào CÙNG Object(5) tại 0x100A!
\`\`\`

#### 🔬 Thí nghiệm với hàm \`id()\`:
Hàm \`id(x)\` trả về địa chỉ bộ nhớ thực tế của đối tượng mà biến đang trỏ tới:

\`\`\`python
x = 1000
y = x
print(id(x) == id(y)) # True: Cả 2 nhãn đang trỏ cùng 1 Object!

x = x + 1
print(x) # 1001
print(y) # 1000 (y vẫn trỏ vào Object(1000) cũ, x tạo Object mới 1001)
\`\`\`

> 💡 **Quy tắc vàng:** Gán \`b = a\` trong Python KHÔNG BAO GIỜ sao chép dữ liệu. Nó chỉ tạo thêm một con trỏ cùng trỏ tới một vùng nhớ!`,
        targetFunction: 'swap_values',
        starterCode: `# Thử thách: Viết hàm nhận vào 2 giá trị a và b
# Trả về một tuple đảo ngược vị trí của chúng: (b, a)
# Gợi ý: Python cho phép hoán đổi cực kỳ thanh lịch chỉ bằng 1 dòng!

def swap_values(a, b):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def swap_values(a, b):
    # Python hỗ trợ Tuple Unpacking thần thánh
    return b, a
`,
        hints: [
          'Trong Python, bạn có thể hoán đổi mà không cần biến tạm `temp`!',
          'Hãy thử cú pháp: `return b, a` (Python sẽ tự đóng gói thành tuple).',
        ],
        testCases: [
          {
            id: 'tc-1-1',
            description: 'Hoán đổi hai số nguyên 5 và 10',
            type: 'function',
            input: [5, 10],
            expected: [10, 5],
          },
          {
            id: 'tc-1-2',
            description: 'Hoán đổi chuỗi "Hello" và "Python"',
            type: 'function',
            input: ['Hello', 'Python'],
            expected: ['Python', 'Hello'],
          },
          {
            id: 'tc-1-3',
            description: 'Hoán đổi số âm và số 0',
            type: 'function',
            input: [-99, 0],
            expected: [0, -99],
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-2',
        moduleId: 'module-1',
        order: 2,
        title: 'Bài 2: Kiểu số & Phép toán (/, //, %)',
        summary: 'Phân biệt phép chia thực vs phép chia nguyên và ứng dụng tính BMI.',
        concept: 'Numeric Types & Arithmetic Precedence',
        theoryMarkdown: `### 🔢 Các phép toán số học cốt lõi trong Python

Python cung cấp 3 toán tử chia mà người mới rất dễ nhầm lẫn:

| Toán tử | Tên gọi | Bản chất kết quả | Ví dụ |
| :--- | :--- | :--- | :--- |
| \`/\` | Chia thực (True Division) | **Luôn luôn** trả về \`float\` | \`7 / 2 = 3.5\`, \`4 / 2 = 2.0\` |
| \`//\` | Chia nguyên (Floor Division) | Làm tròn xuống số nguyên gần nhất | \`7 // 2 = 3\`, \`-7 // 2 = -4\` |
| \`%\` | Chia lấy dư (Modulo) | Phần dư của phép chia | \`7 % 2 = 1\` |
| \`**\` | Lũy thừa (Power) | Tính $a^b$ | \`2 ** 3 = 8\` |

#### ⚠️ Cạm bẫy người mới:
- \`4 / 2\` ra \`2.0\` (float), không phải \`2\` (int).
- Để tính bình phương, dùng \`h ** 2\` chứ **không được dùng** \`h ^ 2\` (\`^\` là phép XOR bitwise!).

#### 📐 Công thức BMI (Body Mass Index):
$$\\text{BMI} = \\frac{\\text{cân nặng (kg)}}{\\text{chiều cao (m)}^2}$$`,
        targetFunction: 'calculate_bmi',
        starterCode: `# Thử thách: Viết hàm calculate_bmi(weight, height)
# - weight: cân nặng tính bằng kg (float hoặc int)
# - height: chiều cao tính bằng mét (float)
# Trả về chỉ số BMI làm tròn đến 2 chữ số thập phân (dùng hàm round(val, 2))

def calculate_bmi(weight, height):
    # Viết code ở đây
    pass
`,
        solutionCode: `def calculate_bmi(weight, height):
    bmi = weight / (height ** 2)
    return round(bmi, 2)
`,
        hints: [
          'Dùng `height ** 2` để tính bình phương chiều cao.',
          'Dùng `round(giá_trị, 2)` để làm tròn 2 chữ số thập phân.',
        ],
        testCases: [
          {
            id: 'tc-2-1',
            description: 'Người nặng 70kg, cao 1.75m',
            type: 'function',
            input: [70, 1.75],
            expected: 22.86,
          },
          {
            id: 'tc-2-2',
            description: 'Người nặng 50kg, cao 1.60m',
            type: 'function',
            input: [50, 1.6],
            expected: 19.53,
          },
          {
            id: 'tc-2-3',
            description: 'Test case ẩn: Người nặng 85kg, cao 1.82m',
            type: 'function',
            input: [85, 1.82],
            expected: 25.66,
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-3',
        moduleId: 'module-1',
        order: 3,
        title: 'Bài 3: Chuỗi (String), Slicing & F-String Thần Thánh',
        summary: 'Chuỗi là bất biến (immutable). Làm chủ Index âm, cắt chuỗi và format hiện đại.',
        concept: 'String Immutability & Slicing Syntax',
        theoryMarkdown: `### 📝 Chuỗi trong Python: Bất biến (Immutable) & Đầy quyền năng

Mỗi chuỗi trong Python là một chuỗi tuần tự các ký tự và **không thể sửa đổi tại chỗ**:
\`\`\`python
s = "Python"
# s[0] = "J" # ❌ LỖI: TypeError: 'str' object does not support item assignment
\`\`\`

#### 1. Cú pháp Slicing \`[start : stop : step]\`:
- \`s[0]\`: Ký tự đầu tiên (\`"P"\`)
- \`s[-1]\`: Ký tự cuối cùng (\`"n"\`) - Index âm đếm ngược từ phải qua trái!
- \`s[0:4]\`: Cắt từ 0 đến trước 4 (\`"Pyth"\`)
- \`s[::-1]\`: Đảo ngược chuỗi siêu nhanh! (\`"nohtyP"\`)

#### 2. F-String (Formatted String Literals - PEP 498):
Cách tốt nhất để nhúng biến vào chuỗi (Python 3.6+):
\`\`\`python
name = "An"
score = 9.5678
# Gắn chữ f trước dấu nháy kép:
msg = f"Học sinh {name} đạt {score:.1f} điểm" # "Học sinh An đạt 9.6 điểm"
\`\`\`

#### 3. Các hàm chuỗi thông dụng:
- \`.strip()\`: Xóa khoảng trắng thừa ở 2 đầu.
- \`.title()\`: Viết hoa chữ cái đầu mỗi từ (\`"nguyen van an".title() -> "Nguyen Van An"\`).
- \`.split()\`: Tách chuỗi thành danh sách.`,
        targetFunction: 'format_name_card',
        starterCode: `# Thử thách: Viết hàm format_name_card(raw_name, age)
# Yêu cầu:
# 1. raw_name có thể chứa khoảng trắng thừa ở 2 đầu, hãy xóa nó đi.
# 2. Viết hoa chữ cái đầu mỗi từ (Title Case).
# 3. Trả về chuỗi định dạng F-string: "Thẻ Học Viên: [Tên Đã Chuẩn Hóa] - [Tuổi] Tuổi"
# Ví dụ: format_name_card("  nguyen van an  ", 20) -> "Thẻ Học Viên: Nguyen Van An - 20 Tuổi"

def format_name_card(raw_name, age):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def format_name_card(raw_name, age):
    clean_name = raw_name.strip().title()
    return f"Thẻ Học Viên: {clean_name} - {age} Tuổi"
`,
        hints: [
          'Dùng `raw_name.strip()` để loại bỏ khoảng trắng thừa ở đầu và cuối.',
          'Dùng `.title()` để viết hoa chữ cái đầu của mỗi từ trong họ tên.',
          'Dùng f-string: `f"Thẻ Học Viên: {clean_name} - {age} Tuổi"`',
        ],
        testCases: [
          {
            id: 'tc-3-1',
            description: 'Tên có khoảng trắng thừa 2 đầu',
            type: 'function',
            input: ['  nguyen van an  ', 20],
            expected: 'Thẻ Học Viên: Nguyen Van An - 20 Tuổi',
          },
          {
            id: 'tc-3-2',
            description: 'Tên viết thường toàn bộ',
            type: 'function',
            input: ['le thi hoa', 18],
            expected: 'Thẻ Học Viên: Le Thi Hoa - 18 Tuổi',
          },
          {
            id: 'tc-3-3',
            description: 'Test case ẩn: Tên 1 từ viết hoa lộn xộn',
            type: 'function',
            input: ['  tRuOnG   ', 25],
            expected: 'Thẻ Học Viên: Truong - 25 Tuổi',
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    id: 'module-2',
    order: 2,
    title: 'Module 2: Rẽ nhánh & Tư duy Logic',
    description: 'Chinh phục Boolean, Truthy/Falsy, Toán tử ngắn mạch và cấu trúc if-elif-else.',
    icon: 'GitFork',
    lessons: [
      {
        id: 'lesson-4',
        moduleId: 'module-2',
        order: 1,
        title: 'Bài 4: Boolean, Truthy/Falsy & Short-Circuit',
        summary: 'Hiểu bản chất giá trị nào là Sai trong Python và cơ chế đánh giá ngắn mạch.',
        concept: 'Truthy & Falsy Values in Python',
        theoryMarkdown: `### 🎯 Bản chất Truthy và Falsy trong Python

Trong Python, mọi đối tượng đều có thể được ép về kiểu Boolean trong biểu thức điều kiện (\`if\`).

#### ❌ Các giá trị Falsy (coi như False):
- Số: \`0\`, \`0.0\`, \`0j\`
- Rỗng: Chuỗi rỗng \`""\`, List rỗng \`[]\`, Tuple rỗng \`()\`, Dict rỗng \`{}\`, Set rỗng \`set()\`
- Hằng số: \`None\`, \`False\`

👉 **Tất cả các giá trị còn lại đều là Truthy (coi như True)!**

\`\`\`python
items = []
# Cách viết "chuẩn Pythonic" (Pythonic way):
if not items:
    print("Danh sách đang rỗng!") # Gọn hơn viết if len(items) == 0 rất nhiều!
\`\`\`

#### ⚡ Cơ chế ngắn mạch (Short-Circuit Evaluation):
- \`A and B\`: Nếu A là False, Python dừng ngay lập tức và trả về A (không thèm đọc B).
- \`A or B\`: Nếu A là True, Python dừng ngay lập tức và trả về A.

#### 📅 Quy tắc kiểm tra Năm Nhuận (Leap Year):
Một năm là năm nhuận nếu:
1. Chia hết cho 4 VÀ không chia hết cho 100, **HOẶC**
2. Chia hết cho 400.`,
        targetFunction: 'is_leap_year',
        starterCode: `# Thử thách: Viết hàm is_leap_year(year)
# Trả về True nếu year là năm nhuận, ngược lại trả về False
# Công thức: (chia hết cho 4 VÀ không chia hết cho 100) HOẶC (chia hết cho 400)

def is_leap_year(year):
    # Viết code ở đây
    pass
`,
        solutionCode: `def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
`,
        hints: [
          'Dùng toán tử chia lấy dư `%`: `year % 4 == 0` kiểm tra chia hết cho 4.',
          'Kết hợp toán tử `and`, `or`, `!=`: `(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)`.',
        ],
        testCases: [
          {
            id: 'tc-4-1',
            description: 'Năm 2024 (chia hết cho 4, không chia hết cho 100)',
            type: 'function',
            input: [2024],
            expected: true,
          },
          {
            id: 'tc-4-2',
            description: 'Năm 1900 (chia hết cho 100 nhưng không chia hết cho 400)',
            type: 'function',
            input: [1900],
            expected: false,
          },
          {
            id: 'tc-4-3',
            description: 'Năm 2000 (chia hết cho 400 -> Năm nhuận đặc biệt)',
            type: 'function',
            input: [2000],
            expected: true,
          },
          {
            id: 'tc-4-4',
            description: 'Test case ẩn: Năm 2023 (năm bình thường)',
            type: 'function',
            input: [2023],
            expected: false,
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-5',
        moduleId: 'module-2',
        order: 2,
        title: 'Bài 5: if - elif - else & Thụt lề (Indentation)',
        summary: 'Kiểm soát luồng thực thi và phân loại tam giác dựa trên độ dài 3 cạnh.',
        concept: 'Conditional Branches & Indentation Blocks',
        theoryMarkdown: `### 🌲 Luồng điều khiển: if - elif - else

Không giống như C/C++ hay Java dùng cặp ngoặc nhọn \`{ }\` để gói khối lệnh, **Python dùng Thụt lề (Indentation)**.

\`\`\`python
if condition_1:
    # Khối lệnh 1 (thụt vào 4 dấu cách)
    do_something()
elif condition_2:
    # Khối lệnh 2
    do_other_thing()
else:
    # Khối lệnh mặc định
    fallback()
\`\`\`

#### ⚠️ Lưu ý sống còn về Thụt lề:
- Tuyệt đối không trộn lẫn dấu Tab và dấu Phím cách (Space). Khuyên dùng **4 dấu phím cách**.
- Sau \`if\`, \`elif\`, \`else\` **bắt buộc phải có dấu hai chấm \`:\`**.

#### 📐 Bài toán: Phân loại Tam giác
Cho 3 cạnh dương $a, b, c$:
1. **Kiểm tra hợp lệ:** Ba cạnh lập thành tam giác khi tổng 2 cạnh bất kỳ lớn hơn cạnh còn lại:
   $$a + b > c \\quad \\text{và} \\quad a + c > b \\quad \\text{và} \\quad b + c > a$$
   Nếu không thỏa, trả về \`"Khong phai tam giac"\`.
2. **Tam giác đều (Equilateral):** Cả 3 cạnh bằng nhau ($a = b = c$) -> Trả về \`"Tam giac deu"\`.
3. **Tam giác cân (Isosceles):** Có ít nhất 2 cạnh bằng nhau ($a = b$ hoặc $b = c$ hoặc $a = c$) -> Trả về \`"Tam giac can"\`.
4. **Tam giác thường (Scalene):** Các trường hợp còn lại -> Trả về \`"Tam giac thuong"\`.`,
        targetFunction: 'classify_triangle',
        starterCode: `# Thử thách: Viết hàm classify_triangle(a, b, c)
# Trả về một trong các chuỗi sau:
# - "Khong phai tam giac" (nếu không thoả bất đẳng thức tam giác hoặc cạnh <= 0)
# - "Tam giac deu" (3 cạnh bằng nhau)
# - "Tam giac can" (2 cạnh bằng nhau)
# - "Tam giac thuong" (3 cạnh khác nhau)

def classify_triangle(a, b, c):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def classify_triangle(a, b, c):
    if a <= 0 or b <= 0 or c <= 0:
        return "Khong phai tam giac"
    if not (a + b > c and a + c > b and b + c > a):
        return "Khong phai tam giac"
    if a == b == c:
        return "Tam giac deu"
    if a == b or b == c or a == c:
        return "Tam giac can"
    return "Tam giac thuong"
`,
        hints: [
          'Kiểm tra điều kiện tam giác hợp lệ đầu tiên: `a + b > c and a + c > b and b + c > a`.',
          'Python hỗ trợ so sánh liên hoàn: `if a == b == c:` để kiểm tra tam giác đều.',
          'Kiểm tra tam giác đều trước khi kiểm tra tam giác cân!',
        ],
        testCases: [
          {
            id: 'tc-5-1',
            description: 'Tam giác đều 5, 5, 5',
            type: 'function',
            input: [5, 5, 5],
            expected: 'Tam giac deu',
          },
          {
            id: 'tc-5-2',
            description: 'Tam giác cân 5, 5, 8',
            type: 'function',
            input: [5, 5, 8],
            expected: 'Tam giac can',
          },
          {
            id: 'tc-5-3',
            description: 'Tam giác thường 3, 4, 5',
            type: 'function',
            input: [3, 4, 5],
            expected: 'Tam giac thuong',
          },
          {
            id: 'tc-5-4',
            description: 'Không phải tam giác: 1, 2, 5 (1 + 2 < 5)',
            type: 'function',
            input: [1, 2, 5],
            expected: 'Khong phai tam giac',
          },
        ],
      },
    ],
  },
  {
    id: 'module-3',
    order: 3,
    title: 'Module 3: Vòng lặp & Luồng thực thi',
    description: 'Bản chất vòng lặp for với range(), vòng lặp while, break, continue và chống lặp vô tận.',
    icon: 'Repeat',
    lessons: [
      {
        id: 'lesson-6',
        moduleId: 'module-3',
        order: 1,
        title: 'Bài 6: Vòng lặp for & Bản chất range()',
        summary: 'Vòng lặp for trong Python là một bộ duyệt (Iterator). Ứng dụng đếm số nguyên tố.',
        concept: 'Iterables & Lazy Evaluation of range()',
        theoryMarkdown: `### 🔄 Bản chất vòng lặp \`for\` trong Python

Khác với \`for (int i=0; i<n; i++)\` trong C++, vòng lặp \`for\` của Python thực chất là **ForEach**: duyệt qua từng phần tử của một đối tượng có thể lặp (Iterable).

\`\`\`python
for char in "PYTHON":
    print(char)
\`\`\`

#### ⚙️ Hàm \`range(start, stop, step)\` hoạt động thế nào?
- \`range()\` **không** tạo sẵn một danh sách trong RAM (tránh tốn bộ nhớ).
- Nó là một đối tượng tạo số "lười" (lazy generator), chỉ sinh số tiếp theo khi được yêu cầu!
- \`range(5)\`: sinh $0, 1, 2, 3, 4$ (dừng trước 5).
- \`range(2, 10, 2)\`: sinh $2, 4, 6, 8$.

#### 🔢 Số nguyên tố (Prime Number):
Số nguyên tố là số nguyên lớn hơn 1, chỉ chia hết cho 1 và chính nó ($2, 3, 5, 7, 11, ...$).
Để kiểm tra $x$ có phải số nguyên tố không:
- Nếu $x < 2$: không phải.
- Duyệt từ $2$ đến $\\lfloor\\sqrt{x}\\rfloor$: nếu $x$ chia hết cho bất kỳ số nào thì không phải số nguyên tố.`,
        targetFunction: 'count_primes_up_to',
        starterCode: `# Thử thách: Viết hàm count_primes_up_to(n)
# Đếm xem có bao nhiêu số nguyên tố trong khoảng từ 2 đến n (bao gồm cả n).
# Ví dụ: count_primes_up_to(10) -> 4 (các số: 2, 3, 5, 7)

def count_primes_up_to(n):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def count_primes_up_to(n):
    if n < 2:
        return 0
    count = 0
    for num in range(2, n + 1):
        is_prime = True
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            count += 1
    return count
`,
        hints: [
          'Bạn có thể viết một vòng lặp ngoài duyệt từ 2 đến `n + 1`.',
          'Vòng lặp trong kiểm tra xem `num` có chia hết cho số nào từ 2 đến căn bậc hai của `num` không (`int(num ** 0.5) + 1`).',
          'Dùng `break` để thoát vòng lặp trong ngay khi phát hiện ước số.',
        ],
        testCases: [
          {
            id: 'tc-6-1',
            description: 'Số nguyên tố đến 10 -> [2, 3, 5, 7] = 4 số',
            type: 'function',
            input: [10],
            expected: 4,
          },
          {
            id: 'tc-6-2',
            description: 'Số nguyên tố đến 20 -> 8 số',
            type: 'function',
            input: [20],
            expected: 8,
          },
          {
            id: 'tc-6-3',
            description: 'Test case n = 1 (không có số nguyên tố)',
            type: 'function',
            input: [1],
            expected: 0,
          },
          {
            id: 'tc-6-4',
            description: 'Test case ẩn: n = 50',
            type: 'function',
            input: [50],
            expected: 15,
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-7',
        moduleId: 'module-3',
        order: 2,
        title: 'Bài 7: Vòng lặp while & Phòng chống lặp vô tận',
        summary: 'Điều kiện lặp, lệnh break, continue và thuật toán tách chữ số.',
        concept: 'While Loops & Infinite Loop Prevention',
        theoryMarkdown: `### 🔁 Vòng lặp \`while\` & Nguy cơ lặp vô tận (Infinite Loop)

Vòng lặp \`while\` tiếp tục thực hiện khối lệnh chừng nào điều kiện còn là \`True\`:

\`\`\`python
count = 3
while count > 0:
    print(count)
    count -= 1 # ⚠️ QUAN TRỌNG: Phải cập nhật biến điều kiện để tiến tới điểm dừng!
\`\`\`

#### 💣 Tại sao trình duyệt bị treo khi lỡ viết \`while True\`?
Nếu không có lệnh \`break\` hoặc điều kiện dừng không bao giờ đạt được, CPU sẽ quay vòng $100\\%$ công suất.
*(Trên nền tảng PyMaster này, chúng tôi đã tích hợp Web Worker ngắt tự động sau 8s để bảo vệ trình duyệt của bạn!)*

#### 🛠️ Kỹ thuật tách từng chữ số của một số nguyên:
Để tính tổng các chữ số của một số $N$:
1. Lấy chữ số tận cùng: \`last_digit = n % 10\`
2. Cắt bỏ chữ số tận cùng: \`n = n // 10\`
3. Lặp lại chừng nào \`n > 0\`.`,
        targetFunction: 'sum_of_digits',
        starterCode: `# Thử thách: Viết hàm sum_of_digits(n)
# Nhận vào số nguyên dương n, tính tổng các chữ số của nó bằng vòng lặp while.
# Ví dụ: sum_of_digits(1234) -> 1 + 2 + 3 + 4 = 10
# Ví dụ: sum_of_digits(905) -> 9 + 0 + 5 = 14

def sum_of_digits(n):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def sum_of_digits(n):
    n = abs(n)
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total
`,
        hints: [
          'Dùng `n % 10` để lấy chữ số cuối cùng.',
          'Dùng `n = n // 10` để loại bỏ chữ số cuối cùng đó đi.',
          'Cộng dồn vào biến `total` bên trong vòng lặp `while n > 0:`.',
        ],
        testCases: [
          {
            id: 'tc-7-1',
            description: 'Số 1234 -> 1+2+3+4 = 10',
            type: 'function',
            input: [1234],
            expected: 10,
          },
          {
            id: 'tc-7-2',
            description: 'Số 905 -> 9+0+5 = 14',
            type: 'function',
            input: [905],
            expected: 14,
          },
          {
            id: 'tc-7-3',
            description: 'Số có 1 chữ số: 7 -> 7',
            type: 'function',
            input: [7],
            expected: 7,
          },
          {
            id: 'tc-7-4',
            description: 'Test case ẩn: Số lớn 99999 -> 45',
            type: 'function',
            input: [99999],
            expected: 45,
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    order: 4,
    title: 'Module 4: Cấu trúc dữ liệu nền tảng',
    description: 'Làm chủ List (Mutable), Tuple & Set (Bất biến, tra cứu O(1)) và Dictionary (Bảng băm).',
    icon: 'Layers',
    lessons: [
      {
        id: 'lesson-8',
        moduleId: 'module-4',
        order: 1,
        title: 'Bài 8: List & Bản chất Tính khả biến (Mutable)',
        summary: 'Tại sao thay đổi b lại làm thay đổi a? Con trỏ tham chiếu trong List.',
        concept: 'Mutable vs Immutable & Memory References in Lists',
        theoryMarkdown: `### 📦 Danh sách (List): Đối tượng có thể thay đổi (Mutable)

List trong Python là một mảng động chứa **các con trỏ tham chiếu** đến các đối tượng khác.

#### 🚨 Cú lừa kinh điển:
\`\`\`python
a = [1, 2, 3]
b = a          # b và a CÙNG trỏ vào một vùng nhớ List!
b.append(99)

print(a)       # 👉 [1, 2, 3, 99] -- a cũng bị thay đổi!
\`\`\`

Để tạo một bản sao độc lập, bạn phải clone:
\`\`\`python
b = a.copy()   # hoặc b = a[:]
b.append(100)  # a sẽ không bị ảnh hưởng
\`\`\`

#### 🚀 Thao tác List thường dùng:
- \`nums.append(x)\`: Thêm $x$ vào cuối (độ phức tạp $O(1)$).
- \`len(nums)\`: Độ dài list ($O(1)$).
- \`nums.count(x)\`: Đếm số lần xuất hiện của $x$.
- \`x in nums\`: Kiểm tra $x$ có trong list không (độ phức tạp $O(N)$).`,
        targetFunction: 'find_single_number',
        starterCode: `# Thử thách: Viết hàm find_single_number(nums)
# Trong danh sách nums, mọi phần tử đều xuất hiện 2 lần, CHỈ CÓ DUY NHẤT 1 phần tử xuất hiện 1 lần.
# Hãy tìm và trả về phần tử cô đơn đó!
# Ví dụ: find_single_number([2, 2, 1]) -> 1
# Ví dụ: find_single_number([4, 1, 2, 1, 2]) -> 4

def find_single_number(nums):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def find_single_number(nums):
    # Cách 1: Dùng phép XOR (O(N) thời gian, O(1) bộ nhớ)
    result = 0
    for num in nums:
        result ^= num
    return result
`,
        hints: [
          'Cách đơn giản: dùng `nums.count(x)` cho từng số và trả về số có count == 1.',
          'Cách đẳng cấp lập trình viên: Phép toán XOR `^` có tính chất `a ^ a = 0` và `a ^ 0 = a`!',
        ],
        testCases: [
          {
            id: 'tc-8-1',
            description: '[2, 2, 1] -> Số 1',
            type: 'function',
            input: [[2, 2, 1]],
            expected: 1,
          },
          {
            id: 'tc-8-2',
            description: '[4, 1, 2, 1, 2] -> Số 4',
            type: 'function',
            input: [[4, 1, 2, 1, 2]],
            expected: 4,
          },
          {
            id: 'tc-8-3',
            description: 'Danh sách chỉ có 1 phần tử: [99] -> 99',
            type: 'function',
            input: [[99]],
            expected: 99,
          },
          {
            id: 'tc-8-4',
            description: 'Test case ẩn: Số âm [-1, -2, -1] -> -2',
            type: 'function',
            input: [[-1, -2, -1]],
            expected: -2,
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-9',
        moduleId: 'module-4',
        order: 2,
        title: 'Bài 9: Tuple & Set - Immutability và Tốc độ O(1)',
        summary: 'Set hoạt động trên bảng băm (Hash Table) giúp tìm kiếm tức thì.',
        concept: 'Hashable Objects, Sets & Big-O Speedup',
        theoryMarkdown: `### ⚡ So sánh List vs Tuple vs Set

| Đặc tính | List \`[]\` | Tuple \`()\` | Set \`{}\` |
| :--- | :--- | :--- | :--- |
| **Thay đổi (Mutable)** | Có (Mutable) | Không (Immutable) | Có (nhưng phần tử phải immutable) |
| **Thứ tự (Ordered)** | Có | Có | Không đảm bảo thứ tự |
| **Trùng lặp (Duplicate)**| Cho phép | Cho phép | **Không trùng lặp (duy nhất)** |
| **Kiểm tra \`x in coll\`** | Chậm: $O(N)$ | Chậm: $O(N)$ | **Siêu tốc: $O(1)$** |

#### 💡 Tại sao Set lại tra cứu $O(1)$?
Set sử dụng cơ chế **Hash Table**. Khi bạn tìm \`x in my_set\`, Python tính mã băm \`hash(x)\` để nhảy thẳng đến ô nhớ chứa phần tử mà không cần duyệt từ đầu đến cuối như List!

#### 🤝 Các phép toán tập hợp cực mạnh của Set:
\`\`\`python
a = {1, 2, 3}
b = {2, 3, 4}

print(a & b)  # Phép giao (Intersection): {2, 3}
print(a | b)  # Phép hợp (Union): {1, 2, 3, 4}
print(a - b)  # Phép hiệu: {1}
\`\`\``,
        targetFunction: 'find_common_elements',
        starterCode: `# Thử thách: Viết hàm find_common_elements(list1, list2)
# Tìm các phần tử xuất hiện ở CẢ HAI danh sách.
# Kết quả trả về phải là một List đã được sắp xếp tăng dần và không chứa trùng lặp.
# Ví dụ: find_common_elements([1, 2, 2, 3], [2, 3, 4]) -> [2, 3]

def find_common_elements(list1, list2):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def find_common_elements(list1, list2):
    common_set = set(list1) & set(list2)
    return sorted(list(common_set))
`,
        hints: [
          'Chuyển đổi 2 list thành set bằng `set(list1)` và `set(list2)`.',
          'Dùng toán tử giao `&` giữa hai set: `set1 & set2`.',
          'Chuyển kết quả về list và dùng hàm `sorted(...)` để sắp xếp tăng dần.',
        ],
        testCases: [
          {
            id: 'tc-9-1',
            description: '[1, 2, 2, 3] và [2, 3, 4] -> [2, 3]',
            type: 'function',
            input: [[1, 2, 2, 3], [2, 3, 4]],
            expected: [2, 3],
          },
          {
            id: 'tc-9-2',
            description: 'Hai danh sách không có phần tử chung',
            type: 'function',
            input: [[1, 2, 3], [4, 5, 6]],
            expected: [],
          },
          {
            id: 'tc-9-3',
            description: 'Test case ẩn: Danh sách chứa số âm và trùng lặp nhiều',
            type: 'function',
            input: [[-5, -1, 0, 0, 10], [-1, 2, 10, 10]],
            expected: [-1, 10],
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-10',
        moduleId: 'module-4',
        order: 3,
        title: 'Bài 10: Dictionary - Cặp Key-Value & Cơ chế Băm',
        summary: 'Cấu trúc dữ liệu quan trọng nhất Python. Ứng dụng đếm tần suất từ.',
        concept: 'Dictionary & Hash Map Key-Value Store',
        theoryMarkdown: `### 📖 Dictionary (Từ điển): "Trái tim" của Python

Trong Python, Dictionary lưu trữ dữ liệu dưới dạng các cặp \`key: value\`.

\`\`\`python
student = {
    "name": "Bảo An",
    "age": 20,
    "major": "Computer Science"
}
\`\`\`

#### 🔑 Bản chất của Key:
- Key phải là **Hashable (bất biến)**: chuỗi, số, tuple được phép làm key. List hoặc Dict **không** được phép làm key!
- Truy xuất giá trị theo key: \`student["name"]\` có độ phức tạp $O(1)$.

#### 🛡️ Thao tác an toàn với \`.get()\`:
Nếu truy xuất key không tồn tại bằng ngoặc vuông \`student["score"]\`, Python sẽ văng lỗi \`KeyError\`!
Hãy dùng phương thức \`.get()\`:
\`\`\`python
score = student.get("score", 0) # Nếu không có "score", trả về mặc định là 0
\`\`\`

#### 🔄 Duyệt qua Dictionary:
\`\`\`python
for key, value in student.items():
    print(f"{key}: {value}")
\`\`\``,
        targetFunction: 'word_frequency',
        starterCode: `# Thử thách: Viết hàm word_frequency(sentence)
# Nhận vào một câu văn bản (chuỗi).
# Trả về một Dictionary thống kê số lần xuất hiện của từng từ (không phân biệt hoa thường).
# Gợi ý: Chuyển chuỗi về chữ thường trước bằng .lower(), rồi dùng .split() để tách từ.
# Ví dụ: word_frequency("Python is great and python is easy")
# Kết quả: {"python": 2, "is": 2, "great": 1, "and": 1, "easy": 1}

def word_frequency(sentence):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def word_frequency(sentence):
    words = sentence.lower().split()
    counts = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    return counts
`,
        hints: [
          'Dùng `sentence.lower().split()` để có danh sách các từ viết thường.',
          'Dùng một dict rỗng `counts = {}`. Duyệt qua từng từ: `counts[w] = counts.get(w, 0) + 1`.',
        ],
        testCases: [
          {
            id: 'tc-10-1',
            description: '"Python is great and python is easy"',
            type: 'function',
            input: ['Python is great and python is easy'],
            expected: { python: 2, is: 2, great: 1, and: 1, easy: 1 },
          },
          {
            id: 'tc-10-2',
            description: 'Câu chỉ có 1 từ lặp lại: "code code CODE"',
            type: 'function',
            input: ['code code CODE'],
            expected: { code: 3 },
          },
          {
            id: 'tc-10-3',
            description: 'Test case ẩn: Chuỗi rỗng',
            type: 'function',
            input: [''],
            expected: {},
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    id: 'module-5',
    order: 5,
    title: 'Module 5: Hàm (Functions) & Tư duy tái sử dụng',
    description: 'Hàm với def, phân biệt return vs print, phạm vi biến Scope (LEGB) và bài toán Palindrome.',
    icon: 'Code2',
    lessons: [
      {
        id: 'lesson-11',
        moduleId: 'module-5',
        order: 1,
        title: 'Bài 11: Khai báo hàm, Return vs Print',
        summary: 'Hiểu sự khác biệt căn bản giữa việc hiển thị (print) và trả về kết quả (return).',
        concept: 'Function Signature, Return Values vs Side Effects',
        theoryMarkdown: `### 🛠️ Hàm trong Python & Cú sốc \`return\` vs \`print\`

Người mới học lập trình thường nhầm lẫn tai hại: **Tưởng rằng \`print()\` bên trong hàm là hàm đã trả về kết quả!**

\`\`\`python
def add_wrong(a, b):
    print(a + b) # Chỉ in ra màn hình console (Side Effect)!

res = add_wrong(3, 4) # Console in 7
print(res)            # 👉 In ra: None ! Vì hàm không hề return!
\`\`\`

#### 🎯 Quy tắc vàng:
- \`print()\`: Hiển thị văn bản cho người dùng đọc trên màn hình.
- \`return\`: Trao trả dữ liệu trở lại cho chương trình để lưu vào biến, tính toán tiếp hoặc truyền vào hàm khác.
- Nếu một hàm kết thúc mà không gặp câu lệnh \`return\`, Python sẽ tự động trả về giá trị \`None\`.

#### 🔄 Chuỗi đối xứng (Palindrome):
Một chuỗi là Palindrome nếu đọc xuôi hay đọc ngược đều giống hệt nhau (ví dụ: \`"radar"\`, \`"madam"\`).`,
        targetFunction: 'is_palindrome',
        starterCode: `# Thử thách: Viết hàm is_palindrome(s)
# Kiểm tra xem chuỗi s có phải là chuỗi đối xứng không (không phân biệt hoa/thường).
# Bỏ qua khoảng trắng khi kiểm tra.
# Trả về True nếu đối xứng, ngược lại trả về False.
# Ví dụ: is_palindrome("Radar") -> True
# Ví dụ: is_palindrome("hello") -> False
# Ví dụ: is_palindrome("A nut for a jar of tuna") -> True

def is_palindrome(s):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def is_palindrome(s):
    # Loại bỏ khoảng trắng và chuyển thành chữ thường
    cleaned = s.replace(" ", "").lower()
    return cleaned == cleaned[::-1]
`,
        hints: [
          'Dùng `s.replace(" ", "").lower()` để loại bỏ dấu cách và đưa về chữ thường.',
          'Dùng cú pháp cắt chuỗi `cleaned[::-1]` để đảo ngược chuỗi nhanh nhất.',
          'So sánh `cleaned == cleaned[::-1]`.',
        ],
        testCases: [
          {
            id: 'tc-11-1',
            description: '"Radar" (đối xứng không phân biệt hoa thường)',
            type: 'function',
            input: ['Radar'],
            expected: true,
          },
          {
            id: 'tc-11-2',
            description: '"hello" (không đối xứng)',
            type: 'function',
            input: ['hello'],
            expected: false,
          },
          {
            id: 'tc-11-3',
            description: '"A nut for a jar of tuna" (có khoảng trắng)',
            type: 'function',
            input: ['A nut for a jar of tuna'],
            expected: true,
          },
          {
            id: 'tc-11-4',
            description: 'Test case ẩn: Chuỗi 1 ký tự "a"',
            type: 'function',
            input: ['a'],
            expected: true,
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-12',
        moduleId: 'module-5',
        order: 2,
        title: 'Bài 12: Scope (Phạm vi biến LEGB) & Đệ quy',
        summary: 'Biến cục bộ (Local) vs Biến toàn cục (Global) và giải thuật Giai thừa.',
        concept: 'LEGB Scope Resolution & Call Stack in Recursion',
        theoryMarkdown: `### 🌐 Quy tắc phân giải phạm vi biến: LEGB

Khi bạn gọi tên một biến trong Python, trình thông dịch sẽ tìm kiếm theo thứ tự ưu tiên **LEGB**:
1. **L (Local):** Bên trong hàm hiện tại.
2. **E (Enclosing):** Bên trong hàm bao ngoài (nếu có hàm lồng nhau).
3. **G (Global):** Ở cấp cao nhất của file script.
4. **B (Built-in):** Các hàm tích hợp sẵn của Python (\`len\`, \`range\`, \`print\`).

\`\`\`python
x = 10 # Global

def my_func():
    x = 5 # Local: Tạo một biến x mới hoàn toàn trong phạm vi hàm!
    print("Trong hàm:", x) # 5

my_func()
print("Ngoài hàm:", x)     # 10 (Biến Global không bị thay đổi)
\`\`\`

#### 🪞 Đệ quy (Recursion):
Hàm đệ quy là hàm **tự gọi lại chính nó**. Mọi hàm đệ quy bắt buộc phải có 2 phần:
1. **Điều kiện dừng (Base Case):** Để dừng việc tự gọi lại, tránh tràn ngăn xếp (Stack Overflow).
2. **Bước đệ quy (Recursive Step):** Đưa bài toán về phiên bản nhỏ hơn.

Công thức tính giai thừa ($n!$):
- $0! = 1$
- $n! = n \\times (n - 1)!$`,
        targetFunction: 'factorial',
        starterCode: `# Thử thách: Viết hàm factorial(n)
# Tính giai thừa của số nguyên không âm n.
# Công thức: 0! = 1, 1! = 1, 5! = 5 * 4 * 3 * 2 * 1 = 120
# Bạn có thể dùng đệ quy hoặc vòng lặp for/while tuỳ ý.

def factorial(n):
    # Viết code của bạn ở đây
    pass
`,
        solutionCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
`,
        hints: [
          'Điều kiện dừng (Base case): Nếu `n <= 1`, trả về `1`.',
          'Bước đệ quy: Trả về `n * factorial(n - 1)`.',
          'Nếu dùng vòng lặp: Khởi tạo `res = 1`, lặp `for i in range(2, n + 1): res *= i`.',
        ],
        testCases: [
          {
            id: 'tc-12-1',
            description: 'Giai thừa của 5: 5! = 120',
            type: 'function',
            input: [5],
            expected: 120,
          },
          {
            id: 'tc-12-2',
            description: 'Giai thừa của 0: 0! = 1',
            type: 'function',
            input: [0],
            expected: 1,
          },
          {
            id: 'tc-12-3',
            description: 'Giai thừa của 1: 1! = 1',
            type: 'function',
            input: [1],
            expected: 1,
          },
          {
            id: 'tc-12-4',
            description: 'Test case ẩn: Giai thừa của 7: 7! = 5040',
            type: 'function',
            input: [7],
            expected: 5040,
            hidden: true,
          },
        ],
      },
    ],
  },
];
