// ===== Preloader =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o preloader
    const preloader = document.querySelector('.preloader');
    
    // Esconde o preloader após o carregamento da página
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            // Inicia animação de contagem
            startCounters();
            // Inicializa AOS
            initAOS();
        }, 500);
    });
    
    // Inicializa o Isotope para o portfolio
    initIsotope();
    
    // Inicializa os eventos de scroll
    initScrollEvents();
    
    // Inicializa o toggle de tema
    initThemeToggle();
    
    // Inicializa o chatbot
    initChatbot();
    
    // Inicializa o menu móvel
    initMobileMenu();
    
    // Inicializar novas funções
    initScrollAnimations();
    initCounters();
    initPortfolioFilter();
    initParallaxEffect();
    initFaqCards(); // Inicializa os novos cards de FAQ
    
    // Efeito de digitação para o Hero
    initTypingEffect();
    
    // Adicionar inicialização para animações na seção de tecnologias
    initTechAnimations();
    
    // Sincronizar cores
    syncTechColors();
    
    // Adicionar ouvinte para o botão de alternar tema
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            // Aguardar um pequeno tempo para o tema ser alterado
            setTimeout(syncTechColors, 50);
        });
    }
});

// Função para inicializar o AOS (Animate On Scroll)
function initAOS() {
    AOS.init({
        duration: 500,
        easing: 'ease-out',
        once: true,
        mirror: false,
        offset: 50
    });
}

// Função para inicializar o Isotope (filtro de portfolio)
function initIsotope() {
    // Verifica se o elemento existe
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    // Inicializa o Isotope após um pequeno delay para garantir que as imagens estejam carregadas
    setTimeout(() => {
        const iso = new Isotope(portfolioGrid, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
        
        // Filtros de portfolio
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove a classe active de todos os botões
                filterBtns.forEach(b => b.classList.remove('active'));
                // Adiciona a classe active ao botão clicado
                btn.classList.add('active');
                
                // Filtra os itens
                const filterValue = btn.getAttribute('data-filter');
                iso.arrange({ filter: filterValue === '*' ? null : filterValue });
            });
        });
    }, 100);
}

// Função para inicializar eventos de scroll
function initScrollEvents() {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section');
    const logoLight = document.querySelector('.logo-light');
    const logoDark = document.querySelector('.logo-dark');
    
    // Verifica se os elementos existem
    if (!navbar || !heroSection) return;
    
    // Altura do hero para detectar quando passar por ele
    const heroHeight = heroSection.offsetHeight;
    
    // Função para verificar o scroll
    function checkScroll() {
        // Adiciona ou remove a classe scrolled do navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            
            // Exibe a logo apropriada com base no tema atual
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                if (logoLight) logoLight.style.display = 'block';
                if (logoDark) logoDark.style.display = 'none';
            } else {
                if (logoLight) logoLight.style.display = 'none';
                if (logoDark) logoDark.style.display = 'block';
            }
        } else {
            navbar.classList.remove('scrolled');
            
            // No topo da página, no tema claro, mostra a logo escura
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                if (logoLight) logoLight.style.display = 'block';
                if (logoDark) logoDark.style.display = 'none';
            } else {
                // No topo e tema claro, mostra a logo escura (tema dark)
                if (logoLight) logoLight.style.display = 'block';
                if (logoDark) logoDark.style.display = 'none';
            }
        }
    }
    
    // Verifica o scroll inicial
    checkScroll();
    
    // Adiciona o evento de scroll
    window.addEventListener('scroll', checkScroll);
    
    // Adiciona um ouvinte para alterações de tema
    const themeToggle = document.querySelector('.theme-switch');
    if (themeToggle) {
        themeToggle.addEventListener('click', checkScroll);
    }
}

// Função para inicializar o toggle de tema
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-switch');
    
    // Verifica se o elemento existe
    if (!themeToggle) return;
    
    // Verifica se há um tema salvo no localStorage
    const currentTheme = localStorage.getItem('theme');
    
    // Define o tema com base na preferência salva ou preferência do sistema
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    } else {
        // Verifica a preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }
    
    // Adiciona o evento de clique no botão de tema
    themeToggle.addEventListener('click', () => {
        // Obtem o tema atual
        const currentTheme = document.documentElement.getAttribute('data-theme');
        // Define o novo tema
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        // Atualiza o tema
        document.documentElement.setAttribute('data-theme', newTheme);
        // Atualiza o ícone
        updateThemeIcon(newTheme);
        // Salva a preferência no localStorage
        localStorage.setItem('theme', newTheme);
    });
    
    // Função para atualizar o ícone do tema
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Função para inicializar o chatbot
function initChatbot() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chatbot-container');
    const chatClose = document.querySelector('.chatbot-close');
    const minimizeButton = document.querySelector('.chatbot-action');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chatbot-messages');
    const chatBadge = document.querySelector('.chat-badge');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    
    // Verifica se os elementos existem
    if (!chatToggle || !chatContainer) return;
    
    // Mostra badge após 3 segundos
    setTimeout(() => {
        if (chatBadge) chatBadge.style.display = 'flex';
    }, 3000);
    
    // Adiciona o evento de clique no botão de chat
    chatToggle.addEventListener('click', () => {
        // Se já estiver ativo, fecha o chat
        if (chatContainer.classList.contains('active')) {
            chatContainer.classList.remove('active');
            chatToggle.classList.remove('active');
            return;
        }
        
        // Caso contrário, abre o chat
        chatContainer.classList.add('active');
        chatToggle.classList.add('active');
        if (chatBadge) chatBadge.style.display = 'none';
        
        // Adiciona efeito de animação ao abrir o chat
        setTimeout(() => {
            // Foca no campo de entrada após abrir o chat
            if (messageInput) messageInput.focus();
        }, 500);
    });
    
    // Adiciona o evento para botão minimizar
    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            chatContainer.classList.toggle('minimized');
            // Alterna o ícone do botão
            const icon = minimizeButton.querySelector('i');
            if (icon) {
                icon.className = chatContainer.classList.contains('minimized') ? 
                    'fas fa-plus' : 'fas fa-minus';
            }
        });
    }
    
    // Adiciona o evento de clique no botão de fechar
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatContainer.classList.remove('active');
            chatToggle.classList.remove('active');
        });
    }
    
    // Habilita/desabilita o botão de enviar com base no conteúdo do input
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            sendButton.disabled = messageInput.value.trim() === '';
        });
        
        // Envia a mensagem ao pressionar Enter
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && messageInput.value.trim() !== '') {
                sendMessage();
            }
        });
    }
    
    // Adiciona o evento de clique no botão de enviar
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Adiciona evento de clique aos botões de sugestão
    if (suggestionButtons) {
        suggestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const text = button.textContent.trim();
                // Adiciona a mensagem como se fosse do usuário
                addUserMessage(text);
                // Processa a resposta
                processResponse(text);
                
                // Esconde os botões de sugestão após clicar em um deles
                const suggestionsContainer = document.querySelector('.chatbot-suggestions');
                if (suggestionsContainer) {
                    suggestionsContainer.style.display = 'none';
                }
            });
        });
    }
    
    // Função para enviar a mensagem
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;
        
        // Adiciona a mensagem do usuário
        addUserMessage(message);
        
        // Limpa o input
        messageInput.value = '';
        sendButton.disabled = true;
        
        // Processa a resposta
        processResponse(message);
    }
    
    // Função para processar a resposta com base na mensagem
    function processResponse(message) {
        // Mostra o indicador de digitação
        showTypingIndicator();
        
        // Simula o tempo de resposta (entre 1 e 2 segundos)
        const responseTime = Math.floor(Math.random() * 1000) + 1000;
        
        setTimeout(() => {
            hideTypingIndicator();
            
            // Resposta baseada em palavras-chave
            const lowerMessage = message.toLowerCase();
            let response = '';
            
            if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('custo') || lowerMessage.includes('plano')) {
                response = `Temos ótimos planos para seu projeto:<br>
                - <strong>Landing Page Básica</strong>: R$ 997<br>
                - <strong>Landing Page Premium</strong>: R$ 1.997<br>
                - <strong>Site Completo</strong>: R$ 2.997<br><br>
                Quer saber mais detalhes sobre algum plano específico?`;
            } 
            else if (lowerMessage.includes('prazo') || lowerMessage.includes('tempo') || lowerMessage.includes('entrega')) {
                response = `Nossos prazos de entrega são:<br>
                - <strong>Landing Page Básica</strong>: 5 dias úteis<br>
                - <strong>Landing Page Premium</strong>: 7 dias úteis<br>
                - <strong>Site Completo</strong>: 10-15 dias úteis<br><br>
                Esses prazos podem variar dependendo da complexidade do projeto e da disponibilidade de conteúdo.`;
            } 
            else if (lowerMessage.includes('contato') || lowerMessage.includes('falar') || lowerMessage.includes('consultor') || lowerMessage.includes('whatsapp')) {
                response = `Você pode entrar em contato diretamente:<br>
                - <strong>WhatsApp</strong>: (31) 98411-9592<br>
                - <strong>Email</strong>: contato@landcriativa.com.br<br>
                - <strong>Agendar reunião</strong>: <a href="https://calendly.com/landcriativa" target="_blank">Calendly</a><br><br>
                Nosso time está disponível de segunda a sexta, das 9h às 18h.`;
            } 
            else if (lowerMessage.includes('portfólio') || lowerMessage.includes('projetos') || lowerMessage.includes('trabalhos')) {
                response = `Temos diversos projetos em nosso portfólio! Você pode ver alguns em nossa <a href="../projetos.html">página de projetos</a>.<br><br>
                Trabalhamos com clientes de vários segmentos como e-commerce, serviços, infoprodutos e eventos. Qual é o seu tipo de negócio?`;
            }
            else {
                response = `Obrigado pelo seu contato! Estou aqui para ajudar com informações sobre nossos serviços de criação de landing pages e sites.<br><br>
                Você pode me perguntar sobre preços, prazos de entrega, nosso portfólio ou falar diretamente com um de nossos consultores.`;
            }
            
            addBotMessage(response);
        }, responseTime);
    }
    
    // Função para adicionar mensagem do usuário
    function addUserMessage(text) {
        const currentTime = getCurrentTime();
        const message = document.createElement('div');
        message.classList.add('message', 'user-message');
        message.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">${currentTime}</span>
        `;
        chatMessages.appendChild(message);
        scrollToBottom();
    }
    
    // Função para adicionar mensagem do bot
    function addBotMessage(text) {
        const currentTime = getCurrentTime();
        const message = document.createElement('div');
        message.classList.add('message', 'bot-message');
        message.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">${currentTime}</span>
        `;
        chatMessages.appendChild(message);
        scrollToBottom();
    }
    
    // Função para obter o horário atual formatado
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // Adiciona zero à esquerda se necessário
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes}`;
    }
    
    // Função para mostrar o indicador de digitação
    function showTypingIndicator() {
        const typing = document.querySelector('.typing-indicator');
        if (typing) typing.style.display = 'flex';
        scrollToBottom();
    }
    
    // Função para esconder o indicador de digitação
    function hideTypingIndicator() {
        const typing = document.querySelector('.typing-indicator');
        if (typing) typing.style.display = 'none';
    }
    
    // Função para rolar para o final da conversa
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Função para inicializar o menu móvel
function initMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Verifica se os elementos existem
    if (!navLinks.length) return;
    
    // Adiciona o evento de clique nos links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Fecha o menu móvel
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Usa o Bootstrap para fechar o menu
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        });
    });
}

// Função para iniciar os contadores
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    
    // Verifica se os elementos existem
    if (!counters.length) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const speed = 2000 / target; // Ajusta a velocidade com base no valor alvo
        
        function updateCount() {
            if (count < target) {
                count++;
                counter.textContent = count;
                setTimeout(updateCount, speed);
            }
        }
        
        // Inicia a animação
        updateCount();
    });
}

// Função para animações ao scroll usando Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.beneficio-card, .timeline-item, .portfolio-card, .testemunho-card, .plano-card, .faq-item, section h2, .secao-titulo, .cta-content');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        appearOnScroll.observe(element);
    });
}

// Contador animado para estatísticas
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // Velocidade da animação (menor = mais rápido)
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Filtro de portfólio
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrar os itens
            portfolioItems.forEach(item => {
                if (filter === 'todos') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else if (item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Efeito de paralaxe no background
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.15;
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Função para efeito de digitação do título
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
}

// Função para inicializar os cards de FAQ
function initFaqCards() {
    const faqCards = document.querySelectorAll('.faq-card');
    if (!faqCards.length) return;
    
    // Define o primeiro card como ativo por padrão
    faqCards[0].classList.add('active');
    
    // Adiciona evento de clique em cada card
    faqCards.forEach(card => {
        const header = card.querySelector('.faq-card-header');
        
        header.addEventListener('click', () => {
            // Verifica se o card já está ativo
            const isActive = card.classList.contains('active');
            
            // Fecha todos os cards
            faqCards.forEach(c => c.classList.remove('active'));
            
            // Se o card clicado não estava ativo, abre ele
            if (!isActive) {
                card.classList.add('active');
            }
            
            // Efeito de scroll suave para centralizar o card ativo em dispositivos móveis
            if (window.innerWidth < 768 && !isActive) {
                setTimeout(() => {
                    const cardTop = card.getBoundingClientRect().top;
                    const offset = cardTop + window.scrollY - 120;
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

// Adicionar estilos CSS para as animações
document.head.insertAdjacentHTML('beforeend', `
<style>
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    
    .appear {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Adicionar delay escalonado para os elementos */
    .beneficio-card:nth-child(2) { transition-delay: 0.1s; }
    .beneficio-card:nth-child(3) { transition-delay: 0.2s; }
    
    .timeline-item:nth-child(2) { transition-delay: 0.1s; }
    .timeline-item:nth-child(3) { transition-delay: 0.2s; }
    .timeline-item:nth-child(4) { transition-delay: 0.3s; }
    
    .portfolio-filter button {
        transition: all 0.3s ease;
    }
    
    .portfolio-filter button.active {
        background: var(--primary-gradient);
        color: white;
    }
    
    .portfolio-card {
        transition: all 0.4s ease;
    }
    
    .parallax-bg {
        will-change: transform;
    }
</style>
`);

// Adicionar inicialização para animações na seção de tecnologias
function initTechAnimations() {
    // Verificar se a seção existe
    const techSection = document.querySelector('.tecnologias-section');
    if (!techSection) return;
    
    // Selecionar todos os tech-items
    const techItems = document.querySelectorAll('.tech-item');
    
    // Adicionar evento de hover para destacar cada item
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Adicionar classe de destaque
            item.classList.add('tech-highlight');
            // Remover a classe após a saída
            item.addEventListener('mouseleave', () => {
                item.classList.remove('tech-highlight');
            }, { once: true });
        });
    });
    
    // Verificar quando os elementos entram na viewport para animar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Desconectar o observer após a animação
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Selecionar elementos para observar
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Adicionando função para sincronizar cores das ondas com as seções no tema escuro
function syncTechColors() {
    // Verifica se o tema atual é escuro
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Obtém as cores corretas de acordo com o tema
    const techBgColor = isDarkTheme ? '#153a5f' : '#0d3b66';
    
    // Ajusta a cor da onda do portfolio para corresponder exatamente ao fundo da seção de tecnologias
    const portfolioWavePath = document.querySelector('.portfolio-section .wave-divider svg path');
    if (portfolioWavePath) {
        portfolioWavePath.setAttribute('fill', techBgColor);
        portfolioWavePath.style.fill = techBgColor;
    }
} 