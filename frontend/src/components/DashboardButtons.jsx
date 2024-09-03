import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Button/button.css';
import '../css/Styles.css';

const DashboardButtons = () => {
    const navigate = useNavigate();

    const ManageCustomersClick = () => {
        navigate("/AdminDashboardPage/viewCustomers"); // Navigates to the ViewCustomers page
    };

    const ManageSellersClick = () => {
        navigate("/AdminDashboardPage/viewSellers"); // Navigates to the ViewSellers page
    };

    return (
        <div className="colored-div" style={{ marginTop: 200 }}>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-4 d-flex justify-content-center">
                        <button onClick={() => {}} className="button btn-lg w-100">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">INSERT PRODUCT</span>
                        </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <button onClick={() => {}} className="button btn-lg w-100">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">DELETE PRODUCT</span>
                        </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <button onClick={() => {}} className="button btn-lg w-100">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">UPDATE PRODUCT</span>
                        </button>
                    </div>
                </div>
                <div className="row mb-4" style={{ marginTop: 150 }}>
                    <div className="col-4 d-flex justify-content-center">
                        <button onClick={() => {}} className="button btn-lg w-100">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">DISPLAY PRODUCT</span>
                        </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <button onClick={ManageSellersClick} className="button btn-lg w-100">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">MANAGE SELLERS</span>
                        </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <button onClick={ManageCustomersClick} className="button btn-lg w-100">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">MANAGE CUSTOMERS</span>
                        </button>
                    </div>
                </div>
                <div className="row mb-4"style={{ marginTop: 150 }}>
                    <div className="col-4 offset-4 d-flex justify-content-center">
                        <button onClick={() => {}} className="button btn-lg w-100">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">MANAGE ORDER</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardButtons;
