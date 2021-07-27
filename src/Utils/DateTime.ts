import moment from "moment";

function format(format: string, date: Date = new Date()) {
    return moment(date).format(format);
}

function getThu(date: Date) {
    // Lấy tên thứ của ngày hiện tại
    let day_name = ""
    let dayIndex = moment(date).day();
    switch (dayIndex) {
        case 0:
            day_name = "CN";
            break;
        default:
            day_name = `Th${dayIndex + 1}`;
            break;
    }
    return day_name;
}

export default {
    format, getThu
};
