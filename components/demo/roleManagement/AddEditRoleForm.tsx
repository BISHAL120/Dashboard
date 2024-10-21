import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox, CheckboxGroup, Input, Textarea } from "@nextui-org/react";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

type AddEditRoleFormProps = {
  role?: Role | null;
  closeDialog: () => void;
};

const allPermissions = [
  { id: "1", label: "View Analytics" },
  { id: "2", label: "View Products" },
  { id: "3", label: "Edit Products" },
  { id: "4", label: "Delete Products" },
  { id: "5", label: "View Users" },
  { id: "6", label: "Edit Users" },
  { id: "7", label: "Delete Users" },
  { id: "9", label: "View Orders" },
  { id: "10", label: "Process Orders" },
  { id: "11", label: "View Blog" },
  { id: "12", label: "Edit Blog" },
  { id: "13", label: "Delete Blog" },
];

export function AddEditRoleForm({ role, closeDialog }: AddEditRoleFormProps) {
  const [selected, setSelected] = useState(role?.permissions);
  const router = useRouter();

  const handleRoleChange = () => {
    closeDialog();
    toast.loading("Updating Role...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Role Updated", {
        position: "top-center",
        duration: 3000,
        icon: "👏",
      });
      console.log("Role :", { ...role, permissions: selected });
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Permissions</Label>
        <ScrollArea className="h-[200px] border rounded-md p-4">
          <CheckboxGroup
            orientation="vertical"
            value={selected}
            onValueChange={setSelected}
          >
            {allPermissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center space-x-2 mb-2"
              >
                <Checkbox className="-m-1" value={permission.id}>
                  {permission.label}
                </Checkbox>
              </div>
            ))}
          </CheckboxGroup>
        </ScrollArea>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          onClick={() => handleRoleChange()}
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          Update Role
        </Button>
      </div>
    </div>
  );
}
