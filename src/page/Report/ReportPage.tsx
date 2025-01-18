import { useState } from "react";
import styles from "./styles.module.scss";
import ReportCard from "@/shared/components/reportCard/ReportCard";
import { PuffLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getReportList } from "@/service/reportService";
import ReportForm from "@/shared/components/reportForm/ReportForm";

const ReportPage = () => {
  const [showForm, setShowForm] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [reportId, setReportId] = useState<string>("");

  const handleOpenForm = (userId: string, reportId: string) => {
    // setLoading(true); // Show spinner
    setUserId(userId); // Set the label name dynamically
    setReportId(reportId);
    setTimeout(() => {
      // setLoading(false); // Hide spinner
      setShowForm(true); // Show form
    }, 1000);
  };


  const {data: reportData, isLoading} = useQuery({
    queryKey: ['reportData'],
    queryFn: () => getReportList()
  })

  return (
    <div className={styles["outer-container"]}>
      <div className={styles.container}>
        <div className={styles.title}>List of Report</div>
        {isLoading ? (
          <PuffLoader />
        ) : reportData && reportData.length > 0 ? (
          <div className={styles.list}>
            {reportData.map((card: any, index: any) => {
              return (
          <ReportCard
            key={index}
            userId={card.listener}
            isActive={card._id === reportId}
            onClick={() => handleOpenForm(card.listener, card._id)}
          />
              );
            })}
          </div>
        ) : (
          <div>No reports found</div>
        )}
      </div>

      {showForm && (
          <ReportForm
            reportId={reportId}
            userId={userId}
            showForm={showForm}
            setShowForm={setShowForm}
          
          />
      )}
    </div>
  );
};

export default ReportPage;
