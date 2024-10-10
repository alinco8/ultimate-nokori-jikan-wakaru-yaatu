import { Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';

export interface VersionTransitionProps {
    from: [number, number, number];
    to: [number, number, number];
    state: number;
}

export const VersionTransition = (
    { from, to, state }: VersionTransitionProps,
) => {
    const y = 40;
    state = useMemo(() => state % 1, [state]);

    return (
        <>
            <Title>
                <span
                    style={{
                        display: 'inline-block',
                        transform: `translateY(${(y * state).toString()}px)`,
                    }}
                >
                    {from[0]}
                    <br />
                    {to[0]}
                </span>
                .
                <span style={{ display: 'inline-block' }}>
                    {from[1]}
                    <br />
                    {to[1]}
                </span>
                .
                <span style={{ display: 'inline-block' }}>
                    {from[2]}
                    <br />
                    {to[2]}
                </span>
            </Title>
        </>
    );
};
