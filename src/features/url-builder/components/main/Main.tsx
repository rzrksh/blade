import { ToolHeader } from "@/components/composition/tool-header";
import { URLComposerConfig } from "../config";
import { PageRenderer } from "../page-renderer";
import { SavedURL } from "../saved-url";

export const Main = () => {
  return (
    <main className="mt-6 px-4 md:px-8 lg:px-16 mb-12">
      <ToolHeader
        title="URL Builder"
        description="Compose, decompose, and transform URLs. Features URL templating, encoding/decoding."
      />
      {/*
        Phones: config, then the editor, then saved URLs.
        Desktop: editor on the left, config and saved URLs stacked on the right.
      */}
      <div className="grid w-full grid-cols-1 gap-4 [grid-template-areas:'config'_'main'_'saved'] lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'main_config'_'main_saved']">
        <div className="min-w-0 [grid-area:main]">
          <PageRenderer />
        </div>
        <div className="min-w-0 [grid-area:config]">
          <URLComposerConfig />
        </div>
        <div className="min-w-0 self-start [grid-area:saved]">
          <SavedURL />
        </div>
      </div>
    </main>
  );
};
