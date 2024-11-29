import { Radio, Stack } from '@mantine/core';
import type { AppConfig } from 'src-tauri/bindings/greet';

export interface BasicFormatterTableProps {
    readonly formatter: AppConfig['formatter'];
    readonly current: AppConfig['current_formatter'];
    readonly disabled?: boolean;

    onCurrentChange: (name: string) => void;
}

export const BasicFormatterTable = (
    {
        formatter,
        current,
        disabled,
        onCurrentChange,
    }: BasicFormatterTableProps,
) => {
    return (
        <Radio.Group
            defaultValue={current}
            key={current}
            onChange={onCurrentChange}
        >
            <Stack>
                {formatter.flatMap(([name, value]) => (
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
