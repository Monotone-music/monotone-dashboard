import apiClient from './apiClient';

export const getTotalTracks = async () => {
    const response = await apiClient.get('/tracks/count');
    return response.data.data.count;
};

export const getTotalAlbums = async () => {
    const response = await apiClient.get('/album/count');
    return response.data.data.count;
};

export const getHistoricalViewCounts = async () => {
    const response = await apiClient.get('/analytics/historical-total-views');
    return response.data.data.totalViews;
};
export const getApproveReqCounts = async () => {
    const response = await apiClient.get('/recording/unavailable/count');
    return response.data.data.count;
};

