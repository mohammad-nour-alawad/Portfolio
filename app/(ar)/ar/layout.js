import { LocaleLayout } from "@/app/components/locale-layout";
import { createLocaleMetadata } from "@/app/lib/site";

export const metadata = createLocaleMetadata("ar");

export default function ArabicLayout({ children }) {
  return <LocaleLayout locale="ar">{children}</LocaleLayout>;
}
