import styles from "./styles.module.scss";

interface ReportCardProps {
  onClick?: () => void;
  userId?: string;
  isActive?: boolean;
}
const ReportCard: React.FC<ReportCardProps> = ({
  onClick,
  userId,
  isActive,
}) => {
  return (
    <>
      <div
        className={isActive ? styles.active : styles.container}
        onClick={onClick}
      >
        <div className={styles.title}>{"Report Card"}</div>

        <div className={styles["discover-action"]}>
          <div className={styles.text}>From userId: {userId}</div>
        </div>
      </div>
    </>
  );
};

export default ReportCard;
