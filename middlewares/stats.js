const Stats = require('../models/statsModel')

const updateStatistics = async (page, visitorIP) => {
    try {
        const today = new Date()
        today.setUTCHours(0, 0, 0, 0)

        const existingStats = await Stats.findOne({
            page,
            'date.year': today.getFullYear(),
            'date.month': today.getMonth() + 1,
            'date.day': today.getDate()
        })

        if (existingStats) {
            if (!existingStats.uniqueVisitors.includes(visitorIP)) {
                existingStats.uniqueVisitors.push(visitorIP)
            }

            existingStats.visits += 1
            await existingStats.save()
        } else {
            await Stats.create({
                page, visits: 1, uniqueVisitors: [visitorIP], date: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                }
            })
        }
    } catch (err) {
        console.error('Internal server error')
    }
}

module.exports = {updateStatistics}