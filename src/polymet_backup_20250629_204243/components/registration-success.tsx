import { CheckCircleIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RegistrationSuccessProps {
  userType: string;
}

export default function RegistrationSuccess({
  userType,
}: RegistrationSuccessProps) {
  const isConsumer = userType === "consumer";

  return (
    <div className="flex flex-col items-center text-center py-8 space-y-6">
      <div
        className={`rounded-full p-6 ${
          isConsumer
            ? "bg-green-500/20 text-green-400"
            : "bg-blue-500/20 text-blue-400"
        }`}
      >
        {isConsumer ? (
          <CheckCircleIcon className="h-16 w-16" />
        ) : (
          <ClockIcon className="h-16 w-16" />
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">
          {isConsumer
            ? "Registration Complete!"
            : "Registration Submitted Successfully!"}
        </h2>

        <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
          {isConsumer
            ? "Your account has been created successfully. You can now start browsing offers and finding the best deals."
            : "Your registration has been submitted and is pending approval. You'll receive a notification once your account is approved."}
        </p>
      </div>

      {!isConsumer && (
        <div className="mt-8 bg-gray-800/50 border border-gray-700 p-6 rounded-lg text-left w-full max-w-md">
          <h3 className="font-semibold text-white mb-4">What happens next?</h3>
          <ol className="space-y-3 text-sm text-gray-300 list-decimal pl-5">
            <li>
              Your registration will be reviewed by the organization admins
              (usually within 7 days)
            </li>
            <li>
              You'll receive an email notification when your account is approved
            </li>
            <li>Once approved, you can log in and start using the platform</li>
          </ol>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          <Link to="/login">
            {isConsumer ? "Start Exploring" : "Go to Login"}
          </Link>
        </Button>
        <Button 
          variant="outline" 
          asChild
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}