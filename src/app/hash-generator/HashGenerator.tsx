import {RadioButton} from "../common/radio-button/RadioButton";
import {useState} from "react";
import {TextArea} from "../common/textarea/TextArea";
import {Button} from "../common/button/Button";
import {generateHash, HashAlgorithm} from "./generate-hash";
import {IoCopyOutline} from "react-icons/io5";
import {Clipboard} from "./Clipboard";
import {toast, ToastContainer, ToastOptions} from "react-toastify";
import './HashGenerator.scss';
import 'react-toastify/dist/ReactToastify.css';

interface HashAlgorithmDto {
    name: string;
    type: HashAlgorithm;
}

const sha1Algorithm: HashAlgorithmDto = {name: 'SHA1', type: 'sha1'};
const sha256Algorithm: HashAlgorithmDto = {name: 'SHA256', type: 'sha256'};
const sha384Algorithm: HashAlgorithmDto = {name: 'SHA384', type: 'sha384'};
const sha512Algorithm: HashAlgorithmDto = {name: 'SHA512', type: 'sha512'};
const hashAlgorithms: HashAlgorithmDto[] = [sha1Algorithm, sha256Algorithm, sha384Algorithm, sha512Algorithm];
const toastOptions: ToastOptions = {position: "top-center", closeButton: true, className: 'mt-10'};

export const HashGenerator = () => {
    const [hashAlgorithm, setHashAlgorithm] = useState<HashAlgorithmDto>(sha1Algorithm);
    const [inputString, setInputString] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const resetFields = () => {
        setResult('');
    }

    const copyResultToClipboard = async (value: string) => {
        await Clipboard.copy(value);
        toast.dismiss();
        toast.success('Copied to clipboard!', toastOptions);
    }

    const generateAndCopy = async (input: string | ArrayBuffer | SharedArrayBuffer) => {
        try {
            const hashResult = await generateHash(hashAlgorithm.type, input);
            setResult(hashResult);
            await copyResultToClipboard(hashResult);
        } catch (err: any) {
            toast.dismiss();
            toast.error((err as Error).message, toastOptions);
        }
    }

    const generateFromInput = async () => {
        resetFields();
        if (!inputString?.length) {
            toast.dismiss();
            toast.error('Enter text to generate!', toastOptions);
            return;
        }
        await generateAndCopy(inputString);
    }

    const generateRandom = async () => {
        resetFields();
        const bytes = window.crypto.getRandomValues(new Uint8Array(20));
        await generateAndCopy(bytes);
    }

    const clearInput = () => setInputString('');

    return (
        <section className='max-container w-full min-h-[calc(100vh-80px)]'>
            <h1 className='head-text text-center'>
                <span className='blue-gradient_text font-semibold drop-shadow'>Hash Generator</span>
            </h1>

            <div className='flex flex-row gap-4 justify-center mt-4'>
                {hashAlgorithms.map((hashAlgorithmDto: HashAlgorithmDto) => (
                    <RadioButton
                        id={`${hashAlgorithmDto.type}-hash`}
                        label={hashAlgorithmDto.name}
                        name='hash-type'
                        key={hashAlgorithmDto.type}
                        defaultChecked={hashAlgorithm === hashAlgorithmDto}
                        onChange={() => setHashAlgorithm(hashAlgorithmDto)}
                    />
                ))}
            </div>

            <div className='flex flex-col items-center'>
                <div className='w-[400px]'>
                    <TextArea value={inputString} placeholder='Enter text' onChange={setInputString}/>
                </div>
            </div>

            <div className='flex justify-center mt-4 gap-2'>
                <Button onClick={generateRandom}>Random</Button>
                <Button onClick={generateFromInput}>Generate</Button>
                <Button variant='danger' onClick={clearInput}>Clear</Button>
            </div>

            {!!result.length &&
                <div className='flex flex-row justify-center'>
                    <div className='hash-result-container'>
                        <div className='hash-result-header'>
                            <span>Result</span>
                            <IoCopyOutline
                                className='cursor-pointer w-4 h-4'
                                onClick={() => copyResultToClipboard(result)}/>
                        </div>
                        <div className='w-[400px] break-all text-left'>
                            {result}
                        </div>
                    </div>
                </div>
            }

            <ToastContainer/>
        </section>
    );
}