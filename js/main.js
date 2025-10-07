document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para reemplazar imágenes rotas ---
    document.addEventListener('error', function(event) {
        if (event.target.tagName.toLowerCase() !== 'img') return;
        const img = event.target;
        if (img.dataset.fallbackApplied === 'true') return;
        img.dataset.fallbackApplied = 'true';
        img.src = 'images/box.png';
    }, true);

    lucide.createIcons();
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('header a[href^="/"]');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const showSection = (path) => {
        // Convierte la ruta (ej. "/servicios") en un ID (ej. "servicios")
        const targetId = path === '/' ? 'home' : path.substring(1);
        
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        window.scrollTo(0, 0);
    };

    const handleNavigation = (path) => {
        showSection(path);
        // Usa la History API para cambiar la URL sin recargar la página
        history.pushState({path: path}, '', path);
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Evita que el navegador recargue la página
            e.preventDefault();
            const path = link.getAttribute('href');
            handleNavigation(path);
            
            // Cierra el menú móvil si está abierto
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('open');
            }
        });
    });

    // Maneja los botones de "atrás" y "adelante" del navegador
    window.addEventListener('popstate', (e) => {
        showSection(window.location.pathname);
    });

    // Muestra la sección correcta al cargar la página por primera vez o al refrescar
    showSection(window.location.pathname);

    // --- Código existente que no necesita cambios ---
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
        navigator.clipboard.writeText(emailToCopy.textContent).then(() => {
            copyEmailBtn.textContent = '¡Copiado!';
            copyEmailBtn.disabled = true;
            setTimeout(closeModal, 1500);
        }).catch(err => {
            console.error('No se pudo copiar el texto: ', err);
            copyEmailBtn.textContent = 'Error';
        });
    });

    const setupCarousel = (carouselId) => {
        const carouselContainer = document.getElementById(carouselId);
        if (!carouselContainer) return;
        const images = Array.from(carouselContainer.getElementsByTagName('img'));
        if (images.length < 2) return;
        let currentIndex = 0;
        images.forEach((img, index) => {
            img.classList.toggle('opacity-0', index !== 0);
        });
        setInterval(() => {
            images[currentIndex].classList.add('opacity-0');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.remove('opacity-0');
        }, 4000);
    };
    setupCarousel('image-carousel');
});
