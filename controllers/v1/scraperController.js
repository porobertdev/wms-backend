const axios = require('axios');
const cheerio = require('cheerio');
const {
    getProductInfo,
} = require('../../services/v1/scraper/fetchData');

const get = async (req, res, next) => {
    const { url } = req.query;

    try {
        const data = [];
        let totalItems = 1;
        let response;
        let page = 1;

        // while (data.length < totalItems) {
        response = await axios.get(`${url}/?p=${page}`);

        const html = response.data;
        const $ = cheerio.load(html);

        totalItems = $('.amscroll-toolbar-amount .toolbar-number-total').text();

        console.log('🚀 ~ get ~ totalItems:', totalItems);

        $('.product-item-info > a').each((index, element) => {
            data.push({
                name: $(element).attr('title'),
                href: $(element).attr('href'),
            });
        });

        page += 1;
        // }

        console.log(data.length);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const { url } = req.query;

        const data = await getProductInfo(url);
        
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const getProdsuct = async (req, res, next) => {
    try {
        const { url } = req;

        await getProductInfo(url);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    get,
    getProduct,
};
