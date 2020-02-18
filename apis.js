const axios = require('axios');

const baseURL = "https://api.bestbuy.com/v1/products";
const apiKey = "?apiKey=AAYjBAzoEPHNpdKGDQmkm0dS";
const sortOptions = "&sort=customerReviewCount.dsc";
const responseFormat = "&pageSize=10&format=json";

module.exports = {
    search: async (keyword) => {
        const showOptions = "&show=sku,name,shortDescription,salePrice,image,categoryPath,customerReviewCount";
        const url = `${baseURL}((search=${keyword}))${apiKey}${sortOptions}${showOptions}${responseFormat}`;
        try {
            //fetch data from outside API
            const response = await axios.get(url);
            //Clean data
            const products = response.data.products.map(obj => {
                return {
                    sku:    obj['sku'],
                    name:   obj['name'],
                    text:   obj['shortDescription'],
                    image:  obj['image'],
                    review: obj['customerReviewCount'],
                    price:  obj['salePrice'],
                    cats:   obj['categoryPath']
                }
            })
            return products;
        } catch (error) {
            console.error(error);
        }
    },

    detail: async (id) => {
        const showOptions = "&show=categoryPath.id,categoryPath.name,shortDescription,color,condition,customerReviewCount,customerReviewAverage,features.feature,image,includedItemList.includedItem,manufacturer,modelNumber,name,salePrice,shortDescription,sku,type";
        const url = `${baseURL}(sku=${id})${apiKey}${sortOptions}${showOptions}${responseFormat}`;
        try {
            //fetch data from outside API
            const response = await axios.get(url);
            //Clean data
            const obj = response.data.products[0];
            const detail = {
                sku:     obj['sku'],
                image:   obj['image'],
                name:    obj['name'],
                text:    obj['shortDescription'],
                manufacturer: obj['manufacturer'],
                modelNumber:  obj['modelNumber'],
                score:   obj['customerReviewAverage'],
                review:  obj['customerReviewCount'],
                price:   obj['salePrice'],
                items:   obj['includedItemList'].map(ele => ele.includedItem),
                cats:    obj['categoryPath'],
                color:   obj['color'],
                features:obj['features'].map(ele => ele.feature)
            }
            return detail;
        }catch (error) {
            console.error(error);
        }
    },

    recommends: async (category) => {
        if(!category) {
            category = "cat00000";
        }
        const url = `https://api.bestbuy.com/beta/products/mostViewed(categoryId=${category})${apiKey}`;
        try{
            //fetch data from outside API
            const response = await axios(url);
            //Clean data
            const recommends = response.data.results.map(obj => {
                return {
                    sku: obj['sku'],
                    name: obj['names']['title'],
                    text: obj['descriptions']['short'],
                    image: obj['images']['standard'],
                    review: obj['customerReviews']['count'],
                    price: obj['prices']['current'],
                    cat: category
                }
            })
            return recommends;
        } catch (error) {
            console.error(error);
        }
    }
}
