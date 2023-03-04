const dayjs = require('dayjs')

const date_filter_map = {
    LAST_30_MINS: {value: 30, unit: "minute"},
    LAST_1_HOUR: {value: 1, unit: "hour"},
    LAST_1_MONTH: {value: 1, unit: "month"},
    LAST_3_MONTHS: {value: 3, unit: "month"},
} 

const getCurrentTime = () => {
    return dayjs().add(5, 'hour').add(30, 'minute').$d
}

const filteredDate = (filter) => {
    const date_filter = date_filter_map[filter]
    return dayjs().add(5, 'hour').add(30, 'minute').subtract(date_filter.value, date_filter.unit).$d
}

module.exports = {getCurrentTime, filteredDate}