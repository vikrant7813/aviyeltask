import React from "react";
import Moment from 'react-moment'


export default function InvoiceTimestamp(props) {

    const {timestamp} = props; 
    
    const isToday = (invoiceDate) => {
        const today = new Date()
        let date = new Date(invoiceDate);
        return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    }

    return (
        <>
            <Moment format="HH:mm">
            {timestamp}
            </Moment>
            {" - "}
            {
                isToday(timestamp) 
                ? 
                "Today"
                :
                <Moment format="DD/MM/YY">
                    {timestamp}
                </Moment>
            }
        </>
    );
  }
