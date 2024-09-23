import { useState, useId } from "react";
import { Layer, Stage } from "react-konva";
import SideBar from "../../components/SideBar/SideBar";
import Figures from "../../components/Figures/Figures";
import Konva from "konva";
import { TEllipse, TLine, TRect } from "../../components/Figures/types";

const initFigure = {
  id: "",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  fill: "white",
  shadowBlur: 1,
  isDragging: false,
  type: "",
};

const CanvasPage = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Move");
  const [activeDropdown, setActiveDropdown] = useState<
    "rect" | "line" | "ellipse"
  >("rect");
  const [figs, setFigs] = useState<(TRect | TLine | TEllipse)[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const uid = useId() + Math.random();

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeMenu === "Move") return;
    setIsDrawing(true);

    const newFig = {
      ...initFigure,
      id: uid,
      x: e.evt.layerX,
      y: e.evt.layerY,
      type: activeDropdown,
    };
    setFigs((prev) => [...prev, newFig]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    handleDragEnd();
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeMenu === "Move") return;

    const mouseX = e.evt.layerX;
    const mouseY = e.evt.layerY;

    if (!isDrawing) return;
    const currShapeIndex = figs.length - 1;
    const currShape = figs[currShapeIndex];

    const newWidth = mouseX - currShape.x;
    const newHeight = mouseY - currShape.y;

    const newShapesList = figs.slice();

    switch (newShapesList[currShapeIndex].type) {
      case "rect":
        {
          newShapesList[currShapeIndex] = {
            ...newShapesList[currShapeIndex],
            x: currShape.x,
            y: currShape.y,
            width: newWidth,
            height: newHeight,
          };
        }
        break;
      case "line":
        newShapesList[currShapeIndex] = {
          ...newShapesList[currShapeIndex],
          startX: +currShape.x,
          startY: +currShape.y,
          endX: +mouseX,
          endY: +mouseY,
        };
        break;
      case "ellipse":
        newShapesList[currShapeIndex] = {
          ...newShapesList[currShapeIndex],
          x: currShape.x,
          y: currShape.y,
          radiusX: Math.abs(newWidth / 2),
          radiusY: Math.abs(newHeight / 2),
        };
        break;
    }

    setFigs([...newShapesList]);
  };

  const handleDragStart = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeMenu !== "Move") return;

    const id = e.target.id();
    setFigs(
      figs.map((fig) => ({
        ...fig,
        isDragging: fig.id === id,
      }))
    );
  };

  const handleDragEnd = () => {
    setFigs(
      figs.map((fig) => ({
        ...fig,
        isDragging: false,
      }))
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <SideBar
        activeMenu={activeMenu}
        activeDropdown={activeDropdown}
        onSetActiveDropdown={(name) => setActiveDropdown(name)}
        onSetActiveMenu={(name) => setActiveMenu(name)}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {figs.map((rect) => (
            <Figures
              key={rect.id}
              props={rect}
              isDraggable={activeMenu === "Move"}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasPage;
