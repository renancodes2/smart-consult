export function formatPhoneNumber(value: string) {
    const cleaned = ('' + value).replace(/\D/g, '');

    if (cleaned.length <= 2) {
      return cleaned;
    }
    if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }

    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  }


  export function removeCharacters(value: string){
    const clearCaracters = value.replace(/[\(\)\s-]/g, "")

    return clearCaracters;
  }