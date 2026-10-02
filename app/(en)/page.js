import PortfolioPage from "@/app/components/portfolio-page";
import { getLocaleData } from "@/app/lib/locales";

export default function EnglishPage() {
  return <PortfolioPage content={getLocaleData("en")} />;
}
