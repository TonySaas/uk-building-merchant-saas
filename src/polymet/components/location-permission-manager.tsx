"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPinIcon, ShieldIcon, XIcon } from "lucide-react";

export interface LocationPermissionManagerProps {
  onPermissionChange: (status: PermissionStatus | null) => void;
  onLocationUpdate: (position: GeolocationPosition | null) => void;
  onAccuracyChange: (accuracy: "precise" | "approximate") => void;
  className?: string;
}

export default function LocationPermissionManager({
  onPermissionChange,
  onLocationUpdate,
  onAccuracyChange,
  className,
}: LocationPermissionManagerProps) {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus | null>(null);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [showPermissionRequest, setShowPermissionRequest] = useState(true);
  const [accuracy, setAccuracy] = useState<"precise" | "approximate">(
    "precise"
  );
  const [watchId, setWatchId] = useState<number | null>(null);

  // Check if geolocation is supported
  const isGeolocationSupported = "geolocation" in navigator;

  // Check permission status on mount
  useEffect(() => {
    if (!isGeolocationSupported) return;

    const checkPermission = async () => {
      try {
        const status = await navigator.permissions.query({
          name: "geolocation" as PermissionName,
        });
        setPermissionStatus(status);
        onPermissionChange(status);

        // Listen for permission changes
        status.addEventListener("change", () => {
          setPermissionStatus({ ...status });
          onPermissionChange({ ...status });
        });

        // If already granted, get location
        if (status.state === "granted") {
          setShowPermissionRequest(false);
          startLocationWatch();
        } else if (status.state === "denied") {
          setShowPermissionRequest(false);
        }
      } catch (err) {
        console.error("Error checking geolocation permission:", err);
      }
    };

    checkPermission();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isGeolocationSupported]);

  // Update parent component when position changes
  useEffect(() => {
    onLocationUpdate(position);
  }, [position, onLocationUpdate]);

  // Start watching location with the selected accuracy
  const startLocationWatch = () => {
    if (!isGeolocationSupported) return;

    // Clear previous watch
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    const options = {
      enableHighAccuracy: accuracy === "precise",
      timeout: 10000,
      maximumAge: 60000,
    };

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setError(null);
      },
      (err) => {
        setError(err);
        setPosition(null);
      },
      options
    );

    setWatchId(id);
  };

  // Request permission and start watching location
  const requestPermission = () => {
    if (!isGeolocationSupported) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
        setError(null);
        setShowPermissionRequest(false);
        startLocationWatch();
      },
      (err) => {
        setError(err);
        setPosition(null);
        // Still hide the request UI even if denied
        setShowPermissionRequest(false);
      },
      { enableHighAccuracy: accuracy === "precise" }
    );
  };

  // Handle accuracy change
  const handleAccuracyChange = (value: "precise" | "approximate") => {
    setAccuracy(value);
    onAccuracyChange(value);

    // Restart location watch with new accuracy setting
    if (permissionStatus?.state === "granted") {
      startLocationWatch();
    }
  };

  if (!isGeolocationSupported) {
    return (
      <Alert variant="destructive" className={className}>
        <MapPinIcon className="h-4 w-4" />

        <AlertTitle>Location Not Available</AlertTitle>
        <AlertDescription>
          Your browser does not support geolocation. Some features may be
          limited.
        </AlertDescription>
      </Alert>
    );
  }

  if (error && permissionStatus?.state !== "denied") {
    return (
      <Alert variant="destructive" className={className}>
        <MapPinIcon className="h-4 w-4" />

        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          {error.message ||
            "Unable to retrieve your location. Please check your device settings."}
        </AlertDescription>
      </Alert>
    );
  }

  if (permissionStatus?.state === "denied") {
    return (
      <Alert variant="warning" className={className}>
        <MapPinIcon className="h-4 w-4" />

        <AlertTitle>Location Access Denied</AlertTitle>
        <AlertDescription>
          You've denied access to your location. Some features will be limited.
          To enable location services, please update your browser settings and
          refresh the page.
        </AlertDescription>
      </Alert>
    );
  }

  if (!showPermissionRequest && position) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Alert variant="success">
          <MapPinIcon className="h-4 w-4" />

          <AlertTitle>Location Active</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <span>
              Your location is being used to show relevant merchants and offers.
            </span>
            <RadioGroup
              value={accuracy}
              onValueChange={(value) =>
                handleAccuracyChange(value as "precise" | "approximate")
              }
              className="flex flex-row space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="precise" id="precise" />

                <Label htmlFor="precise">Precise</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approximate" id="approximate" />

                <Label htmlFor="approximate">Approximate</Label>
              </div>
            </RadioGroup>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (showPermissionRequest) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-primary" />
            Location Permission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">We need your location to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Show merchants near you</li>
              <li>Display location-based offers</li>
              <li>Calculate distances to nearby stores</li>
            </ul>
          </div>

          <div className="bg-muted p-3 rounded-md flex items-start gap-3">
            <ShieldIcon className="h-5 w-5 text-primary mt-0.5" />

            <div className="text-xs">
              <p className="font-medium">Privacy Commitment</p>
              <p className="text-muted-foreground">
                Your location data is only used while you're using the app and
                is never stored on our servers or shared with third parties.
              </p>
            </div>
          </div>

          <RadioGroup
            value={accuracy}
            onValueChange={(value) =>
              setAccuracy(value as "precise" | "approximate")
            }
            className="pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="precise" id="r-precise" />

              <Label htmlFor="r-precise">Precise location (recommended)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approximate" id="r-approximate" />

              <Label htmlFor="r-approximate">
                Approximate location (less accurate)
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setShowPermissionRequest(false)}
          >
            <XIcon className="h-4 w-4 mr-2" />
            Not Now
          </Button>
          <Button onClick={requestPermission}>
            <MapPinIcon className="h-4 w-4 mr-2" />
            Allow Location Access
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return null;
}
