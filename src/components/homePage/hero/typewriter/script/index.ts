import typeWriterEffect from "./typewriterEffect";

const typeWriter = document.querySelector(
  "div.type-writer"
) as HTMLElement;

const titles = typeWriter.getAttribute("data-titles")?.split(",");
const typingElement = typeWriter.querySelector("span");

if (typingElement && titles) typeWriterEffect(titles, typingElement);