import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { ProductType } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CreateTypes } from "../action/addProductType";

export type PType = {
  id: string;
  type: string;
};

type ChildProps = {
  setTypes: React.Dispatch<React.SetStateAction<PType>>;
  value?: PType;
};

const ProductTypes: React.FC<ChildProps> = ({ setTypes, value }) => {
  const [type, setType] = useState("");
  const [productTypes, setProductTypes] = useState<ProductType[]>([
    {
      id: "671a251914a9c16cdcd29305",
      type: "Normal",
      createdAt: new Date("2024-10-24T10:44:41.262Z"),
      updatedAt: new Date("2024-10-24T10:44:41.262Z"),
    },
  ]);

  useEffect(() => {
    axios
      .get("/api/product/type")
      .then((res) => {
        setProductTypes(res.data.data);
      })
      .catch((error) => {
        console.log("Error is ", error);
      });
  }, []);

  const addTypes = async () => {
    try {
      toast.loading("Adding new Product Type ...");
      if (type !== "") {
        await CreateTypes(type).then((res) => {
          document.location.reload();
          toast.dismiss();
          toast.success("Product Type Added Successfully", {
            icon: "✅",
            position: "top-center",
            duration: 3000,
          });
        });
      } else {
        toast.dismiss();
        toast.error("Please enter Product Type", {
          icon: "❌",
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log("Error is ", error);
      toast.dismiss();
      toast.error("Please enter Product Type", {
        icon: "❌",
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    const key = e.target.value;
    const findType = productTypes.find((type) => type.id === key);
    if (!findType) return;
    setTypes({
      id: findType?.id,
      type: findType?.type,
    });
    console.log(findType);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Select
          onChange={handleChange}
          labelPlacement="inside"
          label="Add a Type"
          color="primary"
          className="max-w-lg lg:max-w-xl"
        >
          {productTypes.map((type) => (
            <SelectItem key={type.id} value={type.type}>
              {type.type}
            </SelectItem>
          ))}
        </Select>

        <Dialog>
          <DialogTrigger className="text-white w-[100px] px-3 py-2 rounded-md ml-2 md:ml-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500">
            Add new
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Type</DialogTitle>
              <DialogDescription>
                The Type will be added to the Database
              </DialogDescription>
              <Input
                onValueChange={(value: string) => setType(value)}
                className="pt-5"
              />
              <div className="w-2/4 ml-auto pt-7 flex gap-5 justify-end items-center">
                <DialogClose className="hover:bg-danger hover:text-white rounded-xl bg-[#d1d1d6] px-6 py-2.5">
                  Cancel
                </DialogClose>
                <DialogClose
                  onClick={addTypes}
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
  );
};

export default ProductTypes;
