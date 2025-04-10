"use client";

import { format } from "date-fns";
import { Download, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { OrderData } from "@/lib/orderData";

interface OrderDetailsDialogProps {
  order: OrderData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Processing":
        return "bg-blue-500 hover:bg-blue-600";
      case "Shipped":
        return "bg-purple-500 hover:bg-purple-600";
      case "Delivered":
        return "bg-green-500 hover:bg-green-600";
      case "Canceled":
        return "bg-red-500 hover:bg-red-600";
      case "Refunded":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Get payment status badge color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500 hover:bg-green-600";
      case "Unpaid":
        return "bg-red-500 hover:bg-red-600";
      case "Partially Paid":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Failed":
        return "bg-red-500 hover:bg-red-600";
      case "Refunded":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Get delivery status badge color
  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "Not Shipped":
        return "bg-gray-500 hover:bg-gray-600";
      case "Shipped":
        return "bg-blue-500 hover:bg-blue-600";
      case "Out for Delivery":
        return "bg-purple-500 hover:bg-purple-600";
      case "Delivered":
        return "bg-green-500 hover:bg-green-600";
      case "Failed":
        return "bg-red-500 hover:bg-red-600";
      case "Returned":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order {order.orderId}</span>
            <Badge
              className={`${getStatusColor(order.orderStatus)} text-white`}
            >
              {order.orderStatus}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Order Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Order Date:</span>
                    <span className="text-sm font-medium">
                      {format(new Date(order.orderDate), "MMM d, yyyy h:mm a")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Order Type:</span>
                    <span className="text-sm font-medium">
                      {order.orderType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Order Source:</span>
                    <span className="text-sm font-medium">
                      {order.orderSource}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Invoice Number:</span>
                    <span className="text-sm font-medium">
                      {order.invoiceNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Payment Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Payment Method:</span>
                    <span className="text-sm font-medium">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payment Status:</span>
                    <Badge
                      className={`${getPaymentStatusColor(
                        order.paymentStatus
                      )} text-white`}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transaction ID:</span>
                    <span className="text-sm font-medium">
                      {order.transactionId}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal:</span>
                  <span className="text-sm font-medium">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping Fee:</span>
                  <span className="text-sm font-medium">
                    ${order.shippingFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Discount:</span>
                  <span className="text-sm font-medium">
                    -${order.discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-sm font-bold">
                    ${order.totalValue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-1" /> Print Invoice
              </Button>
              <Button variant="default">Edit Order</Button>
              {order.orderStatus !== "Canceled" && (
                <Button variant="destructive">
                  <X className="h-4 w-4 mr-1" /> Cancel Order
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="items">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Subtotal
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.subtotal.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Shipping
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.shippingFee.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Discount
                  </TableCell>
                  <TableCell className="text-right">
                    -${order.discount.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${order.totalValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="customer">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Name:</span>
                    <span className="text-sm font-medium">
                      {order.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Email:</span>
                    <span className="text-sm font-medium">
                      {order.customerEmail}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Phone:</span>
                    <span className="text-sm font-medium">
                      {order.customerPhone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">User ID:</span>
                    <span className="text-sm font-medium">{order.userId}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Customer Notes
                </h3>
                <div className="p-3 bg-muted rounded-md text-sm">
                  {order.orderNotes || "No customer notes provided."}
                </div>

                <h3 className="text-sm font-medium text-muted-foreground mt-4 mb-2">
                  Admin Comments
                </h3>
                <div className="p-3 bg-muted rounded-md text-sm">
                  {order.adminComments || "No admin comments."}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Shipping Address
                </h3>
                <div className="p-3 bg-muted rounded-md text-sm">
                  {order.shippingAddress}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Shipping Method:</span>
                    <span className="text-sm font-medium">
                      {order.shippingMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Shipping Fee:</span>
                    <span className="text-sm font-medium">
                      ${order.shippingFee.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Delivery Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Courier:</span>
                    <span className="text-sm font-medium">
                      {order.courierName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tracking Number:</span>
                    <span className="text-sm font-medium">
                      {order.trackingNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Delivery:</span>
                    <span className="text-sm font-medium">
                      {order.expectedDeliveryDate
                        ? format(
                            new Date(order.expectedDeliveryDate),
                            "MMM d, yyyy"
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivery Status:</span>
                    <Badge
                      className={`${getDeliveryStatusColor(
                        order.deliveryStatus
                      )} text-white`}
                    >
                      {order.deliveryStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
