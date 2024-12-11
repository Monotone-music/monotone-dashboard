import styles from "./styles.module.scss";
import TitlePage from "@/shared/components/titlePage/TitlePage";
import AnalyticCard from "@/shared/components/analyticCard/AnalyticCard";
import { IoAlbums, IoMusicalNote } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { OverviewChart } from "@/shared/components/overviewChart/OverviewChart";
import OverviewRankSong from "@/shared/components/overviewRankSong/OverviewRankSong";
import { useEffect, useState } from "react";
import { getTotalAlbums, getTotalTracks } from "@/service/dashboardService";
const HomePage = () => {

  const [totalTracks, setTotalTracks] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const songs = await getTotalTracks();
        const albums = await getTotalAlbums();
        setTotalTracks(songs);
        setTotalAlbums(albums);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          icon={FaRegUser}
          title="Followers"
          mainNumber={1000}
          unit="followers"
          loading={loading}
        />
        <AnalyticCard
          iconColor="#673AB7"
          icon={AiOutlineCheckCircle}
          title="Song Review Requests"
          mainNumber={2}
          unit="Songs Pending Review"
          loading={loading}
        />
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
