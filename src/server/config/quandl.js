if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const key = process.env.QUANDL_API_KEY;
const rootUrl = 'https://www.quandl.com/api/v3';

module.exports = {
};
