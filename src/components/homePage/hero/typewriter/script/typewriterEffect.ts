interface TypeWriterOptionsType {
  typingSpeed?: number, 
  typingDelay?: number,
  erasingSpeed?: number,
  erasingDelay?: number
}

type TypeWriterEffectType = (titles: string[], typeWriterElement: HTMLElement, options?: TypeWriterOptionsType) => void

const defaultOptions = {
  typingSpeed: 150,
  typingDelay: 500,
  erasingSpeed: 50,
  erasingDelay: 2000
}

//typewriterEffect creates a typewriter effect on a given element
const typeWriterEffect: TypeWriterEffectType = (titles, typeWriterElement, options = defaultOptions) => {
  let stringIndex: number = 0;
  let charIndex: number = 0;
  let erasingInterval: NodeJS.Timeout;


  //types the next character in the current string.
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
  
  //erases the last character in the typewriter element.
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

export default typeWriterEffect;
