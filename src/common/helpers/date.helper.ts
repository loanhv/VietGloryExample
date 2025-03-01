import moment from 'moment-timezone';

export const formatDateFromUTC = (date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss', toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment.utc(date, fromFormat).tz('UTC').format(toFormat);
};

export const formatRawDate = (date: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).format(toFormat);
};

export const formatDate = (date: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).tz('UTC').format(toFormat);
};

export const formatUTCDate = (date: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment.tz(date, 'UTC').utc().format(toFormat);
};

export const formatToDate = (date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date, fromFormat).tz('UTC').toDate();
};

export const getDateNow = (toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment().tz('UTC').format(toFormat);
};

export const getUTCNow = (toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment.utc().format(toFormat);
};

export const getUTCTimestamp = () => {
    return moment.utc().unix();
};

export const subtractMinute = (from: string, subtract_minutes: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_minutes, 'minutes').format(toFormat);
};

export const subtractHour = (from: string, subtract_hours: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_hours, 'hours').format(toFormat);
};

export const subtractDate = (from: string, subtract_days: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_days, 'days').format(toFormat);
};

export const addDate = (from: string, add_days: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).add(add_days, 'days').format(toFormat);
};

export const subtractYear = (from: string, subtract_years: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_years, 'years').format(toFormat);
};

export const checkValidDate = (date: string, fromFormat: string = 'YYYY-MM-DD') => {
    return moment(date, fromFormat).isValid();
};

export const compareDateSameOrBefore = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD') => {
    return moment(from_date, fromFormat).isSameOrBefore(moment(to_date, fromFormat));
};

export const compareDateBefore = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD') => {
    return moment(from_date, fromFormat).isBefore(moment(to_date, fromFormat));
};

export const compareDateSame = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD') => {
    return moment(from_date, fromFormat).isSame(moment(to_date, fromFormat));
};

export const diffYears = (
    fromDate: string | null | undefined,
    toDate = moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    fromFormat: string = 'YYYY',
) => {
    if (fromDate && toDate) {
        const dateEnd = moment(toDate).format(fromFormat);
        const dateStart = moment(fromDate).format(fromFormat);
        const years = moment(dateEnd, fromFormat).diff(moment(dateStart, fromFormat), 'years');

        return years;
    }
    return null;
};
