export function isNonEmptyString(value: string) {
  return !isEmptyString(value);
}

export function isEmptyString(value: string) {
  return !value || value.length === 0;
}
