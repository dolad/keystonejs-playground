
export const permissionField = {
    canManagePost : false ,
    canManageUsers: false,
    canManageRoles: false,
    canManageComment: false,
    canNotDeletePost: false,
    canNotDeleteComment: false
}

export type Permission = keyof typeof permissionField;

export const permissionsList: Permission[] = Object.keys(permissionField) as Permission[]