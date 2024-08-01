export default function hasRequiredRole(routeRoles = [], userRoles = []) {
  if (routeRoles.length > 0) {
    return userRoles.filter((el) => routeRoles.includes(el.name)).length > 0;
  }
  return true;
}
