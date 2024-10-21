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
import { Input, Tab, Tabs } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Tag, TagInput } from "emblor";
import { BookType } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Description from "../../../public/svg/Description";
import GalleryIcon from "../../../public/svg/GalleryIcon";
import { HoverEffect } from "../aceternity/ui/card-hover-effect";
import Editor from "../editor/editor";
import ProductTypes from "./productTypes/productType";
import { Product } from "@prisma/client";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

interface ProductFormProps {
  initialData: Product | null;
  id: string;
}

const EditProduct: React.FC<ProductFormProps> = ({ initialData, id }) => {
  const [image, setImage] = useState<File[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [tags, setTags] = React.useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
  );

  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

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
          <Button color="primary">Save Product</Button>
        </div>
        <Tabs
          className=""
          aria-label="Options"
          color="primary"
          variant="bordered"
        >
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <Description />
                <span>Details</span>
              </div>
            }
          >
            <div className="grid gap-8">
              <div className="grid gap-6">
                {
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Input
                      type="text"
                      label="Name"
                      color="primary"
                      className=""
                    />
                    <ProductTypes />
                  </div>
                }
              </div>

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="text-2xl font-medium">Pricing & Costs</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <Input
                        defaultValue="0"
                        type="number"
                        label="Product Cost"
                        size="lg"
                        labelPlacement="inside"
                        color="primary"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Input
                        defaultValue="0"
                        type="number"
                        label="Selling Price"
                        size="lg"
                        labelPlacement="inside"
                        color="primary"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Input
                        defaultValue="0"
                        type="number"
                        label="Discount Price"
                        size="lg"
                        labelPlacement="inside"
                        color="primary"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Input
                        readOnly
                        type="number"
                        label="Profit per Product"
                        defaultValue={String(0)}
                        size="lg"
                        labelPlacement="inside"
                        color="primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="text-2xl font-medium">
                    Categories & Sub-Categories
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <Select
                      labelPlacement="inside"
                      label="Select a Category"
                      color="primary"
                      className=""
                      size="lg"
                    >
                      <SelectItem key="Electronics" value="Electronics">
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
                    <Select
                      labelPlacement="inside"
                      label="Select Sub-Category"
                      color="primary"
                      className=""
                      size="lg"
                    >
                      <SelectItem key="Electronics" value="Electronics">
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
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div>Additional Information</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div>Brand</div>
                      <Input id="brand" type="text" />
                    </div>
                    <div className="grid gap-3">
                      <div>Model</div>
                      <Input id="model" type="text" />
                    </div>
                    <div className="grid gap-3">
                      <div>Dimensions</div>
                      <Input id="dimensions" type="text" />
                    </div>
                    <div className="grid gap-3">
                      <div>Weight</div>
                      <Input id="weight" type="text" />
                    </div>
                  </div>
                  <section className="z-10 w-full flex flex-col items-center text-center gap-5">
                    <div id="try" className="w-full py-8">
                      <div className="w-full relative my-4 flex flex-col space-y-2">
                        <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border">
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-8 flex flex-col items-start"
                            >
                              <FormField
                                control={form.control}
                                name="topics"
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
                                            "topics",
                                            newTags as [Tag, ...Tag[]]
                                          );
                                        }}
                                        activeTagIndex={activeTagIndex}
                                        setActiveTagIndex={setActiveTagIndex}
                                      />
                                    </FormControl>
                                    <FormDescription className="text-left">
                                      These are the topics that you&apos;re
                                      interested in.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button type="submit">Submit</Button>
                            </form>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <BookType />
                <span>Description</span>
              </div>
            }
          >
            <Editor
              className="h-[300px]"
              tittle="Description"
              id={"aa"}
              initialData={"<P>Bishal</P>"}
            />
          </Tab>
          <Tab
            key="videos"
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
        </Tabs>
      </div>
    </div>
  );
};

export default EditProduct;
