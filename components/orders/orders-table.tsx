"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  Calendar,
  ChevronDown,
  Download,
  Edit,
  Eye,
  Filter,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrderDetailsDialog } from "./order-details-dialog";
import { type OrderData, orders } from "@/lib/orderData";

export default function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const itemsPerPage = 10;

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? order.orderStatus === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle row expansion
  const toggleRowExpansion = (orderId: string) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Toggle order selection
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Toggle all orders selection
  const toggleAllSelection = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map((order) => order.orderId));
    }
  };

  // View order details
  const viewOrderDetails = (order: OrderData) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

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

  const handlePrintInvoice = (order: OrderData) => {
    const invoiceWindow = window.open("", "", "width=800,height=600");
    const invoiceHtml = `
   <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Number: ${order.invoiceNumber}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fff;
            color: #000;
            max-width: 800px;
            margin: auto;
            padding: 20px;
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
        }
        .invoice-container {
        display: flex;
        justify-content: end;
        }
        .invoice-summary {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
        }
        .order-status {
            
            text-align: right;
        }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .invoice-table th, .invoice-table td {
            border-bottom: 1px solid #ccc;
            padding: 10px;
            text-align: right;
        }
        .invoice-table th:first-child, .invoice-table td:first-child {
            text-align: left;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="invoice-header">
        <div>
            <h3>Bill To</h3>
            <p id="customerName">John Doe</p>
            <p id="customerPhone">+1 (555) 987-6543</p>
            <p id="shippingAddress">456 Market Street, New York, NY</p>
        </div>
        <div style="text-align: right;">
            <h2>Acme Inc.</h2>
            <p>123 Commerce Street</p>
            <p>Business City, State 12345</p>
            <p>support@acmeinc.com</p>
            <p>+1 (555) 123-4567</p>
        </div>
    </div>
    <table class="invoice-table">
        <thead>
            <tr>
                <th>Item</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Wireless Headphones</td>
                <td>WH-1234</td>
                <td>$99.99</td>
                <td>1</td>
                <td>$99.99</td>
            </tr>
            <tr>
                <td>Smartwatch</td>
                <td>SW-5678</td>
                <td>$199.99</td>
                <td>1</td>
                <td>$199.99</td>
            </tr>
            <tr>
                <td>USB-C Charger</td>
                <td>UC-9101</td>
                <td>$29.99</td>
                <td>2</td>
                <td>$59.98</td>
            </tr>
        </tbody>
    </table>
    
    <div class="invoice-container">
        <div style="width: 400px;">
            <p  class="invoice-summary">Subtotal: <span id="subtotal">$359.96</span></p>
            <p  class="invoice-summary">Shipping: <span id="shippingFee">$10.00</span></p>
            <p  class="invoice-summary">Discount: <span id="discount">$-20.00</span></p>
            <p  class="invoice-summary" style="font-weight: bold;">Total: <span id="totalValue">$349.96</span></p>
        </div>
    </div>
    
    <div class="footer">
        <p>Thank you for your business.</p>
    </div>
</body>
</html>
  `;
    invoiceWindow?.document.write(invoiceHtml);
    invoiceWindow?.document.close();
    invoiceWindow?.print();
  };

  return (
    <div className="space-y-6 py-10 max-w-screen-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" /> Filter by date
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownUp className="mr-2 h-4 w-4" /> Sort by amount
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Export data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectedOrders.length > 0 && (
        <div className="bg-primary/10 p-2 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium">
            {selectedOrders.length} orders selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedOrders([])}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedOrders.length === paginatedOrders.length &&
                      paginatedOrders.length > 0
                    }
                    onCheckedChange={toggleAllSelection}
                  />
                </TableHead>
                <TableHead className="w-[120px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => (
                  <>
                    <TableRow
                      key={order.orderId}
                      className={
                        expandedRows.includes(order.orderId) ? "border-b-0" : ""
                      }
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.orderId)}
                          onCheckedChange={() =>
                            toggleOrderSelection(order.orderId)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {order.customerName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {order.customerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(order.orderDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {order.items.length} items
                            </TooltipTrigger>
                            <TooltipContent>
                              <ul className="list-disc pl-5 py-1">
                                {order.items.map((item, index) => (
                                  <li key={index}>
                                    {item.name} (x{item.quantity})
                                  </li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>${order.totalValue.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            order.orderStatus
                          )} text-white`}
                        >
                          {order.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          className={`${getPaymentStatusColor(
                            order.paymentStatus
                          )} text-white`}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleRowExpansion(order.orderId)}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                expandedRows.includes(order.orderId)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRows.includes(order.orderId) && (
                      <TableRow className="bg-muted/50">
                        <TableCell colSpan={9} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">
                                Shipping Details
                              </h4>
                              <div className="text-sm">
                                <p>
                                  <span className="font-medium">Address:</span>{" "}
                                  {order.shippingAddress}
                                </p>
                                <p>
                                  <span className="font-medium">Method:</span>{" "}
                                  {order.shippingMethod}
                                </p>
                                <p>
                                  <span className="font-medium">Tracking:</span>{" "}
                                  {order.trackingNumber}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Delivery Status:
                                  </span>{" "}
                                  <Badge
                                    className={`${getDeliveryStatusColor(
                                      order.deliveryStatus
                                    )} text-white mt-1`}
                                  >
                                    {order.deliveryStatus}
                                  </Badge>
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Payment Information
                              </h4>
                              <div className="text-sm">
                                <p>
                                  <span className="font-medium">Method:</span>{" "}
                                  {order.paymentMethod}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Transaction ID:
                                  </span>{" "}
                                  {order.transactionId}
                                </p>
                                <p>
                                  <span className="font-medium">Subtotal:</span>{" "}
                                  ${order.subtotal.toFixed(2)}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Shipping Fee:
                                  </span>{" "}
                                  ${order.shippingFee.toFixed(2)}
                                </p>
                                <p>
                                  <span className="font-medium">Discount:</span>{" "}
                                  ${order.discount.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Additional Information
                              </h4>
                              <div className="text-sm">
                                <p>
                                  <span className="font-medium">
                                    Order Type:
                                  </span>{" "}
                                  {order.orderType}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Order Source:
                                  </span>{" "}
                                  {order.orderSource}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Invoice Number:
                                  </span>{" "}
                                  {order.invoiceNumber}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Expected Delivery:
                                  </span>{" "}
                                  {order.expectedDeliveryDate
                                    ? format(
                                        new Date(order.expectedDeliveryDate),
                                        "MMM d, yyyy"
                                      )
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePrintInvoice(order)}
                            >
                              <Download className="h-4 w-4 mr-1" /> Print
                              Invoice
                            </Button>
                            <Button variant="default" size="sm">
                              <Edit className="h-4 w-4 mr-1" /> Edit Order
                            </Button>
                            {order.orderStatus !== "Canceled" && (
                              <Button variant="destructive" size="sm">
                                <X className="h-4 w-4 mr-1" /> Cancel Order
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-9"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Order Details Dialog */}
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  );
}
