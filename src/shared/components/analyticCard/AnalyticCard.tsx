import React from "react";
import styles from "./styles.module.scss";
import { IconType } from "react-icons";
import PuffLoader from "react-spinners/PuffLoader";

interface AnalyticCardProps {
    title: string;
    mainNumber: string | number | null;
    dateRange?: string;
    icon: IconType;
    iconColor: string;
    unit: string;
    loading?: boolean;
}

const AnalyticCard:React.FC<AnalyticCardProps> = ({title, mainNumber, dateRange, icon, iconColor, unit, loading}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        {dateRange && <div className={styles.date}>{dateRange}</div>}
      </div>

      <div className={styles.bottom}>
        <div className={styles.icon} style={{color: iconColor}}>
            {React.createElement(icon)}
        </div>
        <div className={styles["main-number"]}>
          {loading ? <PuffLoader size={40} color={iconColor} /> : `${mainNumber} `}
          <span className={styles.unit}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticCard;