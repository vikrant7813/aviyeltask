import React, { useState, useEffect, useCallback } from "react";
import edit from "../assets/icons/edit.png";
import enterIcon from "../assets/icons/enter-icon.png";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';

export default function InvoiceForm(props) {
    const [productItems, setProductItems] = useState([]);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const { customerDetails, editCustomerDetails, saveInvoice } = props;

    const calculateTotal = useCallback(() => {
        let subTotal = 0;
        productItems.forEach(item => {
            subTotal += item.price
        })
        let taxAmount = subTotal * tax/100;
        let discountAmount = (subTotal + taxAmount) * discount/100;
        let grandTotal = (subTotal + taxAmount - discountAmount);
        setTaxAmount(taxAmount)
        setDiscountAmount(discountAmount)
        setSubTotal(subTotal)
        setGrandTotal(grandTotal)
    }, [discount, productItems,tax])


    useEffect(() => { 
        calculateTotal()
    }, [tax, discount, productItems, calculateTotal])

    const handleItemEntrySubmit = (values, { resetForm }) => {
        values.price = parseFloat(values.price)
        values.quantity = parseFloat(values.quantity)
        setProductItems(productItems => [...productItems, values])
        resetForm();
    }

    const isNumber = (n) => { 
        return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    }

    const validateItemEntry = (values) => {
        const errors = {};
        if (!values.itemName) {
            errors.itemName = 'Required';
        }
        if (!values.quantity) {
            errors.quantity = 'Required'
        }
        else if(!isNumber(values.quantity)){
            errors.quantity = 'Invalid'
        }
        if (!values.price) {
            errors.price = 'Required'
        }
        else if(!isNumber(values.price)){
            errors.price = 'Invalid'
        }
        return errors;
    }

    const handleTaxChange = (event) => {
        setTax(event.target.value)
    }

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value)
    }

    const handleInvoiceSave = () => {
        if(productItems.length !== 0){
            let payload = customerDetails;
            payload.tax = tax;
            payload.taxAmount = taxAmount;
            payload.discount = discount;
            payload.discountAmount = discountAmount;
            payload.subTotal = subTotal;
            payload.grandTotal = grandTotal;
            payload.productItems = productItems
            saveInvoice(payload)
        }
    }

    return (
        <>
            <div className="add-invoice-header">
                <span className="add-invoice-form-title">Product Details</span>
                <div className="invoice-card-customer-details">
                    <p className="customer-details-name">{customerDetails.customerFullName ? customerDetails.customerFullName : "Unknown User"}</p>
                    <p className="customer-details-email">{customerDetails.customerEmailId ? customerDetails.customerEmailId : "NA"}</p>
                </div>
                <button className="add-invoice-edit-button" onClick={editCustomerDetails}>
                    <img src={edit} alt="Edit" />
                </button>
            </div>
            <div className="add-invoice-table">
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
                        productItems.map((item, index) => {
                            return <tr key={index}>
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
            </div>
            <Formik
                initialValues={{ itemName: '', quantity: '', price: ''}}
                validate={validateItemEntry} 
                onSubmit={handleItemEntrySubmit}
                >
                <Form>
                    <div className="add-item-form">
                        <div className="item-name">
                            <Field type="text" name="itemName" placeholder="Please enter item name" />
                            <ErrorMessage name="itemName" component="div" className="error-message" />
                        </div>
                        <div className="quantity">
                            <Field type="number" name="quantity" />
                            <ErrorMessage name="quantity" component="div" className="error-message" />
                        </div>
                        <div className="price">
                            <Field type="text" name="price" />
                            <ErrorMessage name="price" component="div" className="error-message" />
                        </div>
                        <div className="enter-btn">
                            <button type="submit">
                                <img src={enterIcon} alt="Enter" />
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <div className="add-invoice-sub-total-block">
                <div className="add-invoice-tax-discount">
                    <div className="suffix-button">
                        <input type="text" placeholder="Tax" onChange={handleTaxChange}></input>
                        <span>%</span>
                    </div>
                    <div className="suffix-button">
                        <input type="text" placeholder="Discount" onChange={handleDiscountChange}></input>
                        <span>%</span>
                    </div>
                </div>
                <div className="add-invoice-sub-total">
                    <span>Sub Total</span>
                    <span><b><NumberFormat value={subTotal} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} /></b></span>
                </div>
            </div>
            <div className="add-invoice-footer">
                <div className="tax-discount-block">
                    <p>Tax</p>
                    <span><NumberFormat value={taxAmount} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} /></span>
                </div>
                <div className="tax-discount-block">
                    <p>Discount</p>
                    <span><NumberFormat value={discountAmount} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} /></span>
                </div>
                <div className="total-block">
                    <p>Grand Total</p>
                    <span><NumberFormat value={grandTotal} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'₹ '} /></span>
                </div>
                <button className="footer-btn" onClick={handleInvoiceSave}>Save</button>
            </div>
                
        </>
    )

}