export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sage/30 border-t-sage" />
        <p className="text-sm text-brown-light">Loading...</p>
      </div>
    </div>
  );
}
