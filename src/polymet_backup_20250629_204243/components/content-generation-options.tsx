import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  IMAGE_STYLES,
  VIDEO_STYLES,
  CALL_TO_ACTIONS,
  ORGANIZATION_STYLES,
} from "@/polymet/data/content-types";
import ContentTypeCard from "@/polymet/components/content-type-card";
import SliderWithLabel from "@/polymet/components/slider-with-label";
import ColorPicker from "@/polymet/components/color-picker";

const formSchema = z.object({
  contentType: z.enum(["images", "videos", "copy"]),
  imageStyle: z.string().optional(),
  videoStyle: z.string().optional(),
  duration: z.number().optional(),
  variations: z.number().min(1).max(5),
  creativity: z.number().min(0).max(100),
  brandColors: z.array(z.string()).optional(),
  callToAction: z.string().optional(),
  organizationStyle: z.string().optional(),
});

interface ContentGenerationOptionsProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onBack: () => void;
  className?: string;
}

export default function ContentGenerationOptions({
  onSubmit,
  onBack,
  className,
}: ContentGenerationOptionsProps) {
  const [selectedContentType, setSelectedContentType] = useState<
    "images" | "videos" | "copy"
  >("images");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: "images",
      variations: 3,
      creativity: 50,
      brandColors: ["#FF6B6B", "#7DB9E8"],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      contentType: selectedContentType,
    });
  };

  const handleContentTypeSelect = (type: "images" | "videos" | "copy") => {
    setSelectedContentType(type);
    form.setValue("contentType", type);
  };

  return (
    <div className={cn("space-y-8", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Content Type</h3>
            <p className="text-sm text-muted-foreground">
              Select the type of content you want to generate
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ContentTypeCard
                type="images"
                title="Product Images"
                description="Professional product shots, lifestyle images, technical diagrams"
                icon="📸"
                selected={selectedContentType === "images"}
                onClick={() => handleContentTypeSelect("images")}
              />

              <ContentTypeCard
                type="videos"
                title="Marketing Videos"
                description="Product demos, feature highlights, promotional clips (15-60 seconds)"
                icon="🎬"
                selected={selectedContentType === "videos"}
                onClick={() => handleContentTypeSelect("videos")}
              />

              <ContentTypeCard
                type="copy"
                title="Marketing Copy"
                description="Product descriptions, social posts, email campaigns"
                icon="📝"
                selected={selectedContentType === "copy"}
                onClick={() => handleContentTypeSelect("copy")}
              />
            </div>
          </div>

          {selectedContentType === "images" && (
            <FormField
              control={form.control}
              name="imageStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Style</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select image style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IMAGE_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the style that best represents how you want your
                    product to be showcased.
                  </FormDescription>
                </FormItem>
              )}
            />
          )}

          {selectedContentType === "videos" && (
            <>
              <FormField
                control={form.control}
                name="videoStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Style</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select video style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {VIDEO_STYLES.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the style that best represents how you want your
                      product to be showcased.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Duration</FormLabel>
                    <FormControl>
                      <SliderWithLabel
                        min={15}
                        max={60}
                        step={5}
                        value={field.value ? [field.value] : [30]}
                        onChange={(value) => field.onChange(value[0])}
                        label="Duration"
                        leftLabel="15 seconds"
                        rightLabel="60 seconds"
                        formatValue={(value) => `${value} seconds`}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose the length of your video. Shorter videos work
                      better for social media.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="variations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Variations</FormLabel>
                <FormControl>
                  <SliderWithLabel
                    min={1}
                    max={5}
                    step={1}
                    value={[field.value]}
                    onChange={(value) => field.onChange(value[0])}
                    formatValue={(value) =>
                      `${value} variation${value !== 1 ? "s" : ""}`
                    }
                  />
                </FormControl>
                <FormDescription>
                  Generate multiple variations to choose from. Each variation
                  uses 1 credit.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creativity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creativity Level</FormLabel>
                <FormControl>
                  <SliderWithLabel
                    min={0}
                    max={100}
                    value={[field.value]}
                    onChange={(value) => field.onChange(value[0])}
                    leftLabel="Conservative"
                    rightLabel="Experimental"
                  />
                </FormControl>
                <FormDescription>
                  Adjust how creative or conservative the AI should be with your
                  content.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandColors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Colors</FormLabel>
                <FormControl>
                  <ColorPicker
                    selectedColors={field.value || []}
                    onChange={field.onChange}
                    maxColors={5}
                  />
                </FormControl>
                <FormDescription>
                  Select up to 5 colors that represent your brand identity.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="callToAction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call to Action</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select call to action" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CALL_TO_ACTIONS.map((cta) => (
                      <SelectItem key={cta.value} value={cta.value}>
                        {cta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose what action you want customers to take after seeing
                  your content.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Style</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_STYLES.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the organization style that matches your business.
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back to Brief
            </Button>
            <Button type="submit">Generate Content</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
