"use client";

import {
  ArrowLeft,
  Bell,
  Check,
  Download,
  Edit,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function OrderDetailsPage() {
  const [activeTab, setActiveTab] = useState("order");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="#" className="flex items-center gap-2 font-semibold">
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden md:inline-flex">Dashboard</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>GL</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <div className="text-sm text-muted-foreground">
              Order/Order Details/#0758267/90-April 23, 2024 at 6:23 pm
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Order Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">#0758267/90</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  In Progress
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refund
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Return
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Order
              </Button>
              <Button size="sm">Make As Ready To Ship</Button>
            </div>
          </div>

          {/* Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="flex justify-between mb-2">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white mx-auto">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="text-sm mt-1">Order Confirming</div>
                  </div>
                  <div className="text-center z-10">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white mx-auto">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="text-sm mt-1">Payment Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mx-auto">
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="text-sm mt-1">Processing</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500 mx-auto">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div className="text-sm mt-1">Shipping</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500 mx-auto">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="text-sm mt-1">Delivered</div>
                  </div>
                </div>
                <div className="absolute top-4 left-[calc(4%)] right-[calc(2%)] h-1 bg-gray-200">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium">Estimated shipping date:</span>{" "}
                Apr 25, 2024
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                      <div className="col-span-6">Product Name & Size</div>
                      <div className="col-span-2 text-center">Status</div>
                      <div className="col-span-1 text-center">Quantity</div>
                      <div className="col-span-1 text-center">Price</div>
                      <div className="col-span-1 text-center">Text</div>
                      <div className="col-span-1 text-center">Amount</div>
                    </div>
                    <Separator />

                    {/* Product 1 */}
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Men Black Slim Fit T-shirt
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Size: M
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Ready
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center">1</div>
                      <div className="col-span-1 text-center">$80.00</div>
                      <div className="col-span-1 text-center">$3.00</div>
                      <div className="col-span-1 text-center font-medium">
                        $83.00
                      </div>
                    </div>
                    <Separator />

                    {/* Product 2 */}
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Dark Green Cargo Pent
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Size: M
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          Packaging
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center">3</div>
                      <div className="col-span-1 text-center">$330.00</div>
                      <div className="col-span-1 text-center">$4.00</div>
                      <div className="col-span-1 text-center font-medium">
                        $334.00
                      </div>
                    </div>
                    <Separator />

                    {/* Product 3 */}
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Men Dark Brown Wallet
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Size: S
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Ready
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center">1</div>
                      <div className="col-span-1 text-center">$132.00</div>
                      <div className="col-span-1 text-center">$5.00</div>
                      <div className="col-span-1 text-center font-medium">
                        $137.00
                      </div>
                    </div>
                    <Separator />

                    {/* Product 4 */}
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Kid&apos;s Yellow T-shirt
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Size: S
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          Packaging
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center">2</div>
                      <div className="col-span-1 text-center">$220.00</div>
                      <div className="col-span-1 text-center">$3.00</div>
                      <div className="col-span-1 text-center font-medium">
                        $223.00
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Package className="h-4 w-4" />
                        </div>
                        <div className="h-full w-px bg-border mt-2"></div>
                      </div>
                      <div>
                        <div className="font-medium">
                          The packing has been started
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Confirmed by Gaston Lapierre
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          April 23, 2024, 09:40 am
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div className="h-full w-px bg-border mt-2"></div>
                      </div>
                      <div>
                        <div className="font-medium">
                          The Invoice has been sent to the customer
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Invoice email was sent to hello@dundermuffilin.com
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-blue-600"
                        >
                          Resend Invoice
                        </Button>
                        <div className="text-sm text-muted-foreground mt-1">
                          April 23, 2024, 09:40 am
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Download className="h-4 w-4" />
                        </div>
                        <div className="h-full w-px bg-border mt-2"></div>
                      </div>
                      <div>
                        <div className="font-medium">
                          The Invoice has been created
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Invoice created by Gaston Lapierre
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-blue-600"
                        >
                          Download Invoice
                        </Button>
                        <div className="text-sm text-muted-foreground mt-1">
                          April 23, 2024, 09:40 am
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          Order conform by Gaston Lapierre
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          April 23, 2024, 09:40 am
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sub Total:</span>
                      <span className="font-medium">$777.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount:</span>
                      <span className="font-medium text-red-500">-$60.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery Charge:
                      </span>
                      <span className="font-medium">$00.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Estimated Tax (15.5%):
                      </span>
                      <span className="font-medium">$20.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-semibold">$737.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-orange-600"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Master Card</div>
                        <div className="text-sm text-muted-foreground">
                          XXXX XXXX XXXX 7812
                        </div>
                      </div>
                      <Badge className="ml-auto">Paid</Badge>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Transaction ID:
                        </span>{" "}
                        #IDN768139059
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Card Holder Name:
                        </span>{" "}
                        Gaston Lapierre
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Date:</span>{" "}
                        April 23, 2024
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Paid By:</span>{" "}
                        Gaston Lapierre
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Reference #IMEMO:
                        </span>{" "}
                        #0758267/90
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="Gaston Lapierre"
                        />
                        <AvatarFallback>GL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Gaston Lapierre</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          hello@dundermuffilin.com
                        </div>
                      </div>
                    </div>
                    <div className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>Contact Number</span>
                      <span className="font-medium">(723)732-760-5760</span>
                    </div>
                    <Separator />
                    <div>
                      <div className="font-medium mb-2">Shipping Address</div>
                      <div className="text-sm space-y-1">
                        <div>Wilson&apos;s Jewelers LTD</div>
                        <div>1344 Hershell Hollow Road,</div>
                        <div>Tukwila, WA 98168.</div>
                        <div>United States</div>
                        <div>(723)732-760-5760</div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="font-medium mb-2">Billing Address</div>
                      <div className="text-sm">Same as shipping address</div>
                    </div>
                    <div className="rounded-md overflow-hidden border h-[200px] relative">
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-gray-400" />
                        <span className="sr-only">Map</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
