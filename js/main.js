// /mi-proyecto/js/main.js

// --- SCRIPT PARA ICONOS DE LUCIDE ---
lucide.createIcons();

// --- SCRIPT PARA EL AÑO DEL COPYRIGHT ---
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// --- SCRIPT PARA EL MENÚ MÓVIL ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- SCRIPT PARA LA NAVEGACIÓN POR PESTAÑAS ---
const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page-section');
const navLinkButtons = document.querySelectorAll('.nav-link-button');

function showTab(targetId) {
    pageSections.forEach(section => {
        if (section.id === targetId) {
            section.classList.remove('hidden');
            section.classList.add('animate-fadeIn');
        } else {
            section.classList.add('hidden');
            section.classList.remove('animate-fadeIn');
        }
    });

    // Actualizar estado activo en enlaces de navegación
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === targetId);
    });
    
    // Ocultar menú móvil después de la selección
    mobileMenu.classList.add('hidden');
    window.scrollTo(0, 0);
    lucide.createIcons();
}

// Event listeners para enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.dataset.target;
        if (targetId) {
            showTab(targetId);
        }
    });
});

// Event listeners para botones que también son enlaces de navegación
navLinkButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.dataset.target;
        if (targetId) {
            showTab(targetId);
        }
    });
});

// --- SCRIPT PARA EL MODAL DE EMAIL ---
const emailModal = document.getElementById('email-modal');
const openEmailModalButton = document.getElementById('open-email-modal');
const closeModalButton = document.getElementById('close-modal-button');
const copyEmailButton = document.getElementById('copy-email-button');
const emailText = document.getElementById('email-text').textContent;

openEmailModalButton.addEventListener('click', () => {
    emailModal.classList.remove('hidden');
    emailModal.classList.add('flex');
});

closeModalButton.addEventListener('click', () => {
    emailModal.classList.add('hidden');
    emailModal.classList.remove('flex');
});

// Cerrar modal al hacer clic fuera de él
emailModal.addEventListener('click', (event) => {
    if (event.target === emailModal) {
        emailModal.classList.add('hidden');
        emailModal.classList.remove('flex');
    }
});

copyEmailButton.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
        copyEmailButton.textContent = '¡Copiado!';
        setTimeout(() => {
            copyEmailButton.textContent = 'Copiar';
        }, 2000);
    });
});

// --- SCRIPT PARA LAS IMÁGENES ---
// Función para intentar cargar una imagen con varias extensiones
const tryLoadImage = (container, basePath, extensions) => {
    const originalSrc = basePath + '.' + extensions[0]; // Para el mensaje de error
    
    const tryNextExtension = (index) => {
        if (index >= extensions.length) {
            // Si se probaron todas las extensiones y ninguna funcionó
            const errorDiv = document.createElement('div');
            errorDiv.className = container.className.replace('object-cover', '') + ' bg-gray-200 flex items-center justify-center shadow-sm text-center text-xs text-gray-500 p-2';
            errorDiv.innerHTML = `Error:<br>${originalSrc.split('/').pop()}`;
            if(container.parentNode) {
                container.parentNode.replaceChild(errorDiv, container);
            }
            return;
        }

        const path = basePath + '.' + extensions[index];
        const tempImg = new Image();
        tempImg.src = path;
        
        tempImg.onload = () => {
            // La imagen existe, la asignamos al elemento img real
            container.src = path;
        };
        
        tempImg.onerror = () => {
            // La imagen no existe, probamos la siguiente extensión
            tryNextExtension(index + 1);
        };
    };

    tryNextExtension(0);
};

function setupGallery(galleryId, imagePaths) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    imagePaths.forEach(basePath => {
        const img = document.createElement('img');
        img.alt = `Proyecto de ${galleryId.includes('primario') ? 'Nivel Primario' : 'Nivel Secundario'}`;
        img.className = 'aspect-square w-full h-full object-cover rounded-lg shadow-sm bg-gray-200';
        tryLoadImage(img, basePath, ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']);
        gallery.appendChild(img);
    });
}

// Crear listas de imágenes sin extensión (con la nueva ruta)
const primarioImages = Array.from({ length: 16 }, (_, i) => `data/Primario/foto${i + 1}`);
const secundarioImages = Array.from({ length: 8 }, (_, i) => `data/Secundario/foto${i + 1}`);

// Inicializar galerías
setupGallery('gallery-primario', primarioImages);
setupGallery('gallery-secundario', secundarioImages);

// Inicializar imágenes individuales (con la nueva ruta)
const servicioImg1 = document.getElementById('servicio-img-1');
if(servicioImg1) tryLoadImage(servicioImg1, 'data/Servicios/foto_arriba_1', ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']);

const servicioImg2 = document.getElementById('servicio-img-2');
if(servicioImg2) tryLoadImage(servicioImg2, 'data/Servicios/foto_arriba_2', ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']);

const servicioImg3 = document.getElementById('servicio-img-3');
if(servicioImg3) tryLoadImage(servicioImg3, 'data/Servicios/foto_abajo_grande', ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']);

// Mostrar la pestaña de inicio por defecto
showTab('inicio');
