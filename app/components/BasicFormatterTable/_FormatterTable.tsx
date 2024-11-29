import {
    ActionIcon,
    Center,
    Input,
    Radio,
    Table,
    Tooltip,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import type { AppConfig } from 'src-tauri/bindings/greet';

export interface FormatterTableProps {
    readonly formatter: AppConfig['formatter'];
    readonly current: AppConfig['current_formatter'];
    readonly disabled?: boolean;

    onCurrentChange: (name: string) => void;
    onAdd: () => void;
    onDelete: (name: string) => void;
    onNameChange: (name: string, newName: string) => void;
}

export const FormatterTable = (
    {
        formatter,
        current,
        disabled,
        onCurrentChange,
        onAdd,
        onDelete,
        onNameChange,
    }: FormatterTableProps,
) => {
    return (
        <Radio.Group
            defaultValue={current}
            key={current}
            onChange={onCurrentChange}
        >
            <Table>
                <Table.Tbody>
                    {Object.entries(formatter).flatMap(([name, value]) => (
                        typeof value === 'undefined'
                            ? []
                            : (
                                <Table.Tr key={name}>
                                    <Table.Td>
                                        <Radio
                                            disabled={disabled}
                                            value={name}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <Input
                                            onBlur={(event) => {
                                                onNameChange(
                                                    name,
                                                    event.currentTarget.value,
                                                );
                                            }}
                                            disabled={disabled}
                                            defaultValue={name}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <Tooltip label='一つしかない場合は消せません'>
                                            <ActionIcon
                                                variant='transparent'
                                                color='red'
                                                onClick={() => {
                                                    onDelete(name);
                                                }}
                                                disabled={Object.keys(formatter)
                                                    .length === 1}
                                            >
                                                <IconTrash />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Table.Td>
                                </Table.Tr>
                            )
                    ))}
                    <Table.Tr>
                        <Table.Td colSpan={3}>
                            <Center>
                                <ActionIcon size='lg' onClick={onAdd}>
                                    <IconPlus />
                                </ActionIcon>
                            </Center>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Radio.Group>
    );
};
