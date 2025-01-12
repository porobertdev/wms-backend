const axios = require('axios');
const cheerio = require('cheerio');

const fetchData = async (url, page) => {
    try {
        const response = await axios.get(`${url}/?p=${page}`);
        // console.log("🚀 ~ get ~ response:", response)
        const html = response.data;
        // console.log('🚀 ~ get ~ html:', html);
        const $ = cheerio.load(html);
        // console.log('🚀 ~ get ~ $:', $);

        const data = [];
        const totalItems = $(
            '.amscroll-toolbar-amount .toolbar-number-total'
        ).text();
        console.log('🚀 ~ get ~ totalItems:', totalItems);

        const items = $('.product-item-info > a').each((index, element) => {
            data.push({
                text: $(element).attr('title'),
                // href: $(element).attr('href'),
            });
        });
        console.log(data.length);
    } catch (err) {
        console.error(err);
    }
};

const getProductInfo = async (url) => {
    console.log('🚀 ~ getProductInfo ~ url:', url);
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const name = $('h1.page-title').text();
        const description = $(
            'div[data-test="pdp-product-description-short"] p'
        ).html();
        const price = $('div[data-test="pdp-product-price"]').text();
        const reviews = {
            stars: $(
                'div[data-test="pdp-reviews-stars-and-percentage"] svg.fill-secondary'
            ).length,
            count: $(
                'div[data-test="pdp-reviews-stars-and-percentage"] span.hidden.ml-1.font-bold'
            )
                .text()
                .replace('(', '')
                .replace(')', ''),
        };
        const ingredients = [];
        const images = [];

        // TODO ?:  get ingredients for all flavours if there are more
        $('h2 + p').each((i, element) => {
            ingredients.push($(element).html());
        });

        // images
        $('div[data-test="pdp-product-image"] img').each((i, element) => {
            images.push($(element).attr('src'));
        });

        console.log('🚀 ~ getProductInfo ~ images:', images);

        return {
            name,
            description,
            price,
            reviews,
            ingredients,
            images,
        };
    } catch (err) {
        console.error(err);
    }
};

module.exports = { fetchData, getProductInfo };
