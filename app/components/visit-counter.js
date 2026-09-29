const counterTarget =
  process.env.NEXT_PUBLIC_COUNTER_TARGET ||
  "mohammad-nour-alawad.github.io/Portfolio";

const counterUrl = `https://hits.sh/${counterTarget}.svg?style=flat-square&label=Visits&color=0f4c81&labelColor=52607a`;

export function VisitCounter() {
  return (
    <div className="mt-3 flex items-center">
      <img
        src={counterUrl}
        alt="Portfolio visit count"
        height="20"
        className="h-5 w-auto"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
