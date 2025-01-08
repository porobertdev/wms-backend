const getUserInfo = require('../../services/v1/profile/getUserInfo');
const {
    getFavoriteProducts,
    addProductToFavorite,
    removeFavoriteProduct,
} = require('../../services/v1/profile/favorites');
const updateAccountLevel = require('../../services/v1/profile/updateAccountLevel');
const getCustomerOrders = require('../../services/v1/orders/getCustomerOrders');
const getPersonInfo = require('../../services/v1/profile/getPersonInfo');

const account = async (req, res, next) => {
    const { user } = req;
    console.log('🚀 ~ account ~ user:', user);

    // try to update the account level if it's required
    await updateAccountLevel(user.id);
};

const getAccountInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const favorites = await getFavoriteProducts(id);
        const user = await getUserInfo(id);
        const person = await getPersonInfo(id);
        const orders = await getCustomerOrders(id);

        res.json({ user, person, orders /* favorites */ });
    } catch (err) {
        next(err);
    }
};

const getFavorites = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await getFavoriteProducts(id);

        res.json(results);
    } catch (err) {
        next(err);
    }
};

const addProductToFavorites = async (req, res, next) => {
    try {
        const { customer_user_id, product_id } = req.body;
        const result = await addProductToFavorite(customer_user_id, product_id);

        res.json({ result });
    } catch (err) {
        next(err);
    }
};

const deleteFavoriteProduct = async (req, res, next) => {
    try {
        const { customer_user_id, product_id } = req.body;
        const result = await removeFavoriteProduct(
            customer_user_id,
            product_id
        );

        res.json({ result });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAccountInfo,
    getFavorites,
    addProductToFavorites,
    deleteFavoriteProduct,
};
