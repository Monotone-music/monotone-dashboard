import React, { useRef } from "react";
import styles from "./styles.module.scss";
import { PuffLoader } from "react-spinners";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getReportInfoById } from "@/service/reportService";
import formatMonthYear from "@/util/formatDate";
import { useReportMutations } from "@/service/mutations/reportMutation";
import { useToast } from "@/hooks/use-toast";

interface ReportFormProps {
  showForm: boolean;
  reportId: string;
  userId: string;
  setShowForm: (value: boolean) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({
  showForm,
  reportId,
  userId,
  setShowForm,
}) => {
  const { toast } = useToast();
  const audioRef = useRef(null);
  const { data: reportDetailData, isLoading } = useQuery({
    queryKey: ["reportDetailData", reportId, userId],
    queryFn: () => getReportInfoById(reportId),
  });
  console.log(reportDetailData?.report?.[0]?._id);
  const { clearRecording, resolveReport, disableTrack } = useReportMutations();

  const handleClear = (recordingId: string) => {
    clearRecording.mutate(recordingId, {
      onSuccess: () => {
        toast({
          variant: "default",
          duration: 3000,
          title: "Clear successfully",
          className: styles["toast-success"],
        });
        setShowForm(false);
      },
      onError: () => {
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Clear Failed!",
          className: styles["toast-failed"],
        });
      },
    });
  };

  const handleResolve = (reportId: string) => {
    resolveReport.mutate(reportId, {
      onSuccess: () => {
        toast({
          variant: "default",
          duration: 3000,
          title: "Resolve successfully",
          className: styles["toast-success"],
        });
        setShowForm(false);
      },
      onError: () => {
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Resolve Failed!",
          className: styles["toast-failed"],
        });
      },
    });
  };

  const handleDisable = (recordingId: string, reportId: string) => {
    console.log(reportId)
    disableTrack.mutate(
      { recordingId, reportId },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            duration: 3000,
            title: "Disable Track successfully",
            className: styles["toast-success"],
          });
          setShowForm(false);
        },
        onError: () => {
          toast({
            variant: "destructive",
            duration: 3000,
            title: "Disable Track Failed!",
            className: styles["toast-failed"],
          });
        },
      }
    );
  };

  return (
    <div className={styles["form-container"]}>
      {isLoading && (
        <div className={styles.loading}>
          <PuffLoader />
        </div>
      )}
      {!isLoading && showForm && (
        <div className={styles.form}>
          <div className={styles["form-wrapper"]}>
            <div className={styles.title}>Report Information</div>
            <div className={styles["report-info-wrapper"]}>
              <div className={styles.top}>
                <div className={styles["top-info"]}>Report Id: {reportId}</div>
                <div className={styles["top-info"]}>From userId: {userId}</div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.expandedRecording}>
                  <div className="flex flex-col items-center gap-3">
                    <div className={styles["img-wrapper"]}>
                      <img
                        src={`https://api2.ibarakoi.online/image/${reportDetailData.image.filename}`}
                        alt={reportDetailData.title}
                      />
                    </div>

                    <div className="flex justify-center">
                      <audio ref={audioRef} controls className="">
                        <source
                          src={`https://api2.ibarakoi.online/tracks/stream/${reportDetailData._id}?bitrate=lossless`}
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>

                    <div className="w-full flex flex-col justify-center gap-2">
                      <div className="">
                        <h2>
                          <span className="font-bold">Title: </span>
                          {reportDetailData.title}
                        </h2>
                      </div>

                      <div>
                        <p>
                          <span className="font-bold">Artist:</span>
                          {reportDetailData.displayedArtist}
                        </p>
                      </div>
                      {reportDetailData.report.map((item: any, index: any) => (
                        <>
                          <div className="">
                            <h2>
                              <span className="font-bold">Type: </span>
                              {item.type === "invalid_playback"
                                ? "Invalid Playback"
                                : item.type === "inappropriate_content"
                                ? "Inappropriate Content"
                                : "Other"}
                            </h2>
                          </div>
                          <div className="">
                            <h2>
                              <span className="font-bold">Create At: </span>
                              {formatMonthYear(item.createdAt)}
                            </h2>
                          </div>
                          <div className="grid w-full gap-1.5" key={index}>
                            <label htmlFor="message" className="font-bold">
                              Reason:
                            </label>
                            <Textarea
                              disabled
                              className="h-[auto]"
                              placeholder={item.reason || "No Reason"}
                              id="message"
                            />
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex-col flex items-center gap-2">
            <div className="w-full flex items-center gap-2">
              <Button
                type="submit"
                className="w-1/2 mt-4 h-14"
                variant="destructive"
                onClick={() => handleClear(reportDetailData._id)}
              >
                Clear Recording
              </Button>
              <Button
                type="submit"
                className="w-1/2 mt-4 h-14 bg-green-600 hover:bg-green-700"
                variant="default"
                onClick={() => handleResolve(reportId)}
              >
                Resolve Report
              </Button>
            </div>
            <div className="w-full flex items-center gap-2">
              <Button
                variant="default"
                className="w-full mt-4 h-14"
                disabled={!reportDetailData?.report?.[0]?._id}
                onClick={() =>
                  handleDisable(
                    reportDetailData._id,
                    reportDetailData?.report?.[0]?._id
                  )
                }
              >
                Disable Track
              </Button>
              <Button
                variant="outline"
                className="w-full mt-4 h-14"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
