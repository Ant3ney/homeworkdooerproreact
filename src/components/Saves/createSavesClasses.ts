export default (md: any, lg: any, xl2: any, i: number) => {
  if (md) return "single_card";
  else if (lg) {
    const isFirst = i % 3 === 0;
    const isMiddle = i % 3 === 1;
    const isLast = i % 3 === 2;
    if (isFirst) return "firstOfThree";
    else if (isMiddle) return "middleOfThree";
    else if (isLast) return "lastOfThree";
  } else if (xl2) {
    const isFirst = i % 3 === 0;
    const isMiddle = i % 3 === 1;
    const isLast = i % 3 === 2;
    if (isFirst) return "firstOfThree";
    else if (isMiddle) return "middleOfThree";
    else if (isLast) return "lastOfThree";
  } else {
    const isFirst = i % 4 === 0;
    const isMiddleLeft = i % 4 === 1;
    const isMiddleRight = i % 4 === 2;
    const isLast = i % 4 === 3;
    if (isFirst) return "firstOfFour";
    else if (isMiddleLeft) return "middleLeftOfFour";
    else if (isMiddleRight) return "middleRightOfFour";
    else if (isLast) return "lastOfFour";
  }
};
