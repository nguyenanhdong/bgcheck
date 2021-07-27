// import currencyFormatter from 'currency-formatter'
import moment from 'moment';

export default {
    /**
     * Get substring of raw text after a substring
     * 
     * @param raw 
     * @param substring 
     * 
     * @returns substring after a given substring
     */
    getPostFixOfSubstring(raw: string, substring: string): string {
        const lastIndexOfSubInRaw = raw.indexOf(substring) + substring.length

        return raw.slice(lastIndexOfSubInRaw)
    },

    convertSecoundToDate(time: number) {
        let second = Math.ceil(time / 1000)
        let tempDay = Math.floor(second / (60 * 60 * 24))
        let remain = second
        console.log('=====')
        console.log('time', second);
        console.log('=====')
        if (tempDay > 0) {
            remain = second - tempDay * (60 * 60 * 24)
            let tempHour = Math.floor(remain / (60 * 60))
            let tempMinute = Math.floor((remain - tempHour * 60 * 60) / 60)
            console.log('remain: ', tempDay + " ngày," + tempHour + "" + tempMinute + "'");
            return tempDay + " ngày " + tempHour + " giờ " + (tempMinute === 0 ? "" : tempMinute + " phút")

        } else {
            let tempMinute = Math.ceil(second / 60)
            let hour = (tempMinute - tempMinute % 60) / 60
            let minute = tempMinute % 60
            let remainTime = ''
            if (hour > 0) {
                remainTime = hour + " giờ " + (minute === 0 ? "" : minute + " phút")
            } else {
                remainTime = minute + " phút"
            }
            return remainTime
        }
    },

    // currenry(raw: string | number): string {
    //     return currencyFormatter.format(Number(raw), { code: 'VND' });
    // },

    // currenryWithoutSymbol(raw: string | number): string {
    //     if (!Number(raw)) return ""
    //     const format = currencyFormatter.format(Number(raw), { code: 'VND' })
    //     return format.slice(0, format.length - 2)
    // },

    // unFormatCurrency(raw: string): string {
    //     return currencyFormatter.unformat(raw, { code: "VND", decimal: "," }).toString()
    // },

    convertTimeFormat(time: string, format: string): string {
        let date = moment(new Date()).format("YYYY-MM-DD")
        let output = moment(date + " " + time).format(format)
        return output
    },

    phoneFormat(phoneNumber: string): string {
        let result = phoneNumber.replace(/\s/g, '')
        console.log('phone NUmber in', phoneNumber)
        if (result.substring(0, 2) == "84" && (result.length == 11 || result.length == 12)) {
            result = result.slice(2, result.length)
        }
        console.log('phone NUmber out', result)
        return result
    },

    convertDateFormat(date: string | number | Date, curFormat?: string, toFormat?: string): string {
        let defaultFormat = !!toFormat ? toFormat : 'DD/MM/YYYY HH:mm:ss'
        let output = !!curFormat ?
            moment(date, curFormat).format(defaultFormat) :
            moment(date).format(defaultFormat)
        return output
    },

    xoa_dau(str) {
        if (!str) return str;

        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    },

    convertThumbnail(thumb: string) {
        // https://id.pga.vn/uploads/2019_08_28/kidsup-6-thang-1567005769.jpeg
        return thumb.indexOf("http") == 0
            ? thumb
            : `https://id.pga.vn/uploads/${thumb}`
    }
}