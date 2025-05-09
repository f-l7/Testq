// بيانات المنتجات (سيتم استبدالها بقاعدة بيانات حقيقية في التطبيق النهائي)
let products = [
    {
        id: 1,
        title: "هاتف ذكي X1",
        description: "هاتف ذكي بمواصفات عالية وكاميرا متطورة",
        price: 2499,
        image: "https://via.placeholder.com/300",
        quantity: 10,
        visible: true,
        inStock: true
    },
    {
        id: 2,
        title: "سماعات لاسلكية",
        description: "سماعات بلوتوث عالية الجودة مع عزل للضجيج",
        price: 599,
        image: "https://via.placeholder.com/300",
        quantity: 5,
        visible: true,
        inStock: true
    }
];

// عرض المنتجات في صفحة المنتجات
function displayProducts() {
    if (window.location.pathname.includes('products.html')) {
        const container = document.querySelector('.products-container');
        container.innerHTML = '';

        products.filter(product => product.visible).forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price} ر.س</p>
                    <button class="order-btn ${!product.inStock ? 'out-of-stock' : ''}" data-id="${product.id}">
                        ${product.inStock ? 'الطلب الآن' : 'نفاذ الكمية'}
                    </button>
                </div>
            `;

            container.appendChild(productCard);
        });

        // إضافة حدث النقر على زر الطلب
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.classList.contains('out-of-stock')) {
                    const productId = parseInt(this.getAttribute('data-id'));
                    showPaymentOptions(productId);
                }
            });
        });
    }
}

// عرض خيارات الدفع
function showPaymentOptions(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const paymentMethods = ['ابل باي', 'راجحي', 'كريدت'];
    let optionsHTML = paymentMethods.map(method => 
        `<button class="btn payment-btn" data-method="${method}">${method}</button>`
    ).join('');

    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>اختر طريقة الدفع</h3>
                <p>${product.title} - ${product.price} ر.س</p>
                <div class="payment-options">
                    ${optionsHTML}
                </div>
                <button class="btn cancel-btn">إلغاء</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // إضافة أحداث النقر
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            processPayment(productId, method);
        });
    });

    document.querySelector('.cancel-btn').addEventListener('click', () => {
        document.querySelector('.modal-overlay').remove();
    });
}

// معالجة الدفع
function processPayment(productId, method) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let paymentHTML = '';
    
    if (method === 'ابل باي') {
        paymentHTML = `
            <p>سيتم تحويلك إلى صفحة الدفع عبر Apple Pay</p>
            <button class="btn" onclick="window.location.href='https://apple-pay-link.com'">الانتقال للدفع</button>
        `;
    } 
    else if (method === 'راجحي') {
        paymentHTML = `
            <p>الرجاء التحويل إلى الحساب البنكي التالي:</p>
            <p><strong>رقم الحساب: 1234567890</strong></p>
            <p>بعد التحويل، سيتم إرسال المنتج إلى بريدك الإلكتروني أو عبر رسالة خاصة في ديسكورد.</p>
            <button class="btn" onclick="window.location.href='https://discord.gg/yourlink'">الانتقال إلى سيرفر الديسكورد</button>
        `;
    } 
    else if (method === 'كريدت') {
        paymentHTML = `
            <p>الرجاء استخدام بطاقة الائتمان للدفع:</p>
            <p><strong>رقم البطاقة: 1234-5678-9012-3456</strong></p>
            <p>انتهاء الصلاحية: 12/25</p>
            <p>CVV: 123</p>
            <button class="btn" onclick="copyPaymentInfo()">نسخ معلومات الدفع</button>
        `;
    }

    document.querySelector('.modal').innerHTML = `
        <h3>تفاصيل الدفع عبر ${method}</h3>
        ${paymentHTML}
        <button class="btn cancel-btn" style="margin-top: 1rem;">إغلاق</button>
    `;

    document.querySelector('.cancel-btn').addEventListener('click', () => {
        document.querySelector('.modal-overlay').remove();
    });
}

// نسخ معلومات الدفع
function copyPaymentInfo() {
    const paymentInfo = `رقم البطاقة: 1234-5678-9012-3456\nانتهاء الصلاحية: 12/25\nCVV: 123`;
    navigator.clipboard.writeText(paymentInfo).then(() => {
        alert('تم نسخ معلومات الدفع إلى الحافظة');
    });
}

// نظام التقييم
function setupRatingSystem() {
    if (window.location.pathname.includes('reviews.html')) {
        const stars = document.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
                
                // يمكنك هنا إرسال التقييم إلى السيرفر
                console.log(`تم التقييم بـ ${index + 1} نجوم`);
            });
        });
    }
}

// تسجيل دخول المسؤولين
function setupAdminLogin() {
    if (window.location.pathname.includes('admin/login.html')) {
        const loginForm = document.querySelector('#loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.querySelector('#username').value;
                const password = document.querySelector('#password').value;
                
                // بيانات الدخول الثابتة (يجب استبدالها بنظام آمن في التطبيق النهائي)
                if (username === 'admin' && password === 'admin123') {
                    window.location.href = 'dashboard.html';
                } else {
                    alert('اسم المستخدم أو كلمة المرور غير صحيحة');
                }
            });
        }
    }
}

// لوحة تحكم المسؤولين
function setupAdminDashboard() {
    if (window.location.pathname.includes('admin/dashboard.html')) {
        displayAdminProducts();
        
        // إضافة منتج جديد
        const addProductForm = document.querySelector('#addProductForm');
        if (addProductForm) {
            addProductForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newProduct = {
                    id: products.length + 1,
                    title: document.querySelector('#productTitle').value,
                    description: document.querySelector('#productDescription').value,
                    price: parseFloat(document.querySelector('#productPrice').value),
                    image: document.querySelector('#productImage').value || 'https://via.placeholder.com/300',
                    quantity: parseInt(document.querySelector('#productQuantity').value),
                    visible: true,
                    inStock: true
                };
                
                products.push(newProduct);
                displayAdminProducts();
                addProductForm.reset();
                alert('تمت إضافة المنتج بنجاح');
            });
        }
    }
}

// عرض المنتجات في لوحة التحكم
function displayAdminProducts() {
    if (window.location.pathname.includes('admin/dashboard.html')) {
        const container = document.querySelector('.admin-products');
        if (!container) return;
        
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'admin-product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>السعر: ${product.price} ر.س</p>
                    <p>الكمية: ${product.quantity}</p>
                    <div class="product-actions">
                        <button class="action-btn delete-btn" data-id="${product.id}">حذف</button>
                        <button class="action-btn edit-btn" data-id="${product.id}">تعديل</button>
                        <button class="action-btn stock-btn" data-id="${product.id}">
                            ${product.inStock ? 'نفاذ الكمية' : 'إعادة توفير'}
                        </button>
                        <button class="action-btn hide-btn" data-id="${product.id}">
                            ${product.visible ? 'إخفاء' : 'إظهار'}
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(productCard);
        });
        
        // إضافة أحداث النقر للأزرار
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                    products = products.filter(p => p.id !== productId);
                    displayAdminProducts();
                }
            });
        });
        
        document.querySelectorAll('.stock-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    product.inStock = !product.inStock;
                    displayAdminProducts();
                }
            });
        });
        
        document.querySelectorAll('.hide-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    product.visible = !product.visible;
                    displayAdminProducts();
                }
            });
        });
    }
}

// تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupRatingSystem();
    setupAdminLogin();
    setupAdminDashboard();
});
