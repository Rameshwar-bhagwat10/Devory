export enum Role {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export function hasPermission(userRole: Role, requiredRole: Role) {
  return userRole === requiredRole;
}
