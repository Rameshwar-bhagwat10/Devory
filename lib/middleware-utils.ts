export function isPublicRoute(pathname: string) {
  const publicRoutes = ['/', '/projects', '/community', '/auth'];
  return publicRoutes.some((route) => pathname.startsWith(route));
}
