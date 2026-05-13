# AuraFlow AI — Product Specification Document

## 1. System Architecture Overview
AuraFlow AI is built on a modern, high-performance web stack designed for real-time AI generation and cinematic user experiences.

- **Frontend Core**: React 19 / Vite (Next.js candidate for production)
- **Styling Engine**: Tailwind CSS (Utility-first, mobile-first design)
- **Animation Engine**: Framer Motion (Declarative animations)
- **Graphics Layer**: Three.js / React Three Fiber (Cinematic 3D backgrounds & particles)
- **AI Integration**: Google Gemini API (Gemini-3-Flash for generation & design analysis)
- **State Management**: React Context & Hooks (Scalable component state)
- **Infrastructure**: Cloud Run (Containerized deployment)

---

## 2. User Journey Map
The user journey is designed to be linear yet deeply iterative at the "Customize" stage.

1. **Entry**: User lands on the `Sophisticated Dark` homepage -> Experiences Intro sequence.
2. **Intent**: User interacts with the Neural Input Box -> Types prompt -> Receives smart suggestions.
3. **Generation**: Click "Generate" -> Real-time cinematic overlay showing AI steps (Analyzing -> Structuring -> Synthesizing).
4. **Selection**: User reviews generated concepts (3-6 variants) in the workspace.
5. **Refinement (The Editor)**: User enters the AI Design Studio for granular control:
   - Change Themes (Cyberpunk, Luxury, Glassmorphism, etc.)
   - Reorder Sections (Drag & Drop)
   - Modify Content / AI Optimization fix.
6. **Preview**: Switch viewports (Desktop, Tablet, Mobile) to verify responsiveness.
7. **Production**: Link deployment simulation or code export (React/Next.js/HTML).

---

## 3. Page-by-Page Specifications

### A. Homepage (AuraFlow AI)
- **Layout**: 12-column grid system.
- **Header**: Sticky glassmorphism navbar with brand logo (AuraFlow.AI) and primary actions.
- **Hero**: Minimalist yet bold typography (6.5rem headings) centered or split-pane.
- **Input System**: `NeuralInputBox` with neon border gradient, smart tags, and voice recording capabilities.
- **Visuals**: Three.js aurora background system with interactive mouse-trailing particles.

### B. Generated Designs Workspace
- **Layout**: Flexbox-based concept carousel.
- **Interactions**: Preview hover state triggers 10% scale up; "Remix" button triggers partial re-generation of layout tokens.

### C. Editor (AI Design Studio)
- **Structural Panels**:
  - **Left Sidebar**: 320px fixed. Tabs for Theme, Layout, Config.
  - **Center Canvas**: Flex-center auto-scaling viewport.
  - **Bottom Toolbar**: 40px status bar with "Live Sync" indicator and node count.
- **Live Sync**: Every change in the sidebar triggers a state update in the `SiteRenderer` with a smooth CSS transition (1000ms duration).

---

## 4. Interaction Matrix

| Element | Interaction | Outcome |
| :--- | :--- | :--- |
| **Start Creating** | Click | Smooth scroll to Hero or open modal. |
| **Prompt Input** | Focus | Border glows; `aurora` background speed increases. |
| **Generate Button** | Click | Transition to BFS (Big Fullscreen) processing overlay. |
| **Device Toggle** | Click | `Monitor/Tablet/Mobile` triggers layout animation on viewport container. |
| **AI Suggestion Tag**| Click | Auto-populates prompt input with pre-defined high-quality strings. |
| **Remix AI** | Click | Re-calls Gemini to shuffle sections/colors while keeping user prompt. |

---

## 5. Component Library
- **GlassCard**: `bg-white/5 backdrop-blur-2xl border border-white/10`.
- **NeonButton**: Custom shadow `glow` based on state; `white` text on `indigo-600` for primary.
- **AuraInput**: Transparent background, `JetBrains Mono` font for technical feel.
- **NeuralOrb**: Floating Three.js orb (found in footer/assistat) with `MeshDistortMaterial`.

---

## 6. Animation & Motion Specifications
- **Reveal**: `initial: { y: 20, opacity: 0 }`, `animate: { y: 0, opacity: 1 }` (duration: 0.8s, ease: "easeOut").
- **HMR Substitute**: Custom page transitions using Framer Motion `AnimatePresence`.
- **Theme Switch**: 1000ms CSS `transition: all` on the `SiteRenderer` container to mimic "shifting reality".
- **AI Processing**: 30ms interval progress bar with alternating "thinking" messages.

---

## 7. AI Assistant Behavior
- **Trigger**: Idle time (> 30s) or manual click on the "Floating Orb".
- **Logic**: Analyzes `activeSite` object fields.
- **Suggestion Engine**:
  - `if (contrast < 4.5) -> "AuraFlow recommends increasing text contrast."`
  - `if (sections.length < 3) -> "Suggest adding a pricing or hero section."`
- **Personality Modes**: Creative (Experimental), Corporate (Structured), Minimal (Clean).

---

## 8. Responsive Design Rules
- **Desktop (1280px+)**: Standard 12-column grid.
- **Tablet (768px - 1024px)**: Sections stack; sidebars become collapsable drawers.
- **Mobile (< 768px)**: 1-column layout; navigation collapses to hamburger menu; touch targets min 44px.

---

## 9. Data Models

### `GeneratedWebsite`
```typescript
{
  id: string;
  title: string;
  description: string;
  theme: "Dark" | "Light" | "Cyberpunk" | "Glassmorphism" | "Corporate" | "Luxury";
  font: string; // Google Font Name
  sections: Array<{
    id: string;
    type: string;
    content: Record<string, any>;
  }>;
}
```

---

## 10. State Management
- `isGenerating`: Global boolean for overlay control.
- `currentView`: Routing state (`landing` | `editor` | `dashboard`).
- `activeSite`: The current site JSON being rendered/edited.

---

## 11. Accessibility & Performance
- **A11y**: All images/icons have descriptive labels; keyboard navigation support for editor tabs.
- **Performance**: Heavy Three.js elements auto-throttle on mobile; lazy loading for editor modules.
- **Optimization**: CSS `content-visibility: auto` for long generated pages.
