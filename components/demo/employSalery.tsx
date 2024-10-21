"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

// Sample data
const initialData = [
  { id: 1, name: "Jan", department: "Engineering", salary: 85000 },
  { id: 2, name: "Feb", department: "Marketing", salary: 75000 },
  { id: 3, name: "Mar", department: "Sales", salary: 90000 },
  { id: 4, name: "Apr", department: "HR", salary: 65000 },
  { id: 5, name: "May", department: "Engineering", salary: 95000 },
  { id: 6, name: "Jun", department: "Marketing", salary: 70000 },
  { id: 7, name: "July", department: "Sales", salary: 85000 },
  { id: 8, name: "Aug", department: "HR", salary: 60000 },
  { id: 9, name: "Sep", department: "Marketing", salary: 60000 },
  { id: 10, name: "Oct", department: "Sales", salary: 60000 },
  { id: 11, name: "Nov", department: "Engineering", salary: 60000 },
  { id: 12, name: "Dec", department: "HR", salary: 60000 },
];

export default function EmployeeSalaryChart() {
  const [data, setData] = useState(initialData);
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const filteredData = data.filter((employee) => {
    const departmentMatch =
      departmentFilter === "All" || employee.department === departmentFilter;
    const salaryMatch =
      (!minSalary || employee.salary >= parseInt(minSalary)) &&
      (!maxSalary || employee.salary <= parseInt(maxSalary));
    return departmentMatch && salaryMatch;
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Employee Salary Chart
      </h1>

      <div className="grid gap-4 md:grid-cols-3"></div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(4px)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "#6b7280" }}
              itemStyle={{ color: "#4b5563" }}
            />
            <Bar
              dataKey="salary"
              fill="url(#colorGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="">
        <Table aria-label="Employee Salary Table" color="primary" className="">
          <TableHeader className="">
            <TableColumn>Name</TableColumn>
            <TableColumn>Department</TableColumn>
            <TableColumn>Salary</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.map((employee, index) => (
              <TableRow
                key={employee.id}
                className={`${
                  filteredData.length === index + 1 ? "" : "border-b"
                }`}
              >
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>${employee.salary.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
