import { useState } from "react";
import ContentGenerationHeader from "@/polymet/components/content-generation-header";
import ContentBriefForm from "@/polymet/components/content-brief-form";
import ContentGenerationOptions from "@/polymet/components/content-generation-options";
import ContentGenerationResults from "@/polymet/components/content-generation-results";
import ContentGenerationPreview from "@/polymet/components/content-generation-preview";

export default function AiContentStudioPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefData, setBriefData] = useState<any>(null);
  const [optionsData, setOptionsData] = useState<any>(null);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);

  // Mock data for demonstration
  const creditsRemaining = 47;
  const totalCredits = 100;

  const handleBriefSubmit = (values: any) => {
    setBriefData(values);
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleOptionsSubmit = (values: any) => {
    setOptionsData(values);
    setCurrentStep(3);
    setIsGenerating(true);
    window.scrollTo(0, 0);

    // Simulate AI generation process
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent(
        generateMockContent(values.contentType, values.variations)
      );
      setCurrentStep(4);
    }, 5000);
  };

  const handleBackToBrief = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const handleBackToOptions = () => {
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setCurrentStep(3);
    window.scrollTo(0, 0);

    // Simulate AI regeneration process
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent(
        generateMockContent(optionsData.contentType, optionsData.variations)
      );
      setCurrentStep(4);
    }, 5000);
  };

  const handleSaveContent = (selectedContent: any[]) => {
    // In a real application, this would save the content to the user's library
    console.log("Saving content to library:", selectedContent);
    // Redirect to library or show success message
    alert("Content saved to your library!");
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <ContentGenerationHeader
        currentStep={currentStep}
        creditsRemaining={creditsRemaining}
        totalCredits={totalCredits}
        className="mb-8"
      />

      {currentStep === 1 && (
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Product Brief</h2>
          <ContentBriefForm onSubmit={handleBriefSubmit} />
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Content Options</h2>
          <ContentGenerationOptions
            onSubmit={handleOptionsSubmit}
            onBack={handleBackToBrief}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Generating Content</h2>
          <p className="text-muted-foreground mb-6">
            Our AI is creating content based on your brief and options. This may
            take a few moments.
          </p>
          <ContentGenerationPreview
            isGenerating={isGenerating}
            contentType={optionsData?.contentType || "images"}
            estimatedTime={30}
          />
        </div>
      )}

      {currentStep === 4 && (
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Review Generated Content
          </h2>
          <p className="text-muted-foreground mb-6">
            Select the content variations you want to save to your library.
          </p>
          <ContentGenerationResults
            contentType={optionsData?.contentType || "images"}
            variations={generatedContent}
            onRegenerate={handleRegenerate}
            onSave={handleSaveContent}
            onBack={handleBackToOptions}
          />
        </div>
      )}
    </div>
  );
}

// Helper function to generate mock content for demonstration
function generateMockContent(contentType: string, count: number) {
  const result = [];

  for (let i = 1; i <= count; i++) {
    if (contentType === "images") {
      result.push({
        id: `img${i}`,
        type: "image",
        content: `https://picsum.photos/seed/product${i}/800/600`,
      });
    } else if (contentType === "videos") {
      result.push({
        id: `vid${i}`,
        type: "video",
        content:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: `https://picsum.photos/seed/video${i}/800/600`,
      });
    } else if (contentType === "copy") {
      result.push({
        id: `copy${i}`,
        type: "copy",
        content: `
          <h2>Premium Power Drill XL-5000 - Variation ${i}</h2>
          <p>Introducing the next generation of professional-grade power tools. The XL-5000 combines industrial strength with precision control, making it the perfect companion for contractors and DIY enthusiasts alike.</p>
          <ul>
            <li>1200W high-torque motor</li>
            <li>Variable speed control (0-3000 RPM)</li>
            <li>Ergonomic grip with vibration reduction</li>
            <li>LED work light for improved visibility</li>
          </ul>
          <p><strong>Elevate your craftsmanship with the tool professionals trust.</strong></p>
        `,
      });
    }
  }

  return result;
}
