const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const rotateTransport = new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
})

const consoleTransport = new winston.transports.Console()

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        rotateTransport,
        consoleTransport
    ]
})

const requestLogger = (req, res, next) => {
    logger.info(`Получен ${req.method} запрос на ${req.url}`)
    next()
}

module.exports = { logger, requestLogger }
