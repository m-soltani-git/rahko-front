export default function hasRequiredPermission(
  permissions = [],
  userPermissions = [],
  init = false
) {
  if (permissions.length > 0) {
    return (
      userPermissions.filter((el) => permissions.includes(el.name)).length > 0
    );
  }
  return init;
}
