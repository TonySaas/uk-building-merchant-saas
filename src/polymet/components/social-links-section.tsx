import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  description: string;
  color: string;
}

export default function SocialLinksSection() {
  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="h-6 w-6" />,

      url: "https://linkedin.com/company/buildconnect",
      description: "Follow us for industry insights and company updates",
      color: "bg-[#0077B5] hover:bg-[#0077B5]/90",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon className="h-6 w-6" />,

      url: "https://twitter.com/buildconnect",
      description: "Stay updated with the latest news and announcements",
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
    },
    {
      name: "YouTube",
      icon: <YoutubeIcon className="h-6 w-6" />,

      url: "https://youtube.com/buildconnect",
      description: "Watch tutorials and product demonstrations",
      color: "bg-[#FF0000] hover:bg-[#FF0000]/90",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {socialLinks.map((social, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Button
                      className={`rounded-full h-12 w-12 ${social.color} text-white`}
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(social.url, "_blank")}
                    >
                      {social.icon}
                    </Button>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{social.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {social.description}
                  </p>
                  <Button
                    className={`${social.color} text-white w-full`}
                    onClick={() => window.open(social.url, "_blank")}
                  >
                    Follow on {social.name}
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
