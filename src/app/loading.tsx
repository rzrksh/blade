import PageWrapper from "@/components/presentation/page-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown right away on navigation while the next page loads, so clicks never
 * feel stuck on the previous page. Shaped like a tool page: header, then content.
 */
const Loading = () => (
  <PageWrapper>
    <main
      className="mt-6 px-4 md:px-8 lg:px-16"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
      <div className="mt-10 mb-8 flex items-center gap-4">
        <Skeleton className="size-9 shrink-0" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-8 w-full max-w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-lg" />
        <Skeleton className="h-72 rounded-lg" />
      </div>
    </main>
  </PageWrapper>
);

export default Loading;
