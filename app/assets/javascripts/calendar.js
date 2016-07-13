$(document).ready(function () {
    var select = function(start, end, allDay) {
//        var title = window.prompt("title");
        var title = window.open("https://subaco-yasugahira0810.c9users.io/events/new", '_blank',
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes')
        var data = {event: {title: title,
                            start: start.format(),
                            end: end.format(), 
                            allDay: false}};
        $.ajax({
            type: "POST",
            url: "/events",
            data: data,
        }).done(function(data) {
            calendar.fullCalendar('refetchEvents');
        }).fail(function(data) {
                alert('FAILED!!!');
        });
        calendar.fullCalendar('unselect');
    };
    // Documentの読み込みが完了するまで待機し、カレンダーを初期化します。
    var calendar = $('#calendar').fullCalendar({
        // ヘッダーのタイトルとボタン
        header: {
            // title, prev, next, prevYear, nextYear, today
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'month agendaWeek agendaDay'
        },
        buttonIcons: {
            prev:     'left-single-arrow', // <
            next:     'right-single-arrow', // >
            prevYear: 'left-double-arrow',  // <<
            nextYear: 'right-double-arrow'  // >>
        },
        // jQuery UI theme
        theme: false,
        // 最初の曜日
        firstDay: 1, // 1:月曜日
        // 土曜、日曜を表示
        weekends: true,
        // 週モード
        fixedWeekCount: false,
        businessHours: {
            start: '08:00', // a start time (10am in this example)
            end: '23:00' // an end time (6pm in this example)
        },
        // 高さ(px)
        //height: 700,
        // コンテンツの高さ(px)
        //contentHeight: 600,
        // カレンダーの縦横比(比率が大きくなると高さが縮む)
        //aspectRatio: 1.35,
        // 初期表示ビュー
        defaultView: 'agendaWeek',
        // 終日スロットを表示
        allDaySlot: true,
        // 終日スロットのタイトル
        allDayText: '終日',
        // スロットの時間
        slotDuration: '00:30:00',
        // スロットの時間の書式
        slotLabelFormat: 'h(:mm)a',
        // スクロール開始時間
        scrollTime: '06:00:00',
        // 最小時間
        minTime: '00:00:00',
        // 最大時間
        maxTime: '24:00:00',
        // スロットの重複
        slotEventOverlap: false,
        // 現在時刻表示
        nowIndicator: true,
        // 時間の書式
        timeFormat: 'h:mm',
        // 列の書式
        columnFormat: {
            month: 'ddd',     // like 'Mon', for month view
            // TODO: Find the way to use ( and )
            week: 'M/D （ddd）', // like 'Mon 9/7', for week views
            day: 'M/D （ddd）'    // like 'Monday', for day views
        },
        // タイトルの書式
        titleFormat: {
            month: 'YYYY年 MMMM',   // like 'September 2009', for month view
            // TODO: Find the way to display duration
            week: "YYYY年 MMMM D日",  // like 'Sep 13 2009', for week views
            day: 'YYYY年 MMMM D日' // like 'September 8 2009', for day views
        },
        // ボタン文字列
        buttonText: {
            today:    '今日',
            month:    '月',
            week:     '週',
            day:      '日'
        },
        // 月名称
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        // 月略称
        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        // 曜日名称
        dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        // 曜日略称
        dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
        // イベント開始時間表示
        displayEventTime: true,
        // イベント終了時間表示
        displayEventEnd: true,
        // 複数日選択
        selectable: false,
        // 選択時にプレースホルダーを描画
        selectHelper: true,
        // 自動選択解除
        unselectAuto: true,
        // 自動選択解除対象外の要素
        unselectCancel: '',
        // event追加を許可
        selectable: true,
        // イベントソース
        events: '/events.json',
        selectable: true,
        selectHelper: true,
        ignoreTimezone: false,
        select: select
    });
    // 動的にオプションを変更する
    //$('#calendar').fullCalendar('option', 'height', 700);
 
    // カレンダーをレンダリング。表示切替時などに使用
    //$('#calendar').fullCalendar('render');
 
    // カレンダーを破棄（イベントハンドラや内部データも破棄する）
    //$('#calendar').fullCalendar('destroy')
});
