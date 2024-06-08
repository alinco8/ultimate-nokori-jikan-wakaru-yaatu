import { useEffect, useRef } from 'react';

interface TauriDragRegionProps {
    children: (refParent: React.RefObject<HTMLDivElement>) => React.ReactNode;
}
export const TauriDragRegion = ({ children }: TauriDragRegionProps) => {
    const refParent = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!refParent.current) return;

        dragRegion(refParent.current);

        function dragRegion(element: HTMLElement) {
            if (element.dataset) {
                element.dataset['tauriDragRegion'] = 'true';
            }
            Array.from(element.children).forEach((child) => {
                if (child instanceof HTMLElement) {
                    dragRegion(child);
                }
            });
        }
    }, [refParent]);

    return children(refParent);
};
