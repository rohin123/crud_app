cp ./src/utils/constants.prod.js ./src/utils/constants.js
webpack --config webpack.config.js
cp ./src/utils/constants.local.js ./src/utils/constants.js