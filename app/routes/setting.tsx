import { Route } from '.react-router/types/app/+types/root';
import { Setting } from '~/components/Setting';

export const meta: Route.MetaFunction = () => {
    return [{ title: '設定' }, { name: 'description', content: '' }];
};

export default function SettingPage() {
    return <Setting />;
}
