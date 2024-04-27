const swipl = require('swipl');
const query = new swipl.Query('member(X, [1,2,3,4])');
let ret = null;
while (ret = query.next()) {
    console.log(`Variable X value is: ${ret.X}`);
}