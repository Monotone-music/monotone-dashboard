import styles from "./styles.module.scss";
import SideBtn from "./sideBtn/SideBtn";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { TbMessageReportFilled } from "react-icons/tb";
import { FaCreditCard, FaFileAudio, FaUsers } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import LogoutButton from "../logoutButton/LogoutButton";

const SideMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <span>Monotone</span>
          <span>
            Studio <span className={styles.role}>admin</span>
          </span>
        </div>

        <div className={styles["list-wrapper"]}>
          <SideBtn
            icon={RiDashboardHorizontalFill}
            iconHovered={RiDashboardHorizontalFill}
            title="Overview"
            to="/admin/overview"
          />
          <SideBtn
            icon={FaFileAudio}
            iconHovered={FaFileAudio}
            title="Approve"
            to="/admin/approve"
          />
          <SideBtn
            icon={FaCreditCard}
            iconHovered={FaCreditCard}
            title="Payment History"
            to="/admin/history"
          />
          <SideBtn
            icon={TbMessageReportFilled }
            iconHovered={TbMessageReportFilled }
            title="Report Management"
            to="/admin/report"
          />
                <SideBtn
            icon={FaUsers  }
            iconHovered={FaUsers  }
            title="Account Management"
            to="/admin/account"
          />
        </div>
      </div>
      <div className={styles.bottom}>

        <div className={styles["list-wrapper"]}>
          <LogoutButton
            icon={FiLogOut}
            iconHovered={FiLogOut}
            title="Logout"
            to="/auth/sign-in"
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
