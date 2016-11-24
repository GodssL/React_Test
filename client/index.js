/**
 * Created by root on 16-11-24.
 */
var $ = require("jquery");
var wocale = new Set();

[2, 3, 5, 4, 5, 2, 2].map(x => wocale.add(x));

for (let i of wocale) {
    console.log(i);
}
console.log($("#haha").html());