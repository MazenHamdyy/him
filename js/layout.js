// الهيدر والفوتر المشتركان لكل صفحات الموقع
(function () {
    const page = document.body.dataset.page || 'home';

    const aboutLinks = [
        { href: 'chairman.html', key: 'chairman', label: 'كلمة رئيس مجلس الإدارة', icon: 'fa-user-tie' },
        { href: 'dean.html', key: 'dean', label: 'كلمة عميد المعهد', icon: 'fa-user-graduate' },
        { href: 'secretary-general.html', key: 'secretary', label: 'كلمة الأمين العام', icon: 'fa-user-pen' },
        { href: 'vision.html', key: 'vision', label: 'الرؤية والرسالة والقيم', icon: 'fa-bullseye' }
    ];
    const isAbout = aboutLinks.some(l => l.key === page);
    const homePrefix = page === 'home' ? '' : 'index.html';

    const header = `
    <header class="header">
        <div class="header-top">
            <div class="container">
                <div class="header-contact">
                    <span><i class="fas fa-envelope"></i> info@him-mahalla.edu.eg</span>
                </div>
                <div class="header-social">
                    <a href="https://web.facebook.com/HIMMahalla" target="_blank" aria-label="فيسبوك"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="يوتيوب"><i class="fab fa-youtube"></i></a>
                    <a href="#" aria-label="إنستجرام"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="nav-brand">
                    <img src="images/logo.jpg" alt="معهد HIM" class="logo">
                    <span class="brand-text">
                        <span class="brand-name">معهد <span class="latin">HIM</span></span>
                        <span class="brand-sub">المعهد العالي للإدارة بالمحلة الكبرى</span>
                    </span>
                </a>
                <ul class="nav-menu">
                    <li><a href="index.html" class="${page === 'home' ? 'active' : ''}">الرئيسية</a></li>
                    <li class="has-dropdown">
                        <a href="#" class="dropdown-toggle ${isAbout ? 'active' : ''}">عن المعهد <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown">
                            ${aboutLinks.map(l => `<li><a href="${l.href}" class="${l.key === page ? 'current' : ''}"><i class="fas ${l.icon}"></i> ${l.label}</a></li>`).join('')}
                        </ul>
                    </li>
                    <li><a href="${homePrefix}#departments">الأقسام</a></li>
                    <li><a href="${homePrefix}#services">الخدمات الإلكترونية</a></li>
                    <li><a href="news.html" class="${page === 'news' ? 'active' : ''}">أخبارنا</a></li>
                    <li><a href="${homePrefix}#contact">اتصل بنا</a></li>
                </ul>
                <button class="nav-toggle" aria-label="القائمة"><i class="fas fa-bars"></i></button>
            </nav>
        </div>
    </header>`;

    const mapAddressEncoded = encodeURIComponent('7 Tanta - Al Mahallah Al Kubra Rd, Saft Torab, El Mahalla El Kubra, Gharbia Governorate 6733003');

    const footer = `
    <footer class="footer sha-footer">
        <div class="container">
            <div class="sha-footer-grid">
                <!-- Column 1: Institute Brand & Apps (Right in RTL) -->
                <div class="sha-col sha-col-brand">
                    <div class="sha-brand-header">
                        <div class="sha-brand-badge">
                            <img src="images/logo.jpg" alt="معهد HIM" class="sha-brand-logo">
                        </div>
                        <div class="sha-brand-names">
                            <h3 class="sha-brand-title">معهد <span class="latin">HIM</span></h3>
                            <span class="sha-brand-sub">المعهد العالي للإدارة بالمحلة الكبرى</span>
                        </div>
                    </div>
                    <p class="sha-brand-desc">
                        معهد <span class="latin">HIM</span> مؤسسة تعليمية متميزة تسعى لتقديم تعليم عالي الجودة يواكب متطلبات سوق العمل، معتمد من وزارة التعليم العالي والبحث العلمي ومعادل من المجلس الأعلى للجامعات.
                    </p>
                    <div class="sha-social-tiles">
                        <a href="#" class="sha-social-tile sha-soc-ig" aria-label="إنستجرام"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="sha-social-tile sha-soc-yt" aria-label="يوتيوب"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="sha-social-tile sha-soc-tw" aria-label="تويتر"><i class="fab fa-twitter"></i></a>
                        <a href="https://web.facebook.com/HIMMahalla" target="_blank" class="sha-social-tile sha-soc-fb" aria-label="فيسبوك"><i class="fab fa-facebook-f"></i></a>
                    </div>
                    <div class="sha-app-badges">
                        <a href="#" class="sha-app-btn">
                            <i class="fab fa-google-play"></i>
                            <div class="sha-app-text">
                                <span>تحميل من</span>
                                <strong>Google Play</strong>
                            </div>
                        </a>
                        <a href="#" class="sha-app-btn">
                            <i class="fab fa-apple"></i>
                            <div class="sha-app-text">
                                <span>تحميل من</span>
                                <strong>App Store</strong>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Column 2: Contact Information (Middle Right) -->
                <div class="sha-col sha-col-contact">
                    <div class="sha-col-head">
                        <span class="sha-head-line"></span>
                        <h4 class="sha-head-title">بيانات الإتصال</h4>
                        <span class="sha-head-badge"><i class="fas fa-phone-alt"></i></span>
                    </div>
                    <div class="sha-contact-list">
                        <!-- Address -->
                        <div class="sha-contact-item">
                            <div class="sha-contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="sha-contact-text">
                                <p class="sha-address-text">
                                    7 طريق طنطا - المحلة الكبرى، صفط تراب، المحلة الكبرى، محافظة الغربية 6733003
                                </p>
                                <span class="sha-address-en">
                                    7 Tanta - Al Mahallah Al Kubra Rd, Saft Torab, El Mahalla El Kubra, Gharbia Governorate 6733003
                                </span>
                            </div>
                        </div>

                        <!-- Phone Numbers -->
                        <div class="sha-contact-item">
                            <div class="sha-contact-icon">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <div class="sha-contact-text sha-numbers-list">
                                <span>رقم هاتف (1) : <a href="tel:01212315111">01212315111</a></span>
                                <span>رقم هاتف (2) : <a href="tel:012122316111">012122316111</a></span>
                                <span>رقم هاتف (3) : <a href="tel:01212318111">01212318111</a></span>
                            </div>
                        </div>

                        <!-- Email & Fax -->
                        <div class="sha-contact-item">
                            <div class="sha-contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="sha-contact-text">
                                <span>البريد الإلكتروني : info@him-mahalla.edu.eg</span>
                                <span>فاكس : 0402234570</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Column 3: Quick Links (Middle Left) -->
                <div class="sha-col sha-col-links">
                    <div class="sha-col-head">
                        <span class="sha-head-line"></span>
                        <h4 class="sha-head-title">روابط سريعة</h4>
                        <span class="sha-head-badge"><i class="fas fa-link"></i></span>
                    </div>
                    <ul class="sha-links-list">
                        <li><a href="index.html"><i class="fas fa-caret-left"></i> الصفحة الرئيسية</a></li>
                        <li><a href="chairman.html"><i class="fas fa-caret-left"></i> كلمة رئيس مجلس الإدارة</a></li>
                        <li><a href="dean.html"><i class="fas fa-caret-left"></i> كلمة عميد المعهد</a></li>
                        <li><a href="secretary-general.html"><i class="fas fa-caret-left"></i> كلمة الأمين العام</a></li>
                        <li><a href="vision.html"><i class="fas fa-caret-left"></i> الرؤية والرسالة والقيم</a></li>
                        <li><a href="${homePrefix}#departments"><i class="fas fa-caret-left"></i> الأقسام الأكاديمية</a></li>
                        <li><a href="#" data-service="exams"><i class="fas fa-caret-left"></i> منصة الامتحانات</a></li>
                        <li><a href="#" data-service="portal"><i class="fas fa-caret-left"></i> بوابة الطالب الإلكترونية</a></li>
                        <li><a href="news.html"><i class="fas fa-caret-left"></i> آخر الأخبار والفعاليات</a></li>
                        <li><a href="${homePrefix}#contact"><i class="fas fa-caret-left"></i> تواصل معنا</a></li>
                    </ul>
                </div>

                <!-- Column 4: Map Location (Left in RTL) -->
                <div class="sha-col sha-col-map">
                    <div class="sha-col-head">
                        <span class="sha-head-line"></span>
                        <h4 class="sha-head-title">موقعنا على الخريطة</h4>
                        <span class="sha-head-badge"><i class="fas fa-map-marked-alt"></i></span>
                    </div>
                    <div class="sha-map-card">
                        <iframe
                            class="sha-map-iframe"
                            title="موقع معهد HIM على الخريطة"
                            src="https://maps.google.com/maps?q=${mapAddressEncoded}&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                            allowfullscreen>
                        </iframe>
                        <div class="sha-map-footer">
                            <span class="sha-map-label"><i class="fas fa-location-dot"></i> صفط تراب، المحلة الكبرى</span>
                            <a href="https://maps.google.com/maps?q=${mapAddressEncoded}" target="_blank" rel="noopener noreferrer" class="sha-map-btn">
                                فتح في الخرائط <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom Bar -->
            <div class="sha-footer-bottom">
                <div class="sha-bottom-content">
                    <p>جميع الحقوق محفوظة © ${new Date().getFullYear()} معهد <span class="latin">HIM</span> – المعهد العالي للإدارة بالمحلة الكبرى</p>
                    <div class="sha-bottom-tags">
                        <span>وزارة التعليم العالي والبحث العلمي</span>
                        <span>•</span>
                        <span>معادل من المجلس الأعلى للجامعات</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Scroll to Top Button (like in reference screenshot) -->
        <a href="#home" class="sha-scroll-top" id="shaScrollTop" aria-label="الصعود للأعلى">
            <i class="fas fa-chevron-up"></i>
        </a>
    </footer>`;

    document.getElementById('site-header').outerHTML = header;
    document.getElementById('site-footer').outerHTML = footer;
})();
