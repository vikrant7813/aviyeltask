import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import InvoiceView from "../views/Invoice.js";

export default function Admin() {
  return (
        <Switch>
            <Route path="/invoice" exact component={InvoiceView} />
            <Redirect from="/" to="/invoice" />
        </Switch>
  );
}
