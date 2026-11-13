"use client";

import { LockOpen, PenLine } from "lucide-react";
import { useState } from "react";
import { Segmented } from "@/components/composition/segmented";
import { ToolHeader } from "@/components/composition/tool-header";
import { Decoder } from "./components/decoder";
import { Encoder } from "./components/encoder";

type Mode = "decode" | "encode";

const JWT = () => {
  const [mode, setMode] = useState<Mode>("decode");
  const [decoderToken, setDecoderToken] = useState("");

  const handleOpenInDecoder = (token: string) => {
    setDecoderToken(token);
    setMode("decode");
  };

  return (
    <main className="mt-6 px-4 md:px-8 lg:px-16 mb-12">
      <ToolHeader
        title="JWT Decoder / Encoder"
        description="Read a JWT's header, payload and claims, or build and sign a new one."
      />
      <Segmented
        label="Mode"
        value={mode}
        onChange={setMode}
        className="mb-4"
        options={[
          { value: "decode", label: "Decode", icon: <LockOpen /> },
          { value: "encode", label: "Encode", icon: <PenLine /> },
        ]}
      />
      {/* Both stay mounted so switching modes keeps what you typed. */}
      <div hidden={mode !== "decode"}>
        <Decoder token={decoderToken} onChangeToken={setDecoderToken} />
      </div>
      <div hidden={mode !== "encode"}>
        <Encoder onOpenInDecoder={handleOpenInDecoder} />
      </div>
    </main>
  );
};

export default JWT;
