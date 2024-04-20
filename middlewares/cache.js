const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 600 })

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url
    const cachedData = myCache.get(key)

    if (cachedData) {
        res.status(200).json(cachedData)
    } else {
        res.sendResponse = res.json
        res.json = (body) => {
            myCache.set(key, body)
            res.sendResponse(body)
        }
        next()
    }
}

module.exports = {cacheMiddleware}