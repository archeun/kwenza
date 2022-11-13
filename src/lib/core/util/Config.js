import moment from "moment";

export default Intl = {
    formatDateTime: (datetime) => {
        const globalSettings = JSON.parse(localStorage.getItem('global-settings'))
        return moment(
            new Date(datetime)).format(`${globalSettings.Intl['date-format']} ${globalSettings.Intl['time-format']}`
        )
    },
    formatDateTimeForDatePicker: (datetime) => {
        const globalSettings = JSON.parse(localStorage.getItem('global-settings'))
        return moment(
            new Date(datetime)).format(`${globalSettings.Intl['date-format']}T${globalSettings.Intl['time-format']}`
        )
    }
}