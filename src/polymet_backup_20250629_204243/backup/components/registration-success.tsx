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
    <div className="flex flex-col items-center text-center py-6">
      <div
        className={`rounded-full p-4 ${
          isConsumer
            ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
            : "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        }`}
      >
        {isConsumer ? (
          <CheckCircleIcon className="h-12 w-12" />
        ) : (
          <ClockIcon className="h-12 w-12" />
        )}
      </div>

      <h2 className="text-2xl font-bold mt-6">
        {isConsumer
          ? "Registration Complete!"
          : "Registration Submitted Successfully!"}
      </h2>

      <p className="text-muted-foreground mt-2 max-w-md">
        {isConsumer
          ? "Your account has been created successfully. You can now start browsing offers and finding the best deals."
          : "Your registration has been submitted and is pending approval. You'll receive a notification once your account is approved."}
      </p>

      {!isConsumer && (
        <div className="mt-6 bg-muted/50 p-4 rounded-lg text-left w-full max-w-md">
          <h3 className="font-medium">What happens next?</h3>
          <ol className="mt-2 space-y-2 text-sm text-muted-foreground list-decimal pl-5">
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

      <div className="mt-8 space-x-4">
        <Button asChild>
          <Link to="/login">
            {isConsumer ? "Start Exploring" : "Go to Login"}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
