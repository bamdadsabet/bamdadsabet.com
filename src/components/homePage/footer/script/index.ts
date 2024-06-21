import createBubbleStyleList from "./createBubbleStyleList";

const updateFooterBubbles = (styleList: string[]): void => {
  const container = document.getElementById('footer-bubbles-container') as HTMLElement;
  container.innerHTML = '';

  styleList.forEach(style => {
    const bubble = document.createElement('div');
    bubble.className = 'footer__bubble';
    bubble.style.cssText = style;
    container.appendChild(bubble);
  });
}

const handleResize = (): void => {
  const styleList = createBubbleStyleList(window.innerWidth);
  updateFooterBubbles(styleList);
}

// initializing footer bubbles
const styleList = createBubbleStyleList(window.innerWidth);
updateFooterBubbles(styleList);
window.addEventListener('resize', handleResize);
