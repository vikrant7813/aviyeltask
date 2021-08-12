from django.db import models

class Invoice(models.Model):
    customerFullName = models.CharField(max_length=250, blank=True, null=True)
    customerPhoneNumber = models.CharField(max_length=10, blank=True, null=True)
    customerAddress = models.TextField(blank=True, null=True)
    customerPincode = models.CharField(max_length=6, blank=True, null=True)
    customerEmailId = models.CharField(max_length=250, blank=True, null=True)
    tax = models.FloatField(default=0)
    discount = models.FloatField(default=0)
    taxAmount = models.FloatField(default=0)
    discountAmount = models.FloatField(default=0)
    subTotal = models.FloatField(default=0)
    grandTotal = models.FloatField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    itemName = models.CharField(max_length=1000)
    quantity = models.FloatField()
    price = models.FloatField()