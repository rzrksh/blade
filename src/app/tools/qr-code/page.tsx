import type { Metadata } from "next";
import PageWrapper from "@/components/presentation/page-wrapper";
import QRCR from "@/features/qr-code";

export const metadata: Metadata = {
  title: "QR Creator / Reader | Blade",
};

const QRCodePage = () => {
  return (
    <PageWrapper>
      <QRCR />
    </PageWrapper>
  );
};

export default QRCodePage;
