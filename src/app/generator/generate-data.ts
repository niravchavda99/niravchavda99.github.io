import {sha1, sha256, sha384, sha512} from 'crypto-hash';
import {nanoid} from "nanoid";

export type Algorithm = 'nanoid' | 'sha1' | 'sha256' | 'sha384' | 'sha512';

type AlgorithmFunctionMapEntry = { [key in Algorithm]: (text: string | ArrayBuffer | SharedArrayBuffer) => Promise<string> };
const algorithmFunctionMap: AlgorithmFunctionMapEntry = {
    'sha1': sha1,
    'sha256': sha256,
    'sha384': sha384,
    'sha512': sha512,
    'nanoid': () => Promise.resolve(nanoid()),
}

export function generateData(
    algorithm: Algorithm,
    text: string | ArrayBuffer | SharedArrayBuffer
): Promise<string> {
    return algorithmFunctionMap[algorithm](text);
}
