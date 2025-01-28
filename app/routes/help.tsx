import { Route } from '.react-router/types/app/+types/root';
import { Accordion, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Markdown } from '~/components/Markdown';

import PjsAPI from '~/routes/help/pjs_api.md?raw';

export const meta: Route.MetaFunction = () => [
    {
        title: 'ヘルプ',
    },
    {
        name: 'description',
        content: 'ヘルプ',
    },
];

const helps: {
    id: string;
    title: string;
    content: string;
}[] = [
    {
        id: 'pjs-setup',
        title: 'Pjs APIのセットアップ方法',
        content: PjsAPI,
    },
];

export default function Help() {
    const [selected, setSelected] = useState<string | null>(
        location.hash.slice(1),
    );

    useEffect(() => {
        if (selected) {
            const el = document.getElementById(`help-${selected}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, []);

    return (
        <Accordion variant='separated' value={selected}>
            {helps.map((help) => (
                <Accordion.Item
                    id={`help-${help.id}`}
                    key={help.id}
                    value={help.id}
                >
                    <Accordion.Control
                        onClick={() => {
                            setSelected((current) =>
                                current === help.id ? null : help.id
                            );
                            location.hash = help.id;
                        }}
                    >
                        <Title order={3}>{help.title}</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Markdown content={help.content} />
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}
