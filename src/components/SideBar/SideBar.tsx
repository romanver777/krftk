/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
import cn from "classnames";
import styles from "./SideBar.module.css";
import MoveIcon from "../../assets/icons/move.svg?react";
import RectIcon from "../../assets/icons/rect.svg?react";
import LineIcon from "../../assets/icons/line.svg?react";
import EllipseIcon from "../../assets/icons/ellipse.svg?react";
import DropDown from "../DropDown/DropDown";

export type TFigure = {
  name: "rect" | "line" | "ellipse";
  icon: React.ReactNode;
};

type TProps = {
  activeMenu: string;
  activeDropdown: string;
  onSetActiveMenu: (name: string) => void;
  onSetActiveDropdown: (name: "rect" | "line" | "ellipse") => void;
};

const SideBar = ({
  activeMenu,
  activeDropdown,
  onSetActiveMenu,
  onSetActiveDropdown,
}: TProps) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const figures: TFigure[] = [
    { name: "rect", icon: <RectIcon /> },
    { name: "line", icon: <LineIcon /> },
    { name: "ellipse", icon: <EllipseIcon /> },
  ];
  const menu = [
    {
      name: "Move",
      icon: <MoveIcon />,
    },
    {
      name: "Figures",
      icon: <RectIcon />,
      subMenu: figures,
    },
  ];

  const handleMenuClick = (name: string) => {
    onSetActiveMenu(name);
    if (name === menu[0].name) {
      setOpenDropDown(false);
      return;
    }
    if (
      name === activeMenu &&
      Object.prototype.hasOwnProperty.call(
        menu.filter((it) => it.name === name)[0],
        "subMenu"
      )
    ) {
      setOpenDropDown((prev) => !prev);
    }
  };

  const getIcon = (name: string) => {
    if (name === menu[0].name) return <MoveIcon />;

    switch (activeDropdown) {
      case "rect":
        return <RectIcon />;
      case "line":
        return <LineIcon />;
      case "ellipse":
        return <EllipseIcon />;
    }
  };

  return (
    <>
      <div className={styles.sidebar}>
        <ul className={styles.buttons__list}>
          {menu.map((item, index) => (
            <li key={index} className={styles.buttons__item}>
              <button
                className={cn(styles.button, {
                  [styles.button_active]: activeMenu === item.name,
                })}
                onClick={() => handleMenuClick(item.name)}
              >
                {getIcon(item.name)}
              </button>
              {item.subMenu && openDropDown && (
                <DropDown
                  items={item.subMenu}
                  active={activeDropdown}
                  onClose={() => setOpenDropDown(false)}
                  onActive={(name) => onSetActiveDropdown(name)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      {openDropDown && (
        <div
          className={styles.downLayer}
          onClick={() => setOpenDropDown(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
