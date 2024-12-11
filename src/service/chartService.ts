import apiClient from './apiClient';

export const getChartTotalViews = async () => {
    const response = await apiClient.get('/analytics/total-views');
    return response.data.data.totalViews;
};

export interface ChartDataItem {
    month: string;
    views: number;
}

interface RawChartDataItem {
    month: number;
    totalViews: number;
}

export const processChartData = (data: RawChartDataItem[]): ChartDataItem[] => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return data.map(item => ({
        month: months[item.month - 1],
        views: item.totalViews
    }));
};