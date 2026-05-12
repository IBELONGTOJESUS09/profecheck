export function normalizeInput(value: string) {
  return value.trim().toLowerCase();
}

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function limitPhoneDigits(value: string) {
  return onlyDigits(value).slice(0, 10);
}
