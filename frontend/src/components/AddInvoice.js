import React, { useState } from "react";
import Modal from 'react-modal';
import closeBtn from "../assets/icons/close-btn.png";
import CustomerDetailsForm from './CustomerDetailsForm.js';
import InvoiceForm from './InvoiceForm.js';
import invoiceService from "../services/Invoice.js";

Modal.setAppElement('#root');

export default function AddInvoice(props) {
    const [customerDetails, setCustomerDetails] = useState({});
    const [formStep, setFormStep] = useState('customerDetails');
    const { isAddInvoiceFormVisible, hideAddInvoiceForm, refreshInvoices } = props;
  
    const submitCustomerDetails = (values) => {
        setCustomerDetails(values);
        setFormStep('invoice')
    }

    const skipCustomerDetails = () => {
        setFormStep('invoice')
    }

    const editCustomerDetails = () => {
        setFormStep('customerDetails')
    }

    const saveInvoice = async (payload) => {
        const response = await invoiceService.createInvoice(payload)
        if(response.success){
            hideAddInvoiceForm()
            refreshInvoices()
        }
    }
  
    return (
        <Modal
            isOpen={isAddInvoiceFormVisible}
            onRequestClose={hideAddInvoiceForm}
            className="add-invoice-modal"
            overlayClassName="add-invoice-overlay"
        >
            <p>
                <span className="add-invoice-title">Create New Invoice</span>
            </p>
            <div onClick={hideAddInvoiceForm} className="add-invoice-close-btn">
               <img src={closeBtn} alt="closeBtn" />
            </div>
            <div className={formStep === "customerDetails" ? "" : "hidden"}>
                <CustomerDetailsForm submitCustomerDetails={submitCustomerDetails} skipCustomerDetails={skipCustomerDetails} />
            </div>
            <div className={formStep === "invoice" ? "" : "hidden"}>
                <InvoiceForm customerDetails={customerDetails} editCustomerDetails={editCustomerDetails} saveInvoice={saveInvoice} />
            </div>            
        </Modal>
    );
  }
