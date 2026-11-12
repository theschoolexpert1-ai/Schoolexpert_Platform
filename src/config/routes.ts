import routes from './routes.json';

export function resolveRoute(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return routes.find(route => route.path === path || route.aliases.includes(path));
}
