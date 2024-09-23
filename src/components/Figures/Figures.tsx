import Konva from "konva";
import { EllipseConfig } from "konva/lib/shapes/Ellipse";
import { LineConfig } from "konva/lib/shapes/Line";
import { RectConfig } from "konva/lib/shapes/Rect";
import { Ellipse, Line, Rect } from "react-konva";

type TProps = {
  props: RectConfig | LineConfig | EllipseConfig;
  onDragStart: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragEnd: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
};
const Figures = ({ props, onDragStart, onDragEnd, isDraggable }: TProps) => {
  if (props.type === "rect") {
    return (
      <Rect
        id={props.id}
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill={props.fill}
        shadowBlur={props.shadowBlur}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    );
  }
  if (props.type === "line") {
    return (
      <Line
        id={props.id}
        points={[props.startX, props.startY, props.endX, props.endY]}
        shadowBlur={props.shadowBlur}
        strokeWidth={5}
        stroke={"white"}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    );
  }
  return (
    <Ellipse
      id={props.id}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      radiusX={props.radiusX}
      radiusY={props.radiusY}
      fill={props.fill}
      shadowBlur={props.shadowBlur}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Figures;
