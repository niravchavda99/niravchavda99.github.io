export class Clipboard {
    public static copy(text: string): Promise<void> {
        return navigator.clipboard.writeText(text);
    }
}