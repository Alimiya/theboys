const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Слишком много запросов. Попытайтесь позже."
})

const postLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Слишком много запросов. Попытайтесь позже"
})

const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Слишком много попыток. Попытайтесь позже"
})

module.exports = {limiter, postLimiter, authLimiter}