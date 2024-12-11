import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { ChartDataItem, getChartTotalViews, processChartData } from "@/service/chartService";

const chartConfig = {
  views: {
    label: "Views",
    color: "#4CAF50",
  }
} satisfies ChartConfig;

export function OverviewChart() {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChartTotalViews();
        const processedData = processChartData(data);
        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching total views:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="views"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey="views" fill="var(--color-views)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}