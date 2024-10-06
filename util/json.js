import sjson from 'secure-json-parse';

export function parseJson(json) {
  if (!json) return undefined;
  try {
    return sjson(json);
  } catch {
    return undefined;
  }
}
