import React, { useState, useEffect, useRef } from "react";
import invoiceService from "../services/Invoice.js";
import NumberFormat from 'react-number-format';
import printer from "../assets/icons/printer-blue.png";
import InvoiceTimestamp from './InvoiceTimestamp.js';
import ReactToPrint from 'react-to-print';

export default function InvoiceView(props) {
  const [invoice, setInvoice] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const { selectedInvoice } = props;

  useEffect(() => {
    if(selectedInvoice !== null && selectedInvoiceId !== selectedInvoice.id){
        fetchInvoice(selectedInvoice.id)
    }
  }, [selectedInvoice, selectedInvoiceId]);

  const fetchInvoice = async (invoiceId) => {
    setSelectedInvoiceId(invoiceId)
    const response = await invoiceService.getInvoice(invoiceId)
    setInvoice(response.data)
  }

  const componentRef = useRef();

    return (
        <div className="invoice-wrapper">
            { invoice !== null ?
                <div>
                    <div className="invoice-header">Invoice Details
                    </div>
                    <div className="invoice-card" ref={componentRef}>
                        <div className="invoice-card-header">
                            <div className="invoice-card-details">
                                <p className="invoice-title">Invoice</p>
                                <p className="invoice-id"># INV{invoice.id}</p>
                                <p className="invoice-timestamp">
                                    <InvoiceTimestamp timestamp={invoice.timestamp} />
                                </p>
                            </div>
                            <div className="invoice-card-customer-details">
                                <p className="customer-details-title">{invoice.customerFullName ? "Customer Details" : ""}</p>
                                <p className="customer-details-name">{invoice.customerFullName}</p>
                                <p className="customer-details-email">{invoice.customerEmailId}</p>
                            </div>
                            <div className="invoice-card-print-div">
                                <ReactToPrint
                                    trigger={() => <button className="invoice-card-print-button">
                                            <span>Print</span>
                                            <img src={printer} alt="printer" />
                                        </button>
                                    }
                                    content={() => componentRef.current}
                                />
                            </div>
                        </div>
                        <div className="invoice-card-body">
                            <table>
                                <thead>
                                <tr>
                                    <th align="left">Item</th>
                                    <th align="center">Quantity</th>
                                    <th align="right">Price - ₹</th>
                                </tr>
                                </thead>
                                <tbody>
                                { 
                                    invoice.items.map((item) => {
                                        return <tr key={item.id}>
                                            <td align="left" className="item-name">{item.itemName}</td>
                                            <td align="center" className="qunatity">{item.quantity}</td>
                                            <td align="right" className="price">
                                                <NumberFormat value={item.price} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} />
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                            <table className="footer-table">
                                <tbody>
                                <tr>
                                    <td>Sub Total</td>
                                    <td align="right">
                                        <NumberFormat value={invoice.subTotal} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tax ({invoice.tax}%)</td>
                                    <td align="right">
                                        <NumberFormat value={invoice.taxAmount} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tax ({invoice.discount}%)</td>
                                    <td align="right">
                                        <NumberFormat value={invoice.discountAmount} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ -'} />
                                    </td>
                                </tr>
                                <tr className="grand-total-row">
                                    <td>Grand Total</td>
                                    <td align="right">
                                        <NumberFormat value={invoice.grandTotal} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="invoice-card-footer">

                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
  }
