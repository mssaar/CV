# Mark Sverker Saar – CV ja Kandideerimismaterjalid

See repositoorium sisaldab Mark Sverker Saare elulookirjeldust (CV) ja motivatsioonikirja nii eesti kui ka inglise keeles, nii redigeeritavas Wordi (.docx) kui ka lõplikus PDF (.pdf) vormingus.

## Dokumendid / Documents

### Elulookirjeldus / Curriculum Vitae
- **Eesti keeles (ET):**
  - [Mark Sverker Saar CV.pdf](./Mark%20Sverker%20Saar%20CV.pdf)
  - [Mark Sverker Saar CV.docx](./Mark%20Sverker%20Saar%20CV.docx)
- **Inglise keeles (EN):**
  - [Mark Sverker Saar CV ENG.pdf](./Mark%20Sverker%20Saar%20CV%20ENG.pdf)
  - [Mark Sverker Saar CV ENG.docx](./Mark%20Sverker%20Saar%20CV%20ENG.docx)

### Motivatsioonikiri / Cover Letter
- **Eesti keeles (ET):**
  - [Mark Sverker Saar_ Motivatsioonikiri.pdf](./Mark%20Sverker%20Saar_%20Motivatsioonikiri.pdf)
  - [Mark Sverker Saar_ Motivatsioonikiri.docx](./Mark%20Sverker%20Saar_%20Motivatsioonikiri.docx)
- **Inglise keeles (EN):**
  - [Mark Sverker Saar_ Motivatsioonikiri ENG.pdf](./Mark%20Sverker%20Saar_%20Motivatsioonikiri%20ENG.pdf)
  - [Mark Sverker Saar_ Motivatsioonikiri ENG.docx](./Mark%20Sverker%20Saar_%20Motivatsioonikiri%20ENG.docx)

---

## Automaatika / Automation
PDF failide ajakohasena hoidmiseks on mitu mugavat võimalust:

1. **Topeltklõps Windowsis:** Käivita [`export_pdfs.cmd`](./export_pdfs.cmd) või reaalajas jälgija [`watch_docx.cmd`](./watch_docx.cmd).
2. **Käsurida (PowerShell):**
   ```powershell
   powershell -ExecutionPolicy Bypass -File export_pdfs.ps1
   ```
3. **Reaalajas jälgija (Live Watcher):**
   ```powershell
   powershell -ExecutionPolicy Bypass -File watch_docx.ps1
   ```
   *(Uuendab PDF-i automaatselt iga kord, kui Wordis `Ctrl+S` vajutad)*
4. **Git Pre-commit Hook:** Igal commitil (sh agendi autosync) genereeritakse ja commititakse PDF-id automaatselt.

Täpsemad reeglid ja arendussuunised asuvad failis [`AGENTS.md`](./AGENTS.md).
