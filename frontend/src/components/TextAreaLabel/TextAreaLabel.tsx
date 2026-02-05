import './TextAreaLabel.css';
import { type ChangeEvent } from 'react';

interface TextAreaLabelProps {
    placeholder?: string;
    rows?: number;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaLabel = ({
    value,
    placeholder,
    rows = 5,
    onChange
}: TextAreaLabelProps) => {
    return (
        <div className="textarea-container">
            <textarea
                className="textarea-field"
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default TextAreaLabel