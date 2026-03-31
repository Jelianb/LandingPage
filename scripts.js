// Esperar a que todo el DOM (HTML) esté cargado de forma segura
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Scroll Suave y Compensación de Altura
    document.querySelectorAll('.nav-link-custom, .smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Verificamos que sea un ancla válida
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Evitamos el salto brusco nativo
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculamos la altura del menú para que no tape los títulos
                    const navHeight = document.querySelector('#main-nav').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - navHeight,
                        behavior: 'smooth'
                    });

                    // Cierre seguro del menú móvil (Solo si está abierto)
                    const navCollapse = document.getElementById('navbarContent');
                    if (navCollapse) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });

    // 2. Animaciones al Hacer Scroll (Intersection Observer API)
    // Opciones: El elemento se animará cuando el 15% sea visible en pantalla
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que dispara la animación CSS que hicimos antes
                entry.target.classList.add('visible');
                // Deja de observar el elemento para mejorar el rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todas las tarjetas/elementos y activamos el observador en cada uno
    document.querySelectorAll('.card-animate').forEach(el => scrollObserver.observe(el));

});
