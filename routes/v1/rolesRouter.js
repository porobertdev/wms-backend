const { Router } = require('express');
const roleController = require('../../controllers/v1/roleController');

const rolesRouter = Router();

// roles
rolesRouter.post('/', roleController.addRole);
rolesRouter.get('/:role_id', roleController.getRoleName);
rolesRouter.delete('/:role_name', roleController.deleteRole);
// permissions
rolesRouter.post('/permissions', roleController.addPermission);
rolesRouter.get(
    '/permissions/:permission_id',
    roleController.getPermissionName
);
rolesRouter.delete(
    '/permissions/:permission_name',
    roleController.deletePermission
);
// RolePermissions
rolesRouter.post('/:role_id/permissions', roleController.addRolePermission);
rolesRouter.get('/:role_id/permissions', roleController.getRolePermission);
rolesRouter.delete(
    '/:role_id/permissions/:permission_id',
    roleController.deleteRolePermission
);

module.exports = rolesRouter;
