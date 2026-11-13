"use client";

import { ArrowLeft, QrCode, ScanLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Segmented } from "@/components/composition/segmented";
import { Button } from "@/components/ui/button";
import { Creator } from "./components/creator";
import { Reader } from "./components/reader";

type Mode = "read" | "create";

const QRReaderBuilder = () => {
  const [mode, setMode] = useState<Mode>("read");

  return (
    <main className="mt-6 px-4 md:px-8 lg:px-16">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-gray-950 dark:text-gray-50">
            QR Creator / Reader
          </h1>
          <h2 className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Read a QR code from an image or your camera, or turn any URL into
            one.
          </h2>
        </div>
      </div>
      <Segmented
        label="Mode"
        value={mode}
        onChange={setMode}
        className="mb-4"
        options={[
          { value: "read", label: "Read QR", icon: <ScanLine /> },
          { value: "create", label: "Create QR", icon: <QrCode /> },
        ]}
      />
      {mode === "read" ? <Reader /> : <Creator />}
    </main>
  );
};

export default QRReaderBuilder;
