// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Immediate active state on click (useful for smooth-scroll jumps)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);

    // Ensure 'Contacto' link is active when reaching the very bottom of the page
    if (window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight - 2) {
        navLinks.forEach(links => links.classList.remove('active'));
        const contactLink = document.querySelector('header nav a[href*="contact"]');
        if (contactLink) contactLink.classList.add('active');
    }
}

// ================== Modal Functionality ==================
document.addEventListener('DOMContentLoaded', () => {
    const projectBoxes = document.querySelectorAll('.project-box');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const closeModalBtn = document.querySelector('.close-btn');

    // Mapeamento dos projetos para fácil acesso
    const projectsData = {
        'video1': {
            title: 'Projeto de Vídeo - Stop Motion',
            description: 'Demonstração de técnicas para criação de vídeo Stop Motion através da aplicação Stop Motion e edição no software CapCut. O projeto explora a criatividade na captura de imagens sequenciais e sua montagem para criar a ilusão de movimento, resultando numa peça visualmente dinâmica.',
            mediaSrc: 'videos/pos-producao-elvio.mp4',
            mediaType: 'video'
        },
        'video2': {
            title: 'Projeto de Vídeo - Documentário',
            description: 'Criação de um documentário sobre gatos, estilo notícia, com edição de imagem, som, texto e efeitos visuais no software CapCut Desktop.',
            mediaSrc: 'videos/elvio-correia-ufcd-9965.mp4',
            mediaType: 'video'
        },
        'video3': {
            title: 'Design Gráfico - Mupi',
            description: 'Criação de um Mupi através da aplicação Figma para o design, com edição de vídeo realizada no software CapCut.',
            mediaSrc: 'videos/Mupi Edp (2).mp4',
            mediaType: 'video'
        },
        'image1': {
            title: 'Design Gráfico - WebBanner',
            description: 'Um exemplo de trabalho de design gráfico com um WebBanner com elementos visuais impactantes. Este projeto foi criado para demonstrar a utilização de cores, tipografia e layout de forma harmoniosa e profissional.',
            mediaSrc: 'img/Frame 1.png',
            mediaType: 'image'
        },
        'image2': {
            title: 'Design Gráfico - WebBanner',
            description: 'Mais um exemplo de design gráfico, com um WebBanner focado em elementos visuais impactantes. O design procura captar a atenção do utilizador de forma rápida e eficaz.',
            mediaSrc: 'img/Frame 2.png',
            mediaType: 'image'
        },
        'image3': {
            title: 'Design Gráfico - Banner para Viagens',
            description: 'Exemplo de um banner de viagens com elementos visuais de forte impacto. O design utiliza cores vibrantes e imagens de alta qualidade para evocar uma sensação de aventura e desejo de viajar.',
            mediaSrc: 'img/Frame 3.png',
            mediaType: 'image'
        },
        'image4': {
            title: 'Design Gráfico - Moodboards',
            description: 'Criação de Moodboards para uma loja de animais, com foco em elementos visuais marcantes. Os Moodboards serviram como inspiração para a identidade visual da marca, definindo a paleta de cores e o estilo geral.',
            mediaSrc: 'img/Moodboards.png',
            mediaType: 'image'
        },
        'image5': {
            title: 'Design Gráfico - App Mobile',
            description: 'Demonstração de um ecrã inicial de uma aplicação sobre Saúde Mental, desenhada no Figma com base nas Heurísticas de Nielsen. A interface foi projetada para ser intuitiva, acessível e visualmente agradável.',
            mediaSrc: 'img/App Telemovel.png',
            mediaType: 'image'
        },
        'image6': {
            title: 'Design Gráfico - Banner para Restaurante',
            description: 'Banner para restaurante, com design focado em elementos visuais impactantes. A imagem destaca a qualidade da comida e o ambiente acolhedor, utilizando uma tipografia elegante e cores quentes.',
            mediaSrc: 'img/restaurante.png',
            mediaType: 'image'
        },
        'image7': {
            title: 'Design Gráfico - Post de Instagram',
            description: 'Post de Instagram para uma loja de tecnologia, com elementos visuais marcantes. O design foi otimizado para as redes sociais, com informações claras e um apelo visual forte.',
            mediaSrc: 'img/postinstagram.png',
            mediaType: 'image'
        },
        'image8': {
            title: 'Design Gráfico - Banner para Formação',
            description: 'Banner para formação, com design focado em elementos visuais de forte impacto. A intenção é comunicar de forma eficaz os benefícios do curso e atrair potenciais alunos.',
            mediaSrc: 'img/formaçãopost.png',
            mediaType: 'image'
        },
        'image9': {
            title: 'Design Gráfico - Post de Instagram (Imobiliária)',
            description: 'Post de Instagram para imobiliária, com elementos visuais de forte impacto. O design realça as características do imóvel de forma profissional e apelativa.',
            mediaSrc: 'img/instagrampost2.png',
            mediaType: 'image'
        },
        'image10': {
            title: 'Design Gráfico - Banner para Mobiliário',
            description: 'Banner para mobiliário, com design focado em elementos visuais marcantes. O banner destaca os detalhes do produto e o seu design moderno, incentivando a compra.',
            mediaSrc: 'img/sofa.png',
            mediaType: 'image'
        },
        'image11': {
            title: 'Design Gráfico - Post de Instagram (Restaurante)',
            description: 'Post de Instagram para restaurante, com elementos visuais impactantes. A imagem apresenta um prato de forma tentadora, com texto que convida o público a visitar o estabelecimento.',
            mediaSrc: 'img/instagrampost3.png',
            mediaType: 'image'
        },
        'socialmedia1': {
            title: 'Social Media 1',
            description: 'Design direcionado para moda, lojas de roupa, joias com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia1.png',
            mediaType: 'image'
        },
        'socialmedia2': {
            title: 'Social Media 2',
            description: 'Design direcionado para promoções black friday com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia2.png',
            mediaType: 'image'
        },
        'socialmedia3': {
            title: 'Social Media 3',
            description: 'Design direcionado para nova coleção de roupa femenina com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia3.png',
            mediaType: 'image'
        },
        'socialmedia4': {
            title: 'Social Media 4',
            description: 'Design direcionado para nova coleção de roupa femenina com promoções black friday.',
            mediaSrc: 'img/socialmedia4.png',
            mediaType: 'image'
        },
        'socialmedia5': {
            title: 'Social Media 5',
            description: 'Design direcionado para post instagram sobre lua de mel de casal com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia5.png',
            mediaType: 'image'
        },
        'socialmedia6': {
            title: 'Social Media 6',
            description: 'Design direcionado para post instagram sobre casal acabado de casar com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia6.png',
            mediaType: 'image'
        },
        'socialmedia7': {
            title: 'Social Media 7',
            description: 'Design direcionado para post instagram estilo convite de casamento com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia7.png',
            mediaType: 'image'
        },
        'socialmedia8': {
            title: 'Social Media 8',
            description: 'Design direcionado para post instagram para promover quinta com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia8.png',
            mediaType: 'image'
        },
        'socialmedia9': {
            title: 'Social Media 9',
            description: 'Design direcionado para post instagram para promover vinho do porto com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia9.png',
            mediaType: 'image'
        },
        'socialmedia10': {
            title: 'Social Media 10',
            description: 'Design direcionado para post instagram para promover viagens de lua de mel com elementos graficos impactantes.',
            mediaSrc: 'img/socialmedia10.png',
            mediaType: 'image'
        },
        'moodboarditaliaturismo': {
            title: 'Moodboard Italia Turismo',
            description: 'Design moodboard direcionado para um site de turismo para o país Itália com elementos graficos impactantes.',
            mediaSrc: 'img/moodboarditaliaturismo.png',
            mediaType: 'image'
        }
    };

    projectBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const projectId = box.getAttribute('data-project-id');
            const project = projectsData[projectId];

            if (project) {
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;

                // Reset media
                modalImage.style.display = 'none';
                modalVideo.style.display = 'none';
                modalVideo.pause();
                modalVideo.currentTime = 0;

                // Show the correct media
                if (project.mediaType === 'image') {
                    modalImage.src = project.mediaSrc;
                    modalImage.style.display = 'block';
                } else if (project.mediaType === 'video') {
                    modalVideo.querySelector('source').src = project.mediaSrc;
                    modalVideo.load();
                    modalVideo.style.display = 'block';
                    modalVideo.play();
                }

                modal.style.display = 'flex';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    });
});
