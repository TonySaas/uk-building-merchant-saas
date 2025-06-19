
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

export default function TrustedOrganizations() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-3 text-center">
        Trusted by leading organizations
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {ORGANIZATIONS.map((org) => (
          <div key={org.id} className="h-8">
            <img
              src={org.logo}
              alt={org.name}
              className="h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
