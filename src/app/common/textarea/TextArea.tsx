import './TextArea.scss';
import {FormEvent} from "react";

interface TextAreaProps {
    rows?: number;
    placeholder?: string;
    onChange: (value: string) => void;
}

export const TextArea = ({rows, placeholder, onChange}: TextAreaProps) => {
    return (
        <textarea
            className="textarea"
            rows={rows ?? 4}
            placeholder={placeholder}
            onChange={(e: FormEvent) => onChange((e.target as HTMLTextAreaElement).value)}
        >
        </textarea>
    );
}