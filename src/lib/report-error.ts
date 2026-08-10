export function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  return new Error(typeof value === "string" ? value : JSON.stringify(value), {
    cause: value,
  });
}

export function reportError(scope: string, value: unknown): Error {
  const error = toError(value);
  console.error(`[spoko-domek] ${scope}:`, error);
  return error;
}
