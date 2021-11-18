const productionUrl = 'https://sigma-sakib.herokuapp.com';
const developmentUrl = 'http://localhost:5000';
const development = true;
const serverUrl = development ? developmentUrl : productionUrl;

module.exports = { serverUrl };