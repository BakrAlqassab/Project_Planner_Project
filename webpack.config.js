// eslint-disable-next-line no-undef
const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
// Webpack need to know where the Start Point which here is the app.js and then check the import and related files
mode:'development',
entry:'./src/app.js',
output : {
    filename:'app.js',
    // eslint-disable-next-line no-undef
    path:path.resolve(__dirname,'assets','scripts'),
    publicPath:'assets/scripts/'
},
// devServer:{

//     contentBase:'./'
// }



    
};