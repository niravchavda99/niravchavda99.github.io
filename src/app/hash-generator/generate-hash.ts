import {sha1, sha256, sha384, sha512} from 'crypto-hash';

export type HashAlgorithm = 'sha1' | 'sha256' | 'sha384' | 'sha512';

export function generateHash(hashAlgorithm: HashAlgorithm, text: string | ArrayBuffer | SharedArrayBuffer): Promise<string> {
    console.log("Generating HashAlgorithm...");
    switch (hashAlgorithm) {
        case 'sha1':
            return sha1(text);
        case "sha256":
            return sha256(text);
        case 'sha384':
            return sha384(text);
        case 'sha512':
            return sha512(text);
    }
}