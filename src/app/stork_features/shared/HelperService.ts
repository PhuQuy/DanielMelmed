export default class HelperService {

    // static stringToDate(_date, _format, _delimiter) {
    //     var formatLowerCase = _format.toLowerCase();
    //     var formatItems = formatLowerCase.split(_delimiter);
    //     var dateItems = _date.split(_delimiter);
    //     var monthIndex = formatItems.indexOf("mm");
    //     var dayIndex = formatItems.indexOf("dd");
    //     var yearIndex = formatItems.indexOf("yyyy");
    //     var month = parseInt(dateItems[monthIndex]);
    //     month -= 1;
    //     var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    //     return formatedDate;
    // }


    static toDateString(date: Date): string {
        // var date = new Date();
        // alert(date);
        return (date.getFullYear().toString() + '-'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
            + ("0" + (date.getDate())).slice(-2))
            + 'T' + date.toTimeString().slice(0, 5);
    }

    static toStringDate(date: string): Date {
        // var date = new Date();
        // alert(date);
        return new Date(date);
    }

}