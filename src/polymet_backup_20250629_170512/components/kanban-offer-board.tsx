// Temporarily disabled due to React 19 compatibility issues
// This component will be re-enabled once dependencies are updated

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KanbanOfferBoard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Offer Board</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Offer board functionality is temporarily disabled while we resolve React 19 compatibility.
          This will be restored in the next update.
        </p>
      </CardContent>
    </Card>
  );
}