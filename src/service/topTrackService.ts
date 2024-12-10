import apiClient from './apiClient';

export const getTopTracks = async () => {
    const response = await apiClient.get('/tracks/top?limit=5', {
        headers: {
            'Content-Type': 'application/json',
            
        },
    });
    return response.data.data;
};