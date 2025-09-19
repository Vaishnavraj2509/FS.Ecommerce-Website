package com.SSS.Ecommerce.model;

public class PaymentDetails {

    private String paymentMethod;
    private String  status;
    private String paymentId;
    private String razorpayPaymentLinkId;
    private String getRazorpayPaymentLinkReferenceId;
    private String getRazorpayPaymentStatus;
    private String razorpayPaymentId;


    public PaymentDetails(){

    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getRazorpayPaymentLinkId() {
        return razorpayPaymentLinkId;
    }

    public void setRazorpayPaymentLinkId(String razorpayPaymentLinkId) {
        this.razorpayPaymentLinkId = razorpayPaymentLinkId;
    }

    public String getGetRazorpayPaymentLinkReferenceId() {
        return getRazorpayPaymentLinkReferenceId;
    }

    public void setGetRazorpayPaymentLinkReferenceId(String getRazorpayPaymentLinkReferenceId) {
        this.getRazorpayPaymentLinkReferenceId = getRazorpayPaymentLinkReferenceId;
    }

    public String getGetRazorpayPaymentStatus() {
        return getRazorpayPaymentStatus;
    }

    public void setGetRazorpayPaymentStatus(String getRazorpayPaymentStatus) {
        this.getRazorpayPaymentStatus = getRazorpayPaymentStatus;
    }

    public String getRazorpayPaymentId() {
        return razorpayPaymentId;
    }

    public void setRazorpayPaymentId(String razorpayPaymentId) {
        this.razorpayPaymentId = razorpayPaymentId;
    }
}
