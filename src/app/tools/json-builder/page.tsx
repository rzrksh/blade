import type { Metadata } from "next";
import PageWrapper from "@/components/presentation/page-wrapper";
import JSONBuilder from "@/features/json-builder";

export const metadata: Metadata = {
  title: "JSON Builder | rzrblade",
};

const JSONBuilderPage = () => {
  return (
    <PageWrapper>
      <JSONBuilder />
    </PageWrapper>
  );
};

export default JSONBuilderPage;
