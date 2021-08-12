import React from "react";
import InvoiceListItem from "./InvoiceListItem.js";


export default function InvoiceList(props) {

    const {selectedInvoice, setSelectedInvoice, invoices, invoiceCount} = props;

    const selectInvoice = (invoice) => {
        setSelectedInvoice(invoice)
    }
  
    return (
    <div className="sidebar">
        <div className="search">

        </div>
        <div className="invoice-list-count">
            INVOICES - {invoiceCount}
        </div>
        <div className="invoice-list">
            {invoices.map(invoice => 
                <InvoiceListItem 
                    clickEvent={() => selectInvoice(invoice)} 
                    invoice={invoice} 
                    selectedInvoiceId={selectedInvoice !== null ? selectedInvoice.id : {}} 
                    key={invoice.id} 
                /> )}
        </div>
    </div>
    );
  }
