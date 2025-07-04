import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  DollarSignIcon,
  UserIcon,
  LayersIcon,
  UploadIcon,
  SparklesIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileAiContentStudioFeature() {
  const transformationExamples = [
    {
      id: 1,
      title: "Power Drill Transformation",
      before: "https://picsum.photos/seed/drill1/600/600",
      after: "https://picsum.photos/seed/drill2/600/600",
      description:
        "Basic product photo transformed into a professional action shot with specs overlay.",
    },
    {
      id: 2,
      title: "Hand Tool Set Showcase",
      before: "https://picsum.photos/seed/tools1/600/600",
      after: "https://picsum.photos/seed/tools2/600/600",
      description:
        "Simple photo transformed into a catalog-ready display with usage recommendations.",
    },
    {
      id: 3,
      title: "Measuring Equipment Display",
      before: "https://picsum.photos/seed/measure1/600/600",
      after: "https://picsum.photos/seed/measure2/600/600",
      description:
        "Basic photo transformed into a professional demonstration image with accuracy features.",
    },
  ];

  const benefits = [
    {
      icon: <ClockIcon className="h-5 w-5" />,

      title: "Time Savings",
      description: "Create professional content in minutes vs. weeks",
      highlight: "95% time saved",
    },
    {
      icon: <DollarSignIcon className="h-5 w-5" />,

      title: "Cost Reduction",
      description: "£49/month vs. £500+ per piece from agencies",
      highlight: "90% cost savings",
    },
    {
      icon: <UserIcon className="h-5 w-5" />,

      title: "No Skills Required",
      description: "Zero design experience needed for quality content",
      highlight: "Zero learning curve",
    },
    {
      icon: <LayersIcon className="h-5 w-5" />,

      title: "Multi-Format Output",
      description: "One photo becomes multiple marketing assets",
      highlight: "20+ assets from one input",
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: "Upload & Brief",
      description: "Drop product photos and describe campaign goals",
      icon: <UploadIcon className="h-6 w-6" />,
    },
    {
      number: 2,
      title: "AI Generates",
      description: "Our AI creates multiple professional variations",
      icon: <SparklesIcon className="h-6 w-6" />,
    },
    {
      number: 3,
      title: "Review & Publish",
      description: "Choose favorites, make edits, and publish",
      icon: <CheckCircleIcon className="h-6 w-6" />,
    },
  ];

  const businessImpacts = [
    {
      icon: <TrendingUpIcon className="h-6 w-6" />,

      title: "Increase campaign output by 300%",
      description:
        "Create more assets with the same team size, reaching more customers.",
    },
    {
      icon: <LayersIcon className="h-6 w-6" />,

      title: "Content for multiple buying groups",
      description:
        "Create tailored content for all major UK building merchant networks.",
    },
    {
      icon: <FileTextIcon className="h-6 w-6" />,

      title: "20+ marketing assets from one product",
      description:
        "Generate social posts, email banners, print materials, and videos.",
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,

      title: "Perfect for digital transition",
      description:
        "Ideal for transitioning from print to digital-first marketing.",
    },
  ];

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
          AI Content Creation Studio
        </h1>
        <h2 className="text-lg text-gray-600 dark:text-gray-300">
          Transform product photos into compelling marketing campaigns
        </h2>
      </div>

      {/* Before/After Example (Mobile Optimized) */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          See the Transformation
        </h3>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 snap-x snap-mandatory">
            {transformationExamples.map((example) => (
              <div
                key={example.id}
                className="min-w-[280px] max-w-[280px] snap-center bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex-shrink-0"
              >
                <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                  <h4 className="font-medium text-sm">{example.title}</h4>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative">
                    <img
                      src={example.before}
                      alt={`Before: ${example.title}`}
                      className="w-full aspect-square object-cover"
                    />

                    <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={example.after}
                      alt={`After: ${example.title}`}
                      className="w-full aspect-square object-cover"
                    />

                    <div className="absolute top-1 left-1 bg-blue-600/90 text-white text-xs px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {example.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-1 mt-2">
          {transformationExamples.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full ${
                index === 0
                  ? "w-4 bg-blue-600 dark:bg-blue-500"
                  : "w-1.5 bg-gray-300 dark:bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Key Benefits for Building Merchants
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start"
            >
              <div className="mr-3 mt-0.5 bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-semibold text-base">{benefit.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {benefit.description}
                </p>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                  {benefit.highlight}
                </span>
              </div>
            </div>
          ))}
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

      {/* Business Impact */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Business Impact
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {businessImpacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start"
            >
              <div className="mr-3 text-blue-600 dark:text-blue-400">
                {impact.icon}
              </div>
              <div>
                <h4 className="font-semibold text-base">{impact.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {impact.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-blue-600 dark:bg-blue-700 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-white mb-3">
          Start Creating Professional Content Today
        </h3>
        <p className="text-blue-100 mb-5 text-sm">
          Join hundreds of UK building merchants already using our AI Content
          Studio
        </p>
        <Button
          size="lg"
          className="w-full bg-white text-blue-600 hover:bg-blue-50"
        >
          Start 14-Day Free Trial
        </Button>
        <div className="mt-3">
          <Link
            to="/features/content-distribution-hub"
            className="text-blue-100 hover:text-white text-sm underline"
          >
            Explore our Content Distribution Hub →
          </Link>
        </div>
      </div>
    </section>
  );
}