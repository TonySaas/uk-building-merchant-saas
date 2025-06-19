
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontalIcon, EditIcon, TrashIcon, EyeIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Offer {
  id: string;
  title: string;
  merchant: string;
  category: string;
  status: "active" | "pending" | "expired";
  startDate: string;
  endDate: string;
  discount: string;
}

interface OffersDataTableProps {
  isLoading?: boolean;
}

const mockOffers: Offer[] = [
  {
    id: "1",
    title: "Summer Power Tools Sale",
    merchant: "ToolMart Pro",
    category: "Power Tools",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    discount: "20%",
  },
  {
    id: "2",
    title: "Building Materials Discount",
    merchant: "BuildSupply Ltd",
    category: "Materials",
    status: "pending",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    discount: "15%",
  },
  {
    id: "3",
    title: "Hand Tools Special",
    merchant: "Craftsman Direct",
    category: "Hand Tools",
    status: "expired",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    discount: "25%",
  },
];

export default function OffersDataTable({ isLoading = false }: OffersDataTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: Offer["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "expired":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell>{offer.merchant}</TableCell>
                <TableCell>{offer.category}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(offer.status)}>
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell>{offer.discount}</TableCell>
                <TableCell>{offer.endDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit offer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete offer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
