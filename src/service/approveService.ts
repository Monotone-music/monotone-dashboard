import apiClient from './apiClient';

export const getUnavailableRecordings = async () => {
    const response = await apiClient.get('/recording/unavailable');
    return response.data.data;
};

export const approveRecording = async (id: string) => {
    const response = await apiClient.patch(`/recording/availability/${id}`);
    console.log(response.data);
    return response.data;
};

export const declineRecording = async (id: string) => {
    const response = await apiClient.patch(`/recording/reject/${id}`);
    console.log(response.data);
    return response.data;
};

export const getPendingAds = async () => {
    const response = await apiClient.get('/advertisement/pending');
    return response.data;
};

export const approveAd = async (id: string) => {
    const response = await apiClient.patch(`/advertisement/approve/${id}`);
    return response.data;
};

export const declineAd = async (id: string) => {
    const response = await apiClient.patch(`/advertisement/reject/${id}`);
    return response.data;
};
