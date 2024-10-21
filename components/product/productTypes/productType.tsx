import React from "react";
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
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { db } from "@/lib/db";
import { CreateTypes } from "./action/addProductType";

const ProductTypes = () => {
  //   const [types, setTypes] = useState("");

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

  return (
    <div>
      <div className="flex justify-between items-center">
        <Select
          labelPlacement="inside"
          label="Add a Tag"
          color="primary"
          className="max-w-xl"
          // placeholder="Select one"
        >
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
          <DialogTrigger className="rounded-xl bg-slate-300 px-6 py-[16px] hover:bg-slate-400">
            Add new
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tag</DialogTitle>
              <DialogDescription>
                The Tag will be added to the Database
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
