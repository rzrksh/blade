import type { Metadata } from "next";
import PageWrapper from "@/components/presentation/page-wrapper";
import URLComposser from "@/features/url-builder";

export const metadata: Metadata = {
  title: "URL Builder | Blade",
};

const URLComposserPage = () => {
  return (
    <PageWrapper>
      <URLComposser />
    </PageWrapper>
  );
};

export default URLComposserPage;
