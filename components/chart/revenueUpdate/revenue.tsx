"use client";

import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { format, subMonths } from "date-fns";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

import { Card, CardHeader } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";

import { CardContent } from "@/components/ui/card";
import { DownloadCloud, Grip } from "lucide-react";
import { Component } from "./chart";
import { toPng } from "html-to-image";

const RevenueUpdates = () => {
  const [month, setMonth] = React.useState("1");

  const date = new Date();
  const currentMonth = format(subMonths(date, 0), "MMM yyyy");
  const PreviousMonth = format(subMonths(date, 1), "MMM yyyy");
  const LaterMonth = format(subMonths(date, 2), "MMM yyyy");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
    console.log(e.target.value);
  };

  const downloadPng = () => {
    const TargetDiv = document.getElementById("ChartPNG3");
    if (TargetDiv) {
      toPng(TargetDiv)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "chart.png";
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card id="ChartPNG3" className="px-6 w-[800px]">
      <CardHeader className="flex justify-between items-center">
        <div>
          <p className="font-medium text-lg flex justify-center items-center gap-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Revenue Updates
            <button onClick={downloadPng} className="">
              <DownloadCloud color="blue" />
            </button>
          </p>
          <p className="text-[#2A3547] text-sm">Overview of Profit</p>
        </div>

        <Select
          label="Select"
          color="primary"
          className="w-40"
          value={month}
          onChange={handleSelectionChange}
        >
          <SelectItem key={1}>{currentMonth}</SelectItem>
          <SelectItem key={2}>{PreviousMonth}</SelectItem>
          <SelectItem key={3}>{LaterMonth}</SelectItem>
        </Select>
      </CardHeader>
      <CardContent className="py-6 mt-5 h-full px-0">
        <div className="flex justify-between items-start ">
          <div>
            <Component />
          </div>
          <div className="relative pl-6 space-y-9 h-[410px]">
            <div className="w-full max-w-[245px] flex justify-center items-center gap-4  ">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-md">
                <Grip color="#2A3547" />
              </div>
              <div>
                <p className="text-2xl font-bold">$63,489.50</p>
                <p className="text-[#2A3547] font-medium text-base">
                  Total Earnings
                </p>
              </div>
            </div>
            <div className="w-full max-w-[245px]  mt-4">
              <div className="flex items-center gap-4 ml-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <p className="text-sm text-[#2a3547] font-normal">
                  Earnings this month
                </p>
              </div>
              <div className="ml-8">
                <p className="text-lg font-semibold">$48,820</p>
              </div>
            </div>
            <div className="w-full max-w-[245px]  mt-6">
              <div className="flex items-center gap-4 ml-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <p className="text-sm text-[#2a3547] font-normal">
                  Expense this month
                </p>
              </div>
              <div className="ml-8">
                <p className="text-lg font-semibold">$26,498</p>
              </div>
            </div>
            <div className="absolute bottom-10 w-[200px] right-0">
              <Button className="w-full " color="primary" variant="shadow">
                View Full Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueUpdates;
