import React from "react";

interface ContactHeroSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ContactHeroSection({
  title = "Get in Touch",
  subtitle = "Ready to transform your promotional strategy? We're here to help.",
}: ContactHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern123/1200/800')] bg-repeat opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
          {title}
        </h1>
        <p className="text-xl font-semibold text-blue-100 md:text-2xl max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
