/**
 * Crea una cadena de texto aleatorio a partir de letras
 *
 * @function generateRandomText
 * @param length {number}
 * @returns string - The style value
 */
export default function generateRandomText(length:number){
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}
