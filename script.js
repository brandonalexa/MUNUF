// Formulario de Dudas con Formspree
document.getElementById('dudasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('form-message');
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    
    // Animación del botón y deshabilitar
    submitButton.style.transform = 'scale(0.95)';
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        const response = await fetch('https://formspree.io/f/xqagrqko', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            messageDiv.textContent = '¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.';
            messageDiv.className = 'form-message success';
            messageDiv.style.animation = 'fadeInUp 0.5s ease-out';
            messageDiv.style.display = 'block';
            
            // Limpiar el formulario
            form.reset();
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(() => {
                messageDiv.style.animation = 'fadeIn 0.5s ease-out reverse';
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 500);
            }, 5000);
        } else {
            throw new Error('Error al enviar el formulario');
        }
    } catch (error) {
        messageDiv.textContent = 'Hubo un error al enviar tu consulta. Por favor, intenta nuevamente o contáctanos por WhatsApp.';
        messageDiv.className = 'form-message error';
        messageDiv.style.animation = 'fadeInUp 0.5s ease-out';
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.animation = 'fadeIn 0.5s ease-out reverse';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 500);
        }, 5000);
    } finally {
        // Restaurar botón
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.transform = '';
    }
});

// Page Index Navigation
document.addEventListener('DOMContentLoaded', function() {
    const pageIndex = document.getElementById('pageIndex');
    const indexLinks = document.querySelectorAll('.index-link');
    const sections = document.querySelectorAll('section[id]');
    let lastScrollTop = 0;
    const scrollThreshold = 200; // Mostrar índice después de 200px de scroll

    // Mostrar/ocultar índice según el scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            pageIndex.classList.add('visible');
        } else {
            pageIndex.classList.remove('visible');
        }

        // Actualizar enlace activo según la sección visible
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Actualizar clase activa en los enlaces
        indexLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        lastScrollTop = scrollTop;
    });

    // Scroll suave al hacer clic en los enlaces
    indexLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
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
    const animateElements = document.querySelectorAll('.commission-card, .contact-info, .dudas-form, .category-title, .responsibility-card, .what-is-card, .benefit-card, .rubric-item, .permission-category, .permission-option, .permission-note');
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

