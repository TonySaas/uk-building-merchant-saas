import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  header?: ReactNode;
}

export default function AuthCard({
  children,
  className,
  footer,
  header,
}: AuthCardProps) {
  return (
    <Card className={cn("w-full shadow-lg", className)}>
      {header && <CardHeader className="space-y-1">{header}</CardHeader>}
      <CardContent className="pt-4">{children}</CardContent>
      {footer && (
        <CardFooter className="border-t p-4 bg-muted/20">{footer}</CardFooter>
      )}
    </Card>
  );
}
