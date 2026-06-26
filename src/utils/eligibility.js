export const ELIGIBLE_REGEX = /^eligible$/i
export const NOT_ELIGIBLE_REGEX = /^not\s+eligible$/i

export function countEligibility(rows) {
  let eligible = 0
  let notEligible = 0

  for (const row of rows) {
    if (ELIGIBLE_REGEX.test(row.eligibility)) eligible += 1
    else if (NOT_ELIGIBLE_REGEX.test(row.eligibility)) notEligible += 1
  }

  return {
    eligible,
    notEligible,
    total: rows.length,
  }
}
