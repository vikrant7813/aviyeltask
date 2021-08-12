import logging
from django.db import transaction
from .models import Invoice, InvoiceItem
from .serializers import InvoiceSerializer, InvoiceDetailSerializer
from utils.apiResponse import ApiResponse

logger = logging.getLogger(__name__)

class InvoiceService:
    """
    Class containing services related to Invoice model
    """
    @staticmethod
    def getInvoices():
        """
        Service to fetch invoices
        """
        res = ApiResponse(message="Error retrieving invoices")
        try:
            invoices = Invoice.objects.order_by('-timestamp').all()
            invoicesData = InvoiceSerializer(invoices, many=True).data
            invoiceCount = invoices.count()
            data = {"invoices": invoicesData, "count": invoiceCount}
            res.update(True, "Invoices retrieved successfully", data)
        except Exception as ex:
            logger.error(str(ex))
            res.update(message=str(ex))
        finally:
            return res

    @staticmethod
    def getInvoice(invoiceId: int):
        """
        Service to fetch invoice from an invoice id
        """
        res = ApiResponse(message="Error retrieving invoice")
        try:
            invoice = Invoice.objects.get(pk=invoiceId)
            invoiceData = InvoiceDetailSerializer(invoice).data
            res.update(True, "Invoices retrieved successfully", invoiceData)
        except Exception as ex:
            logger.error(str(ex))
            res.update(message=str(ex))
        finally:
            return res


    @staticmethod
    @transaction.atomic
    def createInvoice(invoiceData: dict):
        """
        Service to fetch invoice from an invoice id
        """
        res = ApiResponse(message="Error creating invoice")
        try:
            productItems = invoiceData["productItems"]
            del invoiceData["productItems"]
            invoice = Invoice.objects.create(**invoiceData)
            invoiceItems = []
            for item in productItems:
                invoiceItems.append(
                    InvoiceItem(invoice=invoice, itemName=item["itemName"], price=item["price"], quantity=item["quantity"])
                )
            InvoiceItem.objects.bulk_create(invoiceItems)
            res.update(True, "Invoices created successfully", None)
        except Exception as ex:
            logger.error(str(ex))
            res.update(message=str(ex))
        finally:
            return res


