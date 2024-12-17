import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
    route('/update', 'routes/update.tsx'),
    route(null, 'routes/window.tsx', [
        index('routes/setting.tsx'),
    ]),
] satisfies RouteConfig;
