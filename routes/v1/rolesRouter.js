const { Router } = require('express');
const {
    roleController,
    permissionController,
    rolePermissionController,
} = require('../../controllers/v1/roleController');

const rolesRouter = Router();

// roles
rolesRouter.post('/', roleController.add);
rolesRouter.get('/:id', roleController.get);
rolesRouter.put('/:id', roleController.update);
rolesRouter.delete('/:id', roleController.delete);

// permissions
rolesRouter.post('/permissions', permissionController.add);
rolesRouter.get('/permissions/:id', permissionController.get);
rolesRouter.delete('/permissions/:id', permissionController.delete);

// RolePermissions
rolesRouter.post('/:id/permissions', rolePermissionController.add);
rolesRouter.get('/:id/permissions', rolePermissionController.get);
rolesRouter.put('/:id/permissions', rolePermissionController.update);
rolesRouter.delete('/:id/permissions/:id', rolePermissionController.delete);

module.exports = rolesRouter;
