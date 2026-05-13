export type ThemeMode = "Dark" | "Light" | "Cyberpunk" | "Glassmorphism" | "Corporate" | "Luxury";

export interface WebsiteSection {
  id: string;
  type: "hero" | "features" | "pricing" | "contact" | "footer" | "testimonials";
  content: any;
}

export interface GeneratedWebsite {
  id: string;
  title: string;
  description: string;
  theme: ThemeMode;
  font: string;
  sections: WebsiteSection[];
}

export interface AIState {
  isGenerating: boolean;
  status: string;
  progress: number;
  currentStep: "analyzing" | "layout" | "components" | "theme" | "preview" | "idle";
}
