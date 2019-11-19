import List from './functions/List.js'
import Sender from './functions/Sender.js'

var list = new List();

list.getUserList();


setTimeout(function() {


    console.log(list.users);
    document.head.innerHTML += "<link rel='stylesheet' type='text/css' href='//ukrainiangirls.pw/svadba12/svadba.css' />";
    document.head.innerHTML += '<link href="//ukrainiangirls.pw/static/css/iframes.css" rel="stylesheet">';
    document.body.innerHTML += '<div id="hc-trigger"><img class="trig" src="//ukrainiangirls.pw/static/imgs/logo.png" alt="Logo"></div>';

    let form = '<div id="hc-plugin"></div>';

    document.body.innerHTML += form;
    let countriesSelect = '<label for="countries">Страна</label><select id="countries"></select>';

    let renderedForm = document.getElementById('hc-plugin');
    renderedForm.innerHTML += countriesSelect;
    let countries = [];
    list.users.map(function (elem) {
        if (!countries.includes(elem.member.country)){
            countries.push(elem.member.country);
        }
    })

    countries.map((elem) => {
        let option = '<option value="' + elem + '">' + elem + '</option>';
        document.getElementById('countries').innerHTML += option;
    })

    let ageInput = '<label for="age">Возраст</label><input type="text" id="age">';
    let isVip = '<label for="isVip">Только VIP</label> <input type = "checkbox" id="isVip" >';

    let messageArea = '<label for="message">Сообщение ({name} будет заменено на имя пользователя)</label><textarea id="message"></textarea>';

    let submitButton = '<button id="send_to_all">Отправить</button>';


    renderedForm.innerHTML += '<br>';
    renderedForm.innerHTML += ageInput;
    renderedForm.innerHTML += '<br>';
    renderedForm.innerHTML += isVip;
    renderedForm.innerHTML += '<br>';
    renderedForm.innerHTML += messageArea;
    renderedForm.innerHTML += '<br>';
    renderedForm.innerHTML += submitButton;

    document.getElementsByTagName('body')[0].addEventListener('click', function (e) {
        console.log(e);
        if (e.target.classList.contains('trig')) {
            let b = document.getElementsByTagName('body')[0]
            b.querySelector('#hc-plugin').setAttribute('style',
                "opacity : 1; background-color: white; z-index: 20; visibility: unset"
                )
        }
    }, false);

    document.getElementById('send_to_all').addEventListener('click', function (e) {
        let filters = {
            country: document.getElementById('countries').value,
            age: document.getElementById('age').value,
            isVip: document.getElementById('countries').getAttribute('checked'),
        }
        console.log(filters);
        list.filterUsers(filters)
        let sender = new Sender(list.targetUsers);
        sender.send(document.getElementById('message').innerHTML);
    })



}, 4000);