# CV ja Kandideerimisdokumendid - Projekti juhised ja reeglid

## Projekti lühikirjeldus ja eesmärk
See repositoorium sisaldab Mark Sverker Saare elulookirjeldust (CV), motivatsioonikirju ja kandideerimisega seotud dokumente nii eesti kui ka inglise keeles.
Eesmärk on hoida kõik dokumendid professionaalsed, ajakohased ja sünkroniseeritud ning tagada korrektne PDF-kujundus.

- **GitHub kaughoidla:** `https://github.com/mssaar/CV.git`
- **Põhiharu:** `main`

---

## KOHUSTUSLIK REEGEL: EESTI JA INGLISE VARIANTIDE SÜNKRONISEERIMINE JA PDF GENEREERIMINE

> [!IMPORTANT]
> **Alati kui on muudatus tehtud mõnes eestikeelses dokumendi failis, siis tehakse sellest kohe samasugune muudatus ka inglisekeelses variandis ning genereeritakse kõigist failidest automaatselt uued PDF-failid.**

1. **Paralleelsus:** Igal dokumendil peab olema nii eestikeelne kui ka ingliskeelne vaste:
   - `Mark Sverker Saar CV.docx` <---> `Mark Sverker Saar CV ENG.docx`
   - `Mark Sverker Saar_ Motivatsioonikiri.docx` <---> `Mark Sverker Saar_ Motivatsioonikiri ENG.docx`
2. **Kujundus ja leheküljearv:**
   - CV peab mahtuma Wordist ekspordituna **täpselt ühele lehele** (1 page). Teksti ega veeriseid ei tohi lasta valguda teisele lehele.
   - Visuaalne hierarhia, fondid, värvid ja paigutus peavad olema mõlemas keeleversioonis identsed.
3. **Automaatne PDF eksport ja jälgimine:**
   - **Käsurida:** käivita kaustas:
     ```powershell
     powershell -ExecutionPolicy Bypass -File export_pdfs.ps1
     ```
   - **Topeltklõpsuga (Windows Explorer):** Käivita `export_pdfs.cmd`.
   - **Reaalajas automaatne jälgija (Live Watcher):** Käivita `watch_docx.cmd` või:
     ```powershell
     powershell -ExecutionPolicy Bypass -File watch_docx.ps1
     ```
     See tuvastab Wordis `Ctrl+S` salvestamise ja genereerib PDF-i automaatselt taustal.
   - **Git Pre-commit Hook (`.git/hooks/pre-commit`):** Kui `git commit` käivitatakse ja mõni `.docx` on muudetud, genereeritakse ja commititakse uuendatud PDF-id automaatselt.
   - Skript konverteerib Microsoft Wordi COM-liidese kaudu kõik `.docx` failid täpse kujundusega `.pdf` failideks ning kontrollib lehekülgede arvu.

---

## Peamised failid ja kaustastruktuur

| Fail / Kaust | Kirjeldus |
|---|---|
| `Mark Sverker Saar CV.docx` | Eestikeelne CV (redigeeritav Wordi dokument, 1 lk) |
| `Mark Sverker Saar CV.pdf` | Eestikeelne CV (PDF formaat) |
| `Mark Sverker Saar CV ENG.docx` | Ingliskeelne CV (redigeeritav Wordi dokument, 1 lk) |
| `Mark Sverker Saar CV ENG.pdf` | Ingliskeelne CV (PDF formaat) |
| `Mark Sverker Saar_ Motivatsioonikiri.docx` | Eestikeelne motivatsioonikiri |
| `Mark Sverker Saar_ Motivatsioonikiri.pdf` | Eestikeelne motivatsioonikiri (PDF) |
| `Mark Sverker Saar_ Motivatsioonikiri ENG.docx` | Ingliskeelne motivatsioonikiri |
| `Mark Sverker Saar_ Motivatsioonikiri ENG.pdf` | Ingliskeelne motivatsioonikiri (PDF) |
| `export_pdfs.ps1` | PowerShell skript kõigi DOCX failide Word COM-i kaudu PDF-iks genereerimiseks |
| `export_pdfs.cmd` | Ühe-klõpsu käivitaja PDF-ide genereerimiseks Windowsis |
| `watch_docx.ps1` | PowerShell reaalajas jälgija (regenererib PDF-i kohe, kui Wordis salvestad) |
| `watch_docx.cmd` | Ühe-klõpsu käivitaja reaalajas jälgija käivitamiseks |
| `.git/hooks/pre-commit` | Git hook, mis uuendab ja lisab PDF-id igal commitil automaatselt |
| `Faili loomises vajalik mudru/` | Algse Canva kujunduse ikoonid, fondid ja layouti abimaterjalid |
| `AGENTS.md` | Projekti kesksed juhised ja agentide reeglid |
| `README.md` | Repositooriumi avalik tutvustus GitHubis |

---

## Kasutaja käsitsi tehtud muudatuste puutumatus
- Kui kasutaja on teinud käsitsi muudatusi mis tahes failis (`.docx`, `.pdf`, `.md`), ei tohi neid kunagi tahtmatult üle kirjutada ega kustutada.
- Enne automatiseeritud skriptide käivitamist või genereerimist kontrollitakse alati, mis failides on muudatusi toimunud.
