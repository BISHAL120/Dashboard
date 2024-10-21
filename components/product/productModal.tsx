"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, Tabs, Tab } from "@nextui-org/react";

export default function ProductModal() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const images = [
    "https://picsum.photos/seed/product8/1000/1000.webp",
    "https://picsum.photos/seed/product7/300/300.webp",
    "https://picsum.photos/seed/product6/300/300.webp",
    "https://picsum.photos/seed/product5/300/300.webp",
    "https://picsum.photos/seed/product4/300/300.webp",
    "https://picsum.photos/seed/product3/300/300.webp",
    "https://picsum.photos/seed/product2/300/300.webp",
    "https://picsum.photos/seed/product1/300/300.webp",
    "https://picsum.photos/seed/product9/300/300.webp",
  ];

  const colorVariants = [
    { name: "Cream", class: "bg-amber-100" },
    { name: "Black", class: "bg-gray-900" },
    { name: "Navy", class: "bg-indigo-900" },
    { name: "Red", class: "bg-red-600" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    // Scroll the active image thumbnail into view
    const activeImageRef = imageRefs.current[currentImageIndex];
    if (activeImageRef) {
      activeImageRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentImageIndex]);

  return (
    <Card className="w-full max-w-[900px] h-[600px] overflow-auto mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 shadow-xl">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl pb-5 text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Product Detail&apos;s
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-1 gap-6 max-w-[900px]">
        <div className="space-y-4 flex flex-col justify-center items-center overflow-hidden">
          <div className="relative w-full h-auto max-w-[900px] p-2 md:p-6 flex justify-center items-center border border-gray-400 rounded-xl">
            <Image
              as={NextImage}
              alt={`DR CRZ Jacket view ${currentImageIndex + 1}`}
              className="w-[300px] object-cover rounded-lg shadow-md"
              height="400"
              src={images[currentImageIndex]}
              width="300"
            />
            <button
              className="absolute w-10 h-10 p-2 rounded-lg flex justify-center items-center z-10 left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </button>
            <button
              className="absolute w-10 h-10 p-2 rounded-lg flex justify-center items-center z-10 right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </button>
          </div>
          <div className="flex w-full space-y-3 justify-start items-center gap-5 overflow-auto overflow-x-hidden overflow-y-hidden p-3">
            {images.map((image, index) => (
              <Button
                key={index}
                className={`p-0 w-16 h-16 rounded-md  ${
                  index === currentImageIndex ? "ring-4 ring-primary-500  " : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
              >
                <Image
                  as={NextImage}
                  alt={`DR CRZ Jacket thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  height="64"
                  src={image}
                  width="70"
                />
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="text-3xl font-bold ">Product Title Here</div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-semibold text-purple-600">$69.00</div>
            <div className="flex w-[130px] flex-wrap justify-start items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 stroke-yellow-400"
                />
              ))}
              <span className="mt-2 text-sm text-gray-600">(1283 Reviews)</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Color
            </h3>
            <div className="flex gap-2">
              {colorVariants.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full ${color.class} border-2 border-white shadow-md`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <Button size="sm" key={size} className="w-8 h-8 px-0">
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600">
              The __DR CRZ Jacket__ is a stylish and versatile piece of
              outerwear designed to provide both fashion and functionality.
              Crafted with attention to detail, this leather jacket features a
              unique two-tone design with contrasting colors and bold lettering.
            </p>
          </div>
          <div className="flex items-center text-green-600 gap-2">
            <Truck className="w-5 h-5" />
            <span>Free shipping on orders over $100</span>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Tabs className="w-full">
          <Tab title="Customer Reviews" key="reviews" className="">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-semibold">
                  Amazing quality!
                </span>
              </div>
              <p className="text-sm text-gray-600">
                This jacket exceeded my expectations. The leather is soft yet
                durable, and the fit is perfect. I_ve received many compliments
                wearing it!
              </p>
              <p className="text-sm text-gray-500 mt-2">
                John D. - Verified Buyer
              </p>
            </div>
            <Button className="text-purple-600 my-7">
              Read all 1283 reviews
            </Button>
          </Tab>
          <Tab title="Features" key="features">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Premium quality leather</li>
              <li>Two-tone design</li>
              <li>Embroidered lettering</li>
              <li>Multiple pockets</li>
              <li>Comfortable fit</li>
              <li>Water-resistant finish</li>
              <li>Available in multiple colors</li>
            </ul>
          </Tab>
        </Tabs>
      </CardContent>
    </Card>
  );
}
