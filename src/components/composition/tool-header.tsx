import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
}

/** Back button + title + one-line description at the top of every tool page. */
export const ToolHeader = ({ title, description }: Props) => (
  <div className="mb-6 flex items-center gap-4">
    <Button variant="outline" size="icon" asChild>
      <Link href="/" aria-label="Back to all tools">
        <ArrowLeft />
      </Link>
    </Button>
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-gray-950 dark:text-gray-50">
        {title}
      </h1>
      <h2 className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        {description}
      </h2>
    </div>
  </div>
);
