import React, { useState, useEffect } from "react";
import InvoiceList from "./InvoiceList.js";
import InvoiceView from "./InvoiceView.js";
import AddInvoice from "./AddInvoice.js";
import InvoiceHeader from "./InvoiceHeader.js";
import invoiceService from "../services/Invoice.js";

export default function InvoiceLayout() {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isAddInvoiceFormVisible, setAddInvoiceFormVisible] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [invoiceCount, setInvoiceCount] = useState(0);

    useEffect(() => {
        if (invoices.length === 0) {
            fetchInvoices();
        }
    }, [invoices]);

    const hideAddInvoiceForm = () => {
        setAddInvoiceFormVisible(false)
    }

    const showAddInvoiceForm = () => {
        setAddInvoiceFormVisible(true)
    }

    const refreshInvoices = () => {
        fetchInvoices()
    }

    const fetchInvoices = async () => {
        const response = await invoiceService.getInvoices()
        setInvoices(response.data.invoices)
        setInvoiceCount(response.data.count)
    }



    return (
    <div>
        <InvoiceHeader showAddInvoiceForm={showAddInvoiceForm} />
        <InvoiceList setSelectedInvoice={setSelectedInvoice} selectedInvoice={selectedInvoice} invoices={invoices} invoiceCount={invoiceCount} />
        <InvoiceView selectedInvoice={selectedInvoice} />
        {
            isAddInvoiceFormVisible 
            ?
            <AddInvoice isAddInvoiceFormVisible={isAddInvoiceFormVisible} hideAddInvoiceForm={hideAddInvoiceForm} refreshInvoices={refreshInvoices} />
            :
            null
        }
    </div>
    );
  }
