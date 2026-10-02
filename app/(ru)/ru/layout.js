import { LocaleLayout } from "@/app/components/locale-layout";
import { createLocaleMetadata } from "@/app/lib/site";

export const metadata = createLocaleMetadata("ru");

export default function RussianLayout({ children }) {
  return <LocaleLayout locale="ru">{children}</LocaleLayout>;
}
