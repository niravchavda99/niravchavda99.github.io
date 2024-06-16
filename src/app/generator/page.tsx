"use client";

import { useState } from "react";
import { TextArea } from "@/src/components/common/textarea/TextArea";
import { Algorithm, generateData, TransformInput } from "./generate-data";
import { IoCopyOutline } from "react-icons/io5";
import { Clipboard } from "./Clipboard";
import "./Generator.scss";
import { Toaster } from "@/src/ui/ui/toaster";
import { useToast } from "@/src/ui/ui/use-toast";
import { Button } from "@/src/ui/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/ui/ui/radio-group";
import { Label } from "@/src/ui/ui/label";

interface AlgorithmDto {
  name: string;
  type: Algorithm;
  isGenerateDisabled?: boolean;
}

const nanoIdAlgorithm: AlgorithmDto = {
  name: "Nano Id",
  type: "nanoid",
  isGenerateDisabled: true,
};
const md5Algorithm: AlgorithmDto = { name: "MD5", type: "md5" };
const sha1Algorithm: AlgorithmDto = { name: "SHA1", type: "sha1" };
const algorithms: AlgorithmDto[] = [
  nanoIdAlgorithm,
  md5Algorithm,
  sha1Algorithm,
];

export default function GeneratorPage() {
  const [algorithm, setAlgorithm] = useState<AlgorithmDto>(md5Algorithm);
  const [inputString, setInputString] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const { toast } = useToast();

  const resetFields = () => {
    setResult("");
  };

  const copyResultToClipboard = async (value: string) => {
    await Clipboard.copy(value);
    toast({
      description: "Copied to clipboard!",
      variant: "default",
    });
  };

  const generateAndCopy = async (input: TransformInput) => {
    try {
      const result = await generateData(algorithm.type, input);
      setResult(result);
      await copyResultToClipboard(result);
    } catch (err: any) {
      toast({
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  const generateFromInput = async () => {
    resetFields();
    if (!inputString?.length) {
      toast({
        description: "Enter text to generate!",
        variant: "destructive",
      });
      return;
    }
    await generateAndCopy(inputString);
  };

  const generateRandom = async () => {
    resetFields();
    const bytes = window.crypto.getRandomValues(new Uint8Array(20));
    await generateAndCopy(bytes);
  };

  const clearInput = () => setInputString("");

  return (
    <section className="max-container w-full min-h-[calc(100vh-80px)]">
      <title>Nirav Chavda | Generator</title>
      <h1 className="head-text text-center">
        <span className="blue-gradient_text font-semibold drop-shadow">
          Generator
        </span>
      </h1>

      <RadioGroup defaultValue={algorithm.type} className="radio-buttons">
        {algorithms.map((algorithmDto: AlgorithmDto) => (
          <div
            key={algorithmDto.type}
            className="flex flex-row justify-center items-center space-x-2"
          >
            <RadioGroupItem
              value={algorithmDto.type}
              id={algorithmDto.type}
              onClick={() => setAlgorithm(algorithmDto)}
            />
            <Label
              htmlFor={algorithmDto.type}
              className="cursor-pointer text-sm"
            >
              {algorithmDto.name}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex flex-col items-center">
        <div className="w-[400px]">
          <TextArea
            value={inputString}
            placeholder="Enter text"
            onChange={setInputString}
          />
        </div>
      </div>

      {renderButtons(
        generateRandom,
        generateFromInput,
        clearInput,
        algorithm.isGenerateDisabled,
      )}

      {!!result.length &&
        renderResultContainer(result, () => copyResultToClipboard(result))}

      <Toaster />
    </section>
  );
}

function renderButtons(
  onRandom: () => void,
  onGenerate: () => void,
  onClear: () => void,
  generateDisabled: boolean | undefined,
) {
  return (
    <div className="flex justify-center mt-4 gap-2">
      <Button variant="default" onClick={onRandom}>
        Random
      </Button>
      <Button
        variant="default"
        onClick={onGenerate}
        disabled={generateDisabled}
      >
        Generate
      </Button>
      <Button variant="destructive" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
}

function renderResultContainer(result: string, onCopy: () => void) {
  return (
    <div className="flex flex-row justify-center">
      <div className="result-container">
        <div className="result-header">
          <span>Result</span>
          <IoCopyOutline className="cursor-pointer w-4 h-4" onClick={onCopy} />
        </div>
        <div className="w-[400px] break-all text-left">{result}</div>
      </div>
    </div>
  );
}
