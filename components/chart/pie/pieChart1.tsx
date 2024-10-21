"use client";

import * as React from "react";
import { TrendingDown, TrendingUp, RefreshCcw } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import pieCss from "./pie.module.css";

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
const chartData = [
  { categories: "Shoes", sell: 333, fill: "var(--color-chrome)" },
  { categories: "Polo", sell: 133, fill: "var(--color-firefox)" },
  { categories: "T-Shirts", sell: 223, fill: "var(--color-safari)" },
  /*   { categories: "edge", sell: 333, fill: "var(--color-edge)" },
  { categories: "other", sell: 333, fill: "var(--color-other)" },
  { categories: "other1", sell: 333, fill: "var(--color-other2)" },
  { categories: "other2", sell: 333, fill: "var(--color-other3)" },
  { categories: "other3", sell: 333, fill: "var(--color-other4)" }, */
];

const chartSellsData = [
  { date: "2024-07-01", sell: 222, mobile: 150 },
  { date: "2024-07-02", sell: 97, mobile: 180 },
  { date: "2024-07-03", sell: 167, mobile: 120 },
  { date: "2024-07-04", sell: 242, mobile: 260 },
  { date: "2024-07-05", sell: 373, mobile: 290 },
  { date: "2024-07-06", sell: 301, mobile: 340 },
  { date: "2024-07-07", sell: 245, mobile: 180 },
  { date: "2024-07-08", sell: 409, mobile: 320 },
  { date: "2024-07-09", sell: 59, mobile: 110 },
  { date: "2024-07-10", sell: 261, mobile: 190 },
  { date: "2024-07-11", sell: 327, mobile: 350 },
  { date: "2024-07-12", sell: 292, mobile: 210 },
  { date: "2024-07-13", sell: 342, mobile: 380 },
  { date: "2024-07-14", sell: 137, mobile: 220 },
  { date: "2024-07-15", sell: 120, mobile: 170 },
  { date: "2024-07-16", sell: 138, mobile: 190 },
  { date: "2024-07-17", sell: 446, mobile: 360 },
  { date: "2024-07-18", sell: 364, mobile: 410 },
  { date: "2024-07-19", sell: 243, mobile: 180 },
  { date: "2024-07-20", sell: 89, mobile: 150 },
  { date: "2024-07-21", sell: 137, mobile: 200 },
  { date: "2024-07-22", sell: 224, mobile: 170 },
  { date: "2024-07-23", sell: 138, mobile: 230 },
  { date: "2024-07-24", sell: 387, mobile: 290 },
  { date: "2024-07-25", sell: 215, mobile: 250 },
  { date: "2024-07-26", sell: 75, mobile: 130 },
  { date: "2024-07-27", sell: 383, mobile: 420 },
  { date: "2024-07-28", sell: 122, mobile: 180 },
  { date: "2024-07-29", sell: 315, mobile: 240 },
  { date: "2024-07-30", sell: 454, mobile: 380 },
  { date: "2024-08-01", sell: 200, mobile: 220 },
  { date: "2024-08-02", sell: 200, mobile: 310 },
  { date: "2024-08-03", sell: 200, mobile: 190 },
  { date: "2024-08-04", sell: 200, mobile: 420 },
  { date: "2024-08-05", sell: 200, mobile: 390 },
  { date: "2024-08-06", sell: 200, mobile: 520 },
  { date: "2024-08-07", sell: 200, mobile: 300 },
  { date: "2024-08-08", sell: 200, mobile: 210 },
  { date: "2024-08-09", sell: 200, mobile: 180 },
  { date: "2024-08-10", sell: 200, mobile: 330 },
  { date: "2024-08-11", sell: 200, mobile: 270 },
  { date: "2024-08-12", sell: 200, mobile: 240 },
  { date: "2024-08-13", sell: 200, mobile: 160 },
  { date: "2024-08-14", sell: 200, mobile: 490 },
  { date: "2024-08-15", sell: 200, mobile: 380 },
  { date: "2024-08-16", sell: 200, mobile: 400 },
  { date: "2024-08-17", sell: 200, mobile: 420 },
  { date: "2024-08-18", sell: 200, mobile: 350 },
  { date: "2024-08-19", sell: 200, mobile: 180 },
  { date: "2024-08-20", sell: 200, mobile: 230 },
  { date: "2024-08-21", sell: 200, mobile: 140 },
  { date: "2024-08-22", sell: 200, mobile: 120 },
  { date: "2024-08-23", sell: 200, mobile: 290 },
  { date: "2024-08-24", sell: 200, mobile: 220 },
  { date: "2024-08-25", sell: 200, mobile: 250 },
  { date: "2024-08-26", sell: 200, mobile: 170 },
  { date: "2024-08-27", sell: 200, mobile: 460 },
  { date: "2024-08-28", sell: 200, mobile: 190 },
  { date: "2024-08-29", sell: 200, mobile: 130 },
  { date: "2024-08-30", sell: 200, mobile: 280 },
  { date: "2024-08-31", sell: 200, mobile: 230 },
  { date: "2024-09-01", sell: 100, mobile: 200 },
  { date: "2024-09-02", sell: 100, mobile: 410 },
  { date: "2024-09-03", sell: 100, mobile: 160 },
  { date: "2024-09-04", sell: 100, mobile: 380 },
  { date: "2024-09-05", sell: 100, mobile: 140 },
  { date: "2024-09-06", sell: 100, mobile: 250 },
  { date: "2024-09-07", sell: 100, mobile: 370 },
  { date: "2024-09-08", sell: 100, mobile: 320 },
  { date: "2024-09-09", sell: 100, mobile: 480 },
  { date: "2024-09-10", sell: 100, mobile: 200 },
  { date: "2024-09-11", sell: 100, mobile: 150 },
  { date: "2024-09-12", sell: 10000, mobile: 420 },
  { date: "2024-09-13", sell: 100, mobile: 130 },
  { date: "2024-09-14", sell: 100, mobile: 380 },
  { date: "2024-09-15", sell: 100, mobile: 350 },
  { date: "2024-09-16", sell: 100, mobile: 310 },
  { date: "2024-09-17", sell: 100, mobile: 520 },
  { date: "2024-09-18", sell: 100, mobile: 170 },
  { date: "2024-09-19", sell: 100, mobile: 290 },
  { date: "2024-09-20", sell: 100, mobile: 450 },
  { date: "2024-09-21", sell: 100, mobile: 210 },
  { date: "2024-09-22", sell: 100, mobile: 270 },
  { date: "2024-09-23", sell: 100, mobile: 530 },
  { date: "2024-09-24", sell: 100, mobile: 880 },
  { date: "2024-09-25", sell: 100, mobile: 190 },
  { date: "2024-09-26", sell: 100, mobile: 380 },
  { date: "2024-09-27", sell: 100, mobile: 490 },
  { date: "2024-09-28", sell: 100, mobile: 200 },
  { date: "2024-09-29", sell: 100, mobile: 160 },
  { date: "2024-09-30", sell: 100, mobile: 400 },
];

const chartConfig = {
  categories: {
    label: "Categories",
  },
  chrome: {
    color: "hsl(var(--chart-1))",
  },
  safari: {
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    color: "hsl(var(--chart-3))",
  },
  edge: {
    color: "hsl(var(--chart-4))",
  },
  other: {
    color: "hsl(var(--chart-5))",
  },
  other2: {
    color: "hsl(var(--chart-6))",
  },
  other3: {
    color: "hsl(var(--chart-7))",
  },
  other4: {
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig;

export function PieChartOne({ className }: { className?: string }) {
  let now = new Date();
  const currentMonth = chartSellsData.filter((item) => {
    /* Getting current date, month and year */
    const getDate = now.getDate();
    const getMonth = now.getMonth() + 1;
    const getYear = now.getFullYear();

    /* Getting date, month and year of the current document */
    const date = new Date(item.date);
    const days = date.getDate();
    const month = date.getMonth() + 1;
    const Year = date.getFullYear();

    if (days <= getDate && month === getMonth && Year === getYear) {
      return true;
    }
  });
  const previousMonth = chartSellsData.filter((item) => {
    const getDate = now.getDate(); // getting the date
    const getMonth = now.getMonth(); // getting the previous month
    const getYear = now.getFullYear(); // getting the year
    const date = new Date(item.date);

    /* Getting date, month and year of the current document */
    const days = date.getDate();
    const month = date.getMonth() + 1;
    const Year = date.getFullYear();

    if (days <= getDate && Year === getYear && month === getMonth) {
      return true;
    }
  });

  const currentMonthSell = currentMonth.reduce(
    (acc, curr) => acc + curr.sell,
    0
  );
  const previousMonthSell = previousMonth.reduce(
    (acc, curr) => acc + curr.sell,
    0
  );

  let percentageChange = 0;
  let hasIncreased = false;

  if (currentMonthSell > previousMonthSell) {
    percentageChange =
      ((currentMonthSell - previousMonthSell) / previousMonthSell) * 100;
    hasIncreased = true;
  } else if (currentMonthSell < previousMonthSell) {
    percentageChange =
      ((previousMonthSell - currentMonthSell) / previousMonthSell) * 100;
    hasIncreased = false;
  }

  const [rotate, setRotate] = React.useState(false);

  return (
    <div
      className={`w-full flex flex-col md:w-[345px] xl:max-w-[370px] ${className}`}
    >
      <div className={rotate ? pieCss.rotate : pieCss.container}>
        <div className={pieCss.card}>
          <div className={`${pieCss.front} h-full w-full`}>
            <div
              onClick={() => setRotate(!rotate)}
              className="absolute top-5 right-5 cursor-pointer z-50"
            >
              <div className="px-2 py-1 bg-blue-500 rounded-full">Flip</div>
            </div>
            <Card
              className={`flex flex-col md:w-[345px] md:max-w-[370px] md:h-[450px] `}
            >
              <CardHeader className="items-start pb-0">
                <CardTitle className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Top Categories
                </CardTitle>
                <CardDescription>Current months</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-2">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="sell"
                      nameKey="categories"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {currentMonthSell.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Sell&lsquo;s
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                {hasIncreased ? (
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Sell&lsquo;s up by {percentageChange.toFixed(2)}% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Sell&lsquo;s down by {percentageChange.toFixed(2)}% this
                    month <TrendingDown className="h-4 w-4" />
                  </div>
                )}
                <div className="leading-none text-muted-foreground">
                  Showing total revenue last {now.getDate()} days
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className={`${pieCss.back} h-full w-full`}>
            <div
              onClick={() => setRotate(!rotate)}
              className="absolute top-5 right-5 cursor-pointer z-50"
            >
              <div className="px-2 py-1 bg-blue-500 rounded-full">Stop</div>
            </div>
            <Card
              className={`flex flex-col md:w-[345px] md:max-w-[370px]  md:h-[450px]`}
            >
              <CardHeader className="items-start ">
                <CardTitle className=" bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Top Categories
                </CardTitle>
                <CardDescription>Previous months</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-2">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="sell"
                      nameKey="categories"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {previousMonthSell.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Sell&lsquo;s
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Showing Previous month&apos;s report
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
