import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  TrendingUpIcon,
  SparklesIcon,
  ClockIcon,
  BarChartIcon,
  FileTextIcon,
  CheckSquareIcon,
  Building2Icon,
  ShareIcon,
  NewspaperIcon,
  MailIcon,
} from "lucide-react";

export default function MobileContentDistributionHubFeature() {
  const metrics = [
    {
      title: "Unified Publishing",
      value: "5,000+",
      icon: <TrendingUpIcon className="h-5 w-5" />,

      description: "UK merchants, social media, and trade publications",
      color: "blue",
    },
    {
      title: "Smart Optimization",
      value: "100%",
      icon: <SparklesIcon className="h-5 w-5" />,

      description: "AI adapts content for each platform's best practices",
      color: "green",
    },
    {
      title: "Time Multiplication",
      value: "50,000+",
      icon: <ClockIcon className="h-5 w-5" />,

      description: "Professionals reached with 1 hour of work",
      color: "orange",
    },
    {
      title: "Performance Tracking",
      value: "5x",
      icon: <BarChartIcon className="h-5 w-5" />,

      description: "See which merchants and channels drive real sales",
      color: "purple",
    },
  ];
  const distributionChannels = [
    {
      title: "Building Merchant Networks",
      icon: <Building2Icon className="h-5 w-5" />,

      channels: [
        "Toolbank (1000+)",
        "NMBS (1250+)",
        "BMN (2500+)",
        "BMF (535+)",
      ],

      color: "blue",
    },
    {
      title: "Social Media",
      icon: <ShareIcon className="h-5 w-5" />,

      channels: ["LinkedIn", "Facebook", "Instagram", "Twitter", "YouTube"],
      color: "green",
    },
    {
      title: "Trade Publications",
      icon: <NewspaperIcon className="h-5 w-5" />,

      channels: [
        "Building Trade Magazine",
        "Professional Builder",
        "Construction News",
      ],

      color: "orange",
    },
    {
      title: "Direct Marketing",
      icon: <MailIcon className="h-5 w-5" />,

      channels: ["Email campaigns", "WhatsApp Business", "SMS", "CRM"],
      color: "purple",
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: "Select Content",
      description: "Choose from your AI-generated library or upload content",
      icon: <FileTextIcon className="h-5 w-5" />,
    },
    {
      number: 2,
      title: "Pick Channels",
      description: "Select buying groups, social platforms, and publications",
      icon: <CheckSquareIcon className="h-5 w-5" />,
    },
    {
      number: 3,
      title: "Schedule & Track",
      description: "Set timing and watch real-time performance",
      icon: <BarChartIcon className="h-5 w-5" />,
    },
  ];
  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400";
      case "green":
        return "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400";
      case "orange":
        return "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400";
      case "purple":
        return "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400";
      default:
        return "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400";
    }
  };

  return (
    <section className="py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge
          variant="outline"
          className="mb-3 px-3 py-1 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30"
        >
          Feature
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          Content Distribution Hub
        </h1>
        <h2 className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          One Campaign, Maximum Reach
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Publish across Toolbank, NMBS, BMN, BMF networks plus social media
          from one dashboard
        </p>
      </div>
      {/* Network Reach Visualization - Mobile Optimized */}
      <div className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-3">UK Merchant Network</h3>
        <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg p-4 overflow-hidden">
          <img
            src="https://picsum.photos/seed/ukmap/800/400"
            alt="UK Map with merchant locations"
            className="w-full h-48 object-cover rounded opacity-20"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-2xl font-bold mb-2">
              5,000+ Merchant Locations
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded text-center">
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Toolbank
                </div>
                <div className="font-semibold">1,000+ retailers</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded text-center">
                <div className="text-xs text-green-600 dark:text-green-400">
                  NMBS
                </div>
                <div className="font-semibold">1,250+ merchants</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-2 rounded text-center">
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  BMN
                </div>
                <div className="font-semibold">2,500+ merchants</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded text-center">
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  BMF
                </div>
                <div className="font-semibold">535+ members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Amplify Your Marketing Reach
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start"
            >
              <div
                className={`mr-3 p-2 rounded-full ${getColorClass(
                  metric.color
                )}`}
              >
                {metric.icon}
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold mr-2">{metric.value}</span>
                  <h4 className="font-semibold text-base">{metric.title}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Distribution Channels */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Distribution Channels Covered
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {distributionChannels.map((channel, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center mb-3">
                <div
                  className={`mr-3 p-2 rounded-full ${getColorClass(
                    channel.color
                  )}`}
                >
                  {channel.icon}
                </div>
                <h4 className="font-semibold">{channel.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {channel.channels.map((item, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2 py-1 rounded-full ${
                      channel.color === "blue"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : channel.color === "green"
                          ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : channel.color === "orange"
                            ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                            : "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dashboard Preview - Mobile Optimized */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          One Dashboard, Complete Control
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 flex">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">
              Channels
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Schedule
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Analytics
            </button>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Distribution Channels
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="all-channels"
                    className="h-4 w-4 text-blue-600 rounded"
                    checked
                  />

                  <label
                    htmlFor="all-channels"
                    className="ml-2 text-sm font-medium"
                  >
                    All Channels (Recommended)
                  </label>
                </div>
                <div className="ml-6 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div>• Toolbank (1000+)</div>
                  <div>• NMBS (1250+)</div>
                  <div>• BMN (2500+)</div>
                  <div>• BMF (535+)</div>
                  <div>• Social Media (5)</div>
                  <div>• Trade Publications (3)</div>
                </div>
              </div>
            </div>
            <img
              src="https://picsum.photos/seed/dashboard/800/400"
              alt="Dashboard preview"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </div>
      {/* How It Works */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">How It Works</h3>
        <div className="grid grid-cols-1 gap-3">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center"
            >
              <div className="mr-4 bg-blue-600 text-white dark:bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <div className="mr-3 text-blue-600 dark:text-blue-400">
                {step.icon}
              </div>
              <div>
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Business Impact Metrics */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Business Impact Metrics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              400%
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Increase in campaign reach
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              93%
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Reduce management time
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              100%
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Track merchant engagement
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              5x
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              More leads with multi-channel
            </p>
          </div>
        </div>
      </div>
      {/* Platform Integrations - Mobile Optimized */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Integrated Platforms
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {["Toolbank", "NMBS", "BMN", "BMF", "LinkedIn", "Facebook"].map(
              (platform, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                >
                  <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
                  <span className="text-xs">{platform}</span>
                </div>
              )
            )}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
              <span className="text-xs">+10 more</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-blue-600 dark:bg-blue-700 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-white mb-3">
          Amplify Your Reach Across UK Building Trade
        </h3>
        <p className="text-blue-100 mb-5 text-sm">
          Join hundreds of suppliers already using our Content Distribution Hub
        </p>
        <Button
          size="lg"
          className="w-full bg-white text-blue-600 hover:bg-blue-50"
        >
          See Demo
        </Button>
        <div className="mt-3">
          <Link
            to="/features"
            className="text-blue-100 hover:text-white text-sm underline"
          >
            ← Back to AI Content Studio
          </Link>
        </div>
      </div>
    </section>
  );
}