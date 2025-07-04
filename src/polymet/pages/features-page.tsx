import React from "react";
import { motion } from "framer-motion";
import FeaturesHeroSection from "@/polymet/components/features-hero-section";
import FeatureCard from "@/polymet/components/feature-card";
import BenefitColumn from "@/polymet/components/benefit-column";
import MobileAiContentStudioFeature from "@/polymet/components/mobile-ai-content-studio-feature";
import { Button } from "@/components/ui/button";
import {
  BuildingIcon,
  TagIcon,
  MapPinIcon,
  SmartphoneIcon,
  CodeIcon,
  BarChartIcon,
  QrCodeIcon,
  ZapIcon,
  ShoppingBagIcon,
  UserIcon,
  ArrowRightIcon,
} from "lucide-react";

export default function FeaturesPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Features data
  const features = [
    {
      icon: <BuildingIcon className="h-6 w-6" />,

      title: "Multi-Organization Support",
      description:
        "Connect Toolbank, NMBS, BMN, BMF and other buying groups into a unified promotional platform that streamlines communication.",
    },
    {
      icon: <TagIcon className="h-6 w-6" />,

      title: "Digital Offer Creation",
      description:
        "Replace print catalogs with rich media promotional tools that engage customers and drive more foot traffic to stores.",
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,

      title: "Merchant Discovery",
      description:
        "Help consumers find local merchants through our location-based discovery tools, increasing visibility for independent stores.",
    },
    {
      icon: <SmartphoneIcon className="h-6 w-6" />,

      title: "Progressive Web App",
      description:
        "Deliver a mobile-optimized experience with offline capabilities, ensuring promotions are accessible anywhere, anytime.",
    },
    {
      icon: <CodeIcon className="h-6 w-6" />,

      title: "Website Integration",
      description:
        "Easily embed promotional widgets into merchant websites with our flexible API and pre-built components.",
    },
    {
      icon: <BarChartIcon className="h-6 w-6" />,

      title: "Cross-Organization Analytics",
      description:
        "Gain valuable insights into promotional performance across different distribution channels and buying groups.",
    },
    {
      icon: <QrCodeIcon className="h-6 w-6" />,

      title: "QR Code Generation",
      description:
        "Bridge digital and physical store experiences with customizable QR codes that link to specific promotions.",
    },
    {
      icon: <ZapIcon className="h-6 w-6" />,

      title: "Real-Time Updates",
      description:
        "Instantly modify offers without the delays associated with traditional print media, keeping promotions current.",
    },
  ];

  // Benefits data
  const benefitColumns = [
    {
      icon: <BuildingIcon className="h-8 w-8" />,

      title: "For Suppliers",
      accentColor: "bg-blue-600",
      benefits: [
        { text: "Reach multiple buying groups with unified promotions" },
        { text: "Track ROI across different distribution channels" },
        { text: "Reduce lead times for promotional campaigns" },
        { text: "Gain insights into merchant engagement" },
      ],
    },
    {
      icon: <ShoppingBagIcon className="h-8 w-8" />,

      title: "For Merchants",
      accentColor: "bg-green-600",
      benefits: [
        { text: "Unified promotion management across platforms" },
        { text: "Engage local customers with targeted offers" },
        { text: "Reduce administrative overhead for promotions" },
        { text: "Increase foot traffic to physical locations" },
      ],
    },
    {
      icon: <UserIcon className="h-8 w-8" />,

      title: "For Consumers",
      accentColor: "bg-amber-600",
      benefits: [
        { text: "Discover local offers from independent merchants" },
        { text: "Access promotions even when offline" },
        { text: "Support local building supply businesses" },
        { text: "Find the best deals in your area quickly" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <FeaturesHeroSection
        title="Transforming UK Building Merchant Promotions"
        subtitle="From Print to Digital: Streamline Special Offers Across Multiple Organizations"
        description="BuildConnect bridges the gap between traditional print promotions and modern digital experiences, helping UK building merchants and suppliers reach more customers with less effort. Our platform digitizes the entire promotional workflow while maintaining the trusted relationships that make the industry unique."
        ctaText="Request a Demo"
        ctaLink="#demo-request"
      />

      {/* AI Content Studio Feature Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Solution
            </h2>
          </motion.div>
          <MobileAiContentStudioFeature />
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Key Platform Features
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our comprehensive suite of tools helps building merchants and
              suppliers create, manage, and distribute promotions more
              effectively than ever before.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Benefits for Everyone
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              BuildConnect creates value for the entire building supplies
              ecosystem, from manufacturers to end consumers.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefitColumns.map((column, index) => (
              <motion.div key={index} variants={itemVariants}>
                <BenefitColumn
                  icon={column.icon}
                  title={column.title}
                  benefits={column.benefits}
                  accentColor={column.accentColor}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24" id="demo-request">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl rounded-xl bg-primary/5 p-8 text-center shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Transform Your Promotional Strategy?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Join the growing network of UK building merchants and suppliers
              who are modernizing their approach to promotions with
              BuildConnect.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-8">
                Request a Demo
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View Pricing
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}