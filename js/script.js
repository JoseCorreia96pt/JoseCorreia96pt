// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    const expanded = menuIcon.getAttribute('aria-expanded') === 'true';
    menuIcon.setAttribute('aria-expanded', (!expanded).toString());
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
    // Prevent background scroll updates when modal is open
    if (document.body.classList.contains('modal-open')) return;

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                const target = document.querySelector('header nav a[href*=' + id + ']');
                if (target) target.classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
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
    if (menuIcon) menuIcon.setAttribute('aria-expanded', 'false');

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

// ================== Projects Generation + Modal Functionality ==================
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');

    // Ajuste visual do botão de fechar do modal (remover fundo branco)
    const injectedStyle = document.createElement('style');
    injectedStyle.textContent = `
    .close-btn{background:transparent!important;border:none!important;box-shadow:none!important}
    .close-btn:focus{outline:2px solid var(--main-color);outline-offset:2px}
    `;
    document.head.appendChild(injectedStyle);
    // Preload das imagens principais dos projetos especiais
    const preload1 = document.createElement('link');
    preload1.rel = 'preload';
    preload1.as = 'image';
    preload1.href = 'assets/images/redessociais2.png';
    document.head.appendChild(preload1);
    const preload2 = document.createElement('link');
    preload2.rel = 'preload';
    preload2.as = 'image';
    preload2.href = 'assets/images/redessociais (1).png';
    document.head.appendChild(preload2);

    // Inventário conhecido de media físico (gerado a partir do diretório real)
    const videoFiles = [
        'clinicaesteticavideo.mp4',
        'Mupi Edp (2).mp4',
        'pos-producao-elvio.mp4',
        'videohotel.mp4',
        'videospa.mp4',
        'redessociais3 video.mp4',
        'redessociais4video.mp4',
    ];

    const imageFiles = [
        'about.png',
        'App Telemovel.png',
        'descrição (1).png',
        'descrição (5).png',
        'descrição (6).png',
        'descrição (7).png',
        'Descrição2 (1).png',
        'Descrição2 (2).png',
        'Descrição2 (3).png',
        'Descrição2 (4).png',
        'Elvio-Correia1.jpg',
        'elviocorreiaperfil.png',
        'Frame 1.png',
        'Frame 2.png',
        'Frame 3.png',
        'instagrampost3.png',
        'moodboarditaliaturismo.png',
        'Moodboards.png',
        'redessociais (1).png',
        'redessociais (2).png',
        'redessociais (3).png',
        'redessociais (4).png',
        'redessociais (5).png',
        'redessociais2 (1).png',
        'redessociais2 (2).png',
        'redessociais2 (3).png',
        'redessociais2 (4).png',
        'redessociais2 (5).png',
        'redessociais2.png',
        'socialmedia1.png',
        'socialmedia10.png',
        'socialmedia2.png',
        'socialmedia3.png',
        'socialmedia4.png',
        'socialmedia5.png',
        'socialmedia6.png',
        'socialmedia9.png',
        'verificado.png',
        'webdesign.jpg',
    ];

    const makeTitleFromFilename = (filename) => {
        const base = filename.replace(/\.[^/.]+$/, '');
        let t = base
            .replace(/[._-]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        // Inserir espaço entre letras e números, e entre minúscula e maiúscula
        t = t.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/([0-9])([A-Za-z])/g, '$1 $2');
        // Capitalização simples por palavra
        t = t.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return t;
    };

    const buildItem = (type, filename) => {
        const path = type === 'video' ? `assets/videos/${filename}` : `assets/images/${filename}`;
        const title = makeTitleFromFilename(filename);
        const description = type === 'video'
            ? `Vídeo de apresentação: ${title}`
            : `Imagem de projeto: ${title}`;
        return { type, filename, path, title, description };
    };

    const videos = videoFiles.map(fn => buildItem('video', fn))
        .sort((a, b) => a.filename.localeCompare(b.filename, 'pt', { sensitivity: 'base' }));
    const excludedFiles = new Set(['about.png','Elvio-Correia1.jpg','elviocorreiaperfil.png','verificado.png']);
    const images = imageFiles
        .filter(fn => !excludedFiles.has(fn))
        .map(fn => buildItem('image', fn))
        .sort((a, b) => a.filename.localeCompare(b.filename, 'pt', { sensitivity: 'base' }));

    // ============ Cards Especiais no topo ============
    const special1Main = 'redessociais2.png';
    const special1Gallery = [
        'redessociais2 (3).png',
        'redessociais2 (1).png',
        'redessociais2 (2).png',
        'redessociais2 (4).png',
        'redessociais2 (5).png',
        'Descrição2 (1).png',
        'Descrição2 (2).png',
        'Descrição2 (3).png',
        'Descrição2 (4).png',
    ];

    const special2Main = 'redessociais (1).png';
    const special2Gallery = [
        'redessociais (2).png',
        'redessociais (3).png',
        'redessociais (4).png',
        'redessociais (5).png',
        'descrição (1).png',
        'descrição (5).png',
        'descrição (6).png',
        'descrição (7).png',
    ];

    const special3Main = 'redessociais3 (1).png';
    const special3Gallery = [
        'redessociais3 (2).png',
        'redessociais3 (3).png',
        'redessociais3 (4).png',
        'redessociais3 (5).png',
        'redessociais3 (6).png',
        'redessociais3 (7).png',
        'redessociais3 (8).png',
    ];
    const special4Main = 'joiaspost (1).png';
    const special4Gallery = [
    'joiaspost (1).png',
    'joiaspost (2).png',
    'joiaspost (3).png',
    'joiaspost (4).png',
    'joiaspost (5).png',
    'joiaspost (6).png',
    'joiaspost (7).png',
    'joiaspost (8).png',
];

    const inSet = new Set([special1Main, ...special1Gallery, special2Main, ...special2Gallery, special3Main, ...special3Gallery]);

    const createSpecialCard = (mainFile, galleryFiles, title) => {
        const box = document.createElement('div');
        box.className = 'project-box';
        box.setAttribute('tabindex', '0');
        // ocupar toda a largura da grelha para projeto único
        box.style.gridColumn = '1 / -1';
        box.style.width = '100%';
        box.dataset.type = 'image';
        box.dataset.src = `assets/images/${mainFile}`;
        box.dataset.title = title;
        box.dataset.description = `Imagem de projeto: ${title}`;
        const galleryPaths = [`assets/images/${mainFile}`,...galleryFiles.map(f => `assets/images/${f}`),'assets/videos/redessociais4video.mp4'];
        box.dataset.gallery = JSON.stringify(galleryPaths);

        // imagem principal estendida (sem crop)
        const imageWrap = document.createElement('div');
        imageWrap.className = 'project-image';
        const img = document.createElement('img');
        img.src = `assets/images/${mainFile}`;
        img.alt = title;
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
        img.setAttribute('decoding', 'async');
        img.style.objectFit = 'contain';
        // Forçar layout de capa visível (override do CSS que usa position:absolute)
        img.style.position = 'static';
        img.style.width = '100%';
        img.style.height = 'auto';
        imageWrap.style.paddingTop = '0';
        imageWrap.style.height = 'auto';
        imageWrap.style.aspectRatio = 'auto';
        imageWrap.style.overflow = 'visible';
        imageWrap.appendChild(img);

        const animate = document.createElement('span');
        animate.className = 'animate scroll';
        animate.setAttribute('style', `--i:2;`);

        box.appendChild(imageWrap);
        box.appendChild(animate);

        return box;
    };

    const specialFrag = document.createDocumentFragment();
    const specialCard1 = createSpecialCard(special1Main, special1Gallery, 'Redessociais 2');
    const specialCard2 = createSpecialCard(special2Main, special2Gallery, 'Redessociais 1');
    const specialCard3 = createSpecialCard(special3Main, special3Gallery, 'Redessociais 3');
    const specialCard4 = createSpecialCard(special4Main, special4Gallery, 'Joias – Redes Sociais');
    // marcar como especiais nos três primeiros
    specialCard1.dataset.special = 'true';
    specialCard2.dataset.special = 'true';
    specialCard3.dataset.special = 'true';
    specialCard4.dataset.special = 'true';
    specialFrag.appendChild(specialCard1);
    specialFrag.appendChild(specialCard2);
    specialFrag.appendChild(specialCard3);
    specialFrag.appendChild(specialCard4);

    // ============ Lista automática restante (exclui os ficheiros dos grupos especiais) ============
    const items = [
        ...videos,
        ...images.filter(it => !inSet.has(it.filename))
    ];

    // Render dos cards
    const frag = document.createDocumentFragment();
    let animateIndex = 4; // 1 e 2 já usados pelos especiais

    const renderItemCard = (item) => {
        const box = document.createElement('div');
        box.className = 'project-box';
        box.setAttribute('tabindex', '0');
        box.dataset.type = item.type;
        box.dataset.src = item.path;
        box.dataset.title = item.title;
        box.dataset.description = item.description;

        const imageWrap = document.createElement('div');
        imageWrap.className = 'project-image';

        if (item.type === 'video') {
            const vid = document.createElement('video');
            vid.setAttribute('preload', 'metadata');
            vid.setAttribute('muted', '');
            vid.setAttribute('playsinline', '');
            const source = document.createElement('source');
            source.src = item.path;
            source.type = 'video/mp4';
            vid.appendChild(source);
            imageWrap.appendChild(vid);
        } else {
            const img = document.createElement('img');
            img.src = item.path;
            img.alt = item.title;
            img.setAttribute('loading', 'lazy');
            imageWrap.appendChild(img);
        }

        const animate = document.createElement('span');
        animate.className = 'animate scroll';
        animate.setAttribute('style', `--i:${animateIndex++};`);

        box.appendChild(imageWrap);
        box.appendChild(animate);
        return box;
    };

    items.forEach(item => frag.appendChild(renderItemCard(item)));

    // Inserir no container: especiais primeiro, depois restantes
    projectsContainer.appendChild(specialFrag);
    projectsContainer.appendChild(frag);

    // Modal refs
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalContainer = document.querySelector('.modal-media-container');
    const closeModalBtn = document.querySelector('.close-btn');
    const modalDetails = document.querySelector('.modal-details');
    let lastFocusedElement = null; // restore focus on close

    const openModal = (title, description, src, type) => {
        // Remover textos do modal
        modalTitle.textContent = '';
        modalDescription.textContent = '';
        if (modalDetails) modalDetails.style.display = 'none';

        // Reset media
        modalImage.style.display = 'none';
        modalVideo.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;

        if (type === 'image') {
            modalImage.src = src;
            modalImage.alt = title;
            modalImage.style.display = 'block';
        } else {
            const source = modalVideo.querySelector('source');
            source.src = src;
            modalVideo.load();
            modalVideo.style.display = 'block';
            modalVideo.play();
        }

        lastFocusedElement = document.activeElement;
        document.body.classList.add('modal-open');
        modal.style.display = 'flex';
        closeModalBtn.focus();
    };

    // Modal com galeria e scroll vertical (para os dois projetos especiais)
    const openGalleryModal = (title, description, images, showHint = false) => {
        // Remover textos do modal
        modalTitle.textContent = '';
        modalDescription.textContent = '';
        if (modalDetails) modalDetails.style.display = 'none';

        // Reset media normais
        modalImage.style.display = 'none';
        modalVideo.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;

        // Limpar galeria anterior se existir
        const existing = modalContainer.querySelector('.modal-gallery');
        if (existing) existing.remove();

        // Criar galeria scrollável
        const gallery = document.createElement('div');
        gallery.className = 'modal-gallery';
        gallery.style.maxHeight = '72vh';
        gallery.style.overflowY = 'auto';
        gallery.style.display = 'block';
        gallery.style.width = '100%';

        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.style.display = 'block';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.objectFit = 'contain';
            img.style.marginBottom = '1rem';
            gallery.appendChild(img);
        });

        modalContainer.appendChild(gallery);

        // inserir seta de scroll apenas quando solicitado
        const existingHint = document.querySelector('.modal-scroll-hint');
        if (existingHint) existingHint.remove();
        if (showHint) {
            const hint = document.createElement('div');
            hint.className = 'modal-scroll-hint';
            hint.innerHTML = "<i class='bx bx-down-arrow-alt'></i>Deslize para ver mais";
            // inserir sobre a área do modal-content
            const modalContent = document.querySelector('#project-modal .modal-content');
            if (modalContent) modalContent.appendChild(hint);
            // remover ao iniciar o scroll
            gallery.addEventListener('scroll', () => {
                hint.remove();
            }, { once: true });
        }

        lastFocusedElement = document.activeElement;
        document.body.classList.add('modal-open');
        modal.style.display = 'flex';
        closeModalBtn.focus();
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        modalVideo.pause();
        modalVideo.currentTime = 0;
        const existing = modalContainer.querySelector('.modal-gallery');
        if (existing) existing.remove();
        const existingHint = document.querySelector('.modal-scroll-hint');
        if (existingHint) existingHint.remove();
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    // Delegação de eventos para abrir modal
    projectsContainer.addEventListener('click', (e) => {
        const box = e.target.closest('.project-box');
        if (!box) return;
        // Evitar comportamento duplicado ao clicar nos controles do vídeo
        if (e.target && (e.target.tagName === 'VIDEO' || e.target.tagName === 'SOURCE')) {
            e.preventDefault();
        }
        const galleryData = box.dataset.gallery ? JSON.parse(box.dataset.gallery) : null;
        if (galleryData && galleryData.length) {
            const showHint = box.dataset.special === 'true';
            openGalleryModal(box.dataset.title, box.dataset.description, galleryData, showHint);
        } else {
            openModal(box.dataset.title, box.dataset.description, box.dataset.src, box.dataset.type);
        }
    });

    // Acessibilidade: abrir com Enter/Espaço quando focado
    projectsContainer.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('project-box')) {
            e.preventDefault();
            const box = e.target;
            const galleryData = box.dataset.gallery ? JSON.parse(box.dataset.gallery) : null;
            if (galleryData && galleryData.length) {
                const showHint = box.dataset.special === 'true';
                openGalleryModal(box.dataset.title, box.dataset.description, galleryData, showHint);
            } else {
                openModal(box.dataset.title, box.dataset.description, box.dataset.src, box.dataset.type);
            }
        }
    });

    // Fechos do modal
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
});
