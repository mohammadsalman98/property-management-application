export function getStringValue(value: FormDataEntryValue | null): string {
  if (value instanceof File) {
    // Handle the case when value is a File (e.g., extract file name)
    return value.name;
  }
  // Otherwise, assume it's a string or null
  return value || ""; // Return an empty string if null
}
