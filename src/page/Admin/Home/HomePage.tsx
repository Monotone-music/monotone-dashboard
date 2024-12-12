import styles from "./styles.module.scss";
import TitlePage from "@/shared/components/titlePage/TitlePage";
import AnalyticCard from "@/shared/components/analyticCard/AnalyticCard";
import { IoAlbums, IoEye, IoMusicalNote } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { OverviewChart } from "@/shared/components/overviewChart/OverviewChart";
import OverviewRankSong from "@/shared/components/overviewRankSong/OverviewRankSong";
import { useEffect, useState } from "react";
import { getApproveReqCounts, getHistoricalViewCounts, getTotalAlbums, getTotalTracks } from "@/service/dashboardService";
import { useNavigate } from "react-router-dom";
const HomePage = () => {

  const [totalTracks, setTotalTracks] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalApproveReq, setTotalApproveReq] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const songs = await getTotalTracks();
        const albums = await getTotalAlbums();
        const views = await getHistoricalViewCounts();
        const approveReq = await getApproveReqCounts();
        setTotalTracks(songs);
        setTotalAlbums(albums);
        setTotalViews(views);
        setTotalApproveReq(approveReq);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigateToApprovePage = () => {
    navigate('/admin/approve');
  };


  return (
    <div className={styles.container}>
      <TitlePage title={["Overview", "Dashboard"]} />

      <section className={styles["analytic-section"]}>
        <AnalyticCard
          iconColor="#4CAF50"
          icon={IoMusicalNote}
          title="Total Tracks"
          mainNumber={totalTracks}
          unit="Track(s)"
          loading={loading}
        />
        <AnalyticCard
          iconColor="#2196F3"
          icon={IoAlbums}
          title={"Total Albums"}
          mainNumber={totalAlbums}
          unit="Album(s)"
          loading={loading}
        />
        

        <AnalyticCard
          iconColor="#FFC107"
          icon={IoEye}
          title="Historical Views"
          mainNumber={totalViews}
          unit="Views"
          loading={loading}
        />
        <button 
          onClick={handleNavigateToApprovePage}
        >
        <AnalyticCard
          iconColor="#673AB7"
          icon={AiOutlineCheckCircle}
          title="Track Approve Requests"
          mainNumber={totalApproveReq}
          unit="Tracks Pending Review"
          loading={loading}  
        />
        </button>
      </section>

      <section className={styles["metrics-section"]}>
        <div className={styles["chart-section"]}>
          <TitlePage title={["Total Streams per Month"]} />
          <OverviewChart />
        </div>

        <div className={styles["top-section"]}>
          <TitlePage title={["Top Songs"]} />
          <OverviewRankSong />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
