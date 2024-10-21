"use client";

import React, { useState } from "react";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
  Mail,
  Phone,
  CreditCard,
  Lock,
  X,
  Moon,
  Sun,
  Check,
  Plus,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, Tab } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function EmployeeManagementDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewLeaveRequestModalOpen, setIsNewLeaveRequestModalOpen] =
    useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Software Developer",
      email: "alice@example.com",
      phone: "123-456-7890",
      tasks: 5,
      completed: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Project Manager",
      email: "bob@example.com",
      phone: "234-567-8901",
      tasks: 8,
      completed: 6,
      status: "In Meeting",
    },
    {
      id: 3,
      name: "Charlie Brown",
      role: "Designer",
      email: "charlie@example.com",
      phone: "345-678-9012",
      tasks: 3,
      completed: 3,
      status: "On Leave",
    },
    {
      id: 4,
      name: "Diana Ross",
      role: "HR Manager",
      email: "diana@example.com",
      phone: "456-789-0123",
      tasks: 6,
      completed: 4,
      status: "Active",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      employee: "Alice Johnson",
      action: "Completed task",
      details: "Implement new feature",
      time: "2 hours ago",
    },
    {
      id: 2,
      employee: "Bob Smith",
      action: "Started new project",
      details: "E-commerce website redesign",
      time: "4 hours ago",
    },
    {
      id: 3,
      employee: "Charlie Brown",
      action: "Submitted leave request",
      details: "Vacation from July 1-5",
      time: "Yesterday",
    },
    {
      id: 4,
      employee: "Diana Ross",
      action: "Approved leave request",
      details: "For Charlie Brown",
      time: "Yesterday",
    },
  ];

  const leaveRequests = [
    {
      id: 1,
      employee: "Alice Johnson",
      type: "Vacation",
      startDate: "2023-08-01",
      endDate: "2023-08-05",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Bob Smith",
      type: "Sick Leave",
      startDate: "2023-07-10",
      endDate: "2023-07-11",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Charlie Brown",
      type: "Personal Leave",
      startDate: "2023-07-15",
      endDate: "2023-07-15",
      status: "Rejected",
    },
  ];

  const payrollData = [
    {
      id: 1,
      employee: "Alice Johnson",
      department: "IT",
      salary: 75000,
      lastPaid: "2023-06-30",
      status: "Paid",
    },
    {
      id: 2,
      employee: "Bob Smith",
      department: "HR",
      salary: 65000,
      lastPaid: "2023-06-30",
      status: "Paid",
    },
    {
      id: 3,
      employee: "Charlie Brown",
      department: "Design",
      salary: 70000,
      lastPaid: "2023-06-30",
      status: "Pending",
    },
    {
      id: 4,
      employee: "Diana Ross",
      department: "HR",
      salary: 80000,
      lastPaid: "2023-06-30",
      status: "Paid",
    },
  ];

  const messages = [
    {
      id: 1,
      from: "Alice Johnson",
      content: "Hi, can you review my latest code commit?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      from: "Bob Smith",
      content: "Team meeting at 2 PM today",
      timestamp: "09:15 AM",
    },
    {
      id: 3,
      from: "Charlie Brown",
      content: "Need help with the new design software",
      timestamp: "Yesterday",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "New task assigned: Review project proposal",
      isRead: false,
    },
    {
      id: 2,
      message: "Meeting reminder: Team standup at 10 AM",
      isRead: false,
    },
    { id: 3, message: "Leave request approved for next week", isRead: true },
  ];

  const [currentNotifications, setCurrentNotifications] =
    useState(notifications);

  const NewEmployeeModal = () => (
    <Dialog
      open={isNewEmployeeModalOpen}
      onOpenChange={setIsNewEmployeeModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Enter the details of the new employee below.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="123-456-7890" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Software Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="manager">Project Manager</SelectItem>
                <SelectItem value="hr">HR Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" />
          </div>
          <Button type="submit" className="w-full">
            Add Employee
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  const NewTaskModal = () => (
    <Dialog open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Enter the details of the new task below.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input id="taskName" placeholder="Implement new feature" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taskDescription">Description</Label>
            <Textarea
              id="taskDescription"
              placeholder="Detailed description of the task"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignee">Assign To</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  const NewLeaveRequestModal = () => (
    <Dialog
      open={isNewLeaveRequestModalOpen}
      onOpenChange={setIsNewLeaveRequestModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Leave Request</DialogTitle>
          <DialogDescription>
            Enter the details of your leave request below.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leaveType">Leave Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="personal">Personal Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Briefly describe the reason for your leave"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real application, you would apply the dark mode to the entire app here
  };

  const markAllAsRead = () => {
    setCurrentNotifications(
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const ProfilePopover = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">John Doe</h4>
            <p className="text-sm text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" onClick={() => setActiveTab("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const NotificationPopover = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {currentNotifications.some(
            (notification) => !notification.isRead
          ) && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Notifications</h4>
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          </div>
          <div className="grid gap-2">
            {currentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-2">
                {notification.isRead ? (
                  <Check className="mt-1 h-4 w-4 text-muted-foreground" />
                ) : (
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                )}
                <p className="text-sm">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className={`flex h-screen bg-gray-100 ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white  p-6 shadow-md dark:bg-gray-800">
        <div className="flex items-center mb-8">
          <User className="h-8 w-8 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold dark:text-white">EmpDash</h2>
        </div>
        <nav>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("overview")}
          >
            <Home className="mr-2 h-4 w-4" /> Overview
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("employees")}
          >
            <Users className="mr-2 h-4 w-4" /> Employees
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("tasks")}
          >
            <FileText className="mr-2 h-4 w-4" /> Tasks
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("leave")}
          >
            <Calendar className="mr-2 h-4 w-4" /> Leave Management
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("payroll")}
          >
            <DollarSign className="mr-2 h-4 w-4" /> Payroll
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Messages
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto dark:bg-gray-900 dark:text-white">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Employee Management Dashboard</h1>
          <div className="flex items-center space-x-2">
            <NotificationPopover />
            <ProfilePopover />
          </div>
        </header>

        <Tabs>
          <Tab key="overview" title="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Employees
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{employees.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {employees.filter((e) => e.status === "Active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (employees.filter((e) => e.status === "Active").length /
                        employees.length) *
                        100
                    )}
                    % of total employees
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tasks Completed
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {employees.reduce((sum, e) => sum + e.completed, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Out of {employees.reduce((sum, e) => sum + e.tasks, 0)}{" "}
                    total tasks
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    On Leave
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {employees.filter((e) => e.status === "On Leave").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (employees.filter((e) => e.status === "On Leave").length /
                        employees.length) *
                        100
                    )}
                    % of total employees
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions and updates from employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableColumn>Employee</TableColumn>
                    <TableColumn>Action</TableColumn>
                    <TableColumn>Details</TableColumn>
                    <TableColumn>Time</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.employee}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.details}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tab>

          <Tab key="employees" title="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>
                  Manage and view all employee information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search employees..."
                      className="w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="secondary">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                  <Button onClick={() => setIsNewEmployeeModalOpen(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Add New Employee
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Role</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Phone</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Tasks</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {employees
                      .filter(
                        (employee) =>
                          employee.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          employee.role
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          employee.email
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarFallback>
                                  {employee.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span>{employee.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.phone}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                employee.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : employee.status === "In Meeting"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {employee.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress
                                value={
                                  (employee.completed / employee.tasks) * 100
                                }
                                className="w-[60px]"
                              />
                              <span className="text-sm text-muted-foreground">
                                {employee.completed}/{employee.tasks}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tab>

          <Tab key="tasks" title="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>
                  Assign and track employee tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search tasks..."
                      className="w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setIsNewTaskModalOpen(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Create New Task
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>Task Name</TableColumn>
                    <TableColumn>Assigned To</TableColumn>
                    <TableColumn>Due Date</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Progress</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Implement new feature</TableCell>
                      <TableCell>Alice Johnson</TableCell>
                      <TableCell>2023-07-15</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      </TableCell>
                      <TableCell>
                        <Progress value={60} className="w-[60px]" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Review project proposal</TableCell>
                      <TableCell>Bob Smith</TableCell>
                      <TableCell>2023-07-10</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Completed
                        </span>
                      </TableCell>
                      <TableCell>
                        <Progress value={100} className="w-[60px]" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Design new logo</TableCell>
                      <TableCell>Charlie Brown</TableCell>
                      <TableCell>2023-07-20</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          Pending
                        </span>
                      </TableCell>
                      <TableCell>
                        <Progress value={0} className="w-[60px]" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tab>

          <Tab key="leave" title="leave">
            <Card>
              <CardHeader>
                <CardTitle>Leave Management</CardTitle>
                <CardDescription>
                  Track and manage employee leave requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search leave requests..."
                      className="w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Requests</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setIsNewLeaveRequestModalOpen(true)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    New Leave Request
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>Employee</TableColumn>
                    <TableColumn>Leave Type</TableColumn>
                    <TableColumn>Start Date</TableColumn>
                    <TableColumn>End Date</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter(
                        (request) =>
                          request.employee
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          request.type
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.employee}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>{request.startDate}</TableCell>
                          <TableCell>{request.endDate}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                request.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : request.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {request.status === "Pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mr-2"
                                >
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm">
                                  Reject
                                </Button>
                              </>
                            )}
                            {request.status !== "Pending" && (
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tab>

          <Tab title="payroll" key="payroll">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Management</CardTitle>
                <CardDescription>
                  Manage employee salaries and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search employees..."
                      className="w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Run Payroll
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>Employee</TableColumn>
                    <TableColumn>Department</TableColumn>
                    <TableColumn>Salary</TableColumn>
                    <TableColumn>Last Paid</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {payrollData
                      .filter(
                        (employee) =>
                          employee.employee
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          employee.department
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.employee}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>
                            ${employee.salary.toLocaleString()}
                          </TableCell>
                          <TableCell>{employee.lastPaid}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                employee.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {employee.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {employee.status === "Pending" ? (
                              <Button variant="outline" size="sm">
                                Process Payment
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tab>

          <Tab title="messages" key="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Internal communication system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[600px]">
                  <div className="w-1/3 border-r pr-4">
                    <Input
                      placeholder="Search messages..."
                      className="mb-4"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="space-y-4">
                      {employees
                        .filter((employee) =>
                          employee.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                          >
                            <Avatar>
                              <AvatarFallback>
                                {employee.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-gray-500">
                                Last message preview...
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-2/3 pl-4 flex flex-col">
                    <div className="flex-1 overflow-auto mb-4">
                      {messages.map((message) => (
                        <div key={message.id} className="mb-4">
                          <div className="font-medium">{message.from}</div>
                          <div className="text-sm">{message.content}</div>
                          <div className="text-xs text-gray-500">
                            {message.timestamp}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Type your message..."
                        className="flex-1"
                      />
                      <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Tab>

          <Tab title="settings" key="settings">
            <Card>
              <div className="max-w-3xl mx-auto space-y-6">
                <CardHeader className="space-y-4">
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your account and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">
                        Profile Information
                      </h3>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-center space-x-4">
                          <Label htmlFor="name" className="w-[100px]">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value="John Doe"
                            className="flex-1"
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <Label htmlFor="email" className="w-[100px]">
                            Email
                          </Label>
                          <Input
                            id="email"
                            value="john.doe@example.com"
                            className="flex-1"
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <Label htmlFor="phone" className="w-[100px]">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value="123-456-7890"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        Notification Settings
                      </h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications">
                            Email Notifications
                          </Label>
                          <Switch id="email-notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notifications">
                            Push Notifications
                          </Label>
                          <Switch id="push-notifications" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Security</h3>
                      <div className="mt-2 space-y-4 space-x-4">
                        <Button variant="outline">
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        <Button variant="outline">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Manage Billing
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Tab>
        </Tabs>
      </main>

      <NewEmployeeModal />
      <NewTaskModal />
      <NewLeaveRequestModal />
    </div>
  );
}
