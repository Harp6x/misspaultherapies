export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8 h-10 w-48 animate-pulse rounded bg-beige" />
      <div className="mb-8 h-6 w-72 animate-pulse rounded bg-beige" />
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-beige-dark p-6">
            <div className="mb-3 h-5 w-20 animate-pulse rounded bg-beige" />
            <div className="mb-2 h-6 w-full animate-pulse rounded bg-beige" />
            <div className="mb-4 h-4 w-3/4 animate-pulse rounded bg-beige" />
            <div className="h-4 w-24 animate-pulse rounded bg-beige" />
          </div>
        ))}
      </div>
    </div>
  );
}
