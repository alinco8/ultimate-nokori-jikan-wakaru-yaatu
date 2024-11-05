import { HoverCard, Textarea } from '@mantine/core';
import { useState } from 'react';

export interface FormatterTableTextareaProps {
    disabled?: boolean;
    value: string;
    name: string;
    onFormatterChange: (
        name: string,
        value: string,
        setError: React.Dispatch<React.SetStateAction<string>>,
    ) => void;
}

export const FormatterTableTextarea = (
    { disabled, value, name, onFormatterChange }: FormatterTableTextareaProps,
) => {
    const [error, setError] = useState('');

    return (
        <Textarea
            wrap='soft'
            autoFocus={!!error}
            error={error}
            disabled={disabled}
            onBlur={(e) => {
                setError('');
                onFormatterChange(
                    name,
                    e.target.value,
                    setError,
                );
            }}
            defaultValue={value}
        />
    );
};
