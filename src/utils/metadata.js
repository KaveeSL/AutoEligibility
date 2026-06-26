const FIELD_LABELS = {
  moduleCode: 'Module Code',
  moduleName: 'Module Name',
  semester: 'Semester',
}

export function getMissingMetadataFields(metadata) {
  return Object.entries(FIELD_LABELS)
    .filter(([key]) => !metadata[key]?.trim())
    .map(([, label]) => label)
}
