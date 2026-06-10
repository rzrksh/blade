import type { Metadata } from "next";
import PageWrapper from "@/components/presentation/page-wrapper";
import QRCR from "@/features/qr-code";

export const metadata: Metadata = {
  title: "JSON Builder | Blade",
};

const JSONBuilderPage = () => {
  return (
    <PageWrapper>
      <QRCR />
    </PageWrapper>
  );
};

export default JSONBuilderPage;
