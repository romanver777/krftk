import cn from "classnames";
import { TFigure } from "../SideBar/SideBar";
import CheckIcon from "../../assets/icons/check.svg?react";
import styles from "./DropDown.module.css";

type TProps = {
  items: TFigure[];
  active: string | null;
  onClose: () => void;
  onActive: (nam: string) => void;
};

const DropDown = ({ items, active, onClose, onActive }: TProps) => {
  const handleAction = (name: string) => {
    onActive(name);
    onClose();
  };

  return (
    <>
      <div className={styles.dropDown}>
        <ul className={styles.dropDown__list}>
          {items.map((item, index) => (
            <li key={index} className={styles.dropDown__item}>
              <button
                className={cn(styles.dropDown__btn, {
                  [styles.dropDown__btn_active]: active === item.name,
                })}
                onClick={() => handleAction(item.name)}
              >
                {item.name}
                {active === item.name && (
                  <span className={styles.dropDown__svgWrap}>
                    <CheckIcon />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
