$(function() {

    let Gregorian_Events = [];
    let Hijrah_Events = [];
    let returned_events = [];
    let todays_date = new Date();
    let todaya_date_hijrah_object = new HijrahDate(todays_date);
    let todays_date_in_hijrah = convertDateToStandard(GregorianToHijrahDate( todays_date.getFullYear()+'-'+(todays_date.getMonth()+1)+'-'+todays_date.getDate()), 'YYYY-MM-DD', '-' );

    function loadEventsFromAPI() {
//         $.ajax({
//             url: 'http://127.0.0.1/api.php',
//             method: 'GET',
//             dataType: 'json',
//             success: function ( response ) {
//                 returned_events = response;
//             },
//             error: function () {
//                 alert("Error Occured");
//             }
//         })

        returned_events = {};
        returned_events['events'] = [
            {
                'title' : 'معرض انوسوفت',
								'description':'العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.',
              'start' : '18-01-2020',
							'location':' انوسوفت ',
							'time' : '  4 مساءً -10 مساءً ',
							'link' : 'calendarDetails.html'


            }
        ]
    }


    loadEventsFromAPI();

    let check_if_events_are_loaded = setInterval( () => {

        if( typeof returned_events['events'] !== 'undefined' ) {
            clearInterval(check_if_events_are_loaded);

            for( i = 0; i< returned_events['events'].length; i++ ) {
                event = { ...returned_events['events'][i] }
                event['start'] = convertDateToStandard( returned_events['events'][i]['start'],'DD-MM-YYYY','-' );

                if ( typeof returned_events['events'][i]['end'] !== 'undefined' ) {
                    event['end'] = convertDateToStandard( returned_events['events'][i]['end'] ,'DD-MM-YYYY','-' );
                }
                Gregorian_Events.push(event);
            }

            for( i = 0; i< returned_events['events'].length; i++ ) {
                event = { ...returned_events['events'][i] }
                event['start'] = GregorianToHijrahDate( convertDateToStandard( returned_events['events'][i]['start'],'DD-MM-YYYY','-' ) )

                if ( typeof returned_events['events'][i]['end'] !== 'undefined' ) {
                    event['end'] = GregorianToHijrahDate( convertDateToStandard( returned_events['events'][i]['end'] ,'DD-MM-YYYY','-' ) );
                }
                Hijrah_Events.push(event);
            }

            addEventsToCalendar();
        }

    }, 1000);

    $('#calendar').fullCalendar({
        customButtons: {
            show_gregorian: {
                text: 'Gregorian',
                click: function() {
                    $('#calendar-2, #date-picker-hijrah').css('display','none');
                    $('#calendar, #date-picker-gregorian').css('display','block');
                }
            },
            show_hijrah : {
                text: 'Hijrah',
                click: function() {
                    $('#calendar-2, #date-picker-hijrah').css('display','block');
                    $('#calendar, #date-picker-gregorian').css('display','none');
                }
            }
        },

        header: {
            left: 'prev,next today ',
            center: 'title',
            right: 'show_gregorian show_hijrah'
          }
        ,

        eventClick: function(calEvent, jsEvent, view, resourceObj) {
					$('#modalTitle').html(calEvent.title);
            $('#description').html(calEvent.description);
						$('#location').html(calEvent.location);
          $('#time').html(calEvent.time);
            $('#eventUrl').attr('href',calEvent.link);
            $('#calendarModal').modal();
//           $("#successModal").modal("show");
//           $("#successModal .modal-body p").text('Resource ID: ' + resourceObj.title);
        },

        dayClick: function(date, jsEvent, view,resourceObj) {
            //when a date column is clicked
        },

        eventSources: []
    })

    $('#calendar-2').fullCalendar({
        customButtons: {
            show_gregorian: {
                text: 'Gregorian',
                click: function(e) {
                    $('#calendar-2, #date-picker-hijrah').css('display','none');
                    $('#calendar, #date-picker-gregorian').css('display','block');
                }
            },

        },

        header: {
            left: 'prev,next today ',
            center: 'title',
            right: 'show_gregorian show_hijrah'
          }
        ,

        defaultDate: todays_date_in_hijrah
        ,

        monthNames: ["Muharram","Safar","Rabi' al-awwal","Rabi' al-thani","Jumada al-awwal","Jumada al-thani","Rajab","Sha'aban","Ramadan","Shawwal","Dhu al-Qi'dah","Dhu al-Hijjah"]
        ,
        monthNamesShort: []
        ,
        dayNames: ["Yawm ath-Thulāthā’","Yawm al-Arba‘ā’","Yawm al-Khamīs","Yawm al-Jum‘ah","Yawm as-Sabt","Yawm al-Aḥad","Yawm al-Ithnayn"]
        ,
        dayNamesShort: ['Th','Ar','Kh','Ju','Sa','Ah','It']
        ,

        eventClick: function(event, element) {
            //this function fires when an event is clicked on the calender
          $("#successModal").modal("show");
          $("#successModal .modal-body p").text('Resource ID: ' + resourceObj.title);
        },

        eventSources: []
    })

    $('#calendar-2').css('display','none');

    function addEventsToCalendar() {
        $('#calendar').fullCalendar( 'addEventSource', { events : [ ...Gregorian_Events ], color: 'blue', textColor: 'red'} );
        $('#calendar-2').fullCalendar( 'addEventSource', { events : [ ...Hijrah_Events ], color: 'rgb(40, 44, 52)', textColor: 'red'} );
        $('#calendar-2 td[data-date="'+todays_date_in_hijrah+'"]').css('background','#fcf8e3');
    }

    $('#calendar-2 .fc-today-button').on('click', function(e) {
        e.preventDefault();
        $('#calendar-2').fullCalendar( 'gotoDate', todays_date_in_hijrah );
        $('#calendar-2 td[data-date="'+todays_date_in_hijrah+'"]').css('background','#fcf8e3');
    })

    $('#calendar-2 .fc-prev-button').on('click', function(e) {
        $('#calendar-2 td[data-date="'+todays_date_in_hijrah+'"]').css('background','#fcf8e3');
    })

    $('#calendar-2 .fc-next-button').on('click', function(e) {
        $('#calendar-2 td[data-date="'+todays_date_in_hijrah+'"]').css('background','#fcf8e3');
    })

    function generateGregorianPickerYear() {
        const start_year_gregorian = $('#date-picker-year-gregorian').attr('start-year');
        let options_gregorian = '';
        for(i = Number(start_year_gregorian); i < Number(start_year_gregorian) + 10; i++ ) {
            options_gregorian += '<option name="'+i+'"> '+i+' </option>';
        }

        $('#date-picker-year-gregorian').html(options_gregorian);
        $('#date-picker-year-gregorian').val(todays_date.getFullYear());
        month_now = (String(todays_date.getMonth() + 1).length < 2 ) ? '0'+(todays_date.getMonth() + 1): (todays_date.getMonth() + 1);
        $('#date-picker-month-gregorian').val(month_now);

        const start_year_hijrah = $('#date-picker-year-hijrah').attr('start-year');
        let options_hijrah = '';
        for(i = Number(start_year_hijrah); i < Number(start_year_hijrah) + 10; i++ ) {
            options_hijrah += '<option name="'+i+'"> '+i+' </option>';
        }

        $('#date-picker-year-hijrah').html(options_hijrah);
        $('#date-picker-year-hijrah').val(todaya_date_hijrah_object._year);

        month_now_hijrah = (String(todaya_date_hijrah_object._monthOfYear).length < 2 ) ? '0'+(todaya_date_hijrah_object._monthOfYear): (todaya_date_hijrah_object._monthOfYear);
        $('#date-picker-month-hijrah').val((month_now_hijrah));
    }


    function listenToDatePicker() {
        $('#date-picker-year-gregorian').on('change',function(e){
            $('#calendar').fullCalendar( 'gotoDate', String(e.target.value)+'-'+$('#date-picker-month-gregorian').val()+'-01');
        })

        $('#date-picker-month-gregorian').on('change',function(e){
            $('#calendar').fullCalendar( 'gotoDate', $('#date-picker-year-gregorian').val()+'-'+String(e.target.value)+'-01');
        })


        $('#date-picker-year-hijrah').on('change',function(e){
            $('#calendar-2').fullCalendar( 'gotoDate', String(e.target.value)+'-'+String($('#date-picker-month-hijrah').val())+'-01');
        })

        $('#date-picker-month-hijrah').on('change',function(e){
            $('#calendar-2').fullCalendar( 'gotoDate', String($('#date-picker-year-hijrah').val())+'-'+String(e.target.value)+'-01');
        })
    }

    generateGregorianPickerYear();
    listenToDatePicker();

});
