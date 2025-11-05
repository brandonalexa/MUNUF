// Formulario de Dudas
document.getElementById('dudasForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('form-message');
    const submitButton = form.querySelector('.submit-button');
    
    // Animación del botón
    submitButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitButton.style.transform = '';
    }, 200);
    
    // Simular envío del formulario
    // En una implementación real, aquí se enviaría a un servidor
    setTimeout(() => {
        messageDiv.textContent = '¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.';
        messageDiv.className = 'form-message success';
        messageDiv.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Limpiar el formulario
        form.reset();
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'fadeIn 0.5s ease-out reverse';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 500);
        }, 5000);
    }, 500);
});

// Animación suave al hacer scroll con Intersection Observer mejorado
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.commission-card, .contact-info, .dudas-form, .category-title, .responsibility-card, .what-is-card, .benefit-card, .rubric-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Efecto parallax suave en el header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animación de números o elementos con efecto de conteo
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

