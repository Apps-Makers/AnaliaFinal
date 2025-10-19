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

    // --- INICIO DE LA MEJORA SEO ---
    // Objeto que almacena los títulos para cada sección.
    // Esto es clave para que cada "página" tenga un título único para Google.
    const pageTitles = {
        // MODIFICADO: Título dinámico SEO para la home
        'home': 'Cigoto | Apoyo Escolar a Domicilio en San Vicente y Canning',
        'servicios': 'Servicios de Apoyo Escolar y Acompañamiento | Cigoto',
        'proyecto': 'Propuesta Pedagógica Personalizada | Cigoto',
        'educadores': 'Nuestro Equipo de Educadoras | Cigoto',
        'contacto': 'Contacto para Clases Particulares | Cigoto'
    };
    // --- FIN DE LA MEJORA SEO ---


    const showSection = (path) => {
        const targetId = path === '/' ? 'home' : path.substring(1);
        
        let sectionFound = false;
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                sectionFound = true;
            } else {
                section.classList.remove('active');
            }
        });
        
        const currentTargetId = sectionFound ? targetId : 'home';

        if (!sectionFound) {
            document.getElementById('home').classList.add('active');
        }
        
        // --- INICIO DE LA MEJORA SEO ---
        // Actualiza el título del documento (lo que se ve en la pestaña del navegador)
        // según la sección que se está mostrando.
        document.title = pageTitles[currentTargetId] || pageTitles['home'];
        // --- FIN DE LA MEJORA SEO ---

        window.scrollTo(0, 0);
    };

    const handleNavigation = (path) => {
        showSection(path);
        if (window.location.pathname !== path) {
            history.pushState({path: path}, '', path);
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const path = link.getAttribute('href');
            handleNavigation(path);
            
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('open');
            }
        });
    });

    window.addEventListener('popstate', (e) => {
        showSection(window.location.pathname);
    });

    showSection(window.location.pathname);

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
            if (index === 0) {
                img.classList.remove('opacity-0');
            } else {
                img.classList.add('opacity-0');
            }
        });
        
        setInterval(() => {
            images[currentIndex].classList.add('opacity-0');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.remove('opacity-0');
        }, 4000);
    };
    setupCarousel('image-carousel');
});
