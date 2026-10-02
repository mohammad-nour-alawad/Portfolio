import PortfolioPage from "@/app/components/portfolio-page";
import { getLocaleData } from "@/app/lib/locales";

export default function RussianPage() {
  return <PortfolioPage content={getLocaleData("ru")} />;
}
