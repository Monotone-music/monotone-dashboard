import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearRecordingById, disableTrackReport, resolveReportById } from '@/service/reportService';

export const useReportMutations = () => {
  const queryClient = useQueryClient();
  
  const clearRecording = useMutation({
    mutationFn: (recordingId: string) => clearRecordingById(recordingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportData'] });
    }
  });

  const resolveReport = useMutation({
    mutationFn: (reportId: string) => resolveReportById(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportData'] });
    }
  });

  const disableTrack = useMutation({
    mutationFn: (params: { recordingId: string, reportId: string }) => 
      disableTrackReport(params.recordingId, params.reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportData'] });
    }
  });

  return {
    disableTrack,
    clearRecording,
    resolveReport
  };
};