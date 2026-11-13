import type { Metadata } from "next";
import PageWrapper from "@/components/presentation/page-wrapper";
import PKCE from "@/features/pkce";

export const metadata: Metadata = {
  title: "PKCE Generator | Blade",
};

const PKCEPage = () => (
  <PageWrapper>
    <PKCE />
  </PageWrapper>
);

export default PKCEPage;
