import { Radio, Stack } from '@mantine/core';
import type { AppConfig } from 'src-tauri/bindings/greet';

export interface FormatterTableProps {
    readonly formatter: AppConfig['formatter'];
    readonly current: AppConfig['current_formatter'];
    readonly disabled?: boolean;

    onCurrentChange: (name: string) => void;
}

export const FormatterTable = (
    {
        formatter,
        current,
        disabled,
        onCurrentChange,
    }: FormatterTableProps,
) => {
    return (
        <Radio.Group
            defaultValue={current}
            key={current}
            onChange={onCurrentChange}
            m='md'
        >
            <Stack>
                {Object.entries(formatter).flatMap(([name, value]) => (
                    typeof value === 'undefined'
                        ? []
                        : (
                            <Radio
                                key={name}
                                disabled={disabled}
                                value={name}
                                label={name}
                            />
                        )
                ))}
            </Stack>
        </Radio.Group>
    );
};
