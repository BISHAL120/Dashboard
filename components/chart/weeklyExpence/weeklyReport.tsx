"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const WeeklyReport = () => {
  return (
    <div className="w-full lg:w-[448px] p-1">
      <Card className="flex flex-col w-full " x-chunk="charts-01-chunk-1">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Weekly Report
          </CardTitle>
          <div className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
              <CardDescription>Revenue</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-black to-slate-200">
                95587
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  BDT
                </span>
              </CardTitle>
            </div>
            <div>
              <CardDescription>Expense</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-black to-slate-200">
                78490
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  BDT
                </span>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 items-center">
          <ChartContainer
            config={{
              resting: { label: "Resting", color: "hsl(var(--chart-1))" },
            }}
            className="w-full"
          >
            <LineChart
              accessibilityLayer
              margin={{ left: 14, right: 14, top: 10 }}
              data={[
                { date: "2024-01-01", profit: 1622 },
                { date: "2024-01-02", profit: 2732 },
                { date: "2024-01-03", profit: 1355 },
                { date: "2024-01-04", profit: 2642 },
                { date: "2024-01-05", profit: 162 },
                { date: "2024-01-06", profit: 5256 },
                { date: "2024-01-07", profit: 1780 },
              ]}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.5}
              />
              <YAxis hide domain={["dataMin - 10", "dataMax + 20"]} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string | number | Date) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                }}
              />
              <Line
                dataKey="profit"
                type="natural"
                fill="var(--color-resting)"
                stroke="var(--color-resting)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  fill: "var(--color-resting)",
                  stroke: "var(--color-resting)",
                  r: 4,
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                    }}
                  />
                }
                cursor={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyReport;
