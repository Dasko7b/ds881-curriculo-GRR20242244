/**
 * Currículo Online DS881
 * Lógica da Aplicação (main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initContactForm();
});

/**
 * Controle de Tema Claro/Escuro
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Recupera o tema do localStorage ou define como escuro padrão
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#theme-toggle i');
  if (!themeIcon) return;
  
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

/**
 * Menu de Navegação Responsivo (Mobile)
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('menu-mobile-btn');
  const navLinks = document.getElementById('nav-links');
  
  if (!mobileMenuBtn || !navLinks) return;
  
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Altera o ícone entre barras e X
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });
  
  // Fecha o menu ao clicar em qualquer link
  const links = navLinks.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

/**
 * ScrollSpy - Ativa link da navegação conforme a seção visível
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!sections.length || !navLinks.length) return;
  
  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Aciona quando o elemento ocupa a maior parte do centro da tela
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);
  
  sections.forEach(section => observer.observe(section));
}

/**
 * Simulação de Envio do Formulário de Contato
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  
  if (!form || !feedback) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Simula estado de carregamento
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-circle-notch fa-spin"></i>';
    
    setTimeout(() => {
      // Mock de sucesso
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
      feedback.classList.remove('hidden');
      
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      // Oculta o feedback após 5 segundos
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 5000);
      
    }, 1500);
  });
}
