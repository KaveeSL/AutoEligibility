# AutoEligibility

**Faculty of Information Technology (External)** · University of Moratuwa, Sri Lanka

Moodle-ready eligibility sheets in seconds. Upload an Excel or CSV file, preview student records, and export a formatted PDF eligibility list.

## Features

- Module metadata form (Module Code, Module Name, Semester)
- Drag-and-drop upload for `.xlsx` and `.csv` files
- Flexible column matching for Reg No, Name with Initials, and Eligibility
- Live preview with eligible / not eligible counts
- Institutional PDF export with conditional row styling

## Tech Stack

- React + Vite
- Tailwind CSS
- SheetJS (xlsx)
- jsPDF + jspdf-autotable

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Sample Data

A sample file is included at `public/sample-eligibility.csv`.

## PDF Output

Exported files are named: `{MODULECODE}-Eligibility List [CA+Exam].pdf`
