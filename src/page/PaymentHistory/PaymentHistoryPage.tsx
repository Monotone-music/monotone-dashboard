import { useEffect, useState } from 'react';
import { getPaymentHistory } from '@/service/paymentService';
import styles from './styles.module.scss';
import { PuffLoader } from 'react-spinners';

interface Payment {
  _id: string;
  currency: string;
  receiptUrl: string;
  status: string;
  createdAt: string;
  amount: number;
  advertiser?: string;
  listener?: string;
}

const PaymentHistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [advertiserPayments, setAdvertiserPayments] = useState<Payment[]>([]);
  const [listenerPayments, setListenerPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPaymentHistory();
        setAdvertiserPayments(response.data.advertiserPayments);
        setListenerPayments(response.data.listenerPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const ITEMS_PER_PAGE = 5;

  
const PaymentTable = ({ payments, type }: { payments: Payment[], type: string }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPayments = payments.slice(startIndex, endIndex);
  
    return (
      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>{type} Payments</h2>
        {payments.length === 0 ? (
          <div className={styles.emptyState}>
            No {type.toLowerCase()} payment records found
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>{type}</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{formatDate(payment.createdAt)}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.currency.toUpperCase()}</td>
                    <td>
                      <span className={`${styles.status} ${styles[payment.status]}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.advertiser || payment.listener}</td>
                    <td>
                      <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className={styles.receiptLink}>
                        View Receipt
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <button 
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <PuffLoader size={60} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Payment History</h1>
      <PaymentTable payments={advertiserPayments} type="Advertiser" />
      <PaymentTable payments={listenerPayments} type="Listener" />
    </div>
  );
};

export default PaymentHistoryPage;
