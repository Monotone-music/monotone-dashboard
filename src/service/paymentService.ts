import apiClient from './apiClient';

export interface Payment {
  _id: string;
  currency: string;
  receiptUrl: string;
  status: string;
  createdAt: string;
  amount: number;
  advertiser?: string;
  listener?: string;
}

interface PaymentResponse {
  status: string;
  message: string;
  data: {
    advertiserPayments: Payment[];
    listenerPayments: Payment[];
  };
}

export const getPaymentHistory = async (): Promise<PaymentResponse> => {
  const response = await apiClient.get('/analytics/payments');
  return response.data;
};
