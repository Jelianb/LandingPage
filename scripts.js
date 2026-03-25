// Esperar a que todo el DOM (HTML) esté cargado
document.addEventListener("DOMContentLoaded", function() {

    // 1. Scroll Suave y Compensación de Altura
    // Detecta clicks en enlaces que comienzan con #
    document.querySelectorAll('.smooth-scroll, .nav-link-custom').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Previene comportamiento por defecto

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula la posición del elemento menos la altura del nav
                const navHeight = document.querySelector('#main-nav').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - navHeight;

                // Scroll suave animado nativo
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 2. Cerrar menú móvil automáticamente al hacer click (para experiencia móvil)
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    // Si el menú móvil está abierto, cerrarlo
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // 3. Animaciones al Hacer Scroll (Intersection Observer API)
    // Detecta cuándo los elementos con la clase .card-animate entran en el viewport
    const animatedElements = document.querySelectorAll('.card-animate');

    const observerOptions = {
        root: null, // usa el viewport del navegador
        threshold: 0.15, // dispara cuando el 15% del elemento es visible
        rootMargin: "0px" // sin márgenes adicionales
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que dispara la animación CSS
                entry.target.classList.add('visible');
                // Deja de observar el elemento una vez animado (para que no se repita)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Activa el observador para cada elemento seleccionado
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

});