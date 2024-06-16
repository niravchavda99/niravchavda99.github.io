"use client";

import { RadioButton } from "@/src/components/common/radio-button/RadioButton";
import { useState } from "react";
import { TextArea } from "@/src/components/common/textarea/TextArea";
import { Button } from "@/src/components/common/button/Button";
import { Algorithm, generateData, TransformInput } from "./generate-data";
import { IoCopyOutline } from "react-icons/io5";
import { Clipboard } from "./Clipboard";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "./Generator.scss";
import "react-toastify/dist/ReactToastify.css";

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
const toastOptions: ToastOptions = {
  position: "top-center",
  closeButton: true,
  className: "mt-10",
};

export default function GeneratorPage() {
  const [algorithm, setAlgorithm] = useState<AlgorithmDto>(md5Algorithm);
  const [inputString, setInputString] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const resetFields = () => {
    setResult("");
  };

  const copyResultToClipboard = async (value: string) => {
    await Clipboard.copy(value);
    toast.dismiss();
    toast.success("Copied to clipboard!", toastOptions);
  };

  const generateAndCopy = async (input: TransformInput) => {
    try {
      const result = await generateData(algorithm.type, input);
      setResult(result);
      await copyResultToClipboard(result);
    } catch (err: any) {
      toast.dismiss();
      toast.error((err as Error).message, toastOptions);
    }
  };

  const generateFromInput = async () => {
    resetFields();
    if (!inputString?.length) {
      toast.dismiss();
      toast.error("Enter text to generate!", toastOptions);
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

      <div className="flex flex-row gap-4 justify-center mt-4">
        {algorithms.map((algorithmDto: AlgorithmDto) => (
          <RadioButton
            id={`${algorithmDto.type}-algorithm`}
            label={algorithmDto.name}
            name="algorithm-type"
            key={algorithmDto.type}
            defaultChecked={algorithm === algorithmDto}
            onChange={() => setAlgorithm(algorithmDto)}
          />
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[400px]">
          <TextArea
            value={inputString}
            placeholder="Enter text"
            onChange={setInputString}
          />
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button onClick={generateRandom}>Random</Button>
        <Button
          onClick={generateFromInput}
          disabled={algorithm.isGenerateDisabled}
        >
          Generate
        </Button>
        <Button variant="danger" onClick={clearInput}>
          Clear
        </Button>
      </div>

      {!!result.length && (
        <div className="flex flex-row justify-center">
          <div className="result-container">
            <div className="result-header">
              <span>Result</span>
              <IoCopyOutline
                className="cursor-pointer w-4 h-4"
                onClick={() => copyResultToClipboard(result)}
              />
            </div>
            <div className="w-[400px] break-all text-left">{result}</div>
          </div>
        </div>
      )}

      <ToastContainer />
    </section>
  );
}
