/**
 * TABLEWARE SOKHNA - Script Interactif
 * Luxe • Élégance • Art de la Table
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStickyHeader();
    initScrollToTop();
    initProductFilters();
    initProductSearch();
    initProductModal();
    initCartDrawer();
    initGalleryLightbox();
    initContactForm();
    initScrollAnimations();
});

/* ============================================================
   01 — NAVIGATION MOBILE & HAMBURGER
   ============================================================ */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        body.classList.toggle('no-scroll', isOpen);
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            body.classList.remove('no-scroll');
        });
    });

    // Fermer si clic à l'extérieur
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            body.classList.remove('no-scroll');
        }
    });
}

/* ============================================================
   02 — HEADER COLLANT & SHADOW ON SCROLL
   ============================================================ */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* ============================================================
   03 — BOUTON RETOUR EN HAUT
   ============================================================ */
function initScrollToTop() {
    let btn = document.querySelector('.scroll-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'scroll-top';
        btn.setAttribute('aria-label', 'Retour en haut');
        btn.innerHTML = '&#8593;';
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================================
   04 — FILTRES PRODUITS
   ============================================================ */
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.product-filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (!filterButtons.length || !productCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ============================================================
   05 — RECHERCHE INSTANTANÉE PRODUITS
   ============================================================ */
function initProductSearch() {
    const searchInput = document.querySelector('#product-search');
    const productCards = document.querySelectorAll('.product-card');

    if (!searchInput || !productCards.length) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.getAttribute('data-category')?.toLowerCase() || '';

            if (title.includes(query) || desc.includes(query) || category.includes(query)) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
}

/* ============================================================
   06 — MODAL APERÇU RAPIDE PRODUIT & COMMANDE WHATSAPP
   ============================================================ */
function initProductModal() {
    const modal = document.querySelector('#quickview-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const modalImg = modal.querySelector('.modal-product-img');
    const modalTitle = modal.querySelector('.modal-product-title');
    const modalCat = modal.querySelector('.modal-product-cat');
    const modalPrice = modal.querySelector('.modal-product-price');
    const modalDesc = modal.querySelector('.modal-product-desc');
    const modalWhatsappBtn = modal.querySelector('.modal-whatsapp-btn');
    const modalAddCartBtn = modal.querySelector('.modal-add-cart-btn');

    document.querySelectorAll('.btn-quickview').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            if (!card) return;

            const title = card.querySelector('h3')?.textContent || 'Article Tableware Sokhna';
            const price = card.querySelector('.price')?.textContent || 'Sur demande';
            const desc = card.querySelector('.product-desc')?.textContent || 'Pièce haut de gamme de la sélection Tableware Sokhna.';
            const cat = card.querySelector('.product-category-label')?.textContent || 'Art de la table';
            const imgSrc = card.querySelector('img')?.getAttribute('src') || '';

            if (modalTitle) modalTitle.textContent = title;
            if (modalPrice) modalPrice.textContent = price;
            if (modalDesc) modalDesc.textContent = desc;
            if (modalCat) modalCat.textContent = cat;
            if (modalImg) modalImg.src = imgSrc;

            // Préparation du lien WhatsApp
            const message = encodeURIComponent(`Bonjour Tableware Sokhna, je suis intéressé(e) par l'article : "${title}" (${price}). Pouvez-vous me donner plus de détails et les disponibilités ? Merci.`);
            if (modalWhatsappBtn) {
                modalWhatsappBtn.href = `https://wa.me/221770000000?text=${message}`;
            }

            if (modalAddCartBtn) {
                modalAddCartBtn.onclick = () => {
                    addToCart({
                        id: title.replace(/\s+/g, '-').toLowerCase(),
                        title: title,
                        price: price,
                        img: imgSrc
                    });
                    closeQuickViewModal();
                };
            }

            openQuickViewModal();
        });
    });

    function openQuickViewModal() {
        modal.classList.add('show');
        document.body.classList.add('no-scroll');
    }

    function closeQuickViewModal() {
        modal.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeQuickViewModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeQuickViewModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeQuickViewModal();
        }
    });
}

/* ============================================================
   07 — PANIER / SÉLECTION D'ARTICLES (LOCALSTORAGE)
   ============================================================ */
let cart = JSON.parse(localStorage.getItem('tableware_cart') || '[]');

function saveCart() {
    localStorage.setItem('tableware_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showToast(`« ${product.title} » ajouté à votre sélection !`);
    openCartDrawer();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

function updateCartUI() {
    const badges = document.querySelectorAll('.cart-count-badge');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    badges.forEach(b => {
        b.textContent = totalCount;
        b.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });

    const cartList = document.querySelector('.cart-items-list');
    const emptyMsg = document.querySelector('.cart-empty-message');
    const orderWhatsappBtn = document.querySelector('.cart-order-whatsapp-btn');

    if (!cartList) return;

    if (cart.length === 0) {
        cartList.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        if (orderWhatsappBtn) orderWhatsappBtn.style.display = 'none';
    } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        if (orderWhatsappBtn) orderWhatsappBtn.style.display = 'block';

        cartList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <span class="cart-item-price">${item.price} &times; ${item.quantity}</span>
                </div>
                <button class="cart-item-remove" onclick="window.removeCartItem('${item.id}')" aria-label="Supprimer">&times;</button>
            </div>
        `).join('');

        // Préparer le récapitulatif pour WhatsApp
        let text = "Bonjour Tableware Sokhna, je souhaite passer commande pour la sélection suivante :\n";
        cart.forEach((it, idx) => {
            text += `${idx + 1}. ${it.title} (Qté: ${it.quantity}) - ${it.price}\n`;
        });
        text += "\nPouvez-vous me confirmer les modalités de commande et de livraison ? Merci !";

        if (orderWhatsappBtn) {
            orderWhatsappBtn.href = `https://wa.me/221770000000?text=${encodeURIComponent(text)}`;
        }
    }
}

window.removeCartItem = function(id) {
    removeFromCart(id);
};

function openCartDrawer() {
    const drawer = document.querySelector('#cart-drawer');
    const overlay = document.querySelector('#cart-overlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('no-scroll');
    }
}

function closeCartDrawer() {
    const drawer = document.querySelector('#cart-drawer');
    const overlay = document.querySelector('#cart-overlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }
}

function initCartDrawer() {
    updateCartUI();

    const openBtns = document.querySelectorAll('.btn-open-cart');
    const closeBtn = document.querySelector('.cart-close-btn');
    const overlay = document.querySelector('#cart-overlay');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCartDrawer();
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (overlay) overlay.addEventListener('click', closeCartDrawer);

    // Boutons ajouter au panier dans les cartes
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            if (!card) return;

            const title = card.querySelector('h3')?.textContent || 'Article de table';
            const price = card.querySelector('.price')?.textContent || 'Sur demande';
            const imgSrc = card.querySelector('img')?.getAttribute('src') || '';

            addToCart({
                id: title.replace(/\s+/g, '-').toLowerCase(),
                title: title,
                price: price,
                img: imgSrc
            });
        });
    });
}

/* ============================================================
   08 — LIGHTBOX GALERIE AVEC NAVIGATION
   ============================================================ */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-card');
    const lightbox = document.querySelector('#gallery-lightbox');

    // Filtres galerie si présents
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    if (cat === 'all' || itemCat === cat) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    if (!galleryItems.length || !lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const itemsArray = Array.from(galleryItems);

    function showImage(index) {
        if (index < 0) index = itemsArray.length - 1;
        if (index >= itemsArray.length) index = 0;
        currentIndex = index;

        const currentItem = itemsArray[currentIndex];
        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('.gallery-overlay h3')?.textContent ||
                        currentItem.querySelector('.gallery-overlay p')?.textContent ||
                        img?.getAttribute('alt') || '';

        if (lightboxImg && img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        }
        if (lightboxCaption) {
            lightboxCaption.textContent = caption;
        }
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            lightbox.classList.add('show');
            document.body.classList.add('no-scroll');
            showImage(index);
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}

/* ============================================================
   09 — VALIDATION DU FORMULAIRE DE CONTACT
   ============================================================ */
function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('[name="name"]')?.value.trim();
        const email = form.querySelector('[name="email"]')?.value.trim();
        const phone = form.querySelector('[name="phone"]')?.value.trim();
        const subject = form.querySelector('[name="subject"]')?.value;
        const message = form.querySelector('[name="message"]')?.value.trim();

        if (!name || !email || !message) {
            showToast("Veuillez remplir tous les champs obligatoires (*).", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Veuillez saisir une adresse email valide.", "error");
            return;
        }

        // Succès simulé avec élégance
        const formContainer = form.closest('.contact-form-wrapper') || form.parentElement;
        const successBox = document.createElement('div');
        successBox.className = 'form-success-box';
        successBox.innerHTML = `
            <div class="success-icon">✦</div>
            <h3>Merci pour votre message, ${name} !</h3>
            <p>Nous avons bien reçu votre demande concernant <strong>${subject || "nos collections"}</strong>. L'équipe de TABLEWARE SOKHNA vous répondra dans les plus brefs délais.</p>
            <div class="success-actions">
                <a href="https://wa.me/221770000000?text=${encodeURIComponent(`Bonjour Tableware Sokhna, je viens de vous envoyer un message depuis votre site web. Mon nom : ${name}.`)}" target="_blank" class="btn btn-primary">
                    Échanger directement sur WhatsApp
                </a>
                <button type="button" class="btn btn-outline" id="reset-contact-btn">Envoyer un autre message</button>
            </div>
        `;

        form.style.display = 'none';
        formContainer.appendChild(successBox);

        document.querySelector('#reset-contact-btn')?.addEventListener('click', () => {
            successBox.remove();
            form.reset();
            form.style.display = 'block';
        });

        showToast("Votre message a été transmis avec succès !", "success");
    });
}

/* ============================================================
   10 — ANIMATIONS AU SCROLL
   ============================================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .category-card, .value-card, .service-card, .product-card');

    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================================
   11 — SYSTÈME DE TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3800);
}
