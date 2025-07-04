import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  HelpCircleIcon,
  BookIcon,
  CreditCardIcon,
  ServerIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FaqLink {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ContactFaqSection() {
  const faqLinks: FaqLink[] = [
    {
      title: "Common Questions",
      description:
        "Find answers to frequently asked questions about our platform",
      icon: <HelpCircleIcon className="h-5 w-5" />,

      href: "/faq",
    },
    {
      title: "Getting Started",
      description: "Learn how to set up and use BuildConnect effectively",
      icon: <BookIcon className="h-5 w-5" />,

      href: "/getting-started",
    },
    {
      title: "Pricing Information",
      description: "Explore our pricing plans and subscription options",
      icon: <CreditCardIcon className="h-5 w-5" />,

      href: "/pricing",
    },
    {
      title: "Technical Requirements",
      description: "System requirements and technical specifications",
      icon: <ServerIcon className="h-5 w-5" />,

      href: "/technical-requirements",
    },
  ];

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {faqLinks.map((link, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 p-2 rounded-md bg-primary/10 w-min">
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{link.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {link.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="justify-start p-0 hover:bg-transparent hover:text-primary"
                    asChild
                  >
                    <Link to={link.href}>
                      Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
