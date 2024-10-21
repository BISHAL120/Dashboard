"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Calendar } from "@nextui-org/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus, X, Smile } from "lucide-react";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { HexColorPicker } from "react-colorful";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";

interface Variant {
  size: string;
  color: string;
  price: number;
  stock: number;
}

export default function EditProduct2() {
  const [product, setProduct] = useState({
    brandName: "",
    category: "",
    subcategory: "",
    productName: "",
    description: "",
    visibility: "published",
    publishDate: new Date(),
    parentCategory: "",
    images: [] as File[],
    variants: [] as Variant[],
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentVariant, setCurrentVariant] = useState<Variant>({
    size: "",
    color: "",
    price: 0,
    stock: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content: string) => {
    setProduct((prev) => ({ ...prev, description: content }));
    console.log(product);
  };

  const handleEmojiSelect = (emoji: any) => {
    setProduct((prev) => ({
      ...prev,
      description: prev.description + `<span>${emoji.native}</span>`,
    }));
    setShowEmojiPicker(false);
  };

  const insertImage = (img: any) => {
    setProduct((prev) => ({
      ...prev,
      description:
        prev.description +
        `<img src="https://picsum.photos/seed/product8/400/400.webp" alt="" />`,
    }));
  };

  const toolbarOptions = [["image"], ["imageResize"]];

  const quill = new Quill("#editor", {
    modules: {
      toolbar: toolbarOptions,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageDelete = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentVariant((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, currentVariant],
    }));
    setCurrentVariant({ size: "", color: "", price: 0, stock: 0 });
  };

  const removeVariant = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", product);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-3xl font-bold text-white">Add Product</h2>
          <p className="text-blue-100 mt-2">
            Fill in the details to add a new product
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="brandName"
                className="text-sm font-medium text-gray-700"
              >
                Brand Name
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("brandName", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="sony">Sony</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headphone">Headphone</SelectItem>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="subcategory"
                className="text-sm font-medium text-gray-700"
              >
                Subcategory
              </Label>
              <Input
                id="subcategory"
                name="subcategory"
                placeholder="Enter subcategory"
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="productName"
              className="text-sm font-medium text-gray-700"
            >
              Product Name
            </Label>
            <Input
              id="productName"
              name="productName"
              placeholder="Enter product name"
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <div className="mt-1 relative">
              <ReactQuill
                theme="snow"
                value={product.description}
                onChange={handleDescriptionChange}
              />
              <div className="absolute top-2 right-2 p-2 flex gap-3">
                <Button type="button">
                  <ImagePlus
                    onClick={() => document.getElementById("descImg")?.click()}
                    className="h-5 w-5"
                  />
                </Button>{" "}
                <Button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className=""
                >
                  <Smile className="h-5 w-5" />
                </Button>
                {showEmojiPicker && (
                  <div className=" absolute top-12 right-0">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>

              <Input
                onChange={insertImage}
                multiple
                type="file"
                id="descImg"
                className="sr-only"
              />
              {/* <Button className="absolute top-2 right-10 p-2 w-4">
              </Button> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Visibility
              </Label>
              <RadioGroup
                defaultValue="published"
                onValueChange={(value) =>
                  handleSelectChange("visibility", value)
                }
                className="mt-2 space-y-2"
              >
                <div className="flex items-center">
                  <Radio value="published" id="published" />
                  <Label htmlFor="published" className="ml-2">
                    Published
                  </Label>
                </div>
                <div className="flex items-center">
                  <Radio value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="ml-2">
                    Scheduled
                  </Label>
                </div>
                <div className="flex items-center">
                  <Radio value="hidden" id="hidden" />
                  <Label htmlFor="hidden" className="ml-2">
                    Hidden
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Publish Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-1 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(product.publishDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    aria-label="Date (Controlled)"
                    /*  value={new Date()}
                    onSelect={(date) =>
                      date ? setProduct((prev) => ({ ...prev, publishDate: date })) : null
                    } */
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label
              htmlFor="parentCategory"
              className="text-sm font-medium text-gray-700"
            >
              Parent Category
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("parentCategory", value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select parent category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Product Images
            </Label>
            <div
              {...getRootProps()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div className="space-y-1 text-center">
                <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      {...getInputProps()}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {product.images.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Image Preview
              </Label>
              <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {product.images.map((file, index) => (
                  <div key={index} className="relative group">
                    <Image
                      as={NextImage}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Product Variants
            </Label>
            <div className="mt-2 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Size"
                  name="size"
                  value={currentVariant.size}
                  onChange={handleVariantChange}
                />
                <div className="relative">
                  <Input
                    placeholder="Color"
                    name="color"
                    value={currentVariant.color}
                    onChange={handleVariantChange}
                    onClick={() => setShowColorPicker(true)}
                  />
                  {showColorPicker && (
                    <div className="absolute mt-2 z-10">
                      <HexColorPicker
                        color={currentColor}
                        onChange={(color) => {
                          setCurrentColor(color);
                          setCurrentVariant((prev) => ({ ...prev, color }));
                        }}
                      />
                      <Button
                        onClick={() => setShowColorPicker(false)}
                        className="mt-2"
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </div>
                <Input
                  type="number"
                  placeholder="Price"
                  name="price"
                  //   value={currentVariant.price || ""}
                  onChange={handleVariantChange}
                />
                <Input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  //   value={currentVariant.stock || ""}
                  onChange={handleVariantChange}
                />
              </div>
              <Button type="button" onClick={addVariant}>
                Add Variant
              </Button>
            </div>
            {product.variants.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Added Variants
                </h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {product.variants.map((variant, index) => (
                    <li
                      key={index}
                      className="py-2 flex justify-between items-center"
                    >
                      <span>{`${variant.size} - ${variant.color} - $${variant.price} - Stock: ${variant.stock}`}</span>
                      <Button
                        type="button"
                        onClick={() => removeVariant(index)}
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
