import React from "react";
import skipIcon from "../assets/icons/skip-icon.png";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function CustomerDetailsForm(props) {
    const { submitCustomerDetails, skipCustomerDetails } = props;

    const handleCustomerDetailsSubmit = (values) => {
        submitCustomerDetails(values)    
    }

    const validateCustomerDetails = (values) => {
        const errors = {};
        if (!values.customerEmailId) {
            errors.customerEmailId = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.customerEmailId)
            ) {
            errors.customerEmailId = 'Invalid email address';
        }
        if (!values.customerFullName) {
            errors.customerFullName = 'Required'
        }
        if (!values.customerPhoneNumber) {
            errors.customerPhoneNumber = 'Required'
        } else if(!/^\d{10}$/.test(values.customerPhoneNumber)){
            errors.customerPhoneNumber = 'Invalid Phone Number'
        }
        if (values.customerPincode && !/^\d{6}$/.test(values.customerPincode)){
            errors.customerPincode = 'Invalid Pincode'
        }
        return errors;
    }

    return (
        <>
            <div className="add-invoice-header">
                <span className="add-invoice-form-title">Customer Details</span>
                <button className="add-invoice-skip-button" onClick={skipCustomerDetails}>
                    Skip
                    <img src={skipIcon} alt="Skip" />
                </button>
            </div>
            <Formik
                initialValues={{ customerEmailId: '', customerFullName: '', customerPhoneNumber: '', customerAddress: '', customerPincode: '' }}
                validate={validateCustomerDetails} 
                onSubmit={handleCustomerDetailsSubmit}
                >
                <Form>
                    <div className="add-invoice-customer-form">
                        <div className="add-invoice-customer-form-row">
                            <div className="add-invoice-customer-form-left-column">
                                <label>Full Name</label>
                                <Field type="text" name="customerFullName" placeholder="Customer Name" />
                                <ErrorMessage name="customerFullName" component="div" className="error-message" />
                            </div>
                            <div className="add-invoice-customer-form-right-column">
                                <label>Phone Number</label>
                                <Field type="text" name="customerPhoneNumber" />
                                <ErrorMessage name="customerPhoneNumber" component="div" className="error-message" />
                            </div>
                        </div>
                        <div className="add-invoice-customer-form-row">
                            <div className="add-invoice-customer-form-left-column">
                                <label>Address</label>
                                <Field type="text" name="customerAddress" as={"textarea"} rows={7} placeholder="Complete Address" />
                            </div>
                            <div className="add-invoice-customer-form-right-column">
                                <label>Email ID</label>
                                <Field type="email" name="customerEmailId" placeholder="Customer Email Address" />
                                <ErrorMessage name="customerEmailId" component="div" className="error-message" />
                                <label>Pincode</label>
                                <Field type="text" name="customerPincode" placeholder="560067" />
                                <ErrorMessage name="customerPincode" component="div" className="error-message" />
                            </div>
                        </div>
                    </div>
                    <div className="add-invoice-footer">
                        <button className="footer-btn" type="submit" >Proceed</button>
                    </div>
                </Form>
            </Formik>
        </>
    )

}