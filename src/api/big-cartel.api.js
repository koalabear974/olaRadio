import axios from 'axios';

export const BIG_CARTEL_ID = 'olavetement';
export const BIG_CARTEL_API = 'https://api.bigcartel.com/' + BIG_CARTEL_ID;
export const SOLD_OUT_STATUS = 'sold-out';

export function getProductList() {
    return axios.get(`${BIG_CARTEL_API}/products.json`);
}
