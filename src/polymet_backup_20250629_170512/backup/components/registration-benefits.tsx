
import { ShieldCheckIcon } from "lucide-react";

export default function RegistrationBenefits() {
  const benefits = [
    {
      title: "Secure Platform",
      description: "Your data is encrypted and securely stored"
    },
    {
      title: "Verified Suppliers", 
      description: "All suppliers on our platform are vetted and verified"
    },
    {
      title: "Data Privacy",
      description: "We never share your information without permission"
    }
  ];

  return (
    <div className="space-y-4">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full text-primary">
            <ShieldCheckIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
