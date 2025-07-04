import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface PricingFaqProps {
  title?: string;
  description?: string;
  faqs: FaqItem[];
  className?: string;
}

export default function PricingFaq({
  title = "Frequently Asked Questions",
  description,
  faqs,
  className,
}: PricingFaqProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-4 text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {typeof faq.answer === "string" ? (
                  <p className="text-muted-foreground">{faq.answer}</p>
                ) : (
                  faq.answer
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
