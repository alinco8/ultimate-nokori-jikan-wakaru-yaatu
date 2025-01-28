import { Anchor, AnchorProps } from '@mantine/core';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router';

export type LinkProps = AnchorProps & RouterLinkProps & {
    external?: boolean;
};

export const Link = ({ external, ...props }: LinkProps) => {
    return (
        <Anchor
            component={RouterLink}
            {...external
                ? {
                    target: '_blank',
                    rel: 'noreferrer noopener',
                }
                : {}}
            {...props}
        />
    );
};
