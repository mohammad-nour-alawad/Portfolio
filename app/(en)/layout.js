import { LocaleLayout } from "@/app/components/locale-layout";
import { createLocaleMetadata } from "@/app/lib/site";

export const metadata = createLocaleMetadata("en");

export default function EnglishLayout({ children }) {
  return <LocaleLayout locale="en">{children}</LocaleLayout>;
}
