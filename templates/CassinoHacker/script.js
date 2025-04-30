document.addEventListener('DOMContentLoaded', function() {
    // Configuração do vídeo quando clicar na thumbnail
    const videoContainer = document.querySelector('.video-container');
    const videoThumb = document.getElementById('video-thumb');
    
    if (videoContainer && videoThumb) {
        videoContainer.addEventListener('click', function() {
            // URL do vídeo do YouTube
            const videoUrl = 'https://www.youtube.com/embed/RTrk0LuQMRY?autoplay=1&rel=0&controls=1&showinfo=0';
            
            // Substitui a thumbnail por um iframe
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', videoUrl);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '100%');
            iframe.style.aspectRatio = '16/9';
            
            // Remove a thumbnail e overlay
            while (videoContainer.firstChild) {
                videoContainer.removeChild(videoContainer.firstChild);
            }
            
            // Adiciona o iframe
            videoContainer.appendChild(iframe);
        });
    }
    
    // Botões CTA - adicionar atributos de analytics ou links
    const ctaButtons = document.querySelectorAll('.action-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Inserir o link de destino para o botão
            window.location.href = "https://seu-link-de-oferta.com";
            
            // Ou abrir em nova aba
            // window.open("https://seu-link-de-oferta.com", "_blank");
        });
    });
    
    // Adicionando efeito hover nos ícones de pagamento
    const paymentIcons = document.querySelectorAll('.payment-icons i');
    paymentIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('payment-icon-animated');
        }, 100 * index);
    });
    
    // Animação de entrada suave dos elementos
    function fadeInElements() {
        const elements = document.querySelectorAll('.main-text, .video-container, .action-button, .payment-methods, .payment-security');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
            }, 300 * index);
        });
    }
    
    // Aplicar opacidade 0 inicialmente
    const elementsToAnimate = document.querySelectorAll('.main-text, .video-container, .action-button, .payment-methods, .payment-security');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease-in-out';
    });
    
    // Iniciar animação após pequeno delay
    setTimeout(fadeInElements, 300);
});
