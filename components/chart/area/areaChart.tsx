"use client";

import { DownloadCloud, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import { Button } from "@nextui-org/react";
const chartData = [
  { time: "1AM", desktop: 186 },
  { time: "2AM", desktop: 305 },
  { time: "3AM", desktop: 305 },
  { time: "4AM", desktop: 237 },
  { time: "5AM", desktop: 237 },
  { time: "6AM", desktop: 73 },
  { time: "7AM", desktop: 73 },
  { time: "8AM", desktop: 209 },
  { time: "9AM", desktop: 209 },
  { time: "10AM", desktop: 214 },
  { time: "11AM", desktop: 214 },
  { time: "12AM", desktop: 186 },
  { time: "1PM", desktop: 186 },
  { time: "2PM", desktop: 999 },
  { time: "3PM", desktop: 305 },
  { time: "4PM", desktop: 237 },
  { time: "5PM", desktop: 237 },
  { time: "6PM", desktop: 73 },
  { time: "7PM", desktop: 73 },
  { time: "8PM", desktop: 209 },
  { time: "9PM", desktop: 209 },
  { time: "10PM", desktop: 214 },
  { time: "11PM", desktop: 214 },
  { time: "12PM", desktop: 186 },
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
} satisfies ChartConfig;

const downloadPng = () => {
  const TargetDiv = document.getElementById("ChartPNG2");
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

export function AreaChartOne({ className }: { className?: string }) {
  return (
    <div className={`${className} w-full xl:max-w-[380px]`}>
      <Card
        id="ChartPNG2"
        className="relative h-[450px] xl:w-[370px] xl:h-[450px] xl:max-h-[450px] xl:max-w-[380px]"
      >
        <button className="absolute top-5 right-5" onClick={downloadPng}>
          <DownloadCloud color="blue" />
        </button>
        <div>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Last 24 Hour&lsquo;s
            </CardTitle>
            <CardDescription>Total Sell</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <ChartContainer
              className="h-[250px] xl:h-auto w-full"
              config={chartConfig}
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={true}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 4)}
                />
                <YAxis
                  className=""
                  dataKey="desktop"
                  tickMargin={10}
                  tickLine={true}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </div>
        <CardFooter className=" flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this time <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 times
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
