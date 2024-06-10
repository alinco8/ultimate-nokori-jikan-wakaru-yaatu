import { message } from '@tauri-apps/plugin-dialog';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';

export async function checkUpdate() {
    const update = await check();

    console.log(update);

    if (update && update.available) {
        await message(
            `アップデートを行います。\n30秒ほどで完了します。\nv${update.currentVersion} → v${update.version}`,
            {
                title: 'アップデートが見つかりました',
            },
        );
        await relaunch();
    }
}
