export const enum BreakingPointes {
  xxl = 'xxl',
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs',
}

export const enum BreakingPointsWidth {
  xxl = 1536,
  xl = 1280,
  lg = 1024,
  md = 768,
  sm = 640,
  xs = 475,
}

export type BreakpointRangeValueType = BreakingPointes | 'rest';
type GetBreakingPointType = (width: number) => {minWidth: BreakpointRangeValueType, maxWidth: BreakpointRangeValueType};

export const getBreakingPoint: GetBreakingPointType = (width) => {
  if(width > BreakingPointsWidth.xxl) {
   return {
     minWidth: BreakingPointes.xxl,
     maxWidth: 'rest'
   };
  }
  if(width > BreakingPointsWidth.xl) {
    return {
      minWidth: BreakingPointes.xl,
      maxWidth: BreakingPointes.xxl
    };
  }
  if(width > BreakingPointsWidth.lg) {
    return {
      minWidth: BreakingPointes.lg,
      maxWidth: BreakingPointes.xl
    };
  }
  if(width > BreakingPointsWidth.md) {
    return {
      minWidth: BreakingPointes.md,
      maxWidth: BreakingPointes.lg
    };
  }
  if(width > BreakingPointsWidth.sm) {
    return {
      minWidth: BreakingPointes.sm,
      maxWidth: BreakingPointes.md
    };
  }
  if(width > BreakingPointsWidth.xs) {
    return {
      minWidth: BreakingPointes.xs,
      maxWidth: BreakingPointes.sm
    };
  }
  return {
    minWidth: 'rest',
    maxWidth: BreakingPointes.xs
  };
}