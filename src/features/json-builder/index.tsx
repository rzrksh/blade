import { ToolHeader } from "@/components/composition/tool-header";
import { Card } from "@/components/ui/card";
import TextEditor from "./components/text-editor";

const JSONBuilder = () => {
  return (
    <main className="mt-6 px-4 md:px-8 lg:px-16 mb-12">
      <ToolHeader
        title="JSON Builder"
        description="Build and parse stringified JSON."
      />
      <Card className="p-2 md:p-4">
        <TextEditor />
      </Card>
    </main>
  );
};

export default JSONBuilder;
