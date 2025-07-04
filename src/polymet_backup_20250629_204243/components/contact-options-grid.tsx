import React from "react";
import ContactOptionCard from "@/polymet/components/contact-option-card";
import {
  MessageCircleIcon,
  HeadphonesIcon,
  BuildingIcon,
  CalendarIcon,
  FileTextIcon,
  HelpCircleIcon,
  BookIcon,
  AlertCircleIcon,
} from "lucide-react";

export default function ContactOptionsGrid() {
  const contactOptions = [
    {
      title: "General Inquiries",
      icon: <MessageCircleIcon className="h-5 w-5 text-primary-foreground" />,

      description: "For general questions about our platform and services.",
      email: "hello@buildconnect.co.uk",
      phone: "+44 (0) 20 1234 5678",
      responseTime: "Within 4 hours",
      accentColor: "bg-blue-500",
      links: [
        {
          label: "Live Chat",
          href: "#",
          icon: <MessageCircleIcon className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Sales & Partnerships",
      icon: <BuildingIcon className="h-5 w-5 text-primary-foreground" />,

      description: "Interested in our platform or partnership opportunities?",
      email: "sales@buildconnect.co.uk",
      responseTime: "Within 2 hours",
      accentColor: "bg-green-500",
      links: [
        {
          label: "Book a Demo",
          href: "#",
          icon: <CalendarIcon className="h-4 w-4" />,
        },
        {
          label: "Partnership Inquiry",
          href: "#",
          icon: <FileTextIcon className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Technical Support",
      icon: <HeadphonesIcon className="h-5 w-5 text-primary-foreground" />,

      description: "Need help with our platform? Our support team is ready.",
      email: "support@buildconnect.co.uk",
      responseTime: "Within 8 hours",
      accentColor: "bg-amber-500",
      links: [
        {
          label: "Support Portal",
          href: "#",
          icon: <HelpCircleIcon className="h-4 w-4" />,

          isExternal: true,
        },
        {
          label: "Technical Documentation",
          href: "#",
          icon: <BookIcon className="h-4 w-4" />,

          isExternal: true,
        },
        {
          label: "System Status",
          href: "#",
          icon: <AlertCircleIcon className="h-4 w-4" />,

          isExternal: true,
        },
      ],
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Contact Options</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {contactOptions.map((option, index) => (
            <ContactOptionCard key={index} {...option} />
          ))}
        </div>
      </div>
    </section>
  );
}
