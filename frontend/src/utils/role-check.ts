export function isAdminFn(inputValue: string) {
  let isAdmin = false;
  if (inputValue === 'ADMIN') {
    isAdmin = true;
  }

  return isAdmin;
}

export function isFellesraadFn(inputValue: string) {
  let isAdmin = false;
  if (inputValue === 'FELLESRAAD') {
    isAdmin = true;
  }

  return isAdmin;
}

export function isCompanyFn(inputValue: string) {
  let isAdmin = false;
  if (inputValue === 'COMPANY') {
    isAdmin = true;
  }

  return isAdmin;
}

export const haveCommonItem = (array1: string[], array2: string[]) => array1.some((item) => array2.includes(item));
