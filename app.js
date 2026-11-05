/**
 * Mark Sverker Saar — Portfolio Web Application
 * Handles i18n (ET / EN), Interactive CV Modal, and Dynamic Navigation
 */

// Bilingual Dictionary
const translations = {
  et: {
    navProjects: "Projektid",
    navContact: "Kontakt",
    
    heroStatus: "TalTech MA Majandusanalüüs · TÜ Majandusteadus (informaatika kõrvaleriala)",
    heroGreeting: "Tere, mina olen",
    
    kw1: "Majandusanalüüs & finantsökonomeetria",
    kw2: "Tarkvaraarendus (Python, Java, JavaScript, SQL)",
    kw3: "Andmekorje, veebikraapimine & mudelite ehitamine",
    kw4: "Ärianalüütika & tööriistad (Power BI, Stata, R, DaVinci Resolve)",

    btnViewCv: "Vaata CV-d",
    btnExploreProjects: "Uuri töid",

    projSectionTag: "Portfoolio",
    projSectionTitle: "Tehtud tööd ja visuaalsed projektid",
    projSectionSubtitle: "Kõik klipid peegeldavad reaalset toimivat koodi, kasutajaliidest ja andmeanalüüsi.",
    
    badgePublic: "Avatud lähtekood",
    btnLiveDemo: "Live Rakendus",

    p1Title: "Kinnisvara üüritootlus & hinnamudel",
    p1Desc: "KV.ee korterikuulutuste automaatne andmekorje ja ökonomeetriline mudel, mis arvutab asumipõhist üüritootlust ning tuvastab alahinnatud kortereid.",

    p3Title: "ProSystem — Projektide kasumlikkuse kalkulaator",
    p3Desc: "Brauseripõhine finantstööriist ettevõtte objektide tegeliku kasumlikkuse arvutamiseks tööaja- ja kuluaruannete põhjal ilma andmeid serverisse saatmata.",

    p4Title: "Kuku Raadio — Arhiiv ja veebipleier",
    p4Desc: "Isiklik järelkuulamise veebiäpp, mis kontrollib ja salvestab uusi saateid automaatselt taustal GitHub Actionsi abil.",

    p5Title: "Rahvusvahelise majanduse õppekeskkond",
    p5Desc: "Interaktiivne veebikeskkond majandusteaduse teooriate omandamiseks läbi 3D kordamiskaartide, kiirtestide ja otsingusüsteemi.",

    footerHeading: "Võta ühendust",
    footerSub: "Olen alati avatud põnevatele projektidele, analüütika väljakutsetele ja koostööpakkumistele.",

    cvModalTitle: "Mark Sverker Saar — Curriculum Vitae",
    cvModalLangBadge: "Eesti keel (1 lk)",
    pdfFileName: "Mark Sverker Saar CV.pdf"
  },
  en: {
    navProjects: "Projects",
    navContact: "Contact",

    heroStatus: "TalTech MA Economic Analysis · UT Economics (Minor in Computer Science)",
    heroGreeting: "Hi, I am",

    kw1: "Economic Analysis & Financial Econometrics",
    kw2: "Software Development (Python, Java, JavaScript, SQL)",
    kw3: "Data Scraping, Automation & Quantitative Modeling",
    kw4: "Business Intelligence & Stack (Power BI, Stata, R, DaVinci Resolve)",

    btnViewCv: "View CV",
    btnExploreProjects: "Explore Work",

    projSectionTag: "Portfolio",
    projSectionTitle: "Featured Works & Visual Demos",
    projSectionSubtitle: "All clips demonstrate production code, responsive user interfaces, and data science workflows.",

    badgePublic: "Open Source",
    btnLiveDemo: "Live App",

    p1Title: "Real Estate Rental Yield & Pricing Model",
    p1Desc: "Automated real estate scraper and econometric model analyzing district rental yields and identifying undervalued listings in Tallinn.",

    p3Title: "ProSystem — Project Profitability Calculator",
    p3Desc: "Client-side financial calculator assessing project profitability by automatically mapping labor and cost reports without external servers.",

    p4Title: "Kuku Radio — Archive & Web Player",
    p4Desc: "Personal radio broadcast archiving web player with automated episode monitoring and downloads via GitHub Actions.",

    p5Title: "International Economics Interactive Study Platform",
    p5Desc: "Interactive study platform for international economics featuring 3D digital flashcards, quizzes, and searchable lecture synopses.",

    footerHeading: "Get in Touch",
    footerSub: "Always open to ambitious analytical projects, technical opportunities, and collaboration.",

    cvModalTitle: "Mark Sverker Saar — Curriculum Vitae",
    cvModalLangBadge: "English (1 page)",
    pdfFileName: "Mark Sverker Saar CV ENG.pdf"
  }
};

let currentLang = 'et';
let modalCvLang = 'et';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('portfolio_lang');
  if (savedLang && (savedLang === 'et' || savedLang === 'en')) {
    setLanguage(savedLang);
  } else {
    setLanguage('et');
  }

  // Mobile navigation toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Keyboard shortcut for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCvModal();
    }
  });
});

/**
 * Switch global UI language
 * @param {'et'|'en'} lang 
 */
function setLanguage(lang) {
  currentLang = lang;
  modalCvLang = lang;
  localStorage.setItem('portfolio_lang', lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Toggle switcher button states
  const btnET = document.getElementById('btnLangET');
  const btnEN = document.getElementById('btnLangEN');
  if (btnET && btnEN) {
    if (lang === 'et') {
      btnET.classList.add('active');
      btnEN.classList.remove('active');
    } else {
      btnEN.classList.add('active');
      btnET.classList.remove('active');
    }
  }

  // Update text nodes
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Sync Modal UI if open
  updateModalCvState();
}

/**
 * Open CV Modal
 */
function openCvModal() {
  const modal = document.getElementById('cvModal');
  modalCvLang = currentLang;
  updateModalCvState();
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close CV Modal
 */
function closeCvModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/**
 * Switch language inside the CV Modal independently
 * @param {'et'|'en'} lang 
 */
function switchCvLang(lang) {
  modalCvLang = lang;
  updateModalCvState();
}

/**
 * Refresh CV iframe and modal badges according to modalCvLang
 */
function updateModalCvState() {
  const iframe = document.getElementById('cvIframe');
  const langBadge = document.getElementById('cvModalLangBadge');
  const btnEt = document.getElementById('modalCvEt');
  const btnEn = document.getElementById('modalCvEn');
  const modalDownload = document.getElementById('modalDownloadBtn');

  const pdfFile = modalCvLang === 'et' ? 'Mark Sverker Saar CV.pdf' : 'Mark Sverker Saar CV ENG.pdf';
  const badgeText = modalCvLang === 'et' ? 'Eesti keel (1 lk)' : 'English (1 page)';

  if (iframe) {
    if (!iframe.src.endsWith(encodeURI(pdfFile))) {
      iframe.src = pdfFile;
    }
  }

  if (langBadge) {
    langBadge.textContent = badgeText;
  }

  if (modalDownload) {
    modalDownload.href = pdfFile;
    modalDownload.setAttribute('download', pdfFile);
  }

  if (btnEt && btnEn) {
    if (modalCvLang === 'et') {
      btnEt.classList.add('active');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnEt.classList.remove('active');
    }
  }
}

/**
 * Click backdrop to close modal
 */
function handleBackdropClick(e) {
  if (e.target.id === 'cvModal') {
    closeCvModal();
  }
}
