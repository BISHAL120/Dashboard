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
import { Card, CardBody, Checkbox, Input, Tab, Tabs } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Tag, TagInput } from "emblor";
import { v4 as uuidv4 } from "uuid";
import {
  BookType,
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
import Editor from "../editor/editor";
import ProductTypes from "./productTypes/productType";
import { Product } from "@prisma/client";
import toast from "react-hot-toast";
import { set } from "date-fns";

const FormSchema = z.object({
  name: z.string(),
  price: z.string(),
  discountPrice: z.string().optional(),
  category: z.string(),
  brand: z.string(),
  material: z.string(),
  weight: z.string(),
  dimensions: z.string(),
  varients: z.array(
    z.object({
      size: z.string(),
      color: z.array(
        z.object({
          color: z.string(),
          stock: z.number(),
        })
      ),
    })
  ),
  description: z.string(),
  images: z.array(
    z.object({
      imageUrl: z.string().url(),
      filename: z.string(),
    })
  ),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  published: z.boolean(),
  isFeatured: z.boolean(),
  type: z.string(),

  ratingsCount: z.number(),
  ratingsAverage: z.number(),
});

interface ProductFormProps {
  initialData: Product | null;
  id: string;
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

const EditProduct: React.FC<ProductFormProps> = ({ initialData, id }) => {
  const [image, setImage] = useState<File[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [types, setTypes] = useState<string>(initialData?.type || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
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
      price: "",
      discountPrice: "",
      category: "",
      brand: "",
      varients: [],
      description: "",
      material: "",
      weight: "",
      dimensions: "",
      images: [],
      tags: [],
      published: false,
      isFeatured: false,
      type: "",
      ratingsCount: 0,
      ratingsAverage: 0,
    },
  });

  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({
      ...data,
      varients: variants,
      images: image,
      type: types,
      description: description,
    });
    // form.reset();
  }

  // Handle input changes for a variant
  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: "color" | "stock"
  ) => {
    const { value } = e.target;
    const newColors = [...variant.color];
    if (type === "color") {
      newColors[index].color = value;
    } else if (type === "stock") {
      newColors[index].stock = Number(value);
    }
    setVariant({ ...variant, color: newColors });
  };

  const handleVariantEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    colorObj: Color,
    index: number,
    vindex: number,
    type: "color" | "stock"
  ) => {
    const { value } = e.target;

    const updatedVariants = [...variants];
    const updatedVariant = updatedVariants[vindex];
    const updatedColor = updatedVariant.color[index];

    if (type === "color") {
      updatedColor.color = value; // Update color
    } else if (type === "stock") {
      updatedColor.stock = Number(value); // Update stock and convert it to a number
    }

    //   // Set the updated variants array to the state
    setVariants(updatedVariants);
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
      const newFilesArray = Array.from(files); // Convert FileList to an array
      setImage((prev) => [...prev, ...newFilesArray]); // Concatenate new files with previous ones
    }
  };

  const handleDeleteImage = (image: File) => {
    setImage((prev) => prev.filter((i) => i !== image));
  };

  return (
    <div className="max-w-[1450px] mx-auto h-full">
      <div className="flex justify-center w-full flex-col">
        <div className="flex justify-end gap-2 py-2">
          <Button className="bg-red-800 text-white">Delete</Button>
          <Button color="warning">Draft</Button>
          <Button color="primary" type="submit" form="productForm">
            Save Product
          </Button>
        </div>
        <Form {...form}>
          <form id="productForm" onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              className=""
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
                                className=""
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
                    <div className="grid gap-3">
                      <div className="grid-cols-1 grid md:grid-cols-2 gap-4">
                        <div className="grid gap-3">
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
                                    className=""
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
                            name="discountPrice"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-start">
                                <FormControl className="">
                                  <Input
                                    {...field}
                                    type="text"
                                    label="Discount Price"
                                    color="primary"
                                    className=""
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
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <div>Product Categories and Brands</div>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
                                  className=""
                                  size="lg"
                                >
                                  <SelectItem
                                    key="Electronics"
                                    value="Electronics"
                                  >
                                    Electronics
                                  </SelectItem>
                                  <SelectItem key="Clothing" value="Clothing">
                                    Clothing
                                  </SelectItem>
                                  <SelectItem key="Home" value="Home">
                                    Home
                                  </SelectItem>
                                  <SelectItem key="Toys" value="Toys">
                                    Toys
                                  </SelectItem>
                                  <SelectItem key="Outdoor" value="Outdoor">
                                    Outdoor
                                  </SelectItem>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                              <Select
                                onChange={field.onChange}
                                value={field.value}
                                labelPlacement="inside"
                                label="Select Brand"
                                color="primary"
                                className=""
                                size="lg"
                              >
                                <SelectItem key="Xiaomi" value="Xiaomi">
                                  Xiaomi
                                </SelectItem>
                                <SelectItem key="Lg" value="Lg">
                                  Lg
                                </SelectItem>
                                <SelectItem key="Samsung" value="Samsung">
                                  Samsung
                                </SelectItem>
                                <SelectItem key="Dell" value="Dell">
                                  Dell
                                </SelectItem>
                                <SelectItem key="Vivo" value="Vivo">
                                  Vivo
                                </SelectItem>
                              </Select>{" "}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <div>Additional Information</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  className=""
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                    className=""
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
                                    className=""
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
                        <FormItem className="flex flex-col items-start">
                          <FormControl className="">
                            <Card>
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
                        <FormItem className="flex flex-col items-start">
                          <FormControl className="">
                            <Card>
                              <CardBody className="p-5">
                                <Checkbox
                                  isSelected={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <p className="text-base font-semibold">
                                    Want to featured this product ?
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
                <Editor
                  setDescription={setDescription}
                  description={description}
                  className="min-h-[300px]"
                />
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
                <div className="grid gap-3 grid-cols-2 pb-10">
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
                          <Input
                            type="text"
                            label="Color"
                            color="primary"
                            className="w-2/3"
                            value={colorObj.color}
                            onChange={(e) =>
                              handleVariantChange(e, index, "color")
                            }
                          />
                          <Input
                            type="number"
                            label="Stock"
                            color="primary"
                            value={colorObj.stock.toString()}
                            className="w-1/4"
                            onChange={(e) =>
                              handleVariantChange(e, index, "stock")
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
                            items={image}
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
                <div className="aaaaaaaaaaaaaa">
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
                                  Topics
                                </FormLabel>
                                <FormControl className="">
                                  <TagInput
                                    {...field}
                                    placeholder="Enter a topic"
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
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </Tab>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
