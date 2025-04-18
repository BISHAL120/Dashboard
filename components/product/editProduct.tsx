"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  Checkbox,
  Chip,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Tag, TagInput } from "emblor";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  BookType,
  CheckIcon,
  Layers,
  PlusCircleIcon,
  Tag as TagIcon,
  Trash2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Description from "@/public/svg/Description";
import GalleryIcon from "@/public/svg/GalleryIcon";
import { HoverEffect } from "../aceternity/ui/card-hover-effect";

import ProductTypes from "./productTypes/components/productType";
import { Brand, Category, Product, Tag as DbTags } from "@prisma/client";
import toast from "react-hot-toast";
import { set } from "date-fns";
import Add from "./productTypes/components/add";
import { FormSchema } from "./productTypes/components/schema/schema";
import axios from "axios";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";
import TextEditor from "../editor/textEditor";

interface ProductFormProps {
  initialData: Product | null;
  id: string;
  categories: Category[];
  brands: Brand[];
  getTags: DbTags[];
}

type Color = {
  id: string; // Add the id field
  color: string;
  stock: number;
};

type Variant = {
  size: string;
  color: Color[];
};

export type ProductType = {
  id: string;
  type: string;
};

const EditProduct: React.FC<ProductFormProps> = ({
  initialData,
  id,
  categories,
  brands,
  getTags,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    initialData ? "Updating product..." : "Creating product..."
  );
  const [errorMessage, setErrorMessage] = useState<string>(
    initialData ? "Failed to update product" : "failed to Creating product..."
  );
  const [successMessage, setSuccessMessage] = useState<string>(
    initialData
      ? "Product updated successfully"
      : "Product created successfully"
  );
  const [color, setColor] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
  );
  const [imageUrls, setImageUrls] = React.useState<object[]>([]);
  const [types, setTypes] = useState<ProductType>(
    initialData?.type || { id: "", type: "" }
  );
  const [content, setContent] = useState<string>(
    initialData?.description || ""
  );

  const [variants, setVariants] = useState<Variant[]>([]);
  const [variant, setVariant] = useState<Variant>({
    size: "",
    color: [{ id: uuidv4(), color: "", stock: 0 }],
  });


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: "",
      price: "",
      discountPrice: "",
      category: "",
      brand: "",
      material: "",
      weight: "",
      dimensions: "",
      varients: [],
      description: "",
      published: true,
      isFeatured: false,
      images: [],
      tags: [],
    },
  });

  const { setValue } = form;
  const resetForm = () => {
    form.reset();
    setContent("");
    setVariants([]);
    setImages([]);
    setTags([]);
    setActiveTagIndex(null);
    setTypes({ id: "", type: "" });
    router.push("/product/all");
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.loading(loadingMessage, {
      position: "top-center",
    });
    try {
      setLoading(true);

      switch (true) {
        case !data.name:
          toast.dismiss();
          toast.error("Add Product Name", {
            position: "top-center",
            duration: 3000,
          });
          return;
        case !data.price:
          toast.dismiss();
          toast.error("Add Product Price", {
            position: "top-center",
            duration: 3000,
          });
          return;
        case !data.category:
          toast.dismiss();
          toast.error("Select a Product Category", {
            position: "top-center",
            duration: 3000,
          });
          return;
        case !data.brand:
          toast.dismiss();
          toast.error("Select a Brand", {
            position: "top-center",
            duration: 3000,
          });
          return;
        case content === "":
          toast.dismiss();
          toast.error("Add product description", {
            position: "top-center",
            duration: 3000,
          });
          return;
        case !variants.length:
          toast.dismiss();
          toast.error("Add product variants", {
            position: "top-center",
            duration: 3000,
          });
          return;
        case !images.length:
          toast.dismiss();
          toast.error("Add product Image", {
            position: "top-center",
            duration: 3000,
          });
          return;
        case !tags.length:
          toast.dismiss();
          toast.error("Add product tags for better search", {
            position: "top-center",
            duration: 3000,
          });
          return;
      }

      if (types.id === "" && types.type === "") {
        toast.dismiss();
        toast.error("Add product Type", {
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      const uploadedImageUrls = [];
      for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post("/api/image", formData);
        const url = response.data.data;
        uploadedImageUrls.push(url);
      }

      setImageUrls(uploadedImageUrls);
      const findCategory = categories.find(
        (category) => category.id === data.category
      );

      const findBrand = brands.find((brand) => brand.id === data.brand);
      const newData = {
        ...data,
        type: types,
        category: { id: findCategory?.id, name: findCategory?.name },
        brand: { id: findBrand?.id, name: findBrand?.name },
        description: content,
        images: uploadedImageUrls,
        tags: tags,
        varients: variants,
      };
      console.log(newData);
      await axios.post("/api/product", newData).then((res) => {
        console.log(res);
        toast.dismiss();
        setLoading(false);
        toast.success(successMessage, {
          position: "top-center",
          duration: 3000,
        });
      });
      resetForm();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss();
      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  // Handle input changes for a variant
  const handleVariantChange = ({
    e,
    index,
    type,
  }: {
    e: React.ChangeEvent<HTMLInputElement> | string;
    index: number;
    type: "color" | "stock";
  }) => {
    const newColors = [...variant.color];

    if (typeof e !== "string") {
      const { value } = e.target;
      if (type === "stock") {
        newColors[index].stock = Number(value);
      }
    }
    if (typeof e === "string") {
      if (type === "color") {
        newColors[index].color = e;
      }
    }
    setVariant({ ...variant, color: newColors });
  };

  const handleVariantEdit = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    colorObj: Color,
    index: number,
    vindex: number,
    type: "color" | "stock"
  ) => {
    const updatedVariants = [...variants];
    const updatedVariant = updatedVariants[vindex];
    const updatedColor = updatedVariant.color[index];

    if (typeof e !== "string") {
      const { value } = e.target;
      if (type === "stock") {
        updatedColor.stock = Number(value); // Update stock and convert it to a number
      }
    }

    if (typeof e === "string") {
      if (type === "color") {
        updatedColor.color = e; // Update color
      }
    }

    //   // Set the updated variants array to the state
    else setVariants(updatedVariants);
  };

  // // Handle size change
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariant({ ...variant, size: e.target.value });
  };

  // // Add new color field
  const addColorField = () => {
    setVariant({
      ...variant,
      color: [...variant.color, { id: uuidv4(), color: "", stock: 0 }],
    });
  };

  // // Remove color field
  const removeColorField = (index: number) => {
    const newColors = variant.color.filter((_, i) => i !== index);
    setVariant({ ...variant, color: newColors });
  };

  const removePreviewField = (id: string, index: number) => {
    const updatedVariants = [...variants];
    const res = updatedVariants[index].color.filter((c) => c.id !== id);
    updatedVariants[index].color = res;
    setVariants(updatedVariants);
  };

  // // Add the variant to the main array and reset form
  const addVariant = () => {
    if (variant.size !== "") {
      variant.color.forEach((c) => {
        if ((c.color !== "", c.stock !== 0)) {
          setVariants([...variants, variant]);
          setVariant({
            size: "",
            color: [{ id: uuidv4(), color: "", stock: 0 }],
          }); // Reset
        } else {
          return toast.error("Please enter both color & stock");
        }
      });
    } else {
      return toast.error("Please enter Size");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFilesArray = Array.from(files).filter((file) => {
        const fileType = file.type;
        return (
          fileType === "image/png" ||
          fileType === "image/jpeg" ||
          fileType === "image/jpg" ||
          fileType === "image/gif"
        );
      }); // Convert FileList to an array and only take images
      setImages((prev) => [...prev, ...newFilesArray]); // Concatenate new files with previous ones
    }
  };

  const handleDeleteImage = (image: File) => {
    setImages((prev) => prev.filter((i) => i !== image));
  };

  return (
    <div className="max-w-[1450px] mx-auto h-full px-2 ">
      <div className="flex justify-center w-full flex-col">
        <div className="flex justify-end gap-2 py-2">
          <Button isDisabled={loading} className="bg-red-800 text-white ">
            Delete
          </Button>
          <Button isDisabled={loading} color="warning">
            Draft
          </Button>
          <Button
            isDisabled={loading}
            isLoading={loading}
            color="primary"
            type="submit"
            form="productForm"
          >
            Save Product
          </Button>
        </div>
        <Form {...form}>
          <form id="productForm" onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              className="Tabs"
              aria-label="Options"
              color="primary"
              variant="bordered"
            >
              <Tab
                key="Details"
                title={
                  <div className="flex items-center space-x-2">
                    <Description />
                    <span>Details</span>
                  </div>
                }
              >
                <div className="grid gap-8">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start">
                            <FormControl className="">
                              <Input
                                {...field}
                                type="text"
                                label="Name"
                                color="primary"
                                classNames={{
                                  label:
                                    "text-black/50 dark:text-white/90 font-semibold",
                                  input: [
                                    "bg-transparent",
                                    "text-black/90 dark:text-white/90",
                                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                  ],
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <ProductTypes
                        value={initialData?.type}
                        setTypes={setTypes}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="grid-cols-1 grid md:grid-cols-4 gap-4">
                      <div className="">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                              <FormControl className="">
                                <Input
                                  {...field}
                                  type="text"
                                  label="Price"
                                  color="primary"
                                  classNames={{
                                    label:
                                      "text-black/50 dark:text-white/90 font-semibold",
                                    input: [
                                      "bg-transparent",
                                      "text-black/90 dark:text-white/90",
                                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="discountPrice"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                              <FormControl className="">
                                <Input
                                  {...field}
                                  type="text"
                                  label="Discount Price"
                                  color="primary"
                                  classNames={{
                                    label:
                                      "text-black/50 dark:text-white/90 font-semibold",
                                    input: [
                                      "bg-transparent",
                                      "text-black/90 dark:text-white/90",
                                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                              <FormControl className="">
                                <Select
                                  onChange={field.onChange}
                                  value={field.value}
                                  labelPlacement="inside"
                                  label="Select a Category"
                                  color="primary"
                                  size="lg"
                                  className=""
                                >
                                  {categories.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.name}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                              <Select
                                onChange={field.onChange}
                                value={field.value}
                                labelPlacement="inside"
                                label={`${brands.length > 0
                                  ? "Select Brand"
                                  : "No Brand Available, Create new!"
                                  }`}
                                color="primary"
                                className=""
                                size="lg"
                              >
                                {brands.map((brand) => (
                                  <SelectItem key={brand.id} value={brand.name}>
                                    {brand.name}
                                  </SelectItem>
                                ))}
                              </Select>{" "}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* Add here */}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <div>Additional Information</div>
                        <FormField
                          control={form.control}
                          name="material"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                              <FormControl className="">
                                <Input
                                  {...field}
                                  type="text"
                                  label="Material"
                                  color="primary"
                                  classNames={{
                                    label:
                                      "text-black/50 dark:text-white/90 font-semibold",
                                    input: [
                                      "bg-transparent",
                                      "text-black/90 dark:text-white/90",
                                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="weight"
                              render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                  <FormControl className="">
                                    <Input
                                      {...field}
                                      type="text"
                                      label="Weight"
                                      color="primary"
                                      classNames={{
                                        label:
                                          "text-black/50 dark:text-white/90 font-semibold",
                                        input: [
                                          "bg-transparent",
                                          "text-black/90 dark:text-white/90",
                                          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                        ],
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="dimensions"
                              render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                  <FormControl className="">
                                    <Input
                                      {...field}
                                      type="text"
                                      label="Dimensions"
                                      color="primary"
                                      classNames={{
                                        label:
                                          "text-black/50 dark:text-white/90 font-semibold",
                                        input: [
                                          "bg-transparent",
                                          "text-black/90 dark:text-white/90",
                                          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                        ],
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start w-1/2">
                            <FormControl className="w-full">
                              <Card className="">
                                <CardBody className="p-5">
                                  <Checkbox
                                    isSelected={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <p className="text-base font-semibold">
                                      Want to publish ?
                                    </p>
                                    <div className="flex items-center justify-between ">
                                      <p>Check this box</p>
                                    </div>
                                  </Checkbox>
                                </CardBody>
                              </Card>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start w-1/2">
                            <FormControl className="w-full">
                              <Card>
                                <CardBody className="p-5">
                                  <Checkbox
                                    isSelected={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <p className="text-base font-semibold">
                                      Feature this product ?
                                    </p>
                                    <div className="flex items-center justify-between ">
                                      <p>Check this box</p>
                                    </div>
                                  </Checkbox>
                                </CardBody>
                              </Card>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="Description"
                title={
                  <div className="flex items-center space-x-2">
                    <BookType />
                    <span>Description</span>
                  </div>
                }
              >
                <TextEditor />
              </Tab>
              <Tab
                key="Varients"
                title={
                  <div className="flex items-center space-x-2">
                    <Layers />
                    <span>Varient&apos;s</span>
                  </div>
                }
              >
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 pb-10">
                  <div>
                    <div className="mb-5">Product Varient&apos;s</div>
                    <div className="mb-4">
                      <Input
                        type="text"
                        label="Size"
                        color="primary"
                        className=""
                        value={variant.size}
                        onChange={handleSizeChange}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">
                        Colors and Stock:
                      </label>
                      {variant.color.map((colorObj, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-2"
                        >
                          <HexColorPicker
                            color={colorObj.color}
                            onChange={(color) => {
                              setColor(color);
                              handleVariantChange({
                                e: color,
                                index,
                                type: "color",
                              });
                            }}
                          />
                          <div
                            className="p-2 w-[200px] h-[200px] rounded-md"
                            style={{ backgroundColor: colorObj.color }}
                          />

                          <Input
                            type="number"
                            label="Stock"
                            color="primary"
                            value={colorObj.stock.toString()}
                            className="w-1/2"
                            onChange={(e) =>
                              handleVariantChange({ e, index, type: "stock" })
                            }
                          />
                          <Button
                            isIconOnly
                            color="danger"
                            onClick={() => removeColorField(index)}
                            className=""
                          >
                            <Trash2Icon />
                          </Button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addColorField}
                        className="bg-blue-500 text-white p-2 rounded mt-2"
                      >
                        <PlusCircleIcon />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-green-500 text-white p-2 rounded mt-4"
                    >
                      Add Variant
                    </button>
                  </div>
                  <div>
                    <div className="mb-5">Varient&apos;s Preview</div>
                    <div>
                      {variants.map((variant, index) => (
                        <div key={index}>
                          {variant.color.length > 0 && (
                            <div>
                              <p className="bg-gray-200 rounded-md text-base font-semibold max-w-[100px] p-2 mb-5">
                                Size: {variant.size}
                              </p>
                            </div>
                          )}
                          <div>
                            {variant.color.map((colorObj, vindex) => (
                              <div
                                key={vindex}
                                className="flex items-center gap-2 mb-2"
                              >
                                <Input
                                  type="text"
                                  label="Color"
                                  color="primary"
                                  className="w-2/3"
                                  value={colorObj.color}
                                  onChange={(e) =>
                                    handleVariantEdit(
                                      e,
                                      colorObj,
                                      vindex,
                                      index,
                                      "color"
                                    )
                                  }
                                />
                                <Input
                                  type="number"
                                  label="Stock"
                                  color="primary"
                                  className="w-1/4"
                                  value={String(colorObj.stock)}
                                  onChange={(e) =>
                                    handleVariantEdit(
                                      e,
                                      colorObj,
                                      vindex,
                                      index,
                                      "stock"
                                    )
                                  }
                                />
                                <Button
                                  isIconOnly
                                  color="danger"
                                  onClick={() =>
                                    removePreviewField(colorObj.id, index)
                                  }
                                  className=""
                                >
                                  <Trash2Icon />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="Images"
                title={
                  <div className="flex items-center space-x-2">
                    <GalleryIcon />
                    <span>Images</span>
                  </div>
                }
              >
                <div>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <div>Images</div>
                      <div className="w-full flex justify-center">
                        <div
                          onClick={() =>
                            document?.getElementById("image-upload")?.click()
                          }
                          className=" h-[200px] w-[300px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/70 transition-colors hover:border-primary"
                        >
                          <div className="flex justify-center items-center gap-5  h-[200px] w-[300px]">
                            <svg
                              className="h-6 w-6 text-muted-foreground"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" x2="12" y1="3" y2="15" />
                            </svg>
                            <span className="text-sm font-medium text-muted-foreground">
                              Upload Image
                            </span>
                          </div>
                          <input
                            onChange={handleImageUpload}
                            id="image-upload"
                            type="file"
                            multiple
                            className="sr-only  h-[200px] w-[300px]"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4">
                        <div className="">
                          <HoverEffect
                            handleDeleteImage={handleDeleteImage}
                            items={images}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="Tags"
                title={
                  <div className="flex items-center space-x-2">
                    <TagIcon />
                    <span>Tags</span>
                  </div>
                }
              >
                <div className="">
                  <section className="z-10 w-full gap-5">
                    <div id="try" className="w-full py-8">
                      <div className="z-10 w-full gap-5">
                        <div className="preview text-start space-y-2 min-h-[350px] w-full p-10 mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border border-gray-400">
                          <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-start">
                                <FormLabel className="text-left">
                                  Tags
                                </FormLabel>
                                <FormControl className="">
                                  <TagInput
                                    {...field}
                                    placeholder="Enter a tags"
                                    tags={tags}
                                    size="lg"
                                    interaction={"clickable"}
                                    animation={"bounce"}
                                    variant={"primary"}
                                    className="tags sm:min-w-[150px] p-5 border-none"
                                    setTags={(newTags) => {
                                      setTags(newTags);
                                      setValue(
                                        "tags",
                                        newTags as [Tag, ...Tag[]]
                                      );
                                    }}
                                    activeTagIndex={activeTagIndex}
                                    setActiveTagIndex={setActiveTagIndex}
                                  />
                                </FormControl>
                                <FormDescription className="text-left">
                                  Enter tag for your product ( Key-Word )
                                  <p className="flex items-start mb-5 gap-2">
                                    Or Chose from bellow{" "}
                                    <ArrowUpNarrowWide className="rotate-180" />
                                  </p>
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex flex-wrap gap-2">
                            {getTags.map((tag) =>
                              tags.find((t) => t.text === tag.text) ? null : (
                                <Chip
                                  key={tag.id}
                                  endContent={<CheckIcon size={16} />}
                                  className="flex gap-2 cursor-pointer"
                                  onClick={() => {
                                    const findTag = tags.find(
                                      (t) => t.text === tag.text
                                    );
                                    if (!findTag) {
                                      setTags([
                                        ...tags,
                                        {
                                          id: uuidv4(),
                                          text: tag.text,
                                        },
                                      ]);
                                    }
                                  }}
                                >
                                  {tag.text}
                                </Chip>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </Tab>
              <Tab
                key="Add"
                title={
                  <div className="flex items-center space-x-2">
                    <PlusCircleIcon />
                    <span>Add</span>
                  </div>
                }
              >
                <Add />
              </Tab>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
