import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectItem } from "@nextui-org/select";
import { Button, Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { db } from "@/lib/db";
import { CreateTypes } from "./action/addProductType";

type ChildProps = {
  setTypes: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
};

const ProductTypes: React.FC<ChildProps> = ({ setTypes, value }) => {
  const [type, setType] = useState(value);

  let types = "";
  const addTypes = async () => {
    try {
      toast.loading("Adding new Product Type ...");
      if (types !== "") {
        await CreateTypes(types).then((res) => {
          console.log(res);
          toast.dismiss();
          types = "";
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
    setTypes(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Select
          value={type}
          onChange={handleChange}
          labelPlacement="inside"
          label="Add a Type"
          color="primary"
          className="max-w-lg lg:max-w-xl"
        >
          <SelectItem color="secondary" key="Normal">
            Normal
          </SelectItem>
          <SelectItem color="secondary" key="New in">
            New in
          </SelectItem>
          <SelectItem color="secondary" key="50% Discount">
            50% Discount
          </SelectItem>
          <SelectItem color="secondary" key="on Sale">
            On Sale
          </SelectItem>
          <SelectItem color="secondary" key="limited edition">
            limited edition
          </SelectItem>
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
                onValueChange={(value: string) => (types = value)}
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
