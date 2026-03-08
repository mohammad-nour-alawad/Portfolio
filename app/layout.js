import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohammad Nour Al Awad | Machine Learning Engineer",
  description:
    "Machine Learning Engineer and PhD student focused on adaptive LLM systems, agentic AI, and production-grade research.",
  keywords: [
    "Mohammad Nour Al Awad",
    "Machine Learning Engineer",
    "LLM",
    "Agentic AI",
    "Portfolio",
    "AI Research"
  ],
  openGraph: {
    type: "website",
    title: "Mohammad Nour Al Awad | Portfolio",
    description: "Adaptive LLM systems, AI assistants, and production-ready machine learning projects.",
    url: "/",
    siteName: "Mohammad Nour Al Awad Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Nour Al Awad | Portfolio",
    description: "Machine Learning Engineer and PhD student building adaptive LLM systems."
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
