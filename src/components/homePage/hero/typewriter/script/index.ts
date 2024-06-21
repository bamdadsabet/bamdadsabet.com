import typeWriterEffect from "./typewriterEffect";

// getting typewriter html element 
const typeWriter = document.querySelector(
  "div.type-writer"
) as HTMLElement;

// getting typewriter parameters 
const titles = typeWriter.getAttribute("data-titles")?.split(",");
const typingElement = typeWriter.querySelector("span");

// initializing typewriter
if (typingElement && titles) {
  typeWriterEffect(titles, typingElement);
}