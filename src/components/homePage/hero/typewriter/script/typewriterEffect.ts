interface TypeWriterOptionsType {
  typingSpeed?: number,
  typingDelay?: number,
  erasingSpeed?: number,
  erasingDelay?: number
}

const defaultOptions = {
  typingSpeed: 150,
  typingDelay: 500,
  erasingSpeed: 50,
  erasingDelay: 2000
}

const typeWriterEffect = (titles: string[], typeWriterElement: HTMLElement, options: TypeWriterOptionsType = defaultOptions) => {
  let stringIndex: number = 0;
  let charIndex: number = 0;
  let erasingInterval: number;

  const type = () => {
    const currentString = titles[stringIndex];
    if (charIndex < currentString.length) {
      typeWriterElement.innerHTML += currentString.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typingInterval);
      setTimeout(() => {
        erasingInterval = setInterval(erase, options.erasingSpeed);
      }, options.erasingDelay);
    }
  };
  
  const erase = () => {
    const currentString = titles[stringIndex];
    if (charIndex > 0) {
      typeWriterElement.innerText = currentString.substring(0, charIndex - 1);
      charIndex--;
    } else {
      clearInterval(erasingInterval);
      setTimeout(() => {
        typingInterval = setInterval(type, options.typingSpeed);
      }, options.typingDelay);
      stringIndex++;
      if (stringIndex >= titles.length) {
        stringIndex = 0;
      }
      charIndex = 0;
      typeWriterElement.innerText = "";
    }
  };

  let typingInterval = setInterval(type, options.typingSpeed);
}

export type { TypeWriterOptionsType }

export default typeWriterEffect;