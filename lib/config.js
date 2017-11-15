var config = {
    'dev' : 'localhost',
    'production' : '47.95.114.247'
}

function domain() {
    return config[global.ENV]
}

module.exports = {
    domain
}