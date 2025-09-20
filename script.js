// --- SCRIPT PARA ICONOS DE LUCIDE ---
lucide.createIcons();

// --- SCRIPT PARA EL MENÚ MÓVIL ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- FUNCIÓN PARA MANEJAR ERRORES DE IMAGEN ---
const imageFormats = ['.png', '.jpg', '.jpeg', '.webp'];
function tryNextFormat(img, baseName) {
    // Obtener el índice del formato actual o empezar en 0 si no está definido
    let currentIndex = parseInt(img.dataset.formatIndex || '-1');
    
    // Intentar con el siguiente formato de la lista
    const nextIndex = currentIndex + 1;

    if (nextIndex < imageFormats.length) {
        // Actualizar el índice en el elemento
        img.dataset.formatIndex = nextIndex;
        // Probar el siguiente formato
        img.src = baseName + imageFormats[nextIndex];
    } else {
        // Si todos los formatos fallaron, mostrar el placeholder
        img.onerror = null; // Evitar bucles infinitos
        img.src = `https://placehold.co/600x800/111827/FFFFFF?text=Falta+imagen:%0A${baseName.split('/').pop()}.png`;
    }
}

// --- SCRIPT PARA LA NAVEGACIÓN Y FUNCIONALIDADES DE CONTACTO ---
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');

    function showTab(targetId) {
        pageSections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('animate-fadeIn');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            if (targetId !== 'hero') {
                 targetSection.classList.add('animate-fadeIn');
            }
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            const isTargetLink = link.dataset.target === targetId;
            link.classList.toggle('active', isTargetLink);
            if (link.closest('#desktop-nav')) {
                link.classList.toggle('border-b-2', isTargetLink);
                link.classList.toggle('border-black', isTargetLink);
            }
        });
        
        mobileMenu.classList.add('hidden');
        lucide.createIcons();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            if (targetId) {
                showTab(targetId);
                const targetSection = document.getElementById(targetId);
                if(targetSection){
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // --- SCRIPT PARA FILTRADO DE PORTFOLIO ---
    const filterContainer = document.getElementById('product-filters');
    if(filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('#product-gallery .product-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentActive = filterContainer.querySelector('.active');
                if (currentActive) {
                    currentActive.classList.remove('active', 'bg-black', 'text-white');
                    currentActive.classList.add('bg-gray-100', 'hover:bg-gray-200');
                }
                
                button.classList.add('active', 'bg-black', 'text-white');
                button.classList.remove('bg-gray-100', 'hover:bg-gray-200');
                
                const filter = button.dataset.filter;

                galleryItems.forEach(item => {
                    const isVisible = filter === 'all' || item.dataset.category === filter;
                    if (!isVisible) {
                        item.classList.add('hidden');
                    } else {
                        item.classList.remove('hidden');
                    }
                });
            });
        });
    }

    // --- SCRIPT PARA MODAL DE COPIAR EMAIL ---
    const emailCopyButton = document.getElementById('email-copy-button');
    const copyModal = document.getElementById('copy-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const copyButton = document.getElementById('copy-button');
    const emailToCopy = document.getElementById('email-text').innerText;

    if (emailCopyButton) {
        emailCopyButton.addEventListener('click', () => {
            copyModal.classList.remove('hidden');
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            copyModal.classList.add('hidden');
        });
    }
    
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const textArea = document.createElement('textarea');
            textArea.value = emailToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                copyButton.innerText = '¡Copiado!';
                copyButton.classList.remove('bg-black', 'hover:bg-gray-800');
                copyButton.classList.add('bg-green-500');
                setTimeout(() => {
                    copyButton.innerText = 'Copiar';
                    copyButton.classList.remove('bg-green-500');
                    copyButton.classList.add('bg-black', 'hover:bg-gray-800');
                }, 2000);
            } catch (err) {
                console.error('Error al intentar copiar el email: ', err);
                copyButton.innerText = 'Error';
            }
            document.body.removeChild(textArea);
        });
    }

    // --- SCRIPT PARA AÑO DINÁMICO EN FOOTER ---
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // --- SCRIPT PARA ANIMACIONES EN SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach(el => observer.observe(el));

    const staggerContainers = document.querySelectorAll('.stagger-animation');
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('.scroll-animate');
        children.forEach((child, index) => {
            child.style.setProperty('--stagger-delay', `${index * 150}ms`);
        });
    });

    // Mostrar la pestaña de inicio por defecto
    showTab('hero');
    setTimeout(() => lucide.createIcons(), 100);
});
