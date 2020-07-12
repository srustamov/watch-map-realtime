export const clone = object => JSON.parse(JSON.stringify(object));

export const empty = (value) => {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0
  } else if (typeof value === 'string') {
    return value.trim() === '';
  }

  return false;

};
