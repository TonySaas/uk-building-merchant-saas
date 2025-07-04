import React, { useState } from "react";
import {
  ToggleSwitch,
  ToggleSwitchGroup,
} from "@/polymet/components/toggle-switch";
import { FormSection } from "@/polymet/components/form-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import {
  Bell,
  Tag,
  MapPin,
  Clock,
  ShoppingBag,
  Settings,
  BellOff,
} from "lucide-react";

export interface NotificationPreference {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
  category: "general" | "offers" | "merchants" | "orders" | "system";
  organizationId?: string;
}

export interface LocationPreference {
  enabled: boolean;
  radius: number; // in miles
  notifyOnEntry: boolean;
}

export interface NotificationPreferencesProps {
  preferences?: NotificationPreference[];
  locationPreference?: LocationPreference;
  pushEnabled?: boolean;
  onPreferenceChange?: (preferences: NotificationPreference[]) => void;
  onLocationPreferenceChange?: (preference: LocationPreference) => void;
  onPushEnabledChange?: (enabled: boolean) => void;
  onSave?: () => void;
  loading?: boolean;
  userType?: "consumer" | "merchant" | "supplier";
}

export function NotificationPreferences({
  preferences: initialPreferences,
  locationPreference: initialLocationPreference,
  pushEnabled: initialPushEnabled = false,
  onPreferenceChange,
  onLocationPreferenceChange,
  onPushEnabledChange,
  onSave,
  loading = false,
  userType = "consumer",
}: NotificationPreferencesProps) {
  // Default preferences if none provided
  const defaultPreferences: NotificationPreference[] = [
    {
      id: "new_offers",
      label: "New Special Offers",
      description: "Get notified when new offers are available",
      enabled: true,
      category: "offers",
    },
    {
      id: "expiring_offers",
      label: "Expiring Offers",
      description: "Get notified when offers are about to expire",
      enabled: true,
      category: "offers",
    },
    {
      id: "nearby_merchants",
      label: "Nearby Merchants",
      description:
        "Get notified when you're near a merchant with special offers",
      enabled: true,
      category: "merchants",
    },
    {
      id: "order_updates",
      label: "Order Updates",
      description: "Get notified about your order status",
      enabled: true,
      category: "orders",
    },
    {
      id: "system_updates",
      label: "System Updates",
      description: "Get notified about important system updates",
      enabled: true,
      category: "system",
    },
  ];

  // Add organization-specific preferences for suppliers and merchants
  const orgPreferences: NotificationPreference[] = [];
  if (userType !== "consumer") {
    ORGANIZATIONS.forEach((org) => {
      orgPreferences.push({
        id: `org_${org.id}`,
        label: `${org.name} Notifications`,
        description: `Notifications related to ${org.name}`,
        enabled: true,
        category: "general",
        organizationId: org.id,
      });
    });
  }

  // Category preferences for suppliers and merchants
  const categoryPreferences: NotificationPreference[] = [
    {
      id: "category_tools",
      label: "Tools",
      description: "Notifications for tool-related offers",
      enabled: true,
      category: "offers",
    },
    {
      id: "category_materials",
      label: "Building Materials",
      description: "Notifications for building materials offers",
      enabled: true,
      category: "offers",
    },
    {
      id: "category_hardware",
      label: "Hardware",
      description: "Notifications for hardware offers",
      enabled: true,
      category: "offers",
    },
    {
      id: "category_plumbing",
      label: "Plumbing",
      description: "Notifications for plumbing offers",
      enabled: true,
      category: "offers",
    },
  ];

  // Combine all preferences
  const allDefaultPreferences = [
    ...defaultPreferences,
    ...(userType !== "consumer" ? orgPreferences : []),
    ...(userType !== "consumer" ? categoryPreferences : []),
  ];

  // State
  const [preferences, setPreferences] = useState<NotificationPreference[]>(
    initialPreferences || allDefaultPreferences
  );
  const [locationPreference, setLocationPreference] =
    useState<LocationPreference>(
      initialLocationPreference || {
        enabled: true,
        radius: 5,
        notifyOnEntry: true,
      }
    );
  const [pushEnabled, setPushEnabled] = useState<boolean>(initialPushEnabled);

  // Handle preference toggle
  const handlePreferenceToggle = (id: string, enabled: boolean) => {
    const updatedPreferences = preferences.map((pref) =>
      pref.id === id ? { ...pref, enabled } : pref
    );
    setPreferences(updatedPreferences);
    if (onPreferenceChange) {
      onPreferenceChange(updatedPreferences);
    }
  };

  // Handle location preference change
  const handleLocationPreferenceChange = (
    key: keyof LocationPreference,
    value: boolean | number
  ) => {
    const updatedLocationPreference = {
      ...locationPreference,
      [key]: value,
    };
    setLocationPreference(updatedLocationPreference);
    if (onLocationPreferenceChange) {
      onLocationPreferenceChange(updatedLocationPreference);
    }
  };

  // Handle push enabled toggle
  const handlePushEnabledToggle = (enabled: boolean) => {
    setPushEnabled(enabled);
    if (onPushEnabledChange) {
      onPushEnabledChange(enabled);
    }
  };

  // Filter preferences by category
  const getPreferencesByCategory = (category: string) => {
    return preferences.filter((pref) => pref.category === category);
  };

  // Get organization-specific preferences
  const getOrganizationPreferences = () => {
    return preferences.filter((pref) => pref.organizationId);
  };

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "offers":
        return <Tag className="h-5 w-5" />;

      case "merchants":
        return <MapPin className="h-5 w-5" />;

      case "orders":
        return <ShoppingBag className="h-5 w-5" />;

      case "system":
        return <Settings className="h-5 w-5" />;

      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Control how and when you receive push notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ToggleSwitch
              checked={pushEnabled}
              onCheckedChange={handlePushEnabledToggle}
              label="Enable Push Notifications"
              description="Allow this app to send you push notifications"
              size="lg"
            />

            {!pushEnabled && (
              <div className="flex items-center p-4 rounded-md bg-muted">
                <BellOff className="h-5 w-5 mr-2 text-muted-foreground" />

                <p className="text-sm text-muted-foreground">
                  Push notifications are currently disabled. Enable them to
                  receive updates about offers, orders, and more.
                </p>
              </div>
            )}

            {pushEnabled && (
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="offers">Offers</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  {userType !== "consumer" && (
                    <TabsTrigger value="organizations">
                      Organizations
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <FormSection
                    title="General Notifications"
                    description="Control general notification settings"
                    icon={<Bell className="h-5 w-5" />}
                  >
                    <ToggleSwitchGroup
                      options={[
                        ...getPreferencesByCategory("general"),
                        ...getPreferencesByCategory("system"),
                        ...getPreferencesByCategory("orders"),
                      ].map((pref) => ({
                        id: pref.id,
                        label: pref.label,
                        description: pref.description,
                        disabled: false,
                      }))}
                      values={Object.fromEntries(
                        [
                          ...getPreferencesByCategory("general"),
                          ...getPreferencesByCategory("system"),
                          ...getPreferencesByCategory("orders"),
                        ].map((pref) => [pref.id, pref.enabled])
                      )}
                      onChange={(id, checked) =>
                        handlePreferenceToggle(id, checked)
                      }
                    />
                  </FormSection>
                </TabsContent>

                <TabsContent value="offers" className="space-y-4">
                  <FormSection
                    title="Offer Notifications"
                    description="Control notifications about special offers"
                    icon={<Tag className="h-5 w-5" />}
                  >
                    <ToggleSwitchGroup
                      options={getPreferencesByCategory("offers").map(
                        (pref) => ({
                          id: pref.id,
                          label: pref.label,
                          description: pref.description,
                          disabled: false,
                        })
                      )}
                      values={Object.fromEntries(
                        getPreferencesByCategory("offers").map((pref) => [
                          pref.id,
                          pref.enabled,
                        ])
                      )}
                      onChange={(id, checked) =>
                        handlePreferenceToggle(id, checked)
                      }
                    />
                  </FormSection>

                  {userType !== "consumer" && (
                    <FormSection
                      title="Offer Categories"
                      description="Control notifications for specific offer categories"
                      icon={<Tag className="h-5 w-5" />}
                    >
                      <ToggleSwitchGroup
                        options={categoryPreferences.map((pref) => ({
                          id: pref.id,
                          label: pref.label,
                          description: pref.description,
                          disabled: false,
                        }))}
                        values={Object.fromEntries(
                          categoryPreferences.map((pref) => [
                            pref.id,
                            preferences.find((p) => p.id === pref.id)
                              ?.enabled || false,
                          ])
                        )}
                        onChange={(id, checked) =>
                          handlePreferenceToggle(id, checked)
                        }
                      />
                    </FormSection>
                  )}
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <FormSection
                    title="Location-Based Notifications"
                    description="Control notifications based on your location"
                    icon={<MapPin className="h-5 w-5" />}
                  >
                    <div className="space-y-4">
                      <ToggleSwitch
                        checked={locationPreference.enabled}
                        onCheckedChange={(checked) =>
                          handleLocationPreferenceChange("enabled", checked)
                        }
                        label="Enable Location-Based Notifications"
                        description="Get notified about offers near your location"
                      />

                      {locationPreference.enabled && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="radius">Notification Radius</Label>
                            <div className="flex items-center gap-4">
                              <Input
                                id="radius"
                                type="number"
                                min={1}
                                max={50}
                                value={locationPreference.radius}
                                onChange={(e) =>
                                  handleLocationPreferenceChange(
                                    "radius",
                                    parseInt(e.target.value) || 5
                                  )
                                }
                                className="w-24"
                              />

                              <span>miles</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              You'll be notified about offers within this
                              distance
                            </p>
                          </div>

                          <ToggleSwitch
                            checked={locationPreference.notifyOnEntry}
                            onCheckedChange={(checked) =>
                              handleLocationPreferenceChange(
                                "notifyOnEntry",
                                checked
                              )
                            }
                            label="Notify on Entry"
                            description="Get notified when you enter an area with special offers"
                          />

                          <ToggleSwitchGroup
                            options={getPreferencesByCategory("merchants").map(
                              (pref) => ({
                                id: pref.id,
                                label: pref.label,
                                description: pref.description,
                                disabled: false,
                              })
                            )}
                            values={Object.fromEntries(
                              getPreferencesByCategory("merchants").map(
                                (pref) => [pref.id, pref.enabled]
                              )
                            )}
                            onChange={(id, checked) =>
                              handlePreferenceToggle(id, checked)
                            }
                          />
                        </>
                      )}
                    </div>
                  </FormSection>
                </TabsContent>

                {userType !== "consumer" && (
                  <TabsContent value="organizations" className="space-y-4">
                    <FormSection
                      title="Organization Notifications"
                      description="Control notifications for specific organizations"
                      icon={<Bell className="h-5 w-5" />}
                    >
                      <ToggleSwitchGroup
                        options={getOrganizationPreferences().map((pref) => {
                          const org = ORGANIZATIONS.find(
                            (o) => o.id === pref.organizationId
                          );
                          return {
                            id: pref.id,
                            label: pref.label,
                            description: pref.description,
                            disabled: false,
                          };
                        })}
                        values={Object.fromEntries(
                          getOrganizationPreferences().map((pref) => [
                            pref.id,
                            pref.enabled,
                          ])
                        )}
                        onChange={(id, checked) =>
                          handlePreferenceToggle(id, checked)
                        }
                      />
                    </FormSection>
                  </TabsContent>
                )}
              </Tabs>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={loading}>
          {loading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
