import React from "react";
import NumberFormat from 'react-number-format';
import InvoiceTimestamp from './InvoiceTimestamp.js';

export default function InvoiceListItem(props) {
    const { invoice, clickEvent, selectedInvoiceId } = props;

    return (
        <div 
            className={selectedInvoiceId === invoice.id ? "invoice-list-item invoice-list-item-selected" : "invoice-list-item"} 
            onClick={clickEvent}
        >
            <div className="invoice-list-item-id">INV. # - {invoice.id}</div>
            <div className="invoice-list-item-count">Items - {invoice.itemCount}</div>
            {
                invoice.customerFullName 
                ?
                <div className="invoice-list-item-customer-name">{invoice.customerFullName}</div>
                :
                <div className="invoice-list-item-customer-name invoice-list-item-customer-name-unknown">Unknown User</div>
            }
            <div className="invoice-list-item-timestamp">
                <InvoiceTimestamp timestamp={invoice.timestamp} />
            </div>
            <div className="invoice-list-item-total">
                <NumberFormat value={invoice.grandTotal} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} />
            </div>
        </div>
    );
  }
