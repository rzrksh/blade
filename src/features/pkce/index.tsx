import { ToolHeader } from "@/components/composition/tool-header";
import { Generator } from "./components/generator";

const PKCE = () => (
  <main className="mt-6 px-4 md:px-8 lg:px-16 mb-12">
    <ToolHeader
      title="PKCE Generator"
      description="Generate a code_verifier and code_challenge for OAuth 2.0 PKCE, and see how one becomes the other."
    />
    <Generator />
  </main>
);

export default PKCE;
