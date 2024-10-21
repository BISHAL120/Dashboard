import { Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

const Notification = ({ params }: { params: { notificationId: string } }) => {
  return (
    <div className="max-w-[1550px] mx-auto">
      <div className="ml-10">
        <div>
          <p className="text-2xl font-semibold glo">Total Cost 7549</p>
        </div>
      </div>
      <div className="py-10 grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 ">
        {Array.from({ length: 5 }).map((item, i) => (
          <div
            key={i}
            className="sm:max-w-[400px] p-4 ring-2 ring-gray-200 shadow-md rounded-2xl"
          >
            <div className="grid gap-6 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <circle cx="12" cy="6" r="4" fill="currentColor" />
                    <path
                      fill="currentColor"
                      d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed an order
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex flex-col justify-between items-center pb-5 space-y-5">
                  <div className="p-3">
                    <Image
                      as={NextImage}
                      isZoomed
                      isBlurred
                      src="/image/profile/user-1.jpg"
                      alt="Product Image"
                      width={250}
                      height={250}
                      className="rounded-sm max-w-[250px] "
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Acme Prism T-Shirt</h4>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-sm font-medium">99.99</p>
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Quantity</p>
                    <p className="text-sm font-medium">2</p>
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-sm font-medium">$199.98</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <p className="text-sm font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">
                  123 Main St, Anytown USA 12345
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
