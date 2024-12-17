import { ActionIcon, Tooltip } from '@mantine/core';
import { Link, useLocation } from 'react-router';

export interface SidebarItemProps {
    icon: React.ReactNode;
    description: string;
    to: string;
}

export const SidebarItem = ({ icon, description, to }: SidebarItemProps) => {
    const location = useLocation();

    return (
        <Tooltip label={description}>
            <Link to={to}>
                <ActionIcon
                    size='xl'
                    variant={location.pathname === to ? 'light' : 'subtle'}
                >
                    {icon}
                </ActionIcon>
            </Link>
        </Tooltip>
    );
};
