from rest_framework.views import APIView
from .services import InvoiceService
from rest_framework.response import Response

class Invoices(APIView):
    def get(self, request):
        res = InvoiceService.getInvoices()
        return Response(res.json())

    def post(self, request):
        data = request.data
        res = InvoiceService.createInvoice(data)
        return Response(res.json())

class Invoice(APIView):
    def get(self, request, invoiceId: int):
        res = InvoiceService.getInvoice(invoiceId)
        return Response(res.json())