import "@/app/globals.css";
import { localeConfig } from "@/app/lib/config";

export function LocaleLayout({ locale, children }) {
  const { lang, dir } = localeConfig[locale];

  return (
    <html lang={lang} dir={dir} data-theme="light" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
