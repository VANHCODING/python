import { Module } from '../types';

export const CURRICULUM: Module[] = [
  /* ==========================================================================
     MODULE 1: NHẬP MÔN & CÚ PHÁP CƠ BẢN (Asabeneh Day 1 - 4)
     Mục tiêu: Dành cho người chưa từng lập trình. KHÔNG dùng def hay return.
     ========================================================================== */
  {
    id: 'module-1',
    order: 1,
    title: 'Module 1: Nhập môn & Cú pháp cơ bản',
    description: 'Bắt đầu từ số 0: Câu lệnh print(), 4 kiểu dữ liệu nguyên thủy, khai báo biến, toán tử và chuỗi F-string.',
    icon: 'Box',
    lessons: [
      {
        id: 'lesson-1',
        moduleId: 'module-1',
        order: 1,
        title: 'Bài 1: Cú pháp cơ bản, Lệnh print() & Kiểu dữ liệu',
        summary: 'Câu lệnh đầu tiên print(), 4 kiểu dữ liệu nguyên thủy và hàm type().',
        concept: 'Python Syntax, print() & Built-in Types',
        theoryMarkdown: `### 🐍 Chào mừng bạn đến với Python! (Asabeneh Day 1)

Python là ngôn ngữ lập trình thân thiện nhất thế giới nhờ cú pháp **trong sáng, dễ đọc như văn phong tiếng Anh**. 
Khác với C, C++ hay Java đòi hỏi khai báo hàm \`main()\` và dấu chấm phẩy \`;\`, trong Python bạn có thể bắt đầu ngay lập tức!

#### 📢 1. Câu lệnh đầu tiên: \`print()\`
Hàm \`print()\` dùng để xuất thông tin ra màn hình:
\`\`\`python
print("Hello, World!")       # In chuỗi văn bản
print(2026)                  # In một con số
print("Năm sinh:", 2004)     # In nhiều giá trị cùng lúc (ngăn cách bởi dấu phẩy)
\`\`\`

#### 🧱 2. Bốn kiểu dữ liệu nguyên thủy cốt lõi:
| Kiểu dữ liệu | Tên trong Python | Ví dụ | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| Số nguyên | \`int\` | \`10\`, \`-5\`, \`0\` | Các số nguyên không có phần thập phân |
| Số thực | \`float\` | \`3.14\`, \`-0.5\` | Số có dấu chấm thập phân |
| Chuỗi văn bản | \`str\` | \`"Python"\`, \`'Code'\` | Chữ đặt trong cặp dấu nháy kép hoặc đơn |
| Đúng / Sai | \`bool\` | \`True\`, \`False\` | Giá trị logic (chữ T và F phải viết hoa) |

#### 🔬 3. Soi kiểu dữ liệu với hàm \`type()\`:
\`\`\`python
print(type(100))       # <class 'int'>
print(type("PyMaster"))# <class 'str'>
\`\`\`

> 💡 **Quy tắc vàng:** Python phân biệt hoa/thường cực kỳ nghiêm ngặt. Lệnh \`Print()\` hay \`PRINT()\` sẽ bị báo lỗi \`NameError\`. Hãy luôn viết thường: \`print()\`.`,
        starterCode: `# Bài 1: Lệnh in print() và tính toán đầu tiên
# Thử thách 1: Dùng lệnh print() in ra chính xác dòng chữ: Hello, Python!
# Thử thách 2: Dùng lệnh print() in ra kết quả của phép cộng: 15 + 25

# Hãy viết code của bạn ở bên dưới:
`,
        solutionCode: `print("Hello, Python!")
print(15 + 25)
`,
        hints: [
          'Dùng lệnh: `print("Hello, Python!")` (nhớ viết hoa H và P, có dấu chấm than !).',
          'Dùng lệnh: `print(15 + 25)` để Python tự động tính toán ra kết quả 40 và in ra màn hình.',
        ],
        testCases: [
          {
            id: 'tc-1-1',
            description: 'In dòng chữ "Hello, Python!" và kết quả phép tính 40',
            type: 'stdout',
            expected: 'Hello, Python!\n40',
          },
        ],
      },
      {
        id: 'lesson-2',
        moduleId: 'module-1',
        order: 2,
        title: 'Bài 2: Khai báo Biến & Bản chất Nhãn dán (Name Binding)',
        summary: 'Biến là gì? Bản chất con trỏ nhãn dán trong bộ nhớ CPython và quy tắc đặt tên chuẩn PEP 8.',
        concept: 'Variables & Name Tag Binding in Memory',
        theoryMarkdown: `### 🏷️ Biến trong Python là "Nhãn dán" (Name Tag)

Biến là tên dùng để lưu trữ và tham chiếu đến dữ liệu trong chương trình:

\`\`\`python
language = "Python"
year = 1991
is_awesome = True
\`\`\`

#### 🧠 Bản chất mô hình bộ nhớ CPython:
- Trong C/Java, biến là một **ô nhớ cố định (chiếc hộp)** chứa trực tiếp giá trị.
- Trong **Python**, mọi giá trị (\`"Python"\`, \`1991\`) đều là **Đối tượng (Object)** nằm trên vùng nhớ Heap.
- Biến (\`language\`, \`year\`) thực chất là **chiếc nhãn dán (Reference Pointer)** được dán vào đối tượng đó!

#### 📏 Quy tắc đặt tên biến chuẩn PEP 8:
- Viết bằng chữ thường, các từ cách nhau bởi dấu gạch dưới: \`first_name\`, \`total_score\` (\`snake_case\`).
- **Không** bắt đầu bằng chữ số (\`1name\` ❌).
- **Không** dùng ký tự đặc biệt (\`user-name\` ❌, \`user@age\` ❌).
- **Không** trùng với từ khóa của Python (\`if\`, \`for\`, \`class\` ❌).

#### ⚡ Gán nhiều biến cùng lúc (Multiple Assignment):
\`\`\`python
x, y = 10, 20      # x nhận 10, y nhận 20
x, y = y, x        # Hoán đổi giá trị cực nhanh chỉ bằng 1 dòng!
\`\`\``,
        starterCode: `# Bài 2: Khai báo biến và gán giá trị
# Thử thách:
# 1. Khai báo biến language có giá trị là chuỗi: "Python"
# 2. Khai báo biến release_year có giá trị là số nguyên: 1991
# 3. Khai báo biến is_popular có giá trị kiểu bool: True

# Viết code của bạn ở đây:
`,
        solutionCode: `language = "Python"
release_year = 1991
is_popular = True
`,
        hints: [
          'Gán chuỗi: `language = "Python"`.',
          'Gán số nguyên: `release_year = 1991`.',
          'Gán boolean: `is_popular = True` (chữ T viết hoa).',
        ],
        testCases: [
          {
            id: 'tc-2-1',
            description: 'Biến language phải mang giá trị chuỗi "Python"',
            type: 'variable',
            variable: 'language',
            expected: 'Python',
          },
          {
            id: 'tc-2-2',
            description: 'Biến release_year phải mang giá trị 1991',
            type: 'variable',
            variable: 'release_year',
            expected: 1991,
          },
          {
            id: 'tc-2-3',
            description: 'Biến is_popular phải là True',
            type: 'variable',
            variable: 'is_popular',
            expected: true,
          },
        ],
      },
      {
        id: 'lesson-3',
        moduleId: 'module-1',
        order: 3,
        title: 'Bài 3: Toán tử số học & Công thức tính toán',
        summary: 'Toán tử chia thực (/), chia nguyên (//), chia dư (%), lũy thừa (**) và tính chu vi/diện tích.',
        concept: 'Arithmetic Operators & Math Expressions',
        theoryMarkdown: `### 🔢 Các phép toán số học trong Python (Asabeneh Day 3)

| Toán tử | Tên gọi | Bản chất kết quả | Ví dụ |
| :--- | :--- | :--- | :--- |
| \`+\` | Cộng | Tổng | \`5 + 3 = 8\` |
| \`-\` | Trừ | Hiệu | \`10 - 4 = 6\` |
| \`*\` | Nhân | Tích | \`3 * 4 = 12\` |
| \`/\` | Chia thực | **Luôn luôn** trả về \`float\` | \`7 / 2 = 3.5\` |
| \`//\` | Chia nguyên | Làm tròn xuống số nguyên | \`7 // 2 = 3\` |
| \`%\` | Chia lấy dư | Phần dư của phép chia | \`7 % 2 = 1\` |
| \`**\` | Lũy thừa | Tính $a^b$ | \`2 ** 3 = 8\` |

#### ⚠️ Cạm bẫy người mới:
- \`4 / 2\` cho ra \`2.0\` (kiểu float), không phải \`2\` (int).
- Muốn tính bình phương, dùng \`x ** 2\` chứ **không** dùng \`x ^ 2\` (\`^\` là phép XOR bitwise!).

#### 📐 Bài toán thực tế:
Cho hình chữ nhật có \`length = 8\` và \`width = 5\`:
- Diện tích: $\\text{area} = \\text{length} \\times \\text{width}$
- Chu vi: $\\text{perimeter} = 2 \\times (\\text{length} + \\text{width})$`,
        starterCode: `# Bài 3: Tính toán với toán tử số học
length = 8
width = 5

# Thử thách:
# 1. Khai báo biến area tính diện tích hình chữ nhật (length nhân width)
# 2. Khai báo biến perimeter tính chu vi hình chữ nhật (2 nhân tổng length + width)

# Viết code tính toán ở dưới:
`,
        solutionCode: `length = 8
width = 5
area = length * width
perimeter = 2 * (length + width)
`,
        hints: [
          'Tính diện tích: `area = length * width`.',
          'Tính chu vi: `perimeter = 2 * (length + width)`.',
        ],
        testCases: [
          {
            id: 'tc-3-1',
            description: 'Kịch bản 1: length = 8, width = 5 -> area = 40, perimeter = 26',
            type: 'variable',
            mockVariables: { length: 8, width: 5 },
            expectedVariables: { area: 40, perimeter: 26 },
            expected: { area: 40, perimeter: 26 },
          },
          {
            id: 'tc-3-2',
            description: 'Kịch bản 2: length = 10, width = 3 -> area = 30, perimeter = 26',
            type: 'variable',
            mockVariables: { length: 10, width: 3 },
            expectedVariables: { area: 30, perimeter: 26 },
            expected: { area: 30, perimeter: 26 },
          },
          {
            id: 'tc-3-3',
            description: 'Kịch bản 3: length = 4, width = 4 -> area = 16, perimeter = 16',
            type: 'variable',
            mockVariables: { length: 4, width: 4 },
            expectedVariables: { area: 16, perimeter: 16 },
            expected: { area: 16, perimeter: 16 },
          },
        ],
      },
      {
        id: 'lesson-4',
        moduleId: 'module-1',
        order: 4,
        title: 'Bài 4: Chuỗi (Strings), Slicing & F-String Thần Thánh',
        summary: 'Chuỗi bất biến, chỉ số âm, cắt chuỗi [::-1] và nhúng biến hiện đại với F-string.',
        concept: 'String Operations, Slicing & F-String Formatting',
        theoryMarkdown: `### 📝 Làm chủ Chuỗi trong Python (Asabeneh Day 4)

Chuỗi là một tập hợp tuần tự các ký tự đặt trong dấu nháy kép hoặc nháy đơn.

#### 1. Nối chuỗi & Độ dài chuỗi \`len()\`:
\`\`\`python
first = "Python"
last = "Programming"
full = first + " " + last # "Python Programming"
print(len(full))          # 18 ký tự
\`\`\`

#### 2. F-String (Formatted String Literals - PEP 498):
Cách tốt nhất và thanh lịch nhất để nhúng biến vào chuỗi (Python 3.6+):
\`\`\`python
name = "Bảo An"
score = 9.5
msg = f"Học sinh {name} đạt {score} điểm!"
\`\`\`

#### 3. Cắt chuỗi (Slicing) \`[start : stop : step]\`:
\`\`\`python
s = "PYTHON"
print(s[0])     # 'P' (Ký tự đầu tiên, index đánh từ 0)
print(s[-1])    # 'N' (Ký tự cuối cùng, index âm đếm ngược!)
print(s[0:4])   # 'PYTH' (Cắt từ 0 đến trước 4)
print(s[::-1])  # 'NOHTYP' (Đảo ngược chuỗi siêu tốc!)
\`\`\``,
        starterCode: `# Bài 4: Chuỗi và F-string
student_name = "Hoang"
score = 10

# Thử thách:
# 1. Dùng F-string tạo biến card có nội dung: "Học viên: Hoang - Điểm: 10"
# 2. Tạo biến reversed_str đảo ngược chuỗi "PYTHON" bằng cú pháp slicing [::-1]

# Viết code của bạn ở đây:
`,
        solutionCode: `student_name = "Hoang"
score = 10
card = f"Học viên: {student_name} - Điểm: {score}"
reversed_str = "PYTHON"[::-1]
`,
        hints: [
          'Dùng F-string: `card = f"Học viên: {student_name} - Điểm: {score}"`.',
          'Đảo ngược chuỗi: `reversed_str = "PYTHON"[::-1]`.',
        ],
        testCases: [
          {
            id: 'tc-4-1',
            description: 'Biến card định dạng đúng F-string',
            type: 'variable',
            variable: 'card',
            expected: 'Học viên: Hoang - Điểm: 10',
          },
          {
            id: 'tc-4-2',
            description: 'Biến reversed_str đảo ngược chuỗi thành "NOHTYP"',
            type: 'variable',
            variable: 'reversed_str',
            expected: 'NOHTYP',
          },
        ],
      },
    ],
  },

  /* ==========================================================================
     MODULE 2: RẼ NHÁNH & TƯ DUY LOGIC (Asabeneh Day 9)
     Mục tiêu: Làm chủ toán tử logic, Truthy/Falsy và câu lệnh điều kiện if-elif-else.
     ========================================================================== */
  {
    id: 'module-2',
    order: 2,
    title: 'Module 2: Rẽ nhánh & Tư duy Logic',
    description: 'Chinh phục Boolean, Truthy/Falsy, Toán tử so sánh và cấu trúc rẽ nhánh if - elif - else.',
    icon: 'GitFork',
    lessons: [
      {
        id: 'lesson-5',
        moduleId: 'module-2',
        order: 1,
        title: 'Bài 5: Boolean, Toán tử So sánh & Logic (and, or, not)',
        summary: 'Toán tử so sánh (==, !=, <, >), logic Boolean (and, or, not), thứ tự ưu tiên và cơ chế ngắn mạch.',
        concept: 'Boolean Logic & Comparison Operators',
        theoryMarkdown: `### 🎯 Toán tử so sánh & Logic Boolean

Kiểu \`bool\` chỉ có 2 giá trị duy nhất: \`True\` (Đúng) hoặc \`False\` (Sai) — **bắt buộc viết hoa chữ cái đầu**!

#### ⚠️ Phân biệt sống còn: Toán tử Gán \`=\` và So sánh \`==\`
- Dấu bằng đơn \`=\` là **toán tử gán** (*assignment*): dùng để gán giá trị cho biến (Ví dụ: \`age = 20\`). Tuyệt đối không dùng để so sánh!
- Hai dấu bằng \`==\` là **toán tử so sánh bằng** (*equality*): dùng để kiểm tra xem 2 giá trị có bằng nhau hay không (Ví dụ: \`5 == 5\` cho ra \`True\`).

#### ⚖️ 1. Bảng toán tử so sánh chuẩn trong Python:
| Toán tử Python | Ý nghĩa | Lưu ý cú pháp | Ví dụ code | Kết quả |
| :---: | :--- | :--- | :--- | :---: |
| \`==\` | So sánh bằng nhau | Dùng hai dấu bằng \`==\`, KHÔNG dùng dấu đơn \`=\` | \`5 == 5\` | \`True\` |
| \`!=\` | So sánh khác nhau | KHÔNG dùng ký hiệu toán học \`≠\` | \`5 != 3\` | \`True\` |
| \`>\` | Lớn hơn | Lớn hơn nghiêm ngặt | \`10 > 5\` | \`True\` |
| \`<\` | Nhỏ hơn | Nhỏ hơn nghiêm ngặt | \`4 < 2\` | \`False\` |
| \`>=\` | Lớn hơn hoặc bằng | KHÔNG dùng ký hiệu toán học \`≥\` | \`18 >= 18\` | \`True\` |
| \`<=\` | Nhỏ hơn hoặc bằng | KHÔNG dùng ký hiệu toán học \`≤\` | \`15 <= 20\` | \`True\` |

> 🚨 **Cảnh báo lỗi cú pháp**: Trong code Python **hoàn toàn không có** các ký tự toán học như \`≠\`, \`≥\`, \`≤\`. Nếu viết vào trình soạn thảo, Python sẽ lập tức báo lỗi \`SyntaxError: invalid character\`. Hãy luôn gõ đúng chuẩn: \`!=\`, \`>=\`, \`<=\`.

#### 🔗 2. Các toán tử logic:
- \`and\`: Trả về \`True\` khi **CẢ HAI** vế đều là \`True\`.
- \`or\`: Trả về \`True\` khi **ÍT NHẤT MỘT** vế là \`True\`.
- \`not\`: Đảo ngược giá trị logic (\`not True\` thành \`False\`, \`not False\` thành \`True\`).

#### ⚡ 3. Thứ tự ưu tiên toán tử logic:
Khi kết hợp nhiều toán tử trong một biểu thức, Python ưu tiên tính:
$$\\text{not} \\quad > \\quad \\text{and} \\quad > \\quad \\text{or}$$
> 💡 **Kinh nghiệm lập trình (Best Practice)**: Hãy luôn dùng cặp ngoặc tròn \`( )\` để gom nhóm điều kiện (ví dụ: \`(has_ticket or is_vip) and is_adult\`). Cách này vừa giúp code sáng sủa, vừa tránh nhầm lẫn về thứ tự ưu tiên!

#### 🧠 4. Cơ chế ngắn mạch (Short-circuit Evaluation):
- \`and\` dừng kiểm tra ngay khi gặp vế đầu là \`False\` (vì biểu thức chắc chắn \`False\`).
- \`or\` dừng kiểm tra ngay khi gặp vế đầu là \`True\` (vì chỉ cần 1 vế đúng là cả biểu thức \`True\`).
- **Ứng dụng an toàn**: Giúp tránh lỗi sập chương trình. Ví dụ: \`user is not None and user.is_active\` sẽ không bao giờ bị lỗi \`AttributeError\` nếu \`user\` là \`None\`!

#### 🔍 5. Những cạm bẫy hay gặp:
- **So sánh chuỗi liên hoàn (Chained Comparison)**: Python cho phép viết cực kỳ toán học: \`18 <= age <= 60\` thay vì phải viết \`age >= 18 and age <= 60\`.
- **\`==\` khác với \`is\`**: \`==\` so sánh **giá trị** (\`[1, 2] == [1, 2]\` là \`True\`), còn \`is\` so sánh **định danh ô nhớ** (*identity*). Với \`None\`, chuẩn Python luôn dùng \`x is None\`.
- **Sai số số thực (Float Precision)**: Do biểu diễn nhị phân, \`0.1 + 0.2 == 0.3\` là \`False\`! Hãy dùng \`abs(a - b) < 1e-9\` khi so sánh số thực.`,
        starterCode: `# Bài 5: Biểu thức logic Boolean
age = 20
has_ticket = True
is_vip = False

# 💡 LƯU Ý QUAN TRỌNG VỀ HỆ THỐNG CHẤM:
# Đoạn code trên khởi tạo giá trị ban đầu để bạn chạy thử nghiệm (Ctrl+Enter).
# Khi bấm "Nộp bài & Chấm", hệ thống sẽ tự động nạp 4 kịch bản tuổi & vé khác nhau:
#   Test 1: age = 16, has_ticket = True, is_vip = False  -> is_adult: False, can_enter: False
#   Test 2: age = 25, has_ticket = False, is_vip = True   -> is_adult: True,  can_enter: True
#   Test 3: age = 30, has_ticket = False, is_vip = False  -> is_adult: True,  can_enter: False
#   Test 4: age = 20, has_ticket = True, is_vip = False   -> is_adult: True,  can_enter: True
# Vì vậy hãy viết biểu thức logic tổng quát theo tên biến, KHÔNG gán cứng True/False!

# Thử thách:
# 1. Khai báo biến is_adult kiểm tra xem age có lớn hơn hoặc bằng 18 không (dùng >=)
# 2. Khai báo biến can_enter: điều kiện vào cổng là (có vé has_ticket HOẶC là khách is_vip) VÀ phải là người lớn is_adult
# Gợi ý: Dùng ngoặc tròn (has_ticket or is_vip) and is_adult

# Viết code của bạn ở đây:
`,
        solutionCode: `age = 20
has_ticket = True
is_vip = False
is_adult = age >= 18
can_enter = (has_ticket or is_vip) and is_adult
`,
        hints: [
          'Kiểm tra tuổi: `is_adult = age >= 18`.',
          'Kết hợp or và and: `can_enter = (has_ticket or is_vip) and is_adult`. Nhớ đặt ngoặc `(has_ticket or is_vip)` để ưu tiên phép OR trước!',
        ],
        testCases: [
          {
            id: 'tc-5-1',
            description: 'Test 1: age = 16 (chưa đủ tuổi), has_ticket = True, is_vip = False',
            type: 'variable',
            mockVariables: { age: 16, has_ticket: true, is_vip: false },
            expectedVariables: { is_adult: false, can_enter: false },
            expected: { is_adult: false, can_enter: false },
          },
          {
            id: 'tc-5-2',
            description: 'Test 2: age = 25 (đủ tuổi), has_ticket = False, is_vip = True (khách VIP)',
            type: 'variable',
            mockVariables: { age: 25, has_ticket: false, is_vip: true },
            expectedVariables: { is_adult: true, can_enter: true },
            expected: { is_adult: true, can_enter: true },
          },
          {
            id: 'tc-5-3',
            description: 'Test 3: age = 30 (đủ tuổi), has_ticket = False, is_vip = False (không vé, không VIP)',
            type: 'variable',
            mockVariables: { age: 30, has_ticket: false, is_vip: false },
            expectedVariables: { is_adult: true, can_enter: false },
            expected: { is_adult: true, can_enter: false },
          },
          {
            id: 'tc-5-4',
            description: 'Test 4 (Mặc định): age = 20, has_ticket = True, is_vip = False',
            type: 'variable',
            mockVariables: { age: 20, has_ticket: true, is_vip: false },
            expectedVariables: { is_adult: true, can_enter: true },
            expected: { is_adult: true, can_enter: true },
          },
        ],
      },
      {
        id: 'lesson-6',
        moduleId: 'module-2',
        order: 2,
        title: 'Bài 6: Câu lệnh if - elif - else & Thụt lề (Indentation)',
        summary: 'Điều khiển luồng thực thi và quy tắc thụt lề 4 dấu cách bắt buộc trong Python.',
        concept: 'Conditional Branches & Indentation Blocks',
        theoryMarkdown: `### 🌲 Luồng điều khiển: if - elif - else

Không giống các ngôn ngữ dùng ngoặc nhọn \`{ }\`, **Python dùng Thụt lề (Indentation)** để phân định khối lệnh:

\`\`\`python
score = 8.5

if score >= 9.0:
    grade = "Xuất sắc"
elif score >= 8.0:
    grade = "Giỏi"
elif score >= 6.5:
    grade = "Khá"
elif score >= 5.0:
    grade = "Trung bình"
else:
    grade = "Yếu"
\`\`\`

#### ⚠️ Quy tắc sống còn về Thụt lề:
- Sau \`if\`, \`elif\`, \`else\` **bắt buộc phải có dấu hai chấm \`:\`**.
- Các câu lệnh bên trong khối phải thụt lề đều nhau (chuẩn là **4 dấu phím cách Space**).
- Khối lệnh \`elif\` chỉ được xét khi tất cả các điều kiện phía trên nó đều là \`False\`.`,
        starterCode: `# Bài 6: Phân loại điểm số với if - elif - else
score = 8.5
grade = ""

# Thử thách: Viết cấu trúc if - elif - else để gán giá trị cho biến grade:
# - Nếu score >= 9.0: grade = "Xuat sac"
# - Nếu score >= 8.0: grade = "Gioi"
# - Nếu score >= 6.5: grade = "Kha"
# - Nếu score >= 5.0: grade = "Trung binh"
# - Ngược lại: grade = "Yeu"

# Viết code rẽ nhánh ở đây:
`,
        solutionCode: `score = 8.5
if score >= 9.0:
    grade = "Xuat sac"
elif score >= 8.0:
    grade = "Gioi"
elif score >= 6.5:
    grade = "Kha"
elif score >= 5.0:
    grade = "Trung binh"
else:
    grade = "Yeu"
`,
        hints: [
          'Bắt đầu bằng: `if score >= 9.0: grade = "Xuat sac"`.',
          'Dùng `elif score >= 8.0:` ở dòng tiếp theo.',
          'Nhớ thụt vào 4 dấu cách cho các câu lệnh bên trong mỗi nhánh!',
        ],
        testCases: [
          {
            id: 'tc-6-1',
            description: 'Kịch bản 1: score = 8.5 -> grade = "Gioi"',
            type: 'variable',
            mockVariables: { score: 8.5 },
            expectedVariables: { grade: 'Gioi' },
            expected: 'Gioi',
          },
          {
            id: 'tc-6-2',
            description: 'Kịch bản 2: score = 9.5 -> grade = "Xuat sac"',
            type: 'variable',
            mockVariables: { score: 9.5 },
            expectedVariables: { grade: 'Xuat sac' },
            expected: 'Xuat sac',
          },
          {
            id: 'tc-6-3',
            description: 'Kịch bản 3: score = 6.8 -> grade = "Kha"',
            type: 'variable',
            mockVariables: { score: 6.8 },
            expectedVariables: { grade: 'Kha' },
            expected: 'Kha',
          },
          {
            id: 'tc-6-4',
            description: 'Kịch bản 4: score = 5.2 -> grade = "Trung binh"',
            type: 'variable',
            mockVariables: { score: 5.2 },
            expectedVariables: { grade: 'Trung binh' },
            expected: 'Trung binh',
          },
          {
            id: 'tc-6-5',
            description: 'Kịch bản 5: score = 3.5 -> grade = "Yeu"',
            type: 'variable',
            mockVariables: { score: 3.5 },
            expectedVariables: { grade: 'Yeu' },
            expected: 'Yeu',
          },
        ],
      },
    ],
  },

  /* ==========================================================================
     MODULE 3: VÒNG LẶP & LUỒNG THỰC THI (Asabeneh Day 10)
     Mục tiêu: Làm chủ lặp tuần tự với for và lặp theo điều kiện với while.
     ========================================================================== */
  {
    id: 'module-3',
    order: 3,
    title: 'Module 3: Vòng lặp & Luồng thực thi',
    description: 'Vòng lặp for duyệt tuần tự với range(), vòng lặp while, lệnh break, continue và chống lặp vô tận.',
    icon: 'Repeat',
    lessons: [
      {
        id: 'lesson-7',
        moduleId: 'module-3',
        order: 1,
        title: 'Bài 7: Vòng lặp for & Bản chất hàm range()',
        summary: 'Vòng lặp for thực chất là For-Each duyệt qua một chuỗi lặp (Iterable).',
        concept: 'For Loops & Generator-like range()',
        theoryMarkdown: `### 🔄 Bản chất vòng lặp \`for\` trong Python

Khác với \`for (int i=0; i<n; i++)\` trong C++, vòng lặp \`for\` của Python duyệt qua từng phần tử của một tập hợp:

\`\`\`python
for char in "PYTHON":
    print(char)
\`\`\`

#### ⚙️ Hàm sinh số \`range(start, stop, step)\`:
- \`range()\` **không** tạo sẵn toàn bộ các con số trong RAM (tránh tốn bộ nhớ).
- Nó là một đối tượng tạo số lười (lazy sequence), chỉ sinh số tiếp theo khi được duyệt!
- \`range(5)\`: sinh $0, 1, 2, 3, 4$ (dừng trước 5).
- \`range(1, 11)\`: sinh từ 1 đến 10.
- \`range(0, 10, 2)\`: sinh các số chẵn $0, 2, 4, 6, 8$.

#### 🧮 Kỹ thuật tính tổng tích lũy (Accumulator Pattern):
\`\`\`python
total = 0
for i in range(1, 6): # 1, 2, 3, 4, 5
    total += i        # total = total + i
print(total)          # 15
\`\`\``,
        starterCode: `# Bài 7: Vòng lặp for và hàm range()
# Thử thách:
# Khai báo biến total_sum = 0
# Dùng vòng lặp for và range() để tính tổng tất cả các số nguyên từ 1 đến 100 (bao gồm cả 100)
# Cộng dồn kết quả vào biến total_sum

# Viết code của bạn ở đây:
total_sum = 0
`,
        solutionCode: `total_sum = 0
for i in range(1, 101):
    total_sum += i
`,
        hints: [
          'Dùng `range(1, 101)` vì hàm `range` dừng lại trước giá trị stop (101).',
          'Trong vòng lặp: `total_sum += i`.',
        ],
        testCases: [
          {
            id: 'tc-7-1',
            description: 'Tổng các số từ 1 đến 100 phải bằng 5050',
            type: 'variable',
            variable: 'total_sum',
            expected: 5050,
          },
        ],
      },
      {
        id: 'lesson-8',
        moduleId: 'module-3',
        order: 2,
        title: 'Bài 8: Vòng lặp while & Phòng chống lặp vô tận',
        summary: 'Điều kiện dừng của while, lệnh break, continue và kỹ thuật tách chữ số.',
        concept: 'While Loops & Infinite Loop Prevention',
        theoryMarkdown: `### 🔁 Vòng lặp \`while\` & Nguy cơ Lặp vô tận (Infinite Loop)

Vòng lặp \`while\` tiếp tục thực hiện chừng nào điều kiện còn là \`True\`:

\`\`\`python
count = 3
while count > 0:
    print(count)
    count -= 1 # ⚠️ QUAN TRỌNG: Phải cập nhật biến điều kiện để tiến tới điểm dừng!
\`\`\`

#### 💣 Tại sao trình duyệt bị đơ khi lỡ viết \`while True\`?
Nếu điều kiện lặp luôn đúng và không có lệnh \`break\`, CPU sẽ quay vòng 100% công suất làm treo máy.
*(Hệ thống PyMaster tích hợp bộ đếm giờ tự ngắt sau 8 giây để bảo vệ trình duyệt của bạn!)*

#### 🛠️ Kỹ thuật tách từng chữ số của một số nguyên:
1. Lấy chữ số tận cùng: \`last_digit = n % 10\`
2. Cắt bỏ chữ số tận cùng: \`n = n // 10\`
3. Lặp lại chừng nào \`n > 0\`.`,
        starterCode: `# Bài 8: Vòng lặp while
n = 12345
digit_sum = 0

# Thử thách: Dùng vòng lặp while để tính tổng các chữ số của n (1 + 2 + 3 + 4 + 5 = 15)
# Gợi ý: Mỗi vòng lặp, cộng (n % 10) vào digit_sum, rồi cập nhật n = n // 10

# Viết code vòng lặp while ở đây:
`,
        solutionCode: `n = 12345
digit_sum = 0
while n > 0:
    digit_sum += n % 10
    n //= 10
`,
        hints: [
          'Điều kiện vòng lặp: `while n > 0:`.',
          'Lấy chữ số cuối: `digit_sum += n % 10`.',
          'Bỏ chữ số cuối: `n = n // 10`.',
        ],
        testCases: [
          {
            id: 'tc-8-1',
            description: 'Kịch bản 1: n = 12345 -> digit_sum = 15 (1 + 2 + 3 + 4 + 5)',
            type: 'variable',
            mockVariables: { n: 12345 },
            expectedVariables: { digit_sum: 15 },
            expected: 15,
          },
          {
            id: 'tc-8-2',
            description: 'Kịch bản 2: n = 902 -> digit_sum = 11 (9 + 0 + 2)',
            type: 'variable',
            mockVariables: { n: 902 },
            expectedVariables: { digit_sum: 11 },
            expected: 11,
          },
          {
            id: 'tc-8-3',
            description: 'Kịch bản 3: n = 7 -> digit_sum = 7',
            type: 'variable',
            mockVariables: { n: 7 },
            expectedVariables: { digit_sum: 7 },
            expected: 7,
          },
        ],
      },
    ],
  },

  /* ==========================================================================
     MODULE 4: CẤU TRÚC DỮ LIỆU NỀN TẢNG (Asabeneh Day 5 - 8)
     Mục tiêu: Làm chủ List (Khả biến), Tuple, Set (Tra cứu O(1)) và Dictionary (Bảng băm).
     ========================================================================== */
  {
    id: 'module-4',
    order: 4,
    title: 'Module 4: Cấu trúc dữ liệu nền tảng',
    description: 'Danh sách List (Mutable), Tuple & Set (Bất biến, tra cứu O(1)) và Từ điển Dictionary (Bảng băm).',
    icon: 'Layers',
    lessons: [
      {
        id: 'lesson-9',
        moduleId: 'module-4',
        order: 1,
        title: 'Bài 9: List & Tính khả biến (Mutable)',
        summary: 'List trong Python là mảng động các tham chiếu. Phương thức append, pop, copy.',
        concept: 'Mutable Lists & Dynamic Arrays',
        theoryMarkdown: `### 📦 Danh sách (List): Đối tượng có thể thay đổi (Mutable)

List trong Python là một mảng động chứa danh sách các phần tử theo thứ tự:

\`\`\`python
fruits = ["táo", "chuối", "cam"]
\`\`\`

#### 🚨 Bản chất: Gán \`b = a\` KHÔNG sao chép danh sách!
\`\`\`python
a = [1, 2, 3]
b = a          # b và a CÙNG trỏ vào một vùng nhớ List!
b.append(99)
print(a)       # 👉 [1, 2, 3, 99] -- a cũng bị thay đổi theo!
\`\`\`
Để tạo một bản sao độc lập, bạn phải clone: \`b = a.copy()\` hoặc \`b = a[:]\`.

#### 🚀 Các thao tác List cốt lõi:
- \`.append(x)\`: Thêm phần tử $x$ vào cuối danh sách.
- \`.pop()\`: Xóa và lấy ra phần tử cuối cùng.
- \`len(my_list)\`: Đếm số lượng phần tử.
- \`"cam" in fruits\`: Kiểm tra xem phần tử có nằm trong list không (\`True\`/\`False\`).`,
        starterCode: `# Bài 9: Thao tác với List
fruits = ["tao", "chuoi", "cam"]

# Thử thách:
# 1. Thêm phần tử "xoai" vào cuối danh sách fruits bằng phương thức .append()
# 2. Khai báo biến total_items lưu độ dài của danh sách fruits sau khi thêm (dùng hàm len())

# Viết code của bạn ở đây:
`,
        solutionCode: `fruits = ["tao", "chuoi", "cam"]
fruits.append("xoai")
total_items = len(fruits)
`,
        hints: [
          'Dùng phương thức: `fruits.append("xoai")`.',
          'Đếm số lượng: `total_items = len(fruits)`.',
        ],
        testCases: [
          {
            id: 'tc-9-1',
            description: 'Danh sách fruits phải có 4 phần tử bao gồm "xoai"',
            type: 'variable',
            variable: 'fruits',
            expected: ['tao', 'chuoi', 'cam', 'xoai'],
          },
          {
            id: 'tc-9-2',
            description: 'Biến total_items phải bằng 4',
            type: 'variable',
            variable: 'total_items',
            expected: 4,
          },
        ],
      },
      {
        id: 'lesson-10',
        moduleId: 'module-4',
        order: 2,
        title: 'Bài 10: Tuple & Set - Immutability và Tốc độ O(1)',
        summary: 'Sự bất biến của Tuple và cơ chế Bảng băm (Hash Table) giúp Set tìm kiếm tức thì.',
        concept: 'Tuple Immutability & Set Hash Table Lookups',
        theoryMarkdown: `### ⚡ So sánh List vs Tuple vs Set

| Đặc tính | List \`[]\` | Tuple \`()\` | Set \`{}\` |
| :--- | :--- | :--- | :--- |
| **Thay đổi (Mutable)** | Có (Mutable) | **Không (Bất biến)** | Có (nhưng phần tử phải hashable) |
| **Thứ tự (Ordered)** | Có | Có | **Không đảm bảo thứ tự** |
| **Trùng lặp (Duplicate)**| Cho phép | Cho phép | **Không trùng lặp (Duy nhất)** |
| **Kiểm tra \`x in coll\`** | Chậm: $O(N)$ | Chậm: $O(N)$ | **Siêu tốc: $O(1)$** |

#### 💡 Tại sao Set lại tra cứu $O(1)$?
Set sử dụng cơ chế **Hash Table**. Khi bạn tìm \`x in my_set\`, Python tính mã băm \`hash(x)\` để nhảy thẳng đến ô nhớ chứa phần tử mà không cần duyệt từ đầu đến cuối như List!

#### 🤝 Các phép toán tập hợp của Set:
\`\`\`python
a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)  # Phép giao (Intersection): {2, 3}
print(a | b)  # Phép hợp (Union): {1, 2, 3, 4}
print(a - b)  # Phép hiệu: {1}
\`\`\``,
        starterCode: `# Bài 10: Tập hợp Set và loại bỏ trùng lặp
raw_numbers = [1, 2, 2, 3, 4, 4, 4, 5]

# Thử thách:
# 1. Chuyển đổi raw_numbers thành một Set tên là unique_numbers để loại bỏ mọi số trùng lặp
# 2. Cho set_a = {1, 2, 3} và set_b = {2, 3, 4}. Hãy tạo biến common_elements là tập giao của 2 set (dùng toán tử &)

# Viết code của bạn ở đây:
set_a = {1, 2, 3}
set_b = {2, 3, 4}
`,
        solutionCode: `raw_numbers = [1, 2, 2, 3, 4, 4, 4, 5]
unique_numbers = set(raw_numbers)
set_a = {1, 2, 3}
set_b = {2, 3, 4}
common_elements = set_a & set_b
`,
        hints: [
          'Ép kiểu sang set: `unique_numbers = set(raw_numbers)`.',
          'Phép giao giữa 2 set: `common_elements = set_a & set_b`.',
        ],
        testCases: [
          {
            id: 'tc-10-1',
            description: 'unique_numbers chỉ chứa các phần tử duy nhất {1, 2, 3, 4, 5}',
            type: 'variable',
            variable: 'unique_numbers',
            expected: [1, 2, 3, 4, 5],
          },
          {
            id: 'tc-10-2',
            description: 'common_elements phải là tập giao {2, 3}',
            type: 'variable',
            variable: 'common_elements',
            expected: [2, 3],
          },
        ],
      },
      {
        id: 'lesson-11',
        moduleId: 'module-4',
        order: 3,
        title: 'Bài 11: Dictionary - Cặp Key-Value & Cơ chế Băm',
        summary: 'Cấu trúc dữ liệu quan trọng nhất Python. Cặp khóa-giá trị và phương thức .get() an toàn.',
        concept: 'Dictionary & Hash Map Key-Value Store',
        theoryMarkdown: `### 📖 Dictionary (Từ điển): "Trái tim" của Python

Dictionary lưu trữ dữ liệu dưới dạng các cặp \`key: value\`:

\`\`\`python
student = {
    "name": "Bảo An",
    "age": 20,
    "major": "Computer Science"
}
\`\`\`

#### 🔑 Bản chất của Key:
- Key phải là **Hashable (Bất biến)**: chuỗi, số, tuple được phép làm key. List **không** được phép làm key!
- Truy xuất giá trị theo key: \`student["name"]\` có tốc độ siêu tốc $O(1)$.

#### 🛡️ Thao tác an toàn với \`.get()\`:
Nếu truy xuất key không tồn tại bằng ngoặc vuông \`student["score"]\`, Python sẽ văng lỗi \`KeyError\`!
Hãy dùng phương thức \`.get()\`:
\`\`\`python
score = student.get("score", 0) # Nếu không có "score", trả về mặc định là 0
\`\`\`

#### ➕ Thêm và sửa giá trị:
\`\`\`python
student["gpa"] = 3.8       # Thêm cặp key-value mới
student["age"] = 21        # Cập nhật giá trị cho key có sẵn
\`\`\``,
        starterCode: `# Bài 11: Làm việc với Dictionary
student = {
    "name": "Minh",
    "age": 20
}

# Thử thách:
# 1. Thêm key "major" với giá trị chuỗi "IT" vào từ điển student
# 2. Dùng phương thức .get() để lấy giá trị của key "gpa" (nếu không có thì trả về mặc định là 0.0) và gán vào biến student_gpa

# Viết code của bạn ở đây:
`,
        solutionCode: `student = {
    "name": "Minh",
    "age": 20
}
student["major"] = "IT"
student_gpa = student.get("gpa", 0.0)
`,
        hints: [
          'Thêm key mới: `student["major"] = "IT"`.',
          'Dùng .get an toàn: `student_gpa = student.get("gpa", 0.0)`.',
        ],
        testCases: [
          {
            id: 'tc-11-1',
            description: 'Từ điển student phải có key "major" là "IT"',
            type: 'variable',
            variable: 'student',
            expected: { name: 'Minh', age: 20, major: 'IT' },
          },
          {
            id: 'tc-11-2',
            description: 'Biến student_gpa phải bằng 0.0',
            type: 'variable',
            variable: 'student_gpa',
            expected: 0.0,
          },
        ],
      },
    ],
  },

  /* ==========================================================================
     MODULE 5: HÀM (FUNCTIONS) & TÁI SỬ DỤNG MÃ NGUỒN (Asabeneh Day 11)
     Mục tiêu: ĐÂY MỚI LÀ LÚC HỌC VIẾT DEF VÀ RETURN!
     ========================================================================== */
  {
    id: 'module-5',
    order: 5,
    title: 'Module 5: Hàm (Functions) & Tư duy tái sử dụng',
    description: 'Bây giờ mới học viết Hàm: Cú pháp def, tham số vs đối số, sự khác biệt sống còn giữa return và print().',
    icon: 'Code2',
    lessons: [
      {
        id: 'lesson-12',
        moduleId: 'module-5',
        order: 1,
        title: 'Bài 12: Khai báo hàm def, Tham số & Cú sốc return vs print()',
        summary: 'Tại sao cần hàm? Cú pháp def, cách truyền tham số và phân biệt return vs print().',
        concept: 'Function Definition, Parameters & Return Values',
        theoryMarkdown: `### 🛠️ Hàm trong Python: Đóng gói & Tái sử dụng (Asabeneh Day 11)

Đến đây, bạn đã biết biến, if, vòng lặp. Nhưng nếu bạn cần thực hiện cùng một thuật toán 10 lần ở 10 nơi khác nhau thì sao?
👉 **Hàm (Function)** sinh ra để gom cụm code lại, đặt tên cho nó và gọi ra dùng bất cứ lúc nào!

#### 📐 Cú pháp khai báo hàm với \`def\`:
\`\`\`python
def ten_ham(tham_so_1, tham_so_2):
    # Khối lệnh tính toán (thụt lề 4 dấu cách)
    ket_qua = tham_so_1 + tham_so_2
    return ket_qua # Trao trả kết quả về cho nơi gọi hàm
\`\`\`

#### 🚨 CÚ SỐC KINH ĐIỂN: \`return\` KHÁC GÌ \`print()\`?
Người mới học lập trình thường nhầm lẫn tai hại: **Tưởng rằng \`print()\` bên trong hàm là hàm đã trả về kết quả!**

\`\`\`python
# ❌ CÁCH VIẾT SAI (Không có return):
def add_wrong(a, b):
    print(a + b) # Chỉ in ra màn hình console!

x = add_wrong(3, 4)
print(x) # 👉 In ra: None ! Vì hàm không hề return gì cả!
\`\`\`

#### 🎯 Quy tắc vàng:
- \`print()\`: Chỉ hiển thị văn bản ra màn hình cho con người đọc (Side Effect).
- \`return\`: **Trao trả dữ liệu** trở lại cho chương trình để lưu vào biến, tính toán tiếp hoặc truyền vào hàm khác.
- Sau khi gặp lệnh \`return\`, hàm sẽ **dừng lại ngay lập tức**.

#### ⚡ Tuple Unpacking với \`return\`:
Trong Python, bạn có thể trả về nhiều giá trị cùng lúc cực kỳ thanh lịch:
\`\`\`python
def swap_values(a, b):
    return b, a # Python tự động đóng gói thành tuple (b, a)!
\`\`\``,
        targetFunction: 'swap_values',
        starterCode: `# Bài 12: Viết hàm đầu tiên với def và return
# Thử thách: Viết hàm swap_values(a, b) nhận vào 2 giá trị a và b
# Trả về một tuple đảo ngược vị trí của chúng: (b, a)
# Gợi ý: Dùng câu lệnh return b, a

def swap_values(a, b):
    # Viết code của bạn ở đây:
    pass
`,
        solutionCode: `def swap_values(a, b):
    return b, a
`,
        hints: [
          'Dùng từ khóa `return`: `return b, a`.',
          'Không dùng hàm print(), hãy dùng lệnh return để trả về kết quả.',
        ],
        testCases: [
          {
            id: 'tc-12-1',
            description: 'Hoán đổi hai số nguyên 5 và 10 -> (10, 5)',
            type: 'function',
            input: [5, 10],
            expected: [10, 5],
          },
          {
            id: 'tc-12-2',
            description: 'Hoán đổi chuỗi "Hello" và "Python"',
            type: 'function',
            input: ['Hello', 'Python'],
            expected: ['Python', 'Hello'],
          },
          {
            id: 'tc-12-3',
            description: 'Hoán đổi số âm và số 0: [-99, 0] -> [0, -99]',
            type: 'function',
            input: [-99, 0],
            expected: [0, -99],
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-13',
        moduleId: 'module-5',
        order: 2,
        title: 'Bài 13: Ứng dụng Hàm tính chỉ số BMI',
        summary: 'Truyền nhiều tham số, tính toán biểu thức và làm tròn kết quả với round().',
        concept: 'Function Application & Math Formulas',
        theoryMarkdown: `### 📐 Bài toán thực tế: Tính chỉ số khối cơ thể (BMI)

Công thức tính BMI:
$$\\text{BMI} = \\frac{\\text{cân nặng (kg)}}{\\text{chiều cao (m)}^2}$$

#### 💡 Hàm làm tròn số \`round(value, digits)\`:
\`\`\`python
number = 22.85714
rounded = round(number, 2) # 22.86 (làm tròn 2 chữ số thập phân)
\`\`\`

Trong hàm, bạn hãy tính giá trị BMI bằng phép chia và lũy thừa \`** 2\`, sau đó dùng \`round()\` và \`return\` kết quả.`,
        targetFunction: 'calculate_bmi',
        starterCode: `# Bài 13: Hàm tính BMI
# Thử thách: Viết hàm calculate_bmi(weight, height)
# - weight: cân nặng tính bằng kg (float hoặc int)
# - height: chiều cao tính bằng mét (float)
# Trả về chỉ số BMI làm tròn đến 2 chữ số thập phân (dùng round(bmi, 2))

def calculate_bmi(weight, height):
    # Viết code ở đây:
    pass
`,
        solutionCode: `def calculate_bmi(weight, height):
    bmi = weight / (height ** 2)
    return round(bmi, 2)
`,
        hints: [
          'Bình phương chiều cao: `height ** 2`.',
          'Công thức: `bmi = weight / (height ** 2)`.',
          'Trả về: `return round(bmi, 2)`.',
        ],
        testCases: [
          {
            id: 'tc-13-1',
            description: 'Người nặng 70kg, cao 1.75m -> BMI = 22.86',
            type: 'function',
            input: [70, 1.75],
            expected: 22.86,
          },
          {
            id: 'tc-13-2',
            description: 'Người nặng 50kg, cao 1.60m -> BMI = 19.53',
            type: 'function',
            input: [50, 1.6],
            expected: 19.53,
          },
          {
            id: 'tc-13-3',
            description: 'Test case ẩn: 85kg, cao 1.82m -> 25.66',
            type: 'function',
            input: [85, 1.82],
            expected: 25.66,
            hidden: true,
          },
        ],
      },
      {
        id: 'lesson-14',
        moduleId: 'module-5',
        order: 3,
        title: 'Bài 14: Scope (Phạm vi LEGB) & Đệ quy (Recursion)',
        summary: 'Biến Local vs Global, giải thuật Đệ quy tính Giai thừa.',
        concept: 'Variable Scope & Recursion Call Stack',
        theoryMarkdown: `### 🌐 Phạm vi biến: Local vs Global (Quy tắc LEGB)

Biến được khai báo bên trong hàm là **Biến cục bộ (Local)** - chỉ tồn tại khi hàm đang chạy:

\`\`\`python
x = 10 # Global

def my_func():
    x = 5 # Local: một biến mới hoàn toàn, không đổi x bên ngoài!
    print("Trong hàm:", x) # 5

my_func()
print("Ngoài hàm:", x)     # 10
\`\`\`

#### 🪞 Đệ quy (Recursion):
Hàm đệ quy là hàm **tự gọi lại chính nó**. Bắt buộc phải có:
1. **Điều kiện dừng (Base Case):** Để ngăn việc tự gọi vô tận.
2. **Bước đệ quy:** Thu nhỏ bài toán về phiên bản đơn giản hơn.

Tính giai thừa $n!$:
- $0! = 1$
- $n! = n \\times (n - 1)!$`,
        targetFunction: 'factorial',
        starterCode: `# Bài 14: Đệ quy tính giai thừa
# Thử thách: Viết hàm factorial(n) tính giai thừa của số nguyên không âm n
# Ví dụ: factorial(5) -> 5 * 4 * 3 * 2 * 1 = 120
# Quy ước: factorial(0) = 1

def factorial(n):
    # Viết code của bạn ở đây:
    pass
`,
        solutionCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
`,
        hints: [
          'Điều kiện dừng: `if n <= 1: return 1`.',
          'Đệ quy: `return n * factorial(n - 1)`.',
        ],
        testCases: [
          {
            id: 'tc-14-1',
            description: 'Giai thừa của 5: 5! = 120',
            type: 'function',
            input: [5],
            expected: 120,
          },
          {
            id: 'tc-14-2',
            description: 'Giai thừa của 0: 0! = 1',
            type: 'function',
            input: [0],
            expected: 1,
          },
          {
            id: 'tc-14-3',
            description: 'Test case ẩn: 7! = 5040',
            type: 'function',
            input: [7],
            expected: 5040,
            hidden: true,
          },
        ],
      },
    ],
  },

  /* ==========================================================================
     MODULE 6: PHONG CÁCH PYTHONIC & LẬP TRÌNH HÀM (Asabeneh Day 13 - 14)
     ========================================================================== */
  {
    id: 'module-6',
    order: 6,
    title: 'Module 6: List Comprehension & Lambda',
    description: 'Phong cách viết code Pythonic đỉnh cao: List Comprehension 1 dòng, hàm ẩn danh Lambda, map & filter.',
    icon: 'Sparkles',
    lessons: [
      {
        id: 'lesson-15',
        moduleId: 'module-6',
        order: 1,
        title: 'Bài 15: List Comprehension - Cú pháp Pythonic 1 dòng',
        summary: 'Tối ưu hóa vòng lặp for và mệnh đề if thành 1 dòng code thanh lịch.',
        concept: 'List Comprehension Syntax & Performance',
        theoryMarkdown: `### ⚡ List Comprehension: Đặc sản của Python (Day 13)

Thay vì tạo danh sách rỗng rồi dùng \`for\` và \`.append()\`, Python cho phép bạn tạo danh sách chỉ bằng **1 dòng duy nhất**:

\`\`\`python
# Cách thông thường (4 dòng):
squares = []
for x in range(5):
    if x % 2 == 0:
        squares.append(x ** 2)

# Chuẩn Pythonic với List Comprehension:
squares = [x ** 2 for x in range(5) if x % 2 == 0]
# [0, 4, 16]
\`\`\`

> 💡 **Tốc độ:** List Comprehension chạy ở tầng bytecode tối ưu CPython nên nhanh hơn vòng lặp \`for\` thông thường khoảng **25%**!`,
        targetFunction: 'filter_and_square_evens',
        starterCode: `# Bài 15: List Comprehension
# Thử thách: Viết hàm filter_and_square_evens(nums)
# Nhận vào danh sách số nguyên nums. Dùng List Comprehension để:
# 1. Lọc ra các số CHẴN (x % 2 == 0).
# 2. Bình phương các số đó (x ** 2).
# 3. Trả về danh sách kết quả.

def filter_and_square_evens(nums):
    # Viết code 1 dòng của bạn ở đây:
    pass
`,
        solutionCode: `def filter_and_square_evens(nums):
    return [x ** 2 for x in nums if x % 2 == 0]
`,
        hints: [
          'Cú pháp: `[x ** 2 for x in nums if x % 2 == 0]`.',
        ],
        testCases: [
          {
            id: 'tc-15-1',
            description: '[1, 2, 3, 4, 5, 6] -> [4, 16, 36]',
            type: 'function',
            input: [[1, 2, 3, 4, 5, 6]],
            expected: [4, 16, 36],
          },
          {
            id: 'tc-15-2',
            description: 'Danh sách toàn số lẻ [1, 3, 5] -> []',
            type: 'function',
            input: [[1, 3, 5]],
            expected: [],
          },
          {
            id: 'tc-15-3',
            description: 'Số âm và số 0: [-2, 0, 3] -> [4, 0]',
            type: 'function',
            input: [[-2, 0, 3]],
            expected: [4, 0],
          },
        ],
      },
      {
        id: 'lesson-16',
        moduleId: 'module-6',
        order: 2,
        title: 'Bài 16: Lambda & Higher-Order Functions (map, filter)',
        summary: 'Hàm ẩn danh vô danh (Anonymous Function) và tư duy Lập trình hàm (Functional Programming).',
        concept: 'First-Class Functions, Lambdas & Filter Mapping',
        theoryMarkdown: `### 🏹 Hàm ẩn danh (Lambda) & Lập trình hàm (Day 14)

Lambda là hàm nhỏ gọn không cần đặt tên, định nghĩa ngay tại nơi sử dụng:

\`\`\`python
# Cú pháp: lambda <tham_số>: <biểu_thức>
double = lambda x: x * 2
print(double(5)) # 10
\`\`\`

#### 🔄 Bộ đôi \`filter()\` và \`map()\`:
- \`filter(func, iterable)\`: Giữ lại phần tử mà \`func\` trả về \`True\`.
- \`map(func, iterable)\`: Biến đổi từng phần tử theo \`func\`.`,
        targetFunction: 'get_adult_names',
        starterCode: `# Bài 16: Lambda và Filter
# Thử thách: Viết hàm get_adult_names(users)
# Nhận vào danh sách users, mỗi user là dict gồm {"name": str, "age": int}.
# Lọc ra những người có age >= 18 và trả về danh sách tên viết hoa toàn bộ (.upper()).

def get_adult_names(users):
    # Viết code của bạn ở đây:
    pass
`,
        solutionCode: `def get_adult_names(users):
    return [u["name"].upper() for u in users if u["age"] >= 18]
`,
        hints: [
          'Dùng List Comprehension hoặc filter: `[u["name"].upper() for u in users if u["age"] >= 18]`.',
        ],
        testCases: [
          {
            id: 'tc-16-1',
            description: 'Lọc 1 người trên 18 tuổi',
            type: 'function',
            input: [
              [
                { name: 'nam', age: 16 },
                { name: 'hoa', age: 20 },
              ],
            ],
            expected: ['HOA'],
          },
          {
            id: 'tc-16-2',
            description: 'Nhiều người hợp lệ',
            type: 'function',
            input: [
              [
                { name: 'alex', age: 25 },
                { name: 'bob', age: 18 },
                { name: 'charlie', age: 17 },
              ],
            ],
            expected: ['ALEX', 'BOB'],
          },
        ],
      },
    ],
  },

  /* ==========================================================================
     MODULE 7: XỬ LÝ NGOẠI LỆ & REGEX (Asabeneh Day 17 - 18)
     ========================================================================== */
  {
    id: 'module-7',
    order: 7,
    title: 'Module 7: Xử lý ngoại lệ & Regex',
    description: 'Bảo vệ chương trình bất khả xâm phạm bằng try-except và làm chủ biểu thức chính quy (Regex).',
    icon: 'ShieldAlert',
    lessons: [
      {
        id: 'lesson-17',
        moduleId: 'module-7',
        order: 1,
        title: 'Bài 17: Try - Except - Finally - Phòng chống Crash',
        summary: 'Kiểm soát lỗi thời gian chạy (Runtime Errors) thay vì để chương trình bị sập.',
        concept: 'Defensive Programming & Exception Handling',
        theoryMarkdown: `### 🛡️ Xử lý ngoại lệ (Day 17)

Khi gặp sự cố (như chia cho 0, ép chuỗi sai kiểu), Python sẽ văng ra một **Ngoại lệ (Exception)** làm dừng toàn bộ chương trình:

\`\`\`python
try:
    # Đoạn code có nguy cơ vấp ngã
    num = int("abc")
except ValueError:
    # Đoạn code ứng cứu khi gặp lỗi
    print("Lỗi chuyển đổi kiểu dữ liệu!")
finally:
    # Luôn luôn chạy dù có lỗi hay không
    print("Hoàn tất xử lý")
\`\`\`

#### ⚠️ Quy tắc tối quan trọng:
Hãy luôn bắt đúng lỗi cụ thể: \`ZeroDivisionError\`, \`TypeError\`, \`ValueError\`. Tránh dùng \`except:\` trần trụi!`,
        targetFunction: 'safe_divide',
        starterCode: `# Bài 17: Xử lý ngoại lệ với try - except
# Thử thách: Viết hàm safe_divide(a, b)
# 1. Tính kết quả a / b, làm tròn 2 chữ số thập phân bằng round(res, 2).
# 2. Nếu b = 0, bắt ZeroDivisionError và trả về chuỗi "Error: Division by zero".
# 3. Nếu a hoặc b không phải kiểu số, bắt TypeError và trả về "Error: Invalid type".

def safe_divide(a, b):
    # Viết code ở đây:
    pass
`,
        solutionCode: `def safe_divide(a, b):
    try:
        return round(a / b, 2)
    except ZeroDivisionError:
        return "Error: Division by zero"
    except TypeError:
        return "Error: Invalid type"
`,
        hints: [
          'Đặt `return round(a / b, 2)` trong khối `try:`.',
          'Thêm `except ZeroDivisionError: return "Error: Division by zero"`.',
          'Thêm `except TypeError: return "Error: Invalid type"`.',
        ],
        testCases: [
          {
            id: 'tc-17-1',
            description: 'Chia hợp lệ 10 / 4 -> 2.5',
            type: 'function',
            input: [10, 4],
            expected: 2.5,
          },
          {
            id: 'tc-17-2',
            description: 'Chia cho 0 -> "Error: Division by zero"',
            type: 'function',
            input: [7, 0],
            expected: 'Error: Division by zero',
          },
          {
            id: 'tc-17-3',
            description: 'Sai kiểu dữ liệu "10" / 2 -> "Error: Invalid type"',
            type: 'function',
            input: ['10', 2],
            expected: 'Error: Invalid type',
          },
        ],
      },
      {
        id: 'lesson-18',
        moduleId: 'module-7',
        order: 2,
        title: 'Bài 18: Regular Expressions (Regex) - Thư viện re',
        summary: 'Kiểm tra định dạng dữ liệu (Validation) với biểu thức chính quy.',
        concept: 'Pattern Matching with regex module',
        theoryMarkdown: `### 🔍 Module \`re\`: Siêu năng lực kiểm tra chuỗi (Day 18)

Biểu thức chính quy (Regex) là công cụ kiểm tra chuỗi theo mẫu (pattern):

\`\`\`python
import re

pattern = r"^0[35789]\d{8}$"
is_match = bool(re.match(pattern, "0912345678")) # True
\`\`\`

#### 📐 Ký tự mẫu cơ bản:
- \`^\`: Bắt đầu chuỗi.
- \`$\`: Kết thúc chuỗi.
- \`\\d\`: Chữ số bất kỳ ($0-9$).
- \`{8}\`: Lặp lại đúng 8 lần.
- \`[35789]\`: Một trong các chữ số 3, 5, 7, 8, 9.`,
        targetFunction: 'is_valid_vietnam_phone',
        starterCode: `# Bài 18: Regex kiểm tra số điện thoại
# Thử thách: Dùng thư viện re viết hàm is_valid_vietnam_phone(phone)
# Quy tắc số điện thoại di động Việt Nam:
# 1. Bắt đầu bằng 0
# 2. Chữ số tiếp theo thuộc [3, 5, 7, 8, 9]
# 3. Có tổng cộng đúng 10 chữ số
# Trả về True nếu hợp lệ, False nếu không hợp lệ.

import re

def is_valid_vietnam_phone(phone):
    # Viết code ở đây:
    pass
`,
        solutionCode: `import re

def is_valid_vietnam_phone(phone):
    pattern = r"^0[35789]\d{8}$"
    return bool(re.match(pattern, str(phone)))
`,
        hints: [
          'Pattern: `r"^0[35789]\\d{8}$"`.',
          'Dùng `bool(re.match(pattern, str(phone)))`.',
        ],
        testCases: [
          {
            id: 'tc-18-1',
            description: 'Số hợp lệ "0912345678"',
            type: 'function',
            input: ['0912345678'],
            expected: true,
          },
          {
            id: 'tc-18-2',
            description: 'Đầu số 02 không phải di động "0212345678"',
            type: 'function',
            input: ['0212345678'],
            expected: false,
          },
          {
            id: 'tc-18-3',
            description: 'Thiếu số (chỉ có 8 số) "09123456"',
            type: 'function',
            input: ['09123456'],
            expected: false,
          },
        ],
      },
    ],
  },

  /* ==========================================================================
     MODULE 8: LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG OOP (Asabeneh Day 21)
     ========================================================================== */
  {
    id: 'module-8',
    order: 8,
    title: 'Module 8: Lập trình Hướng đối tượng (OOP)',
    description: 'Xây dựng Class, Constructor __init__, con trỏ đối tượng self và tư duy đóng gói dữ liệu.',
    icon: 'Cpu',
    lessons: [
      {
        id: 'lesson-19',
        moduleId: 'module-8',
        order: 1,
        title: 'Bài 19: Class, __init__ & self - Tư duy Hướng đối tượng',
        summary: 'Mô hình hóa thực thể thực tế với thuộc tính (Attributes) và phương thức (Methods).',
        concept: 'Object-Oriented Programming (OOP) & Encapsulation',
        theoryMarkdown: `### 🏛️ Lập trình Hướng đối tượng (OOP - Day 21)

OOP giúp chúng ta gom dữ liệu (trạng thái) và hành động (phương thức) vào chung một thực thể gọi là **Đối tượng (Object)** sinh ra từ một khuôn mẫu **Lớp (Class)**:

\`\`\`python
class BankAccount:
    # Hàm khởi tạo (Constructor):
    def __init__(self, owner, balance=0):
        self.owner = owner       # Thuộc tính
        self.balance = balance

    # Phương thức (Method):
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
        return self.balance
\`\`\`

#### ❓ Tại sao luôn có tham số \`self\`?
\`self\` đại diện cho **chính đối tượng cụ thể đang được gọi**. Khi bạn viết \`acc.deposit(100)\`, Python thực chất ngầm thực hiện \`BankAccount.deposit(acc, 100)\`!`,
        targetFunction: 'bank_simulator',
        starterCode: `# Bài 19: Class BankAccount
# 1. Định nghĩa class BankAccount có:
#    - __init__(self, balance=0): gán self.balance = balance.
#    - deposit(self, amount): cộng amount vào balance và trả về balance mới.
#    - withdraw(self, amount): nếu amount <= balance thì trừ và trả về balance mới;
#      nếu amount > balance, trả về "Insufficient funds".
# 2. Hàm bank_simulator(initial, deposit_amt, withdraw_amt) khởi tạo tài khoản,
#    nạp tiền rồi rút tiền, trả về tuple: (balance_sau_nap, ket_qua_sau_rut).

class BankAccount:
    # Định nghĩa class ở đây:
    pass

def bank_simulator(initial, deposit_amt, withdraw_amt):
    # Khởi tạo và gọi phương thức ở đây:
    pass
`,
        solutionCode: `class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        self.balance -= amount
        return self.balance

def bank_simulator(initial, deposit_amt, withdraw_amt):
    acc = BankAccount(initial)
    b1 = acc.deposit(deposit_amt)
    b2 = acc.withdraw(withdraw_amt)
    return b1, b2
`,
        hints: [
          'Trong `BankAccount`: lưu `self.balance = balance`.',
          'Trong `withdraw`: `if amount > self.balance: return "Insufficient funds"` ngược lại trừ `self.balance -= amount` và trả về `self.balance`.',
          'Trong `bank_simulator`: Tạo `acc = BankAccount(initial)`, gọi `deposit` rồi `withdraw`, trả về cả 2 giá trị.',
        ],
        testCases: [
          {
            id: 'tc-19-1',
            description: 'Tài khoản 100k, nạp 50k -> 150k, rút 30k -> 120k',
            type: 'function',
            input: [100, 50, 30],
            expected: [150, 120],
          },
          {
            id: 'tc-19-2',
            description: 'Rút quá số dư: 100k, nạp 20k -> 120k, rút 200k -> "Insufficient funds"',
            type: 'function',
            input: [100, 20, 200],
            expected: [120, 'Insufficient funds'],
          },
        ],
      },
    ],
  },
];
