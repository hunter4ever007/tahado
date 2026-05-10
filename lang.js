// Language translations for Tahado website
const translations = {
  // Arabic (default)
  ar: {
    // Navigation
    nav_contact: "تواصل معنا",
    nav_language: "English",
    nav_home: "الرئيسية",

    // Hero section
    hero_title: "لأن اللحظات الحلوة ماتستنى",
    hero_subtitle: "هديتك توصل إليك خلال 90 دقيقة داخل مدينة جدة ",
    hero_download_app: "حمّل التطبيق",
    hero_scroll_hint: "اسحب للأسفل",

    // Preview section
    preview_title: "تجربة إهداء راقية… من أول اختيار إلى لحظة التسليم",
    preview_subtitle: "تهادوا يجمع بين الترتيب الجميل، خيارات تخصيص ذكية، والتوصيل السريع داخل مدينة جدة.",
    preview_feature1: "اقتراحات هدايا حسب المناسبة والشخص",
    preview_feature2: "تخصيص فوري للبطاقة والرسالة والتغليف",
    preview_feature3: "جدولة التوصيل وتتبع الطلب بسهولة",

    // Footer
    footer_copyright: "جميع الحقوق محفوظة",
    
    // Contact page
    contact_title: "تواصل معنا",
    contact_name: "الاسم",
    contact_name_placeholder: "أدخل اسمك",
    contact_phone: "رقم الهاتف",
    contact_phone_placeholder: "أدخل رقم الهاتف",
    contact_email: "البريد الإلكتروني",
    contact_email_placeholder: "أدخل بريدك الإلكتروني",
    contact_type: "نوع الطلب",
    contact_type_placeholder: "اختر نوع الطلب",
    contact_type_complaint: "شكوى",
    contact_type_request: "طلب",
    contact_message: "نص الطلب",
    contact_message_placeholder: "اكتب نص طلبك هنا...",
    contact_submit: "إرسال الطلب",
    contact_alt_text: "ويمكنكم التواصل عبر إرسال بريد إلكتروني إلى",
    contact_success_message: "تم إرسال طلبك بنجاح ✨",
    contact_error_message: "حدث خطأ أثناء الإرسال ❌",
    contact_server_error: "تعذر الاتصال بالخادم ⚠️",

    // Accessibility
    nav_label: "التنقل الرئيسي",
    nav_toggle_open: "فتح القائمة",
    nav_toggle_close: "إغلاق القائمة",
    brand_alt: "Tahado | تهادوا",
    phone_alt: "معاينة تطبيق تهادوا",
    app_preview_alt: "معاينة التطبيق",
    app_store_alt: "App Store",
    google_play_alt: "Google Play",
    footer_links_label: "روابط"
  },

  // English
  en: {
    // Navigation
    nav_contact: "Contact Us",
    nav_language: "العربية",
    nav_home: "Home",

    // Hero section
    hero_title: "Because sweet moments don’t wait.",
    hero_subtitle: "Your gift will arrive within 90 minutes inside Jeddah city.",
    hero_download_app: "Download App",
    hero_scroll_hint: "Scroll down",

    // Preview section
    preview_title: "An elegant gifting experience… from first choice to delivery moment",
    preview_subtitle: "Tahado combines beautiful arrangement, smart customization options, and fast delivery within Jeddah city.",
    preview_feature1: "Gift suggestions based on occasion and person",
    preview_feature2: "Instant customization of card, message and wrapping",
    preview_feature3: "Schedule delivery and track orders easily",

    // Footer
    footer_copyright: "All rights reserved",
    
    // Contact page
    contact_title: "Contact Us",
    contact_name: "Name",
    contact_name_placeholder: "Enter your name",
    contact_phone: "Phone Number",
    contact_phone_placeholder: "Enter your phone number",
    contact_email: "Email Address",
    contact_email_placeholder: "Enter your email address",
    contact_type: "Request Type",
    contact_type_placeholder: "Select request type",
    contact_type_complaint: "Complaint",
    contact_type_request: "Request",
    contact_message: "Message",
    contact_message_placeholder: "Write your message here...",
    contact_submit: "Submit Request",
    contact_alt_text: "You can also contact us by sending an email to",
    contact_success_message: "Your request has been sent successfully ✨",
    contact_error_message: "An error occurred while sending ❌",
    contact_server_error: "Could not connect to server ⚠️",

    // Accessibility
    nav_label: "Main Navigation",
    nav_toggle_open: "Open Menu",
    nav_toggle_close: "Close Menu",
    brand_alt: "Tahado | تهادوا",
    phone_alt: "Tahado app preview",
    app_preview_alt: "App preview",
    app_store_alt: "App Store",
    google_play_alt: "Google Play",
    footer_links_label: "Links"
  }
};

// Language management
let currentLang = localStorage.getItem('tahado-lang') || 'ar'; // Default to Arabic

// Function to update the page language
function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('tahado-lang', lang);

  // Update HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update page title
  document.title = lang === 'ar' ? 'Tahado | تهادوا' : 'Tahado | تهادوا';

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = lang === 'ar' 
      ? 'Tahado | تهادوا - اكتشف هدايا مميزة، اطلبها بسهولة، ووصلها لمن تحب.' 
      : 'Tahado | تهادوا - Discover special gifts, order them easily, and deliver them to your loved ones.';
  }

  // Update all translatable elements
  updateTranslatableElements();

  // Update language toggle button
  updateLanguageToggle();
}

// Function to update all translatable elements
function updateTranslatableElements() {
  // Get all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[currentLang][key];

    if (translation) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  // Update elements with data-i18n-placeholder attribute
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = translations[currentLang][key];

    if (translation) {
      element.placeholder = translation;
    }
  });

  // Update elements with data-i18n-alt attribute for alt text
  const altElements = document.querySelectorAll('[data-i18n-alt]');
  altElements.forEach(element => {
    const key = element.getAttribute('data-i18n-alt');
    const translation = translations[currentLang][key];

    if (translation) {
      element.alt = translation;
    }
  });

  // Update elements with data-i18n-aria-label attribute for aria-label
  const ariaElements = document.querySelectorAll('[data-i18n-aria-label]');
  ariaElements.forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    const translation = translations[currentLang][key];

    if (translation) {
      element.setAttribute('aria-label', translation);
    }
  });

  // Update select options
  const optionElements = document.querySelectorAll('option[data-i18n]');
  optionElements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[currentLang][key];

    if (translation) {
      element.textContent = translation;
    }
  });
}

// Function to update language toggle button
function updateLanguageToggle() {
  const languageToggle = document.querySelector('.language-toggle');
  if (languageToggle) {
    languageToggle.textContent = translations[currentLang].nav_language;
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  updateLanguage(currentLang);

  // Add event listener to language toggle button
  const languageToggle = document.querySelector('.language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      // Toggle between Arabic and English
      const newLang = currentLang === 'ar' ? 'en' : 'ar';
      updateLanguage(newLang);
    });
  }
});

// Export functions for use in other scripts
window.tahadoI18n = {
  updateLanguage,
  currentLang: () => currentLang,
  translations
};
