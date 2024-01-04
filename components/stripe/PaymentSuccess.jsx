import React, { useEffect } from 'react';
import axios from 'axios';
import API from '../../shared/constants/apis';

const PaymentSuccess = () => {
  useEffect(() => {
    const savePayment = async () => {
      const searchParams = new URLSearchParams(location.search);
      const session_id = searchParams.get('session_id');
      if (session_id) {
        const response = await axios.get(`${API.SAVE_PAYMENT}?session_id=${session_id}`);

        if (response.status === 200) {
          console.log('Payment saved successfully.');
        } else {
          console.error('Payment not saved.');
        }
      } else {
        console.error('Session ID is missing.');
      }
    };
    savePayment();
  }, []);

  return (
    <>
      <section>
        <div>
          <div>
            <h3>Your payment went through successfully!</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentSuccess;
