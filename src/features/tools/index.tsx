"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  MdDataObject,
  MdFingerprint,
  MdLink,
  MdQrCode2,
  MdToken,
} from "react-icons/md";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type Tool = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: IconType;
};

const tools: Tool[] = [
  {
    id: "json-builder",
    name: "JSON Builder",
    description:
      "Build and parse stringified JSON with ease. Supports deep encoding/decoding, beautifying raw JSON, and copying results quickly.",
    href: "/tools/json-builder",
    icon: MdDataObject,
  },
  {
    id: "qr-code",
    name: "QR Creator / Reader",
    description:
      "Generate custom QR codes from any text or URL, and scan existing QR codes directly from your device's camera.",
    href: "/tools/qr-code",
    icon: MdQrCode2,
  },
  {
    id: "url-builder",
    name: "URL Builder",
    description:
      "Compose, decompose, and transform URLs. Features URL templating, encoding/decoding, and saving your favorite URLs for later.",
    href: "/tools/url-builder",
    icon: MdLink,
  },
  {
    id: "jwt",
    name: "JWT Decoder / Encoder",
    description:
      "Decode a JSON Web Token to read its header, payload and claims, or build and sign a new one with HMAC, RSA or ECDSA. Nothing leaves your browser.",
    href: "/tools/jwt",
    icon: MdToken,
  },
  {
    id: "pkce",
    name: "PKCE Generator",
    description:
      "Generate an OAuth 2.0 code_verifier and code_challenge (S256 or plain), with a step-by-step walkthrough of how one becomes the other.",
    href: "/tools/pkce",
    icon: MdFingerprint,
  },
];

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="mt-6 px-4 md:px-8 lg:px-16 mb-12">
      <div className="mt-10 mb-8 md:mt-16 md:mb-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          Dev tools. <span className="dark:text-lime-400">Nothing else.</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          Free and open source. Runs in your browser. No sign-up, no ads, no
          tracking.
        </p>
      </div>
      <div className="mx-auto mb-10 w-full max-w-2xl">
        <InputGroup className="h-12 rounded-xl">
          <InputGroupAddon className="pl-4">
            <Search className="size-5" />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            placeholder="Search tools..."
            aria-label="Search tools"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-base md:text-base"
          />
        </InputGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Link key={tool.id} href={tool.href} className="h-full">
            <Card className="p-4 md:p-6 gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col">
              <span className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 dark:bg-lime-400/15 dark:text-lime-400">
                <tool.icon className="size-6" aria-hidden />
              </span>
              <div className="flex flex-col flex-grow">
                <CardTitle className="mb-2">{tool.name}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {tool.description}
                </CardDescription>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {filteredTools.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">
          No tools match &ldquo;{searchQuery}&rdquo;.
        </p>
      )}
    </main>
  );
};

export default Tools;
