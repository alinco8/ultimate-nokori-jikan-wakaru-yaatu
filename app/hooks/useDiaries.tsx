import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppConfig } from 'src-tauri/bindings/types';
import { getRemoteDiaries, setRemoteDiaries } from '~/libs/pjs';
import { useConfigStore } from '~/stores/config';

export function useDiary(
    date: string,
) {
    const queryClient = useQueryClient();
    const configN = useConfigStore((store) => store.config);
    const query = useQuery({
        queryKey: ['diaries', date],
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60 * 24 * 7,
        queryFn: async () => {
            const config = await getConfig();
            return getRemoteDiaries(config.gas_url, [
                new Date(date),
                new Date(date),
            ]).then((diaries) => diaries[0]);
        },
    });
    const mutation = useMutation({
        mutationFn: async (
            { date: _date, diary }: { date: Date; diary: string },
        ) => {
            const config = await getConfig();
            await setRemoteDiaries(config.gas_url, [_date, _date], [diary]);
            queryClient.setQueryData(
                ['diaries', date],
                diary,
            );
        },
    });

    const getConfig = () =>
        new Promise<AppConfig>((resolve, reject) => {
            if (configN) return resolve(configN);

            const timeout = 5000;
            const interval = 100;

            let elapsed = 0;
            const intId = setInterval(() => {
                elapsed += interval;
                if (elapsed >= timeout) {
                    clearInterval(intId);
                    return reject(new Error('Config timeout'));
                }
                if (configN) {
                    clearInterval(intId);
                    return resolve(configN);
                }
            }, interval);
        });

    return { diary: query, mutation };
}
