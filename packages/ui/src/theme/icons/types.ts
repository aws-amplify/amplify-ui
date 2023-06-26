type ViewBox = {
  minX?: number;
  minY?: number;
  width?: number;
  height?: number;
};

export type Icon = {
  viewBox?: ViewBox;
  pathData?: string;
  paths?: React.SVGAttributes<SVGPathElement>[];
};
