const counterTarget =
  process.env.NEXT_PUBLIC_COUNTER_TARGET ||
  "mohammad-nour-alawad.github.io/Portfolio";

export function VisitCounter({ label, alt }) {
  const counterUrl = `https://hits.sh/${counterTarget}.svg?style=flat-square&label=${encodeURIComponent(label)}&color=0f4c81&labelColor=52607a`;
  return (
    <div className="mt-3 flex items-center">
      <img
        src={counterUrl}
        alt={alt}
        height="20"
        className="h-5 w-auto"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
