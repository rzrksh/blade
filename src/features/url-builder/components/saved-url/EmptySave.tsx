import { Unlink } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const EmptySave = () => (
  <Empty className="border border-dashed p-6 md:p-6">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Unlink />
      </EmptyMedia>
      <EmptyTitle>No saved URLs</EmptyTitle>
      <EmptyDescription>
        Click Save in the composer to keep a URL here.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
);
