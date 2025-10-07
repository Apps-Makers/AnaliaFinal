document.addEventListener('DOMContentLoaded', function() {
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
        if(history.pushState) {
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
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            copyEmailBtn.textContent = '¡Copiado!';
            copyEmailBtn.disabled = true;
            setTimeout(closeModal, 1500);
        } catch (err) {
            console.error('No se pudo copiar el texto: ', err);
            copyEmailBtn.textContent = 'Error';
        }
        document.body.removeChild(textArea);
    });

    document.addEventListener('error', function (event) {
        if (event.target.tagName.toLowerCase() !== 'img') return;
        const img = event.target;
        if (img.src.includes('placehold.co')) return;
        
        const showErrorPlaceholder = () => {
            const width = img.offsetWidth > 0 ? img.offsetWidth : 600;
            const height = img.offsetHeight > 0 ? img.offsetHeight : 400;
            const originalSrcPath = img.dataset.originalSrc || img.getAttribute('src');
            img.src = `https://placehold.co/${width}x${height}/E7D9C7/1B4D3E?text=Ruta: ${encodeURIComponent(originalSrcPath)}`;
            console.warn(`No se pudo cargar la imagen: ${originalSrcPath}`);
        };

        if (!img.dataset.originalSrc) {
            img.dataset.originalSrc = img.getAttribute('src');
        }
        if (img.dataset.fallbackTried === 'true') {
            showErrorPlaceholder();
            return;
        }
        img.dataset.fallbackTried = 'true';

        const originalPath = img.dataset.originalSrc;
        let fallbackSrc;
        if (originalPath.toLowerCase().endsWith('.jpg')) {
            fallbackSrc = originalPath.replace(/\.jpg$/i, '.png');
        } else if (originalPath.toLowerCase().endsWith('.png')) {
            fallbackSrc = originalPath.replace(/\.png$/i, '.jpg');
        } else {
            showErrorPlaceholder();
            return;
        }
        img.src = fallbackSrc;
    }, true);
});

window.addEventListener('load', () => {
    const setupCarousel = (carouselId) => {
        const carouselContainer = document.getElementById(carouselId);
        if (!carouselContainer) return;
        const images = Array.from(carouselContainer.getElementsByTagName('img'));
        if (images.length < 2) return;
        let currentIndex = 0;
        setInterval(() => {
            images[currentIndex].classList.add('opacity-0');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.remove('opacity-0');
        }, 3000);
    };
    setupCarousel('image-carousel');
});

