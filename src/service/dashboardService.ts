import apiClient from './apiClient';

export const getTotalTracks = async () => {
    const response = await apiClient.get('/tracks/count');
    return response.data.data.count;
};

export const getTotalAlbums = async () => {
    const response = await apiClient.get('/album/count');
    return response.data.data.count;
};