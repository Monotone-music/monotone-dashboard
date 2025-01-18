import apiClient from "./apiClient"

export const getReportList = async () => {
    const response = await apiClient.get(`/report/recent`);

    return response.data.data
}

export const getReportInfoById = async (reportId: string) => {
    const response = await apiClient.get(`/recording/report?id=${reportId}`);

    return response.data.data
}

export const clearRecordingById = async (recordingID: string) => {
    const response = await apiClient.patch(`/report/clear/${recordingID}`);
    return response.data.data;
}

export const resolveReportById = async (reportID: string) => {
    const response = await apiClient.patch(`/report/resolve/${reportID}`);
    return response.data.data;
}
