import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('/update', 'routes/update.tsx'),
] satisfies RouteConfig;
