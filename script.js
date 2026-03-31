document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // 1. Grande image = 1ère miniature au chargement
    // ===========================
    document.querySelectorAll('.project-card').forEach(card => {
        const firstThumb = card.querySelector('.thumb');
        const mainImg = card.querySelector('.project-main-img');
        if (firstThumb && mainImg) {
            mainImg.src = firstThumb.src;
        }
    });

    // ===========================
    // 2. Lightbox
    // ===========================
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
    <div class="lb-overlay"></div>
    <div class="lb-content">
      <img class="lb-img" src="" alt="" />
      <button class="lb-close">✕</button>
    </div>
  `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('.lb-img');

    function openLightbox(src) {
        lbImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-overlay').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Clic sur grande image → ouvre lightbox
    document.querySelectorAll('.project-main-img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(img.src));
    });

    // ===========================
    // 3. Miniatures : exposer changeMain globalement
    // ===========================
    window.changeMain = function(thumb, mainId) {
        const mainImg = document.getElementById(mainId);
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = thumb.src;
            mainImg.style.opacity = '1';
        }, 150);
        thumb.closest('.project-thumbs')
            .querySelectorAll('.thumb')
            .forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    };

    // ===========================
    // 4. Nav active + ombre au scroll
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100)
                current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${current}` ?
                'var(--accent)' : '';
        });
        nav.style.boxShadow = window.scrollY > 40 ?
            '0 2px 16px rgba(0,0,0,0.06)' : 'none';
    });

});