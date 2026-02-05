import './InputLabel.css';

interface InputLabelProps {
    label: string;
    type?: string;
    placeholder?: string;
}

export const InputLabel = ({
    label,
    type = 'text',
    placeholder,
}: InputLabelProps) => {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};
