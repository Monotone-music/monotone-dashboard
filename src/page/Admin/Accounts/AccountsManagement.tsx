import styles from './styles.module.scss'
import TitlePage from '@/shared/components/titlePage/TitlePage'
import RedirectCard from '@/shared/admin/RedirectCard/RedirectCard'
import { Outlet, useLocation } from 'react-router-dom'


const AccountListView = () => {
  return (
    <div className={styles['card-wrapper']}>
      <RedirectCard title={['Artist']} to='/admin/accounts-management/artist'/>
      <RedirectCard title={['Music Label']} to='/admin/accounts-management/music-label'/>
      <RedirectCard title={['Distributor']} to='/admin/accounts-management/distributor'/>
      <RedirectCard title={['Advertiser']} to='/admin/accounts-management/advertiser'/>
    </div>
  );
};

const AccountsManagement = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/admin/accounts-management';

  return (
    <div className={styles.container}>
      <TitlePage title={['Accounts', 'Management']}/>

        {isRootPath ? <AccountListView /> : <Outlet />}

        {/* {showPopup && <AccountsPopup accountId={_id} onClose={handleClosePopup}/>}
        {showPopupDelete && <AccountsPopupDelete/>} */}
        {/* <Toaster/> */}
    </div>
  )
}

export default AccountsManagement