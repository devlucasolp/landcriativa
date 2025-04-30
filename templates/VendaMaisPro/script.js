document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.page-overlay');
    const overlayMessage = document.querySelector('.overlay-message');
    const opcaoComprar = document.querySelector('.opcao-comprar');
    const opcaoVoltar = document.querySelector('.opcao-voltar');

    // Funcionalidade do botão de voltar ao site principal
    opcaoVoltar.addEventListener('click', function() {
        // Navega para a página de projetos
        window.location.href = "../../projetos.html#VendaMaisPro";
    });

    // Contador regressivo
    function startCountdown() {
        let timeLeft = 24 * 60 * 60; // 24 horas em segundos
        const countdownElement = document.getElementById('countdown');
        
        const timer = setInterval(() => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
            } else {
                timeLeft--;
            }
        }, 1000);
    }
    
    startCountdown();

    // Menu mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Função para fechar a aba
    function closeTab() {
        // Tenta fechar a aba
        window.close();
        
        // Se não conseguir fechar (alguns navegadores bloqueiam), tenta voltar
        setTimeout(() => {
            if (!window.closed) {
                window.history.back();
            }
        }, 100);
    }

    // Controle do overlay
    const pageOverlay = document.querySelector('.page-overlay');
    
    opcaoVoltar.addEventListener('mouseenter', function() {
        pageOverlay.style.opacity = '1';
        pageOverlay.style.visibility = 'visible';
        document.querySelector('.overlay-message').style.opacity = '1';
        document.querySelector('.overlay-message').style.transform = 'translateY(0)';
    });
    
    opcaoVoltar.addEventListener('mouseleave', function() {
        pageOverlay.style.opacity = '0';
        pageOverlay.style.visibility = 'hidden';
        document.querySelector('.overlay-message').style.opacity = '0';
        document.querySelector('.overlay-message').style.transform = 'translateY(20px)';
    });
}); 