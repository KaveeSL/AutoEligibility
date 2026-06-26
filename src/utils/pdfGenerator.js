import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoSrc from '../assets/logo.png'
import { APP_CONFIG } from '../config'
import { ELIGIBLE_REGEX, NOT_ELIGIBLE_REGEX } from './eligibility'

const STYLES = {
  eligible: { fill: [232, 245, 233], text: [27, 94, 32] },
  notEligible: { fill: [255, 235, 238], text: [183, 28, 28] },
}

function getEligibilityStyle(status) {
  if (ELIGIBLE_REGEX.test(status)) return STYLES.eligible
  if (NOT_ELIGIBLE_REGEX.test(status)) return STYLES.notEligible
  return null
}

function formatDisplayStatus(status) {
  if (ELIGIBLE_REGEX.test(status)) return 'Eligible'
  if (NOT_ELIGIBLE_REGEX.test(status)) return 'Not Eligible'
  return status
}

async function loadLogoDataUrl() {
  const response = await fetch(logoSrc)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export class PDFGenerator {
  constructor({ moduleCode, moduleName, semester, rows }) {
    this.moduleCode = moduleCode
    this.moduleName = moduleName
    this.semester = semester
    this.rows = rows
    this.doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  }

  async generate() {
    const doc = this.doc
    const pageWidth = doc.internal.pageSize.getWidth()
    const logoData = await loadLogoDataUrl()

    const logoSize = 28
    doc.addImage(logoData, 'PNG', pageWidth / 2 - logoSize / 2, 10, logoSize, logoSize)

    let y = 44
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(20, 20, 20)
    doc.text(APP_CONFIG.institution, pageWidth / 2, y, { align: 'center' })

    y += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.setTextColor(50, 50, 50)
    doc.text(APP_CONFIG.faculty, pageWidth / 2, y, { align: 'center' })
    y += 10

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(30, 30, 30)
    doc.text(`${this.semester}  |  ${this.moduleCode} - ${this.moduleName}`, pageWidth / 2, y, {
      align: 'center',
    })

    const tableBody = this.rows.map((row, index) => [
      String(index + 1),
      row.regNo,
      row.name,
      formatDisplayStatus(row.eligibility),
    ])

    autoTable(doc, {
      startY: y + 8,
      head: [['#', 'Reg No', 'Name with Initials', 'Eligibility']],
      body: tableBody,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [13, 71, 161],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 12 },
        1: { halign: 'center', cellWidth: 38 },
        3: { halign: 'center' },
      },
      didParseCell(data) {
        if (data.section !== 'body' || data.column.index !== 3) return
        const style = getEligibilityStyle(data.cell.raw)
        if (!style) return
        data.cell.styles.fillColor = style.fill
        data.cell.styles.textColor = style.text
        data.cell.styles.fontStyle = 'bold'
      },
    })

    return doc
  }

  save(filename) {
    const safeName = filename.replace(/[^a-z0-9_-]/gi, '_')
    this.doc.save(safeName)
  }
}

export async function downloadEligibilityPDF(options) {
  const generator = new PDFGenerator(options)
  const doc = await generator.generate()
  const filename = `${options.moduleCode.trim()}-Eligibility List [CA+Exam].pdf`
  doc.save(filename)
}
