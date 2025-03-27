/*
 * المكتب الهندسي العامري - الوظائف الرئيسية
 * تاريخ الإنشاء: 27 مارس 2025
 */

// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل القائمة المتنقلة
    initMobileMenu();
    
    // تفعيل فلترة المشاريع
    initProjectFilters();
    
    // تفعيل معرض الصور في صفحة تفاصيل المشروع
    initGallery();
    
    // تفعيل نموذج التواصل
    initContactForm();
});

// تفعيل القائمة المتنقلة
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // إضافة الفئة النشطة للرابط الحالي
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentLocation === href || (href !== '/' && currentLocation.startsWith(href))) {
            link.classList.add('active');
        }
    });
}

// تفعيل فلترة المشاريع
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع الأزرار
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // إضافة الفئة النشطة للزر المضغوط
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // عرض/إخفاء المشاريع بناءً على الفلتر المحدد
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // تفعيل الفلتر الافتراضي (الكل)
        const defaultFilter = document.querySelector('.filter-btn[data-filter="all"]');
        if (defaultFilter) {
            defaultFilter.classList.add('active');
        }
    }
}

// تفعيل معرض الصور في صفحة تفاصيل المشروع
function initGallery() {
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const galleryMain = document.querySelector('.gallery-main');
    
    if (galleryThumbs.length && galleryMain) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع الصور المصغرة
                galleryThumbs.forEach(t => t.classList.remove('active'));
                
                // إضافة الفئة النشطة للصورة المصغرة المضغوطة
                this.classList.add('active');
                
                // تحديث الصورة الرئيسية
                const imgSrc = this.getAttribute('data-src');
                const imgAlt = this.getAttribute('data-alt');
                
                if (imgSrc) {
                    galleryMain.innerHTML = `<img src="${imgSrc}" alt="${imgAlt || 'صورة المشروع'}" />`;
                } else {
                    galleryMain.innerHTML = `<div class="placeholder">${this.innerHTML}</div>`;
                }
            });
        });
        
        // تفعيل الصورة الأولى افتراضيًا
        if (galleryThumbs.length > 0) {
            galleryThumbs[0].classList.add('active');
            
            const imgSrc = galleryThumbs[0].getAttribute('data-src');
            const imgAlt = galleryThumbs[0].getAttribute('data-alt');
            
            if (imgSrc) {
                galleryMain.innerHTML = `<img src="${imgSrc}" alt="${imgAlt || 'صورة المشروع'}" />`;
            }
        }
    }
}

// تفعيل نموذج التواصل
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة البيانات
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage = 'الرجاء إدخال الاسم الكامل';
            } else if (!email) {
                isValid = false;
                errorMessage = 'الرجاء إدخال البريد الإلكتروني';
            } else if (!validateEmail(email)) {
                isValid = false;
                errorMessage = 'الرجاء إدخال بريد إلكتروني صحيح';
            } else if (!subject) {
                isValid = false;
                errorMessage = 'الرجاء اختيار الموضوع';
            } else if (!message) {
                isValid = false;
                errorMessage = 'الرجاء إدخال رسالتك';
            }
            
            const formMessage = document.querySelector('.form-message');
            
            if (!isValid) {
                // عرض رسالة الخطأ
                formMessage.textContent = errorMessage;
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            } else {
                // محاكاة إرسال النموذج
                formMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // إعادة تعيين النموذج
                contactForm.reset();
                
                // إخفاء رسالة النجاح بعد 5 ثوانٍ
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// إضافة تأثيرات التمرير
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});
