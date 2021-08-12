from django.urls import path
from . import views

urlpatterns = [
    path("invoices", views.Invoices.as_view(), name="invoices"),
    path("invoice/<int:invoiceId>", views.Invoice.as_view(), name="invoice"),
]