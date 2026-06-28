"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
};

const tools: Tool[] = [
  {
    id: "json-builder",
    name: "JSON Builder",
    description:
      "Build and parse stringified JSON with ease. Supports deep encoding/decoding, beautifying raw JSON, and copying results quickly.",
    href: "/tools/json-builder",
  },
  {
    id: "qr-code",
    name: "QR Creator / Reader",
    description:
      "Generate custom QR codes from any text or URL, and scan existing QR codes directly from your device's camera.",
    href: "/tools/qr-code",
  },
  {
    id: "url-builder",
    name: "URL Builder",
    description:
      "Compose, decompose, and transform URLs. Features URL templating, encoding/decoding, and saving your favorite URLs for later.",
    href: "/tools/url-builder",
  },
];

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="mt-6 px-4 md:px-8 lg:px-16">
      <div className="mt-10 flex flex-col md:flex-row gap-8 md:gap-14 mb-12 md:mb-16">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            All tools. <span className="text-lime-400">One toolbox.</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Select and use the tools you need. Everything runs in your browser,
            no sign up, no tracking.
          </p>
        </div>
      </div>
      <div className="mb-8 w-full md:w-1/2 lg:w-1/3">
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Link key={tool.id} href={tool.href} className="h-full">
            <Card className="p-4 md:p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col">
              <CardTitle className="mb-2">{tool.name}</CardTitle>
              <CardDescription className="leading-relaxed flex-grow">{tool.description}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Tools;
