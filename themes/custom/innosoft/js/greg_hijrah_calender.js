function GregorianToHijrahDate( gregorian_date_string ) {

    if ( typeof gregorian_date_string != 'string' ) {
        return false;
    }

    let gregorian_date_object = new Date(gregorian_date_string);
    let hijrah_date_object = new HijrahDate(gregorian_date_object);
    let hijrah_date_string = hijrah_date_object._year + '-' + hijrah_date_object._monthOfYear + '-' + hijrah_date_object._dayOfMonth;
    return hijrah_date_string;
}

function HijrahToGregorianDate( hijrah_date_string ) {
    
    if ( typeof hijrah_date_string != 'string' ) {
        return false;
    }

    let hijrah_date_string_object = hijrah_date_string.split('-');
    let hijrah_date_string_year = Number(hijrah_date_string_object[0]);
    let hijrah_date_string_month = Number(hijrah_date_string_object[1]); 
    let hijrah_date_string_day = Number(hijrah_date_string_object[2]);

    let gregorian_date_object = new HijrahDate(hijrah_date_string_year, hijrah_date_string_month, hijrah_date_string_day).toGregorian();
    let gregorian_date_string = gregorian_date_object.getFullYear() + '-' + gregorian_date_object.getMonth() + '-' + gregorian_date_object.getDate();
    return gregorian_date_string;
}

function convertDateToStandard(date,date_format,delimeter) {

    date_object = date.split(delimeter);
    format_checker = date_format.split(delimeter);
    _DD_ = format_checker.indexOf('DD');
    _MM_ = format_checker.indexOf('MM');
    _YYYY_ = format_checker.indexOf('YYYY');
    standard_delimeter = '-';
    _dd_ = ( date_object[_DD_].length < 2 ) ? '0'+date_object[_DD_] : date_object[_DD_];
    _mm_ = ( date_object[_MM_].length < 2 ) ? '0'+date_object[_MM_] : date_object[_MM_];
    _yyyy_ = date_object[_YYYY_];
    return _yyyy_+standard_delimeter+_mm_+standard_delimeter+_dd_;
    
}