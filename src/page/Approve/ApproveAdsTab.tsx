import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { approveAd, declineAd, getPendingAds } from "@/service/approveService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PlayerAd {
  _id: string;
  title: string;
  media: {
    filename: string;
  };
  image: {
    filename: string;
  };
  type: "player_ad";
  status: string;
  view: number;
}

interface BannerAd {
  _id: string;
  title: string;
  image: {
    filename: string;
  };
  type: "banner_ad";
  status: string;
  view: number;
}

const ApproveAdsTab = () => {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [playerAds, setPlayerAds] = useState<PlayerAd[]>([]);
  const [bannerAds, setBannerAds] = useState<BannerAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedAd, setExpandedAd] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPendingAds();
        const { player_ad, banner_ad } = response.data;
        setPlayerAds(player_ad || []);
        setBannerAds(banner_ad || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setPlayerAds([]);
        setBannerAds([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: string, title: string, type: string) => {
    try {
      await approveAd(id);
      if (type === "player_ad") {
        setPlayerAds(playerAds.filter((ad) => ad._id !== id));
      } else {
        setBannerAds(bannerAds.filter((ad) => ad._id !== id));
      }
      setExpandedAd(null);
      toast({
        title: "Success",
        description: `Approved advertisement: ${title}`,
        variant: "default",
        className: styles["toast-success"],
      });
    } catch (error) {
      console.error(`Error approving advertisement: ${title}`, error);
      toast({
        title: "Error",
        description: `Error approving advertisement: ${title}`,
        variant: "destructive",
        className: styles["toast-error"],
      });
    }
  };

  const handleDeclineClick = () => {
    setShowDeclineDialog(true);
  };

  const handleDecline = async (id: string, title: string, type: string) => {
    try {
      await declineAd(id);
      if (type === "player_ad") {
        setPlayerAds(playerAds.filter((ad) => ad._id !== id));
      } else {
        setBannerAds(bannerAds.filter((ad) => ad._id !== id));
      }
      setExpandedAd(null);
      toast({
        title: "Success",
        description: `Declined advertisement: ${title}`,
        variant: "default",
        className: styles["toast-success"],
      });
    } catch (error) {
      console.error(`Error declining advertisement: ${title}`, error);
      toast({
        title: "Error",
        description: `Error declining advertisement: ${title}`,
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
    setExpandedAd(expandedAd === id ? null : id);
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
      <Tabs defaultValue="player_ad">
        <TabsList className="mb-4">
          <TabsTrigger value="player_ad">Player Ads</TabsTrigger>
          <TabsTrigger value="banner_ad">Banner Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="player_ad">
          <div className={styles.recordingsContainer}>
            <div className={styles.recordingsList}>
              {playerAds.length === 0 ? (
                <div className=" p-8 text-gray-500">
                  No pending player ad requests at the moment
                </div>
              ) : (
                playerAds.map((ad) => (
                  <div
                    key={ad._id}
                    className={styles.recordingCard}
                    onClick={() => toggleExpand(ad._id)}
                  >
                    <div className={styles.recordingInfo}>
                      <h2>
                        <span className="font-bold">Title: </span> {ad.title}
                      </h2>
                      {/* <p>
                        <span className="font-bold">Views: </span> {ad.view}
                      </p> */}
                    </div>
                  </div>
                ))
              )}
            </div>

            {expandedAd && (
              <div className={styles.expandedRecording}>
                {playerAds.map(
                  (ad) =>
                    ad._id === expandedAd && (
                      <div key={ad._id}>
                        <img
                          src={`https://api2.ibarakoi.online/image/${ad.image.filename}`}
                          alt={ad.title}
                          className={styles.recordingImage}
                        />
                        <audio ref={audioRef} controls className="mb-4">
                          <source
                            src={`https://api2.ibarakoi.online/advertisement/stream/${ad._id}`}
                          />
                        </audio>
                        <div className={styles.recordingInfo}>
                          <h2>
                            <span className="font-bold">Title: </span>{" "}
                            {ad.title}
                          </h2>
                          {/* <p>
                            <span className="font-bold">Views: </span> {ad.view}
                          </p> */}
                        </div>
                        <div className={styles.actions}>
                          <Button
                            className="bg-green-700"
                            onClick={() =>
                              handleApprove(ad._id, ad.title, "player_ad")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            // onClick={() =>
                            //   handleDecline(ad._id, ad.title, "player_ad")
                            // }
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
        </TabsContent>

        <TabsContent value="banner_ad">
          <div className={styles.recordingsContainer}>
            <div className={styles.recordingsList}>
              {bannerAds.length === 0 ? (
                <div className=" p-8 text-gray-500">
                  No pending banner ad requests at the moment
                </div>
              ) : (
                bannerAds.map((ad) => (
                  <div
                    key={ad._id}
                    className={styles.recordingCard}
                    onClick={() => toggleExpand(ad._id)}
                  >
                    <div className={styles.recordingInfo}>
                      <h2>
                        <span className="font-bold">Title: </span> {ad.title}
                      </h2>
                      {/* <p>
                        <span className="font-bold">Views: </span> {ad.view}
                      </p> */}
                    </div>
                  </div>
                ))
              )}
            </div>

            {expandedAd && (
              <div className={styles.expandedRecording}>
                {bannerAds.map(
                  (ad) =>
                    ad._id === expandedAd && (
                      <div className="flex flex-col items-center justify-center h-full" key={ad._id}>
                        <img
                          src={`https://api2.ibarakoi.online/image/${ad.image.filename}`}
                          alt={ad.title}
                          className={styles.recordingImage}
                        />
                        <div className={styles.recordingInfo}>
                          <h2>
                            <span className="font-bold">Title: </span>{" "}
                            {ad.title}
                          </h2>
                          {/* <p>
                            <span className="font-bold">Views: </span> {ad.view}
                          </p> */}
                        </div>
                        <div className={styles.actions}>
                          <Button
                            className="bg-green-700"
                            onClick={() =>
                              handleApprove(ad._id, ad.title, "banner_ad")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleDecline(ad._id, ad.title, "banner_ad")
                            }
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
        </TabsContent>
      </Tabs>
      <Dialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Recording</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block mb-2">Please provide a reason for declining:</label>
            <textarea
              value={declineReason}
              // onChange={(e) => setDeclineReason(e.target.value)}
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

export default ApproveAdsTab;
