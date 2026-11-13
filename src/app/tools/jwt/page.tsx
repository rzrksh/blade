import type { Metadata } from "next";
import PageWrapper from "@/components/presentation/page-wrapper";
import JWT from "@/features/jwt";

export const metadata: Metadata = {
  title: "JWT Decoder / Encoder | Blade",
};

const JWTPage = () => (
  <PageWrapper>
    <JWT />
  </PageWrapper>
);

export default JWTPage;
