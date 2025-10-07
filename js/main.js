document.addEventListener('DOMContentLoaded', function() {
    // --- Código existente que ya funcionaba ---
    lucide.createIcons();
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('header a[href^="#"]');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const showSection = (hash) => {
        const targetHash = (hash && hash !== '#') ? hash : '#home';
        const targetId = targetHash.substring(1);
        let sectionFound = false;
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                sectionFound = true;
            } else {
                section.classList.remove('active');
            }
        });
        if (!sectionFound) {
            document.getElementById('home').classList.add('active');
        }
        if (history.pushState) {
            history.pushState(null, null, targetHash);
        } else {
            location.hash = targetHash;
        }
        window.scrollTo(0, 0);
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = link.getAttribute('href');
            showSection(hash);
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('open');
            }
        });
    });

    window.addEventListener('popstate', () => {
        showSection(window.location.hash);
    });
    showSection(window.location.hash);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.classList.toggle('open');
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    const emailModal = document.getElementById('email-modal');
    const modalContent = emailModal.querySelector('div');
    const emailButton = document.getElementById('email-button');
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const cancelCopyBtn = document.getElementById('cancel-copy-btn');
    const emailToCopy = document.getElementById('email-to-copy');

    const openModal = () => {
        emailModal.classList.remove('hidden');
        setTimeout(() => {
            emailModal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95', 'opacity-0');
        }, 10);
    };

    const closeModal = () => {
        emailModal.classList.add('opacity-0');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            emailModal.classList.add('hidden');
            copyEmailBtn.textContent = 'Copiar';
            copyEmailBtn.disabled = false;
        }, 300);
    };

    emailButton.addEventListener('click', openModal);
    cancelCopyBtn.addEventListener('click', closeModal);
    emailModal.addEventListener('click', (event) => {
        if (event.target === emailModal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !emailModal.classList.contains('hidden')) closeModal();
    });

    copyEmailBtn.addEventListener('click', () => {
        const text = emailToCopy.textContent;
        navigator.clipboard.writeText(text).then(() => {
            copyEmailBtn.textContent = '¡Copiado!';
            copyEmailBtn.disabled = true;
            setTimeout(closeModal, 1500);
        }).catch(err => {
            console.error('No se pudo copiar el texto: ', err);
            copyEmailBtn.textContent = 'Error';
        });
    });

    // --- CÓDIGO DEL CARROUSEL MEJORADO ---
    const setupCarousel = (carouselId) => {
        const carouselContainer = document.getElementById(carouselId);
        if (!carouselContainer) return;

        const images = Array.from(carouselContainer.getElementsByTagName('img'));
        if (images.length < 2) return;

        let currentIndex = 0;

        // Asegurarse de que la primera imagen sea visible inmediatamente.
        images.forEach((img, index) => {
            if (index === 0) {
                img.classList.remove('opacity-0');
            } else {
                img.classList.add('opacity-0');
            }
        });

        // Iniciar el intervalo para cambiar las imágenes.
        setInterval(() => {
            images[currentIndex].classList.add('opacity-0');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.remove('opacity-0');
        }, 4000); // Aumenté un poco el tiempo a 4 segundos para mejor visualización.
    };

    // Iniciar el carrusel
    setupCarousel('image-carousel');
});
