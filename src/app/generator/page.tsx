"use client";

import { AlgorithmType } from "./generate-data";
import "./Generator.scss";
import { GeneratorCard } from "@/src/app/generator/components/generator-card";

export interface Algorithm {
  title: string;
  displayName: string;
  type: AlgorithmType;
  isInputDisabled?: boolean;
  generateRandomActionName?: string;
}

const algorithms: Algorithm[] = [
  {
    title: "Epoch",
    displayName: "Unix Epoch time",
    type: "epoch",
    isInputDisabled: true,
    generateRandomActionName: "Generate",
  },
  {
    title: "Nano Id",
    displayName: "Nano Id",
    type: "nanoid",
    isInputDisabled: true,
  },
  {
    title: "MD5",
    displayName: "MD5 Hash",
    type: "md5",
  },
  {
    title: "SHA1",
    displayName: "SHA1 Hash",
    type: "sha1",
  },
];

export default function GeneratorPage() {
  return (
    <section className="max-container w-full min-h-[calc(100vh-80px)]">
      <title>Nirav Chavda | Generator</title>
      <h1 className="head-text text-center">
        <span className="blue-gradient_text font-semibold drop-shadow">
          Generator
        </span>
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 justify-center mt-4">
        {algorithms.map((algorithm) => (
          <GeneratorCard key={algorithm.type} algorithm={algorithm} />
        ))}
      </div>
    </section>
  );
}
