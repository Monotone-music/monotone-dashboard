import ApproveAudioTab from "../ApproveAudioTab";
import ApproveAdsTab from "../ApproveAdsTab";
import styles from './styles.module.scss'

import { useState } from 'react';

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => {
  return (
    <div
      className={`${styles['button-container']} ${isActive ? styles['active'] : ''}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const ApprovePage = () => {
  const [activeTab, setActiveTab] = useState('audio');

  return (
    <div className={styles['container']}>
      <div className={styles['tab-container']}>
             <TabButton
        label="Audio Request"
        isActive={activeTab === 'audio'}
        onClick={() => setActiveTab('audio')}
      />
      <TabButton
        label="Advertisement Request"
        isActive={activeTab === 'advertisement'}
        onClick={() => setActiveTab('advertisement')}
      />
      </div>
 

      <div className={styles.tabContent}>
      {activeTab === 'audio' && <ApproveAudioTab />}
      {activeTab === 'advertisement' && <ApproveAdsTab />}
      </div>
    </div>
  );
};

export default ApprovePage;
