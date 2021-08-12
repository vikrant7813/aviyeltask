import React from "react";
import plus from "../assets/icons/plus-white.png";


export default function InvoiceHeader(props) {  
    const { showAddInvoiceForm } = props;
    return (
    <div className="header">
        Dashboard
        <div className="header-icon" onClick={showAddInvoiceForm}>
            <img src={plus} alt="plus" />
        </div>
    </div>
    );
  }
