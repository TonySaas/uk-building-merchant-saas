
import { Link } from "react-router-dom";

interface PageHeaderProps {
  logoSrc: string;
  logoAlt: string;
  appName: string;
}

export default function PageHeader({ logoSrc, logoAlt, appName }: PageHeaderProps) {
  return (
    <div className="flex justify-center mb-8">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-8"
        />
        <span className="text-xl font-bold">{appName}</span>
      </Link>
    </div>
  );
}
