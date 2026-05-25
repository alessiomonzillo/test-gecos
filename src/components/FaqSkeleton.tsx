/**
 * Skeleton placeholder per la lista FAQ mentre i dati vengono caricati
 * (usato con React Suspense).
 */
export default function FaqSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3" aria-busy="true" aria-label="Caricamento FAQ in corso">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 bg-gray-50 animate-pulse"
        >
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div
              className="h-4 bg-gray-200 rounded"
              style={{ width: `${60 + (i % 3) * 12}%` }}
            />
            <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
