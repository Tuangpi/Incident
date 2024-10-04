import DashboardLoading from "@/components/DashboardLoading";
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
import { fetchDashboardData } from "@/lib/clientAPI";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart } from "recharts";

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
} satisfies ChartConfig;

const pieChartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const pieChartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

interface DashboardState {
    company_count: number;
    project_count: number;
    customer_count: number;
    employee_count: number;
}
const Dashboard = () => {
    const { data: dashboard, isLoading } = useQuery<DashboardState>({
        queryKey: ["dashboard"],
        queryFn: fetchDashboardData,
    });

    const totalVisitors = useMemo(() => {
        return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);

    if (isLoading) {
        return <DashboardLoading />;
    }

    return (
        <div className="m-2 text-zinc-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Total Company</CardTitle>
                        <CardDescription className="text-3xl font-bold">
                            {dashboard?.company_count}
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Total Project</CardTitle>
                        <CardDescription className="text-3xl font-bold">
                            {dashboard?.project_count}
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Total Customer</CardTitle>
                        <CardDescription className="text-3xl font-bold">
                            {dashboard?.customer_count}
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Total Employee</CardTitle>
                        <CardDescription className="text-3xl font-bold">
                            {dashboard ? dashboard.employee_count - 1 : 0}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full m-auto mt-6 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Bar Chart - Multiple</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent indicator="dashed" />
                                    }
                                />
                                <Bar
                                    dataKey="desktop"
                                    fill="var(--color-desktop)"
                                    radius={4}
                                />
                                <Bar
                                    dataKey="mobile"
                                    fill="var(--color-mobile)"
                                    radius={4}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none text-gray-400">
                            Trending up by 5.2% this month{" "}
                            <BiTrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Pie Chart - Donut with Text</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={pieChartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={pieChartData}
                                    dataKey="visitors"
                                    nameKey="browser"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                "cx" in viewBox &&
                                                "cy" in viewBox
                                            ) {
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
                                                            className="fill-zinc-300 text-3xl font-bold"
                                                        >
                                                            {totalVisitors.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ||
                                                                    0) + 24
                                                            }
                                                            className="fill-muted-foreground"
                                                        >
                                                            Visitors
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
                </Card>
            </div>
        </div>
    );
};
export default Dashboard;
