import { rand } from "@/utils/helpers/random";
import { getBreakingPoint, BreakingPointes } from "@/utils/helpers/breakingPoints";

type SetBubblePropertiesType = (screenWidth: number) => {
  totalBubble: number;
  minPosition: number;
  maxPosition: number;
};

type BubbleStyleMakerType = (totalAmount: number, minPosition: number, maxPosition: number) => string[]

type CreateBubbleStyleListType = (screenWidth: number) => string[]

const bubbleStyleMaker: BubbleStyleMakerType = (totalAmount, minPosition, maxPosition) => {
  const bubblesList: string[] = [];
  for (let i = 0; i <= totalAmount; i++) {
    const bubbleStyle = `
      --size: ${rand(1, 5)}rem;
      --distance: ${rand(4, 12)}rem;
      --position: ${rand(minPosition, maxPosition)}%;
      --time: ${rand(2, 5)}s;
      --delay: -${rand(2, 12)}s
    `;
    bubblesList.push(bubbleStyle);
  }
  return bubblesList;
}
const setBubbleProperties: SetBubblePropertiesType = (screenWidth) => {
  const { maxWidth } = getBreakingPoint(screenWidth);

  switch (maxWidth) {
    case(BreakingPointes.md):
      return {
        totalBubble: 180,
        minPosition: 0,
        maxPosition: 100,
      };
    case(BreakingPointes.sm):
      return {
        totalBubble: 150,
        minPosition: 0,
        maxPosition: 100,
      };
    case(BreakingPointes.xs):
      return {
        totalBubble: 80,
        minPosition: 0,
        maxPosition: 100,
      };
    default:
      return {
        totalBubble: 250,
        minPosition: 0,
        maxPosition: 100,
      };
  }
}
const createBubbleStyleList: CreateBubbleStyleListType = (screenWidth) => {
  const { totalBubble, minPosition, maxPosition } =
    setBubbleProperties(screenWidth);
  return bubbleStyleMaker(totalBubble, minPosition, maxPosition);
}

export default createBubbleStyleList;

