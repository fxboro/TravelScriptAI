# TravelScript AI

## Project Purpose
**TravelScript AI** is a specialized SaaS application designed for travel brands, influencers, and agencies. It leverages Google's Gemini models to automate the creation of high-quality, engaging social media content.

The application solves the "blank page" problem for travel content creators by:
1.  Generating platform-specific text posts (Instagram, LinkedIn, TikTok, etc.) based on destination and brand tone.
2.  Analyzing travel photos to automatically generate relevant, inspiring captions using Vision AI.
3.  Providing a centralized dashboard for content planning and brand voice management.

## Component Overview

### Core Views
*   **Dashboard (`views/Dashboard.tsx`)**: The landing view featuring analytics visualization (using Recharts) for post performance, upcoming schedules, and recent activity streams.
*   **Content Generator (`views/ContentGenerator.tsx`)**: The primary workspace where users input topics and destinations. It interfaces with `gemini-3-flash-preview` to generate text content.
*   **Image Captioner (`views/ImageCaptioner.tsx`)**: A drag-and-drop interface for image uploads. It utilizes multimodal capabilities (`gemini-2.5-flash-image`) to "see" the image and write captions.
*   **Calendar (`views/Calendar.tsx`)**: A visual grid for content scheduling and planning.
*   **Settings (`views/Settings.tsx`)**: Global configuration for Brand Name, Tone of Voice, and Target Audience, which feeds into the AI prompts.

### Shared Components
*   **Sidebar (`components/Sidebar.tsx`)**: Main navigation implementing the `AppView` switching logic.
*   **Button (`components/ui/Button.tsx`)**: A reusable button component with support for loading states and multiple variants (primary, secondary, outline, ghost).

### Services
*   **Gemini Service (`services/geminiService.ts`)**: Handles all interactions with the `@google/genai` SDK. It includes prompt engineering for text generation and image analysis.

## Design Tokens

The application uses a custom Tailwind configuration injected via `index.html`.

### Color Palette
| Token Name | Hex | Usage |
| :--- | :--- | :--- |
| **Travel Blue** | `#1A73E8` | Primary actions, branding, active states |
| **Sunset Coral** | `#FF6F61` | Call to actions, alerts, accents |
| **Ocean Teal** | `#009688` | Success states, positive trends |
| **Sand Beige** | `#F4E9D8` | Background accents, decorative elements |
| **Cloud White** | `#FAFAFA` | Main application background |
| **Midnight Navy**| `#0A1A2F` | Sidebar background, primary text |

### Typography
*   **Headings**: `Montserrat` (Weights: 600, 700) - Used for page titles and major headers.
*   **Body**: `Inter` (Weights: 400, 500, 600) - Used for UI text, inputs, and generated content.
*   **Accents**: `Playfair Display` (Italic) - Used for "TravelScript" branding and decorative quotes.

## How to Run Locally

This project uses React with TypeScript.

1.  **Prerequisites**:
    *   Node.js installed.
    *   A Google AI Studio API Key.

2.  **Environment Setup**:
    *   Since this is a client-side prototype, the API key is accessed via `process.env.API_KEY`.
    *   For local development with Vite (recommended):
        1.  Create a `.env` file in the root: `VITE_API_KEY=your_key_here`.
        2.  Update `geminiService.ts` to use `import.meta.env.VITE_API_KEY` or configure your bundler to define `process.env`.

3.  **Running with Vite**:
    ```bash
    npm create vite@latest travelscript-ai -- --template react-ts
    # Copy the project files into the src folder
    npm install
    npm install @google/genai lucide-react recharts tailwindcss postcss autoprefixer
    npm run dev
    ```

4.  **Static Server (if using the provided index.html directly)**:
    If running in a browser environment that supports direct module imports with an external compiler (like standard online editors):
    *   Ensure `index.html` is the entry point.
    *   Serve the directory: `npx serve .`
