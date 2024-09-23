export type TRect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  shadowBlur: number;
  isDragging: boolean;
  type: string;
};

export type TLine = {
  id: string;
  x: number;
  y: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isDragging: boolean;
  type: string;
};

export type TEllipse = {
  id: string;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  isDragging: boolean;
  type: string;
};
