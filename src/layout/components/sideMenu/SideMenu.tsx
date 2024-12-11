import styles from "./styles.module.scss";
import SideBtn from "./sideBtn/SideBtn";
import { RiDashboardHorizontalFill } from "react-icons/ri";
// import { HiUsers } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
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
          {/* <SideBtn
            icon={HiUsers}
            iconHovered={HiUsers}
            title="Accounts"
            to="/admin/accounts-management"
          /> */}
          <SideBtn
            icon={FaUser}
            iconHovered={FaUser}
            title="Upload"
            to="/admin/uploader"
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
