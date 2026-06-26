import * as XLSX from 'xlsx'

const COLUMN_ALIASES = {
  regNo: [
    'registration number',
    'registration no',
    'reg number',
    'reg no',
    'regno',
    'student id',
    'student number',
    'index no',
    'index number',
  ],
  name: [
    'name with initials',
    'name initials',
    'name w initials',
    'student name',
    'full name',
    'name',
    'initials',
  ],
  eligibility: ['eligibility status', 'eligibility', 'eligible status', 'status'],
}

function normalizeHeader(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
}

function findColumnKey(headers, aliases) {
  const normalized = headers.map(normalizeHeader)
  const sortedAliases = [...aliases].sort((a, b) => b.length - a.length)

  for (const alias of sortedAliases) {
    const index = normalized.findIndex(
      (header) => header === alias || header.includes(alias) || alias.includes(header),
    )
    if (index !== -1) return headers[index]
  }
  return null
}

export function normalizeEligibility(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
}

export function parseEligibilityFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

        if (!rows.length) {
          reject(new Error('The uploaded file contains no data rows.'))
          return
        }

        const headers = Object.keys(rows[0])
        const regNoKey = findColumnKey(headers, COLUMN_ALIASES.regNo)
        const nameKey = findColumnKey(headers, COLUMN_ALIASES.name)
        const eligibilityKey = findColumnKey(headers, COLUMN_ALIASES.eligibility)

        if (!regNoKey || !nameKey || !eligibilityKey) {
          reject(
            new Error(
              'Required columns not found. Ensure the file includes Reg No, Name with Initials, and Eligibility columns (or similar headers).',
            ),
          )
          return
        }

        const normalized = rows
          .map((row) => ({
            regNo: String(row[regNoKey] ?? '').trim(),
            name: String(row[nameKey] ?? '').trim(),
            eligibility: normalizeEligibility(row[eligibilityKey]),
          }))
          .filter((row) => row.regNo || row.name || row.eligibility)

        resolve(normalized)
      } catch (error) {
        reject(new Error('Failed to parse the file. Please upload a valid .xlsx or .csv file.'))
      }
    }

    reader.onerror = () => reject(new Error('Could not read the uploaded file.'))
    reader.readAsArrayBuffer(file)
  })
}
