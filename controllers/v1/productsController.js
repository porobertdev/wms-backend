const { product } = require('../../database/db');

module.exports = {
    createCategory: async (req, res, next) => {
        try {
            const { category_name } = req.body;

            await product.category.insert(category_name);

            res.json({
                success: true,
                payload: req.body,
                message: 'Product Category has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    getCategory: async (req, res, next) => {
        try {
            const { category_id } = req.params;
            const result = await product.category.get(category_id);

            res.json({
                message: 'success',
                category: result,
            });
        } catch (err) {
            next(err);
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const { category_id } = req.params;
            const { category_name } = req.body;

            await product.category.update(category_name, category_id);

            res.json({
                success: true,
                payload: req.body,
                message: 'Product Category has been updated.',
            });
        } catch (err) {
            next(err);
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const { category_id } = req.params;
            const result = await product.category.delete(category_id);
            let json;

            if (result) {
                json = {
                    success: true,
                    message: 'Product Category has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "Product Category doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },

    // manufacturers
    createManufacturer: async (req, res, next) => {
        try {
            const { manufacturer_name } = req.body;

            await product.manufacturer.insert(manufacturer_name);

            res.json({
                success: true,
                payload: req.body,
                message: 'Product Manufacturer has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    getManufacturer: async (req, res, next) => {
        try {
            const { manufacturer_id } = req.params;
            const result = await product.manufacturer.get(manufacturer_id);

            res.json({
                message: 'success',
                manufacturer: result,
            });
        } catch (err) {
            next(err);
        }
    },
    updateManufacturer: async (req, res, next) => {
        try {
            const { manufacturer_id } = req.params;
            const { manufacturer_name } = req.body;

            await product.manufacturer.update(
                manufacturer_name,
                manufacturer_id
            );

            res.json({
                success: true,
                payload: req.body,
                message: 'Product Manufacturer has been updated.',
            });
        } catch (err) {
            next(err);
        }
    },
    deleteManufacturer: async (req, res, next) => {
        try {
            const { manufacturer_id } = req.params;
            const result = await product.manufacturer.delete(manufacturer_id);
            let json;

            if (result) {
                json = {
                    success: true,
                    message: 'Product Manufacturer has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "Product Manufacturer doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
    // products
    createProduct: async (req, res, next) => {
        try {
            const {
                name,
                sku,
                description,
                counter_type,
                width,
                height,
                weight,
                price,
                category_id,
                manufacturer_id,
            } = req.body;

            await product.insert({
                name,
                sku,
                description,
                counter_type,
                width,
                height,
                weight,
                price,
                category_id,
                manufacturer_id,
            });

            res.json({
                success: true,
                payload: req.body,
                message: 'Product has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { product_id } = req.params;
            const result = await product.delete(product_id);
            let json;

            if (result) {
                json = {
                    success: true,
                    message: 'Product has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "Product doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
    getProduct: async (req, res, next) => {
        try {
            const { product_id } = req.params;
            const result = await product.get(product_id);

            res.json({
                message: 'success',
                product: result,
            });
        } catch (err) {
            next(err);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { product_id } = req.params;
            const payload = req.body;

            const result = await product.update({
                tableName: 'product',
                id: product_id,
                payload,
            });

            if (result) {
                res.json({
                    success: true,
                    message: 'Product data has been updated.',
                });
            } else {
                res.json({
                    success: false,
                    message: 'Something went wrong.',
                });
            }
        } catch (err) {
            next(err);
        }
    },
};
