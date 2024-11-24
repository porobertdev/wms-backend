const { Router } = require('express');
const roleController = require('../../controllers/v1/roleController');

const rolesRouter = Router();

// roles
rolesRouter.post('/', roleController.add);
rolesRouter.get('/:id', roleController.get);
rolesRouter.put('/:id', roleController.update);
rolesRouter.delete('/:id', roleController.delete);

// permissions
rolesRouter.post('/permissions', roleController.permission.add);
rolesRouter.get('/permissions/:id', roleController.permission.get);
rolesRouter.delete('/permissions/:id', roleController.permission.delete);

// RolePermissions
rolesRouter.post('/:id/permissions', roleController.rolePermission.add);
rolesRouter.get('/:id/permissions', roleController.rolePermission.get);
rolesRouter.put('/:id/permissions', roleController.rolePermission.update);
rolesRouter.delete(
    '/:id/permissions/:id',
    roleController.rolePermission.delete
);

module.exports = rolesRouter;
