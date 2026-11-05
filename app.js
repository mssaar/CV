/**
 * Mark Sverker Saar — Portfolio Web Application
 * Handles i18n (ET / EN), Interactive CV Modal, and Dynamic Navigation
 */

// Bilingual Dictionary
const translations = {
  et: {
    navProjects: "Projektid",
    navAbout: "Taust & Oskused",
    navContact: "Kontakt",
    navCv: "Ava CV",
    
    heroStatus: "TalTech MA Majandusanalüüs · TÜ Informaatika kõrvaleriala",
    heroGreeting: "Tere, mina olen",
    heroBio: "Ühendan majandusteaduse ja finantsökonomeetria kaasaegse tarkvaraarenduse, andmekorje ning reaalsete insenerilahendustega. Loon toimivaid süsteeme alates brauseripõhistest kalkulaatoritest ja scraping-mudelitest kuni nutika spordikeskuse automaatikani.",
    btnViewCv: "Vaata CV-d (PDF)",
    btnDownloadCv: "Laadi alla PDF",
    btnExploreProjects: "Uuri töid",

    heroCardFocus: "Fookusvaldkonnad",
    focus1Title: "Majandus- & finantsanalüüs",
    focus1Desc: "Ökonomeetrilised mudelid, tootluse arvutused, investeeringud",
    focus2Title: "Tarkvaraarendus & andmekorje",
    focus2Desc: "Python, JavaScript, SQL, automaatne andmekogumine ja API-d",
    focus3Title: "Päriselu infrastruktuur & automaatika",
    focus3Desc: "The Rand sisehalli rajamine, valgusautomaatika, broneerimissüsteem",

    projSectionTag: "Portfoolio",
    projSectionTitle: "Tehtud tööd ja visuaalsed projektid",
    projSectionSubtitle: "Kõik klipid peegeldavad reaalset toimivat koodi, kasutajaliidest ja andmeanalüüsi.",
    
    badgePublic: "Avatud lähtekood",
    badgePrivate: "Ettevõtte süsteem · Live",
    btnLiveDemo: "Live Rakendus",

    p1Title: "Kinnisvara üüritootlus & hinnamudel",
    p1Desc: "KV.ee korterikuulutuste automaatne andmekorje ja ökonomeetriline mudel, mis arvutab asumipõhist üüritootlust ning tuvastab alahinnatud kortereid.",
    
    p2Title: "The Rand — Spordikeskuse platvorm & automaatika",
    p2Desc: "Sise-rannaspordikeskuse täislahendus alates broneeringutega sünkroniseeritud nutikast valgustusautomaatikast kuni veebiplatvormi ja üldehituseni.",
    theRandLive: "Kasutuses Kristiine spordikeskuses (6 väljakut)",

    p3Title: "ProSystem — Projektide kasumlikkuse kalkulaator",
    p3Desc: "Brauseripõhine finantstööriist ettevõtte objektide tegeliku kasumlikkuse arvutamiseks tööaja- ja kuluaruannete põhjal ilma andmeid serverisse saatmata.",

    p4Title: "Kuku Raadio — Arhiiv ja veebipleier",
    p4Desc: "Isiklik järelkuulamise veebiäpp, mis kontrollib ja salvestab uusi saateid automaatselt taustal GitHub Actionsi abil.",

    p5Title: "Rahvusvahelise majanduse õppekeskkond",
    p5Desc: "Interaktiivne veebikeskkond majandusteaduse teooriate omandamiseks läbi 3D kordamiskaartide, kiirtestide ja otsingusüsteemi.",

    aboutTag: "Kompetentsid",
    aboutTitle: "Haridus ja tehnilised oskused",
    eduTitle: "Hariduskäik",
    edu1Degree: "Majandusanalüüs, MA",
    edu2Degree: "Majandusteadus, BA",
    edu2Place: "Tartu Ülikool · Informaatika kõrvaleriala",
    edu3School: "Keskharidus",

    skillsTitle: "IT- ja analüüsioskused",
    skillCatProg: "Programmeerimine & Andmeteadus",
    skillCatEcon: "Ökonomeetria & Ärianalüütika",
    skillCatTools: "Tööriistad & Inseneeria",
    skillCatLang: "Keeled",
    langList: "Eesti keel (emakeel) · Inglise keel (CAE B2) · Vene keel (B1) · Hispaania keel (A2)",

    footerHeading: "Võta ühendust",
    footerSub: "Olen alati avatud põnevatele projektidele, analüütika väljakutsetele ja koostööpakkumistele.",
    footerViewCv: "Vaata ametlikku CV-d",

    cvModalTitle: "Mark Sverker Saar — Curriculum Vitae",
    cvModalLangBadge: "Eesti keel (1 lk)",
    pdfFileName: "Mark Sverker Saar CV.pdf"
  },
  en: {
    navProjects: "Projects",
    navAbout: "About & Skills",
    navContact: "Contact",
    navCv: "Open CV",

    heroStatus: "TalTech MA Economic Analysis · UT Minor in Computer Science",
    heroGreeting: "Hi, I am",
    heroBio: "Combining economics and financial econometrics with modern software development, data scraping, and hands-on engineering. Building robust systems from browser calculators to smart facility automation.",
    btnViewCv: "View Resume (PDF)",
    btnDownloadCv: "Download PDF",
    btnExploreProjects: "Explore Work",

    heroCardFocus: "Focus Areas",
    focus1Title: "Economic & Financial Analysis",
    focus1Desc: "Econometric models, yield computations, investment analysis",
    focus2Title: "Software Engineering & Data Scraping",
    focus2Desc: "Python, JavaScript, SQL, automated scrapers, and APIs",
    focus3Title: "Real-world Infrastructure & Automation",
    focus3Desc: "The Rand indoor center development, lighting IoT, booking engine",

    projSectionTag: "Portfolio",
    projSectionTitle: "Featured Works & Visual Demos",
    projSectionSubtitle: "All clips demonstrate production code, responsive user interfaces, and data science workflows.",

    badgePublic: "Open Source",
    badgePrivate: "Internal System · Live",
    btnLiveDemo: "Live App",

    p1Title: "Real Estate Rental Yield & Pricing Model",
    p1Desc: "Automated real estate scraper and econometric model analyzing district rental yields and identifying undervalued listings in Tallinn.",

    p2Title: "The Rand — Sports Center Platform & Automation",
    p2Desc: "End-to-end infrastructure for an indoor beach sports center, featuring automated smart court lighting synced with reservations and web development.",
    theRandLive: "Operating at Kristiine indoor sports arena (6 courts)",

    p3Title: "ProSystem — Project Profitability Calculator",
    p3Desc: "Client-side financial calculator assessing project profitability by automatically mapping labor and cost reports without external servers.",

    p4Title: "Kuku Radio — Archive & Web Player",
    p4Desc: "Personal radio broadcast archiving web player with automated episode monitoring and downloads via GitHub Actions.",

    p5Title: "International Economics Interactive Study Platform",
    p5Desc: "Interactive study platform for international economics featuring 3D digital flashcards, quizzes, and searchable lecture synopses.",

    aboutTag: "Competencies",
    aboutTitle: "Education & Technical Stack",
    eduTitle: "Education",
    edu1Degree: "Economic Analysis, MA",
    edu2Degree: "Economics, BA",
    edu2Place: "University of Tartu · Minor in Computer Science",
    edu3School: "Secondary Education",

    skillsTitle: "IT & Analytical Stack",
    skillCatProg: "Programming & Data Science",
    skillCatEcon: "Econometrics & Business Intelligence",
    skillCatTools: "Tools & Engineering",
    skillCatLang: "Languages",
    langList: "Estonian (Native) · English (CAE B2) · Russian (B1) · Spanish (A2)",

    footerHeading: "Get in Touch",
    footerSub: "Always open to ambitious analytical projects, technical opportunities, and collaboration.",
    footerViewCv: "View Official Resume",

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

  // Update direct CV download links
  const downloadBtn = document.getElementById('btnDownloadCv');
  if (downloadBtn) {
    downloadBtn.href = t.pdfFileName;
    downloadBtn.setAttribute('download', t.pdfFileName);
  }

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
    // Only update src if it changed to avoid reloading
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
