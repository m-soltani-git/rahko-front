export function removeNulls(obj) {
  if (obj === null) {
    return undefined;
  }
  if (typeof obj === 'object') {
    for (let key in obj) {
      obj[key] = removeNulls(obj[key]);
    }
  }
  return obj;
};

export function isEmptyObject(object) {
  for (const property in object) {
    return false;
  }
  return true;
}