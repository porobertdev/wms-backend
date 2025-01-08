const { crud } = require('../../../database/db');

/**
 * Get all favorite products of a user.
 * @param {Number} customer_id - Customer ID
 * @returns {Array} - Array with all results
 */
const getFavoriteProducts = async (customer_id) => {
    const results = await crud.get('product_favorites', {
        c_user_id: customer_id,
    });

    return results;
};

/**
 * Add a product to favorites.
 * @param {Number} customer_user_id - Customer's user ID
 * @returns {Array} - Array with all results
 */
const addProductToFavorite = async (customer_user_id, product_id) => {
    const results = await crud.add('product_favorites', [
        {
            c_user_id: customer_user_id,
            product_id,
        },
    ]);

    return {
        message: `Product ID-${product_id} has been added to favorites.`,
        product: results[0],
    };
};

const removeFavoriteProduct = async (customer_user_id, product_id) => {
    const results = await crud.delete('product_favorites', {
        c_user_id: customer_user_id,
        product_id,
    });

    return {
        message: `Product ID-${product_id} has been deleted from favorites`,
        product: results[0],
    };
};

module.exports = {
    getFavoriteProducts,
    addProductToFavorite,
    removeFavoriteProduct,
};
