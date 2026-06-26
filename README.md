# AutoEligibility

**Moodle-ready eligibility sheets in seconds**

A web-based utility for the **Faculty of Information Technology (External)**, **University of Moratuwa, Sri Lanka**. AutoEligibility turns Excel or CSV student data into formatted, institutional PDF eligibility lists — ready to upload to Moodle or share with academic staff.

Developed under **CODL · UoM**.

---

## What is AutoEligibility?

AutoEligibility is a browser-based tool that helps FIT (External) staff prepare **CA + Exam eligibility lists** without manual PDF formatting. Instead of copying rows into Word or rebuilding tables by hand, you:

1. Enter module details (Module Code, Module Name, Semester)
2. Upload a spreadsheet with student eligibility data
3. Preview the parsed records and summary counts
4. Download a professionally formatted PDF in one click

All processing happens **entirely in your browser** — no student data is sent to a server.

---

## Who is it for?

- **Academic staff** preparing exam eligibility lists
- **Module coordinators** exporting Moodle-ready documents
- **FIT (External) administrators** standardising eligibility sheet format across modules

---

## Features

| Feature | Description |
|--------|-------------|
| **Module metadata form** | Module Code, Module Name, and Semester appear in the PDF header (auto-uppercased) |
| **Drag-and-drop upload** | Accepts `.xlsx` and `.csv` files only |
| **Flexible column matching** | Recognises similar column headers in uploaded spreadsheets |
| **Eligibility normalisation** | Converts values like `not-eligible` → `not eligible` (case-insensitive) |
| **Live data preview** | Review all rows in a table before exporting |
| **Summary dashboard** | Shows total, eligible, and not eligible student counts |
| **Institutional PDF layout** | University logo, faculty name, and module metadata |
| **Conditional row styling** | Green for Eligible, red for Not Eligible |
| **Validation toasts** | Clear messages if module details are missing before export |
| **Reset controls** | Clear module details or uploaded file independently |

---

## How it works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Module Details │ ──► │  Upload Excel/   │ ──► │  Preview &      │
│  (Code, Name,   │     │  CSV file        │     │  Summary Counts │
│   Semester)     │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                           │
                                                           ▼
                                                  ┌─────────────────┐
                                                  │  Download PDF   │
                                                  │  [CA+Exam]      │
                                                  └─────────────────┘
```

---

## Input file requirements

Your spreadsheet must include three columns. Header names can vary — AutoEligibility matches similar labels automatically.

### Required columns

| Field | Accepted header examples |
|-------|--------------------------|
| **Reg No** | `Reg No`, `Registration No`, `Registration Number`, `Student ID`, `Index No` |
| **Name with Initials** | `Name with Initials`, `Name`, `Student Name`, `Full Name` |
| **Eligibility** | `Eligibility`, `Eligibility Status`, `Status` |

### Eligibility values

The app recognises (case-insensitive):

- **Eligible** — e.g. `Eligible`, `eligible`
- **Not Eligible** — e.g. `Not Eligible`, `not-eligible`, `not eligible`

Hyphens in eligibility values are normalised automatically.

### Sample file

A sample CSV is included at:

```
public/sample-eligibility.csv
```

---

## PDF output

### File naming

Exported PDFs are saved as:

```
{MODULECODE}-Eligibility List [CA+Exam].pdf
```

**Example:** `ITE2823-Eligibility List [CA+Exam].pdf`

### Document layout

| Section | Content |
|---------|---------|
| **Header** | University of Moratuwa logo (centred) |
| **Institution** | University of Moratuwa, Sri Lanka |
| **Faculty** | Faculty of Information Technology (External) |
| **Metadata** | Semester \| Module Code - Module Name |
| **Table** | #, Reg No, Name with Initials, Eligibility |

### Row colours

| Status | Background | Text |
|--------|------------|------|
| Eligible | Light green `#E8F5E9` | Dark green `#1B5E20` |
| Not Eligible | Light red `#FFEBEE` | Dark red `#B71C1C` |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
git clone https://github.com/KaveeSL/AutoEligibility.git
cd AutoEligibility
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

The built files are output to the `dist/` folder and can be deployed to any static host (GitHub Pages, Netlify, Vercel, etc.).

---

## Usage guide

1. **Fill in Module Details** — enter Module Code, Module Name, and Semester (fields auto-convert to uppercase).
2. **Upload your file** — drag and drop or browse for an `.xlsx` or `.csv` file.
3. **Review the preview** — check student rows and the eligible / not eligible counts.
4. **Download PDF** — click **Download PDF**. If any module field is empty, a toast will list what still needs to be filled in.
5. **Reset** — use the **Reset** button in Module Details to clear the form, or remove the uploaded file to start over.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Excel parsing | [SheetJS (xlsx)](https://sheetjs.com/) |
| PDF generation | [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) |
| Icons | Lucide React |
| Font (dashboard) | Fira Code |

Heavy libraries (`xlsx`, `jspdf`) are **lazy-loaded** — they only download when you upload a file or export a PDF, keeping the initial page load fast.

---

## Project structure

```
AutoEligibility/
├── public/
│   ├── favicon.svg
│   └── sample-eligibility.csv
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header & branding
│   │   ├── MetadataForm.jsx    # Module details form
│   │   ├── FileUpload.jsx      # Drag-and-drop upload
│   │   ├── StatsSummary.jsx    # Eligible / not eligible counts
│   │   ├── DataPreview.jsx     # Table preview & download button
│   │   └── Toast.jsx           # Validation notifications
│   ├── utils/
│   │   ├── excelParser.js      # Spreadsheet parsing & normalisation
│   │   ├── pdfGenerator.js     # PDF layout & export
│   │   ├── eligibility.js      # Eligibility counting & regex
│   │   └── metadata.js         # Form validation helpers
│   ├── config.js               # App name, faculty, institution
│   └── App.jsx                 # Main application
└── vite.config.js
```

---

## Privacy & data handling

AutoEligibility runs **100% client-side**. Your uploaded spreadsheets and generated PDFs never leave your device. There is no backend server, database, or analytics tracking student records.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Contributing

Contributions, issues, and feature requests are welcome. If you are part of FIT (External) or CODL and would like to suggest improvements, please open an issue on this repository.

---

## Acknowledgements

- **University of Moratuwa** — institutional branding and logo
- **Faculty of Information Technology (External)** — primary users of this tool
- **CODL · UoM** — development and maintenance

---

## License

This project is intended for academic use within the University of Moratuwa ecosystem. See repository settings or contact the maintainer for licensing details.

---

<p align="center">
  <strong>AutoEligibility</strong><br>
  Faculty of Information Technology (External) · University of Moratuwa, Sri Lanka<br>
  <em>Moodle-ready eligibility sheets in seconds</em>
</p>
