import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohammad Nour Al Awad | Machine Learning Engineer",
  description:
    "Machine Learning Engineer and PhD student researching adaptive Human-AI collaboration through agentic systems, coding agents, and developer personalization.",
  keywords: [
    "Mohammad Nour Al Awad",
    "Machine Learning Engineer",
    "Human-AI Collaboration",
    "Coding Agents",
    "Developer Personalization",
    "Agent Evaluation",
    "LLM Systems",
    "Portfolio",
    "AI Research"
  ],
  openGraph: {
    type: "website",
    title: "Mohammad Nour Al Awad | Portfolio",
    description: "Adaptive Human-AI collaboration, coding agents, developer personalization, and efficient LLM systems.",
    url: "/",
    siteName: "Mohammad Nour Al Awad Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Nour Al Awad | Portfolio",
    description: "Machine Learning Engineer and PhD student researching adaptive Human-AI collaboration via agentic systems."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
