const LIST_USERS_SELECTOR = '#online-opponents .man-card';
const USER_ID_SELECTOR = '.profile-r h5 em.nowrap span';
const USER_COUNTRY_SELECTOR = '.profile-r span.country';
const USER_AGE_SELECTOR = '.profile-r span.age strong span';
const CHAT_TRIGGER_ELEM = '.profile-r .chat-trigger'
//const USER_VIP_SELECTOR = '.profile-l span.vip-icon l10n';
const CHAT_FORM_SELECTOR = '';
const CHAT_INPUT_SELECTOR = '#message';
const CHAT_SUBMIT_SELECTOR = '#send-message';

const INTERVAL_BETWEEN_MESSANGES = 4000;
const INTERVAL_BETWEEN_QUEUES = 60000;

class List
{
    constructor() {
        this.users = [];
    }

    getUserList() {
        let list = $(LIST_USERS_SELECTOR);
        console.log(list);
        let self = this;
        list.each(function (index) {
            let user = {
                id: $(this).find(USER_ID_SELECTOR).html(),
                age: $(this).find(USER_AGE_SELECTOR).html(),
                country: $(this).find(USER_COUNTRY_SELECTOR).html(),
                isVip: $(this).hasClass('vip'),
                actionElem: $(this).find(CHAT_TRIGGER_ELEM)
            };

            self.users.push(user);
        })
    }
}

class Messanger
{
    constructor() {
        this.message = '';

    }

    setMesage(message = '' ){
        this.message = message;
    }

    toUser(user) {
        user.actionElem.click();
    }

    sendMessage() {
        $(CHAT_INPUT_SELECTOR).html(this.message);
        $(CHAT_SUBMIT_SELECTOR).click();
    }
}

class Sender
{
    constructor(users) {
        this.users = users;
    }


}



setTimeout(function() {
    $("<link rel='stylesheet' type='text/css' href='//ukrainiangirls.pw/svadba12/svadba.css' />").appendTo("head");
    $('body').append('<iframe id="hc-plugin" srcdoc=""></iframe><div id="hc-trigger"><img src="//ukrainiangirls.pw/static/imgs/logo.png" alt="Logo"></div>\
	<div id="chat_act">\
		<b>Активные чаты</b>\
		<ul><li class="dis" align="center" style="padding:10px;"><span>Нет чатов</span></li></ul>\
	</div>\
	<div id="count_send"></div>\
');

    var plugin = $("#hc-plugin").get(0).contentWindow.document;
//position:fixed; left:125px; top:7px;
    plugin.open("text/html", "replace");
    plugin.write('<!DOCTYPE html><html lang="ru"><head>\
	<meta charset="utf-8">\
	<meta name="viewport" content="width=device-width, initial-scale=0.3">\
	<title>[TITLE]</title>\
	<link href="//ukrainiangirls.pw/static/css/style.css" rel="stylesheet"><link href="//ukrainiangirls.pw/static/css/jquery.scrollbar.css" rel="stylesheet">\
	<script src="//cdn.jsdelivr.net/g/jquery@2,bootstrap@3"></script>\
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.5.8/perfect-scrollbar.min.js"></script>\
	<script src="//ukrainiangirls.pw/static/js/jquery.scrollbar.min.js"></script>\
	<script src="//ukrainiangirls.pw/static/js/functions.js"></script>\
	<style>\
#tab-history { display:none; opacity:0; height:420px; overflow-y:auto; }\
#tab-history table { width:100%; }\
#tab-history td { cursor:pointer; }\
#update-online { width:20px; cursor:pointer; }\
input[type="date"]::-webkit-clear-button, input[type="date"]::-ms-clear { display: none; }\
\
#tab3 table { width:100%;text-align:center; }\
#tab3 th { font-weight:bold;text-align:center; }\
#history, #history-with-man { height:380px;overflow-y:scroll; }\
tr.select-man { cursor:pointer; }\
\
sup { color:red; }\
	</style>\
</head><body>\
   \   <h2>Here is my first extention!!! Svadba-CHATTT!!</h2> \
   \
    </body>\
    </html>',);

    $("head").append('<link href="//ukrainiangirls.pw/static/css/iframes.css" rel="stylesheet">');
    $('#hc-trigger').click(function (e) {
        $('#hc-plugin').toggleClass("showed").css("position", "");

        e.preventDefault();
        e.stopPropagation();
    });


    setTimeout(function () {
        let list = new List();

        list.getUserList();
        console.log(list.users);
    }, 4000)

}, 4000);