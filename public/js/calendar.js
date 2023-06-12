//global variables
const monthEl = $(".c-main");
const dataCel = $(".c-cal__cel");
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1;
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const monthText = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const indexMonth = month;
const todayBtn = $(".c-today__btn");
const addBtn = $(".js-event__add");
const saveBtn = $(".js-event__save");
const closeBtn = $(".js-event__close");
const winCreator = $(".js-event__creator");
const inputDate = $(this).data();
today = year + "-" + month + "-" + day;


// ------ set default events -------
function defaultEvents(dataDay, dataName, dataNotes, classTag) {
    const date = $('*[data-day=' + dataDay + ']');
    date.attr("data-name", dataName);
    date.attr("data-notes", dataNotes);
    date.addClass("event");
    date.addClass("event--" + classTag);
}

// defaultEvents(today, 'YEAH!', 'Today is your day', 'important');
// defaultEvents('2023-12-25', 'MERRY CHRISTMAS', 'A lot of gift!!!!', 'festivity');
// defaultEvents('2023-05-04', "LUCA'S BIRTHDAY", 'Another gifts...?', 'birthday');
// defaultEvents('2023-03-03', "MY LADY'S BIRTHDAY", 'A lot of money to spent!!!!', 'birthday');


// ------ functions control -------

//button of the current day
todayBtn.on("click", function () {
    if (month < indexMonth) {
        const step = indexMonth % month;
        movePrev(step, true);
    } else if (month > indexMonth) {
        step = month - indexMonth;
        moveNext(step, true);
    }
});

//higlight the cel of current day
dataCel.each(function () {
    if ($(this).data("day") === today) {
        $(this).addClass("isToday");
        fillEventSidebar($(this));
    }
});

//window event creator
addBtn.on("click", function () {
    winCreator.addClass("isVisible");
    $("body").addClass("overlay");
    dataCel.each(function () {
        if ($(this).hasClass("isSelected")) {
            today = $(this).data("day");
            document.querySelector('input[type="date"]').value = today;
        } else {
            document.querySelector('input[type="date"]').value = today;
        }
    });
});
closeBtn.on("click", function () {
    winCreator.removeClass("isVisible");
    $("body").removeClass("overlay");
});
saveBtn.on("click", function () {
    const inputName = $("input[name=name]").val();
    const inputDate = $("input[name=date]").val();
    const inputNotes = $("textarea[name=notes]").val();
    const inputTag = $("select[name=tags]")
        .find(":selected")
        .text();

    dataCel.each(function () {
        if ($(this).data("day") === inputDate) {
            if (inputName != null) {
                $(this).attr("data-name", inputName);
            }
            if (inputNotes != null) {
                $(this).attr("data-notes", inputNotes);
            }
            $(this).addClass("event");
            if (inputTag != null) {
                $(this).addClass("event--" + inputTag);
            }
            fillEventSidebar($(this));
        }
    });

    console.log("fetch")
    fetch('/cal', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'title': inputName,
            'date': inputDate,
            'note': inputNotes,
            "tag": inputTag
        })
    })

    winCreator.removeClass("isVisible");
    $("body").removeClass("overlay");
    $("#addEvent")[0].reset();
});

//fill sidebar event info
function fillEventSidebar(self) {
    $(".c-aside__event").remove();
    const thisName = self.attr("data-name");
    const thisNotes = self.attr("data-notes");
    const thisImportant = self.hasClass("event--important");
    const thisBirthday = self.hasClass("event--birthday");
    const thisFestivity = self.hasClass("event--festivity");
    const thisEvent = self.hasClass("event");

    switch (true) {
        case thisImportant:
            $(".c-aside__eventList").append(
                "<p class='c-aside__event c-aside__event--important'>" +
                thisName +
                " <span> • " +
                thisNotes +
                "</span></p>"
            );
            break;
        case thisBirthday:
            $(".c-aside__eventList").append(
                "<p class='c-aside__event c-aside__event--birthday'>" +
                thisName +
                " <span> • " +
                thisNotes +
                "</span></p>"
            );
            break;
        case thisFestivity:
            $(".c-aside__eventList").append(
                "<p class='c-aside__event c-aside__event--festivity'>" +
                thisName +
                " <span> • " +
                thisNotes +
                "</span></p>"
            );
            break;
        case thisEvent:
            $(".c-aside__eventList").append(
                "<p class='c-aside__event'>" +
                thisName +
                " <span> • " +
                thisNotes +
                "</span></p>"
            );
            break;
    }
};
dataCel.on("click", function () {
    const thisEl = $(this);
    const thisDay = $(this)
        .attr("data-day")
        .slice(8);
    const thisMonth = $(this)
        .attr("data-day")
        .slice(5, 7);

    fillEventSidebar($(this));

    $(".c-aside__num").text(thisDay);
    $(".c-aside__month").text(monthText[thisMonth - 1]);

    dataCel.removeClass("isSelected");
    thisEl.addClass("isSelected");

});

//function for move the months
function moveNext(fakeClick, indexNext) {
    for (let i = 0; i < fakeClick; i++) {
        $(".c-main").css({
            left: "-=100%"
        });
        $(".c-paginator__month").css({
            left: "-=100%"
        });
        switch (true) {
            case indexNext:
                indexMonth += 1;
                break;
        }
    }
}
function movePrev(fakeClick, indexPrev) {
    for (let i = 0; i < fakeClick; i++) {
        $(".c-main").css({
            left: "+=100%"
        });
        $(".c-paginator__month").css({
            left: "+=100%"
        });
        switch (true) {
            case indexPrev:
                indexMonth -= 1;
                break;
        }
    }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
    switch (true) {
        case next:
            $(buttonId).on("click", function () {
                if (indexMonth >= 2) {
                    $(mainClass).css({
                        left: "+=100%"
                    });
                    $(monthClass).css({
                        left: "+=100%"
                    });
                    indexMonth -= 1;
                }
                return indexMonth;
            });
            break;
        case prev:
            $(buttonId).on("click", function () {
                if (indexMonth <= 11) {
                    $(mainClass).css({
                        left: "-=100%"
                    });
                    $(monthClass).css({
                        left: "-=100%"
                    });
                    indexMonth += 1;
                }
                return indexMonth;
            });
            break;
    }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);
