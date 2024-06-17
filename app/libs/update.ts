import { confirm } from '@tauri-apps/plugin-dialog';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';

export const checkUpdate = Object.assign(
    async () => {
        const update = await check();

        switch (checkUpdate.state) {
            case 'deny':
                if (checkUpdate.denyLimit === null) {
                    checkUpdate.denyLimit = performance.now();
                } else if (
                    1000 * 60 * 5 <
                    performance.now() - checkUpdate.denyLimit
                ) {
                    checkUpdate.denyLimit = null;
                    checkUpdate.state = null;
                }
                break;

            case 'updating':
                break;
            case 'checking':
                break;

            case null:
                if (update && update.available) {
                    checkUpdate.state = 'checking';
                    console.log('ASK');
                    const allow = await confirm(
                        `アップデートを行います。\n30秒ほどで完了します。\nv${update.currentVersion} → v${update.version}`,
                        {
                            title: 'アップデートが見つかりました',
                            cancelLabel: '5分後に再通知',
                            okLabel: 'アップデート',
                        },
                    );

                    if (!allow) {
                        checkUpdate.state = 'deny';
                        return;
                    }
                    checkUpdate.state = 'updating';

                    await update.downloadAndInstall(({ event }) => {
                        console.log(event);
                    });
                    await relaunch();
                }

                break;
        }
    },
    {
        state: null as 'checking' | 'updating' | 'deny' | null,
        denyLimit: null as number | null,
    },
);
