export function isLeadFn(inputValue: string[]) {
  const isLead = inputValue.includes('Lead');

  return isLead;
}

export const haveCommonItem = (array1: string[], array2: string[]) =>
  array1.some((item) => array2.includes(item));
