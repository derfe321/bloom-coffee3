
// МОБИЛЬНОЕ МЕНЮ

const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('navigation');

menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');

    const isOpen = navigation.classList.contains('active');

    menuToggle.setAttribute('aria-expanded', isOpen);
});


// ЗАКРЫТИЕ МЕНЮ ПОСЛЕ ПЕРЕХОДА

const navigationLinks = document.querySelectorAll('.navigation a');

navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});


// ФОРМА ОБРАТНОЙ СВЯЗИ

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Проверка заполнения полей

    if (!name || !email || !message) {
        formStatus.textContent = 'Заполните все поля формы.';
        formStatus.style.color = '#b33a3a';
        return;
    }

    // Проверка наличия символа @

    if (!email.includes('@')) {
        formStatus.textContent = 'Введите корректный Email.';
        formStatus.style.color = '#b33a3a';
        return;
    }

    // Проверка структуры Email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formStatus.textContent = 'Проверьте правильность Email.';
        formStatus.style.color = '#b33a3a';
        return;
    }

    // Демонстрация успешной отправки

    formStatus.textContent =
        'Спасибо, ' + name + '! Ваше сообщение принято.';

    formStatus.style.color = '#527c49';

    contactForm.reset();

});
// АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ

const revealElements = document.querySelectorAll(
    '.about-grid, .section-heading, .menu-card, .gallery-grid img, .contacts-grid'
);

revealElements.forEach(element => {
    element.classList.add('reveal');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    observer.observe(element);
});

// ИНТЕРАКТИВНАЯ ГАЛЕРЕЯ

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

const galleryImages = document.querySelectorAll('.gallery-grid img');

// Открытие фотографии

galleryImages.forEach(image => {
    image.addEventListener('click', () => {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add('active');

        document.body.style.overflow = 'hidden';
    });
});

// Закрытие фотографии

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Кнопка закрытия

lightboxClose.addEventListener('click', closeLightbox);

// Закрытие при нажатии на фон

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Закрытие клавишей Escape

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
