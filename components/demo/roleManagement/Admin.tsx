"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Badge,
  Input,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddEditRoleForm } from "./AddEditRoleForm";
import { AuditLogs } from "./AuditLogs";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Todo } from "./Todo/todo";

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all features",
    permissions: ["1"],
  },
  {
    id: "2",
    name: "Manager",
    description: "Access to most features",
    permissions: ["1", "2", "3"],
  },
  {
    id: "3",
    name: "Customer Support",
    description: "Limited access to user data",
    permissions: ["1", "2"],
  },
];

export default function Admin() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Role>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const handleSort = (column: keyof Role) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const deleteRole = (roleId: string) => {
    toast.success("Role deleted");
  };

  const sortedRoles = [...roles].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRoles = sortedRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = (newRole: Role) => {
    toast.success("Role added");
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-purple-800">
            Role Management
          </CardTitle>
          <CardDescription>
            Manage user roles and permissions for your e-commerce platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs>
            <Tab title="Roles" key="roles">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" size="icon">
                    <SearchIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      <PlusIcon className="h-4 w-4 mr-2" /> Add Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Role</DialogTitle>
                    </DialogHeader>
                    <div>
                      <div>
                        <Label htmlFor="name">Role Name</Label>
                        <Input
                          id="name"
                          value={roleName}
                          onChange={(e) => setRoleName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          size={"lg"}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="pt-10 flex justify-end gap-5">
                      <DialogClose>
                        <Button className="bg-danger-500 hover:bg-danger-700">
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        >
                          Create Role
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableColumn
                      onClick={() => handleSort("name")}
                      className="cursor-pointer"
                    >
                      Role Name{" "}
                      {sortColumn === "name" &&
                        (sortDirection === "asc" ? (
                          <ChevronUpIcon className="inline h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="inline h-4 w-4" />
                        ))}
                    </TableColumn>
                    <TableColumn
                      onClick={() => handleSort("description")}
                      className="cursor-pointer"
                    >
                      Description{" "}
                      {sortColumn === "description" &&
                        (sortDirection === "asc" ? (
                          <ChevronUpIcon className="inline h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="inline h-4 w-4" />
                        ))}
                    </TableColumn>
                    <TableColumn>Permissions</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                          <Badge variant="shadow">
                            {role.permissions.length} permissions
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger>
                                <Button variant="outline" size="sm">
                                  <EditIcon className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Edit {role.name} Role
                                  </DialogTitle>
                                  <DialogDescription>
                                    Change access permission for {role.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div>
                                  <AddEditRoleForm
                                    closeDialog={closeDialog}
                                    role={role}
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger>
                                <Button variant="outline" size="sm">
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Role</DialogTitle>
                                </DialogHeader>
                                <p>
                                  Are you sure you want to delete the role
                                  &quot;{role?.name}
                                  ?&quot; This action cannot be undone.
                                </p>
                                <div className="flex justify-end space-x-2 mt-4">
                                  <DialogClose>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <DialogClose
                                    onClick={() => deleteRole(role.id)}
                                  >
                                    <Button variant="destructive">
                                      Delete
                                    </Button>
                                  </DialogClose>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>
            <Tab title="Todo" key="todo">
              <Todo />
            </Tab>
            <Tab title="Audit Logs" key="audit">
              <AuditLogs />
            </Tab>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
