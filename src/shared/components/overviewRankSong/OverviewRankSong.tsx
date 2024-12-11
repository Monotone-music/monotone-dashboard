import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTopTracks } from "@/service/topTrackService";
import { Skeleton } from "@/components/ui/skeleton";

const OverviewRankSong = () => {
  const [tracks, setTracks] = useState<{ _id: string; title: string; displayedArtist: string; duration: number; view: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTracks = async () => {
      setLoading(true);
      try {
        const data = await getTopTracks();
        setTracks(data || []); // Ensure tracks is an array
      } catch (error) {
        console.error('Error fetching top tracks:', error);
        setTracks([]); // Set tracks to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles["outer-container"]}>
      <div className={styles.container}>
        <Table>
          <TableHeader className="h-16 font-bold bg-slate-100">
            <TableRow>
              <TableHead className="text-black font-bold">Song Title</TableHead>
              <TableHead className="font-bold w-[150px] text-black">Artist</TableHead>
              <TableHead className="font-bold text-center text-black w-[100px]">Duration</TableHead>
              <TableHead className="text-center text-black font-bold w-[130px]">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index} className="h-20">
                    <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              tracks.map((track) => (
                <TableRow key={track._id} className="h-20">
                  <TableCell className="font-medium truncate max-w-[100px]">{track.title}</TableCell>
                  <TableCell>{track.displayedArtist}</TableCell>
                  <TableCell className="text-center">{formatDuration(track.duration)}</TableCell>
                  <TableCell className="text-center">{track.view}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OverviewRankSong;