import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PERFORMANCE_SUMMARY } from "@/polymet/data/content-data";
import { BarChart, LineChart, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, CartesianGrid, Cell, Line, Pie, XAxis } from "recharts";

export default function PerformanceAnalytics() {
  const {
    bestPerforming,
    topEngagementChannels,
    merchantClickthroughByRegion,
    contentTypePerformance,
  } = PERFORMANCE_SUMMARY;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Analytics</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="content">Content Types</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Best Performing Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src="https://picsum.photos/seed/plumbing1/800/600"
                      alt={bestPerforming.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{bestPerforming.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {bestPerforming.type}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-sm">
                      <span>
                        {bestPerforming.performance.views.toLocaleString()}{" "}
                        views
                      </span>
                      <span>
                        {bestPerforming.performance.shares.toLocaleString()}{" "}
                        shares
                      </span>
                      <span>
                        {bestPerforming.performance.clicks.toLocaleString()}{" "}
                        clicks
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Top Engagement Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="aspect-[none] h-[180px]">
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />

                    <Pie
                      data={topEngagementChannels}
                      dataKey="engagement"
                      nameKey="channel"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={50}
                      label={({ channel, percent }) =>
                        `${channel} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {topEngagementChannels.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Merchant Clickthrough by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="aspect-[none] h-[180px]">
                  <BarChart data={merchantClickthroughByRegion}>
                    <CartesianGrid vertical={false} />

                    <XAxis dataKey="region" tickLine={false} axisLine={false} />

                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />

                    <Bar
                      dataKey="rate"
                      fill="hsl(var(--chart-1))"
                      radius={4}
                      name="Clickthrough Rate (%)"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Content Type Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="aspect-[none] h-[180px]">
                  <LineChart data={contentTypePerformance}>
                    <CartesianGrid vertical={false} />

                    <XAxis dataKey="type" tickLine={false} axisLine={false} />

                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />

                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={{
                        stroke: "hsl(var(--chart-2))",
                        strokeWidth: 2,
                        fill: "white",
                        r: 4,
                      }}
                      name="Performance Score"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="aspect-[none] h-[300px]">
                <BarChart data={topEngagementChannels}>
                  <CartesianGrid vertical={false} />

                  <XAxis dataKey="channel" tickLine={false} axisLine={false} />

                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />

                  <Bar
                    dataKey="engagement"
                    fill="hsl(var(--chart-1))"
                    radius={4}
                    name="Engagement Score"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="aspect-[none] h-[300px]">
                <BarChart data={merchantClickthroughByRegion}>
                  <CartesianGrid vertical={false} />

                  <XAxis dataKey="region" tickLine={false} axisLine={false} />

                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />

                  <Bar
                    dataKey="rate"
                    fill="hsl(var(--chart-3))"
                    radius={4}
                    name="Clickthrough Rate (%)"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Type Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="aspect-[none] h-[300px]">
                <BarChart data={contentTypePerformance}>
                  <CartesianGrid vertical={false} />

                  <XAxis dataKey="type" tickLine={false} axisLine={false} />

                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />

                  <Bar
                    dataKey="performance"
                    fill="hsl(var(--chart-2))"
                    radius={4}
                    name="Performance Score"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
