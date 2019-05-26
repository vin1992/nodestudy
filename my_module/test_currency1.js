const Currency = require("./currency1");

const canadianDollar = 0.91;

const currency = new Currency(canadianDollar);

console.log("30加拿大元对美元是", currency.canadianToUS(30));
console.log("50美元对加拿大元是", currency.USToCanadian(50));
