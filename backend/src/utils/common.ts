export function add(array: string[], value: string): string[] {
  if (array.indexOf(value) === -1) {
    array.push(value);
  }

  return array;
}

export function remove(array: string[], value: string): string[] {
  let index: number = array.indexOf(value);
  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
}

export const haveCommonItem = (array1: string[], array2: string[]) => {
  return array1.some((item) => array2.includes(item));
};
