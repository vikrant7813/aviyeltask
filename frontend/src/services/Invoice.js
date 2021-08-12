class InvoiceService {
    
    constructor(){
      if(process.env.NODE_ENV === "development"){
        // Development Settings
        this.host = "http://localhost:8000";
        this.base_url = this.host + "/api/";
      }
      else{
        // Production Settings
        this.host = "";
        this.base_url = this.host + "/api/";
      }
      this.headers = { "content-type": "application/json"};
    }
    
    async getInvoices() {
        let response = await fetch(this.base_url + 'invoices', {
            method: "GET",
            headers: this.headers
        });
        let resBody = await response.json();
        return resBody;
    }
  
    async getInvoice(invoiceId) {
        let response = await fetch(this.base_url + 'invoice/' + invoiceId, {
            method: "GET",
            headers: this.headers
        });
        let resBody = await response.json();
        return resBody;
    }
  
    async createInvoice(data) {
      let response = await fetch(this.base_url + 'invoices', {
        method: "POST",
        body: JSON.stringify(data),
        headers: this.headers
      });
      let resBody = await response.json();
      return resBody;
    }
  
  }
  
  let invoiceService = new InvoiceService()
  export default invoiceService;