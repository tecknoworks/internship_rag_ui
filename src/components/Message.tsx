import { useState } from "react";
import { Input } from 'antd';

interface Props {
    onAddMessage: (inputValue: string) => void;
    isLoading: boolean;
}

export const Message: React.FC<Props> = ({
    onAddMessage,
    isLoading
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            if (inputValue.length > 3) {
                onAddMessage(inputValue);
                setInputValue("");
            }
        }
    };

    const handleClear = () => {
        setInputValue("");
    };

    return (
        <>
            <Input
                size="large" 
                placeholder="Describe the challenge you'd like help with..." 
                variant="borderless"
                showCount 
                maxLength={100}
                allowClear
                style={{
                    color: "#fff"
                }}
                disabled={isLoading}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleEnter}
                onClear={handleClear}
            />
        </>
    )
};
