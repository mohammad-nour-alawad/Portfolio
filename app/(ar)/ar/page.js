import PortfolioPage from "@/app/components/portfolio-page";
import { getLocaleData } from "@/app/lib/locales";

export default function ArabicPage() {
  return <PortfolioPage content={getLocaleData("ar")} />;
}
