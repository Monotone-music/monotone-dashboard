import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import {
  approveRecording,
  declineRecording,
  getUnavailableRecordings,
} from "@/service/approveService";
import { Button } from "@/components/ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
  interface Recording {
    _id: string;
    title: string;
    displayedArtist: string;
    duration: number;
    image: { filename: string };
  }

const ApproveAudioTab = () => {
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRecording, setExpandedRecording] = useState<string | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUnavailableRecordings();
        setRecordings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recordings:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: string, title: string) => {
    try {
      await approveRecording(id);
      setRecordings(recordings.filter((recording) => recording._id !== id));
      setExpandedRecording(null);
      toast({
        title: "Success",
        description: `Approved recording: ${title}`,
        variant: "default",
        className: styles["toast-success"],
      });
    } catch (error) {
      console.error(`Error approving recording: ${title}`, error);
      toast({
        title: "Error",
        description: `Failed to approve recording: ${title}`,
        variant: "destructive",
        className: styles["toast-error"],
      });
    }
  };



  const handleDeclineSubmit = async (id: string, title: string) => {
   

    try {
      if (!rejectionReason.trim()) {
        toast({
          title: "Error",
          description: "Please provide a reason for rejection",
          variant: "destructive",
        });
        return;
      }
      await declineRecording(id, rejectionReason);
      setRecordings(
        recordings.filter((recording) => recording._id !== expandedRecording)
      );
      setExpandedRecording(null);
      toast({
        title: "Success",
        description: `Recording has been declined: ${title}`,
        variant: "default",
        className: styles["toast-success"],
      });
      setRejectionReason("")
    } catch (error) {
      console.error("Error declining recording:", error);
      toast({
        title: "Error",
        description: `Failed to decline the recording: ${title}`,
        variant: "destructive",
        className: styles["toast-error"],
      });
    }
  };

  const toggleExpand = (id: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setExpandedRecording(expandedRecording === id ? null : id);
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full">
        <PuffLoader />
      </div>
    );
  }

  return (
    <div className={styles.approvePage}>
      <h1 className="text-lg font-bold mb-5">Approve Audio Requests</h1>
      <div className={styles.recordingsContainer}>
        <div className={styles.recordingsList}>
            {recordings.length === 0 ? (
            <div className="">
              <p className="text-gray-500 font-bold">No recordings available for approval.</p>
            </div>
            ) : (
            recordings.map((recording) => (
              <div
              key={recording._id}
              className={styles.recordingCard}
              onClick={() => toggleExpand(recording._id)}
              >
              <div className={styles.recordingInfo}>
                <div className="flex">
                <h2>
                  <span className="font-bold">Title: </span> {recording.title}
                </h2>
                </div>
                <div>
                <p>
                  <span className="font-bold">Artist:</span>{" "}
                  {recording.displayedArtist}
                </p>
                </div>
                <p>
                <span className="font-bold">Duration: </span>
                {formatDuration(recording.duration)}
                </p>
              </div>
              </div>
            ))
            )}
        </div>
        {expandedRecording && (
          <div className={styles.expandedRecording}>
            {recordings.map(
              (recording) =>
                recording._id === expandedRecording && (
                  <div key={recording._id}>
                    <img
                      src={`https://api2.ibarakoi.online/image/${recording.image.filename}`}
                      alt={recording.title}
                      className={styles.recordingImage}
                    />
                    <div className="flex justify-center">
                      <audio ref={audioRef} controls>
                        <source
                          src={`https://api2.ibarakoi.online/tracks/stream/${recording._id}?bitrate=lossless`}
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <div className="flex justify-center">
                      <div className={styles.recordingInfo}>
                        <h2>
                          <span className="font-bold">Title: </span>{" "}
                          {recording.title}
                        </h2>
                        <p>
                          <span className="font-bold">Artist:</span>{" "}
                          {recording.displayedArtist}
                        </p>
                        <p>
                          <span className="font-bold">Duration: </span>
                          {formatDuration(recording.duration)}
                        </p>
                      </div>
                    </div>
                    <Textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Enter decline reason..."
                      className="min-h-[100px]"
                    />
                    <div className={styles.actions}>
                      <Button
                        className="bg-green-700"
                        onClick={() =>
                          handleApprove(recording._id, recording.title)
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDeclineSubmit(recording._id, recording.title)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>


    </div>
  );
};

export default ApproveAudioTab;
