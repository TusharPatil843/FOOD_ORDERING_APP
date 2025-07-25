import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const navigate = useNavigate();

    const { url } = useContext(storeContext);

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate("/myOrders");
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
