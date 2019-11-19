import {INTERVAL_BETWEEN_MESSANGES, INTERVAL_BETWEEN_QUEUES, SEND_MESSAGE_API_URL} from "../config/constants.js";

class Sender
{
    constructor(users){
        this.users = users;
    }

    send(message) {

        console.log(this.users);
        var processUser = () => {
            let notProcessedUsers = this.users.filter(function (elem) {
                console.log(elem);
                return typeof elem.processed == 'undefined';
            })
            console.log(notProcessedUsers);
            if (notProcessedUsers.length === 0) {
                clearInterval(messagesInterval);
                clearInterval(queueInterval);
                return;
            }
            let currentUser = notProcessedUsers[0].member;
            console.log(currentUser);
            let formattedMessage = this.formatMessage(message, currentUser.name);
            let formData = new FormData()
            formData.append('tag', currentUser.id);
            formData.append('source', 'lc');
            formData.append('message', formattedMessage);
            let ddata = {
                'tag': currentUser.id,
                'source': 'lc',
                'message': 'Hello',
            }
            console.log(formData.get('message'));
            // let res = fetch(SEND_MESSAGE_API_URL + currentUser.id, {
            //     method: 'POST',
            //     body: JSON.stringify(ddata),
            //    headers: {
            //   //'Content-Type': 'application/json',
            //           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //     },
            // }).then(res => res.json()).then(data => this.users.find(function (elem) {
            //     console.log(elem);
            //     return elem.member === currentUser.id
            // }).processed = true);
            var http = new XMLHttpRequest();

            var params = 'tag=' + ddata.tag + '&source=lc&message=Hello' + message;
            http.open('POST', SEND_MESSAGE_API_URL + currentUser.id, true);


            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange =  () => {
                if (http.readyState == 4 && http.status == 200) {
                    this.users.find(function (elem) {
                        console.log(elem);
                        return elem.member === currentUser.id
                    }).processed = true
                }
            };
            http.send(params);
        }

            var messagesInterval = setInterval(processUser, INTERVAL_BETWEEN_MESSANGES);
            var queueInterval = setInterval(messagesInterval, INTERVAL_BETWEEN_QUEUES);


    }

    formatMessage(message, name) {
        let re = /{name}/gi
        return message.replace(re, name);
    }

}

export default Sender;