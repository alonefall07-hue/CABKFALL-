document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // BOUTONS "CHOISIR" → REDIRECTION PAIEMENT
  // ============================================
  document.querySelectorAll('.card-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = this.closest('.card');
      var offreName = card.querySelector('h3').textContent.trim();
      var price = card.querySelector('.price').textContent.trim();
      window.location.href = 'paiement.html?offre=' + encodeURIComponent(offreName) + '&prix=' + encodeURIComponent(price);
    });
  });

  // ============================================
  // TABS (Mobile / Internet / TV / Entreprise)
  // ============================================
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
      btn.classList.add('active');
      var tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // ============================================
  // BURGER MENU
  // ============================================
  var burgerBtn = document.getElementById('burgerBtn');
  var mainNav = document.getElementById('mainNav');
  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });
  }

  // ============================================
  // BOUTON "Découvrir nos offres"
  // ============================================
  var discoverBtn = document.getElementById('discoverBtn');
  if (discoverBtn) {
    discoverBtn.addEventListener('click', function () {
      document.getElementById('offres').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ============================================
  // BOUTON "Demander un devis"
  // ============================================
  var quoteBtn = document.getElementById('quoteBtn');
  if (quoteBtn) {
    quoteBtn.addEventListener('click', function () {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ============================================
  // BOUTON "Contacter un expert"
  // ============================================
  var enterpriseBtn = document.getElementById('enterpriseBtn');
  if (enterpriseBtn) {
    enterpriseBtn.addEventListener('click', function () {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ============================================
  // BOUTON "Espace Client"
  // ============================================
  var loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      showModal('Espace Client', 'Connectez-vous pour accéder à votre espace personnel.');
    });
  }

  // ============================================
  // FORMULAIRE DE CONTACT
  // ============================================
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('nameInput').value.trim();
      var email = document.getElementById('emailInput').value.trim();
      var message = document.getElementById('messageInput').value.trim();
      var formMsg = document.getElementById('formMsg');

      if (name && email && message) {
        formMsg.textContent = '✅ Message envoyé avec succès !';
        formMsg.style.color = 'green';
        contactForm.reset();
        showToast('Message envoyé !');
      } else {
        formMsg.textContent = '❌ Veuillez remplir tous les champs.';
        formMsg.style.color = 'red';
      }
    });
  }

  // ============================================
  // BOUTONS RÉSEAUX SOCIAUX
  // ============================================
  document.querySelectorAll('.social-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var social = this.getAttribute('data-social');
      showToast('Redirection vers ' + social + '...');
    });
  });

  // ============================================
  // MODAL
  // ============================================
  var modalOverlay = document.getElementById('modalOverlay');
  var modalClose = document.getElementById('modalClose');
  var modalOkBtn = document.getElementById('modalOkBtn');

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ============================================
  // NAV ACTIVE AU SCROLL
  // ============================================
  window.addEventListener('scroll', function () {
    var sections = document.querySelectorAll('section[id]');
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var navLink = document.querySelector('.nav-link[data-section="' + id + '"]');

      if (navLink) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
          navLink.classList.add('active');
        }
      }
    });
  });

}); // fin DOMContentLoaded

// ============================================
// MODAL - fonctions globales
// ============================================
function showModal(title, text) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

// ============================================
// TOAST
// ============================================
function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 3000);
}