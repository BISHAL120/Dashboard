import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input, Tooltip } from "@nextui-org/react";
import { Brand, Category } from "@prisma/client";
import axios from "axios";
import { EditIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddLoading from "./loading/loading";

const Add = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");
  const [categoryContent, setCategoryContent] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brand, setBrand] = useState<string>("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/product/category?brands=true")
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error is ", error);
      });
    axios
      .get("/api/product/brand?category=true")
      .then((res) => {
        setBrands(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error is ", error);
        setLoading(false);
      });
  }, [refresh]);
  if (loading) {
    return <AddLoading />;
  }
  const addCategory = () => {
    toast.loading("Adding new Category...");
    axios
      .post("/api/product/category", {
        name: category,
      })
      .then((res) => {
        toast.dismiss();
        setRefresh(!refresh);
        console.log(res.data.data);
        toast.success("Category Added Successfully", {
          position: "top-center",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.log("Error is ", error);
        toast.dismiss();
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });
      });
  };
  const addBrand = () => {
    toast.loading("Adding new Brand...");
    if (category === "") {
      toast.dismiss();
      return toast.error("Please select a category", {
        position: "top-center",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    axios
      .post("/api/product/brand", {
        name: brand,
        categoryId: category,
      })
      .then((res) => {
        toast.dismiss();
        setRefresh(!refresh);
        toast.success("Brand Added Successfully", {
          position: "top-center",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.log("Error is ", error);
        toast.dismiss();
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const deleteCategory = (id: string) => {
    toast.loading("Deleting...");
    axios
      .delete("/api/product/category", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        toast.dismiss();
        setRefresh(!refresh);
        toast.success("Category Deleted Successfully", {
          position: "top-center",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.log("Error is ", error);
        toast.dismiss();
        toast.error(`${error.response.data.message}`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });
      });
  };

  const EditCategory = (id: string) => {
    if (categoryContent === "") {
      return toast.error("Please change category content", {
        position: "top-center",
        duration: 3000,
      });
    }
    toast.loading("Updating...");
    axios
      .patch("/api/product/category", {
        id: id,
        name: categoryContent,
      })
      .then((res) => {
        toast.dismiss();
        setRefresh(!refresh);
        toast.success("Category Updated Successfully", {
          position: "top-center",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.log("Error is ", error);
        toast.dismiss();
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });
      });
  };

  const deleteBrand = (id: string) => {
    toast.loading("Deleting...");
    axios
      .delete("/api/product/brand", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        toast.success("Brand Deleted Successfully");
        toast.dismiss();
        setRefresh(!refresh);
        toast.success("Brand Deleted Successfully", {
          position: "top-center",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.log("Error is ", error);
        toast.dismiss();
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="md:w-1/2 pr-10">
        <div className=" flex items-center justify-between">
          <p className="font-semibold text-2xl text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            All Category
          </p>
          <div>
            <Dialog>
              <DialogTrigger className="text-white w-[100px] px-3 py-2 rounded-md ml-2 md:ml-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500">
                Add new
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    The Category will be added to the Database
                  </DialogDescription>
                </DialogHeader>
                <Label className="pt-5">Category Name:</Label>
                <Input
                  onValueChange={(value: string) => setCategory(value)}
                  className="pt-2"
                />
                <div className="w-2/4 ml-auto pt-4 flex gap-5 justify-end items-center">
                  <DialogClose className="hover:bg-danger hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5">
                    Cancel
                  </DialogClose>
                  <DialogClose
                    onClick={addCategory}
                    className="hover:bg-primary-600 hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5"
                  >
                    Add
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="space-y-5 mt-5">
          {categories.map((category) => (
            <div
              className="flex justify-between items-center text-base font-semibold bg-gray-300 p-4 rounded-md "
              key={category.id}
            >
              <p>{category.name}</p>
              <div>
                <Dialog>
                  <DialogTrigger className="">
                    <Tooltip content="Edit Category">
                      <EditIcon className="cursor-pointer mr-3" />
                    </Tooltip>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>Edit the Category.</DialogDescription>
                    </DialogHeader>
                    <Label className="pt-5">Category Name:</Label>
                    <Input
                      defaultValue={category.name}
                      onValueChange={(value: string) =>
                        setCategoryContent(value)
                      }
                      className="pt-2"
                    />
                    <div className="w-2/4 ml-auto pt-4 flex gap-5 justify-end items-center">
                      <DialogClose className="hover:bg-danger hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5">
                        Cancel
                      </DialogClose>
                      <DialogClose
                        onClick={() => EditCategory(category.id)}
                        className="hover:bg-danger-600 bg-danger-500 hover:text-white rounded-xl  px-6 py-2.5"
                      >
                        Update
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger className="">
                    <Tooltip content="delete Category">
                      <XCircleIcon className="cursor-pointer" />
                    </Tooltip>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This will delete the Category.
                      </DialogDescription>

                      <div className="w-2/4 ml-auto pt-4 flex gap-5 justify-end items-center">
                        <DialogClose className="hover:bg-danger hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5">
                          Cancel
                        </DialogClose>
                        <DialogClose
                          onClick={() => deleteCategory(category.id)}
                          className="hover:bg-danger-600 bg-danger-500 hover:text-white rounded-xl  px-6 py-2.5"
                        >
                          Delete
                        </DialogClose>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 pr-10">
        <div className=" flex items-center justify-between">
          <p className="font-semibold text-2xl text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            All Brand
          </p>
          <div>
            <Dialog>
              <DialogTrigger className="text-white w-[100px] px-3 py-2 rounded-md ml-2 md:ml-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500">
                Add new
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Brand</DialogTitle>
                  <DialogDescription>
                    The Brand will be added to the Database
                  </DialogDescription>
                  <Label className="pt-5">Brand Name:</Label>
                  <Input
                    onValueChange={(value: string) => setBrand(value)}
                    className="pt-2"
                  />
                  <Label className="pt-5 pb-2">Brand Category:</Label>
                  <Select onValueChange={(value: string) => setCategory(value)}>
                    <SelectTrigger className="h-12 ">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="p-2 space-y-1">
                      {categories.map((c) => (
                        <SelectItem
                          className="font-medium px-5 py-2 cursor-pointer text-base"
                          key={c.id}
                          value={c.id}
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="w-2/4 ml-auto pt-4 flex gap-5 justify-end items-center">
                    <DialogClose className="hover:bg-danger hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5">
                      Cancel
                    </DialogClose>
                    <DialogClose
                      onClick={addBrand}
                      className="hover:bg-primary-600 hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5"
                    >
                      Add
                    </DialogClose>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="space-y-5 mt-5">
          {brands.map((brand) => (
            <div
              className="flex justify-between items-center text-base font-semibold bg-gray-300 p-4 rounded-md "
              key={brand.id}
            >
              <p className="flex gap-5">
                {brand.name}

                {/* @ts-ignore */}
                {brand?.Category?.name && (
                  <span>
                    {"("}
                    {/* @ts-ignore */}
                    {brand?.Category?.name} {")"}
                  </span>
                )}
              </p>

              <Dialog>
                <DialogTrigger className="">
                  <Tooltip content="delete Category">
                    <XCircleIcon className="cursor-pointer" />
                  </Tooltip>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This will delete the Brand.
                    </DialogDescription>

                    <div className="w-2/4 ml-auto pt-4 flex gap-5 justify-end items-center">
                      <DialogClose className="hover:bg-danger hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5">
                        Cancel
                      </DialogClose>
                      <DialogClose
                        onClick={() => deleteBrand(brand.id)}
                        className="hover:bg-danger-600 bg-danger-500 hover:text-white rounded-xl  px-6 py-2.5"
                      >
                        Delete
                      </DialogClose>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Add;
