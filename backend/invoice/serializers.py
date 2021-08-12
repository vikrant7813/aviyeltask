from rest_framework import serializers
from invoice.models import Invoice, InvoiceItem

class InvoiceItemSerializer(serializers.ModelSerializer):
    """
    Serializer for invoice items
    """
    class Meta:
        model = InvoiceItem
        fields = ["id", "itemName", "quantity", "price"]


class InvoiceSerializer(serializers.ModelSerializer):
    """
    Serializer for invoice
    """
    itemCount = serializers.SerializerMethodField()

    def get_itemCount(self, obj):
        """
        Gets the total item count in an invoice
        """
        return obj.invoiceitem_set.count()

    class Meta:
        model = Invoice
        fields = ["id", "customerFullName", "timestamp", "itemCount", "grandTotal"]


class InvoiceDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for invoice details
    """
    items = InvoiceItemSerializer(source='invoiceitem_set', many=True)
    class Meta:
        model = Invoice
        fields = [
            "id",
            "customerFullName", 
            "customerPhoneNumber", 
            "customerAddress", 
            "customerPincode", 
            "customerEmailId", 
            "tax", 
            "discount", 
            "taxAmount", 
            "discountAmount", 
            "subTotal", 
            "grandTotal", 
            "timestamp",
            "items"
        ]