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
    heroGreeting: "Olen",
    
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
    badgeLiveApp: "Live Veebirakendus",
    badgeLiveWebPwa: "Live Veeb & PWA",
    badgeQuantModel: "Finants- & kvantmudel",
    badgeAutoPipeline: "Automaatika pipeline",
    lblProprietary: "Privaatne koodibaas",
    btnLiveDemo: "Live Rakendus",
    btnVisitSite: "Külasta veebi",

    pRandTitle: "The Rand — Rannaspordikeskuse platvorm",
    pRandDesc: "Kaasaegne rannaspordikeskuse esindusveeb ja broneerimisplatvorm Kristiine 6 väljakuga liivahallile.",

    pValgusTitle: "Rannahalli nutivalgustuse automaatika",
    pValgusDesc: "Rannaspordikeskuse väljakute valgustuse automaatika Pythonis, mis juhib nutireleesid vastavalt reaalajas broneeringukalendrile.",

    pProsystemEeTitle: "ProSystem OÜ — Esindusveeb & PWA sisekeskkond",
    pProsystemEeDesc: "ProSystem OÜ esindusveeb ja Remato-laadne PWA sisekeskkond tööaja arvestuse, seadmete laenutuse ning objektide haldusega.",

    p1Title: "Kinnisvara üüritootlus & hinnamudel",
    p1Desc: "KV.ee korterikuulutuste automaatne andmekorje ja ökonomeetriline mudel, mis arvutab asumipõhist üüritootlust ning tuvastab alahinnatud kortereid.",

    pMarkowitzTitle: "Markowitz — Portfelli optimeerimise mudel",
    pMarkowitzDesc: "Java rakendus, mis kogub Yahoo Finance'ist aktsiahindu, arvutab tulumäärade kovariatsioonimaatriksi ning optimeerib investeerimisportfelli Markowitzi mudeli järgi — võtab arvesse olemasoleva portfelli sisu ning arvutab täpselt, milliseid instrumente mitu tükki juurde osta.",

    p3Title: "ProSystem — Projektide kasumlikkuse kalkulaator",
    p3Desc: "Brauseripõhine finantstööriist ettevõtte objektide tegeliku kasumlikkuse arvutamiseks tööaja- ja kuluaruannete põhjal ilma andmeid serverisse saatmata.",

    p4Title: "Kuku Raadio — Arhiiv, otse-eeter ja pleier",
    p4Desc: "Kuku raadio veebipleier otse-eetri kuulamisega, mis eemaldab taskuhäälingute episoodidest automaatselt reklaamid ja laadib GitHub Actions cronjob'iga alla uusi saateid.",

    pAutomSotsTitle: "Sotsiaalmeedia automatiseerimise pipeline",
    pAutomSotsDesc: "Täisautomaatne sisu tootmise ja postitamise pipeline, mis integreerib Meta Graph API (Instagram & Facebook Reels), ElevenLabs häälesünteesi, AI lip-sync mudelid ja FFmpeg videotöötluse (9:16 formaat, subtiitrid ja bränding).",

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
    heroGreeting: "I am",

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
    badgeLiveApp: "Live Platform",
    badgeLiveWebPwa: "Live Web & PWA",
    badgeQuantModel: "Quantitative Finance Model",
    badgeAutoPipeline: "Automation Pipeline",
    lblProprietary: "Proprietary Codebase",
    btnLiveDemo: "Live App",
    btnVisitSite: "Visit Website",

    pRandTitle: "The Rand — Beach Sports Center Platform",
    pRandDesc: "Modern beach sports center website and booking platform for Kristiine's 6-court indoor sand arena.",

    pValgusTitle: "Beach Arena Smart Lighting Automation",
    pValgusDesc: "Python automation system controlling court floodlights via smart relays synchronized with real-time reservation schedules.",

    pProsystemEeTitle: "ProSystem OÜ — Corporate Web & Internal PWA",
    pProsystemEeDesc: "Corporate website and internal Remato-replacement PWA featuring live time tracking, tool checkout, and project management.",

    p1Title: "Real Estate Rental Yield & Pricing Model",
    p1Desc: "Automated real estate scraper and econometric model analyzing district rental yields and identifying undervalued listings in Tallinn.",

    pMarkowitzTitle: "Markowitz — Portfolio Optimization Model",
    pMarkowitzDesc: "Java quantitative finance app fetching Yahoo Finance data and computing covariance matrices to optimize portfolio weights — factors in current portfolio holdings and calculates the exact share quantities to purchase for optimal rebalancing.",

    p3Title: "ProSystem — Project Profitability Calculator",
    p3Desc: "Client-side financial calculator assessing project profitability by automatically mapping labor and cost reports without external servers.",

    p4Title: "Kuku Radio — Archive, Live Stream & Player",
    p4Desc: "Kuku radio web player featuring live stream playback, automated podcast audio ad removal, and scheduled GitHub Actions cronjob downloads.",

    pAutomSotsTitle: "Social Media Automation Pipeline",
    pAutomSotsDesc: "End-to-end media generation and publishing pipeline integrating Meta Graph API (Instagram & Facebook Reels), ElevenLabs neural voice synthesis, AI lip-sync models, and FFmpeg video processing (9:16 vertical formatting, auto-subtitles, and outro branding).",

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
