import List from './functions/List.js'
import Sender from './functions/Sender.js'


    var list = new List();

    var sender;

    list.getUserList();


    setTimeout(function() {


        console.log(list.users);
         document.head.innerHTML += "<link rel='stylesheet' type='text/css' href='//ukrainiangirls.pw/svadba12/svadba.css' />";
         document.head.innerHTML += '<link href="//ukrainiangirls.pw/static/css/iframes.css" rel="stylesheet">';
         let diiv = document.createElement('div');
         diiv.id = 'hc-trigger';
         diiv.innerHTML = '<img class="trig" src="//ukrainiangirls.pw/static/imgs/logo.png" alt="Logo">';
         document.getElementsByTagName('body')[0].append(diiv);

        let form = document.createElement('div');
        form.id = 'hc-plugin';

        document.getElementsByTagName('body')[0].append(form);
        let countriesSelect = '<label for="countries">Страна</label><select id="countries"><option value="0">all</option></select>';

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
        let stopButton = '<button id="stop_sending">Остановить</button>';
        let count = '<div id="count_of_sended">Отправлено: 0</div>';


        renderedForm.innerHTML += '<br>';
        renderedForm.innerHTML += ageInput;
        renderedForm.innerHTML += '<br>';
        renderedForm.innerHTML += isVip;
        renderedForm.innerHTML += '<br>';
        renderedForm.innerHTML += messageArea;
        renderedForm.innerHTML += '<br>';
        renderedForm.innerHTML += submitButton;
        renderedForm.innerHTML += '<br>';
        renderedForm.innerHTML += stopButton;
        renderedForm.innerHTML += '<br>';
        renderedForm.innerHTML += count;

        document.getElementsByClassName('trig')[0].addEventListener('click', function (e) {
            console.log(e);
            if (!e.target.classList.contains('shown')) {

                document.querySelector('#hc-plugin').setAttribute('style',
                    "opacity : 1; background-color: aqua; z-index: 20; visibility: unset"
                )
                document.getElementsByClassName('trig')[0].classList.add('shown')
            } else {
                document.querySelector('#hc-plugin').setAttribute('style',
                    'visibility: hidden; z-index: 0;');
                document.getElementsByClassName('trig')[0].classList.remove('shown');
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
            sender = new Sender(list.targetUsers);
            sender.send(document.getElementById('message').innerHTML);
        });

        document.getElementById('stop_sending').addEventListener('click', function (e) {
            if (typeof sender !== 'undefined'){
                clearInterval(sender.queueInterval);
                document.getElementById('count_of_sended').innerHTML = 'Отправлено : ' + sender.counter;
            }
        });



    }, 4000);

