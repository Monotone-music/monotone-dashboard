import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import {
  approveRecording,
  declineRecording,
  getUnavailableRecordings,
} from "@/service/approveService";
import { Button } from "@/components/ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
// import apiClient from "@/service/apiClient"; // Import apiClient

const ApproveAudioTab = () => {
  interface Recording {
    _id: string;
    title: string;
    displayedArtist: string;
    duration: number;
    image: { filename: string };
  }
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRecording, setExpandedRecording] = useState<string | null>(null);
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
      // console.log(`Approved recording with title: ${title}`);
      setRecordings(recordings.filter((recording) => recording._id !== id));
      setExpandedRecording(null);
      toast({
        title: "Success",
        description: `Approved recording with title: ${title}`,
        variant: "default",
        className: styles["toast-success"],
      });
    } catch (error) {
      console.error(`Error approving recording with title: ${title}`, error);
      toast({
        title: "Error",
        description: `Error approving recording with title: ${title}`,
        variant: "destructive",
        className: styles["toast-error"],
      });
    }
  };

  const handleDeclineClick = () => {
    setShowDeclineDialog(true);
  };

  const handleDecline = async (id: string, title: string) => {
    try {
      await declineRecording(id);
      // console.log(`Declined recording with title: ${title}`);
      setRecordings(recordings.filter((recording) => recording._id !== id));
      setExpandedRecording(null);
      toast({
        title: "Success",
        description: `Declined recording with title: ${title}`,
        variant: "default",
        className: styles["toast-success"],
      });
    } catch (error) {
      console.error(`Error declining recording with title: ${title}`, error);
      toast({
        title: "Error",
        description: `Error declining recording with title: ${title}`,
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
          {recordings.map((recording) => (
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
                    <span className="font-bold">Artist:</span>
                    {recording.displayedArtist}
                  </p>
                </div>
                <p>
                  <span className="font-bold">Duration: </span>
                  {formatDuration(recording.duration)}
                </p>
              </div>
            </div>
          ))}
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
                      <audio ref={audioRef} controls className="">
                        <source
                          src={`https://api2.ibarakoi.online/tracks/stream/${recording._id}?bitrate=lossless`}
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <div className="flex justify-center">
                      <div className={styles.recordingInfo}>
                        <div className="">
                          <h2>
                            <span className="font-bold">Title: </span>
                            {recording.title}
                          </h2>
                        </div>
                        {/* <br /> */}
                        <div>
                          <p>
                            <span className="font-bold">Artist:</span>
                            {recording.displayedArtist}
                          </p>
                        </div>
                        {/* <br /> */}
                        <p>
                          <span className="font-bold">Duration: </span>
                          {formatDuration(recording.duration)}
                        </p>
                      </div>
                    </div>
                    <div className={styles.actions}>
                      <Button
                        className="bg-green-700"
                        onClick={() => handleApprove(recording._id, recording.title)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant={"destructive"}
                        // onClick={() => handleDecline(recording._id, recording.title)}
                        onClick={handleDeclineClick}
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

      <Dialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Recording</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block mb-2">Please provide a reason for declining:</label>
            <Textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Enter decline reason..."
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeclineDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApproveAudioTab;
