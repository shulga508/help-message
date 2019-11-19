import {INTERVAL_BETWEEN_MESSANGES, INTERVAL_BETWEEN_QUEUES, SEND_MESSAGE_API_URL, COUNT_PER_MINUTE} from "../config/constants.js";


class Sender
{
    constructor(users){
        this.users = users;
        console.log(this.users);
        this.counter = 0;
    }

    send(message = 'hello') {
        let self = this;

        var sendMessages = () => {
            console.log(this.users);
            for (var i = 0; i < COUNT_PER_MINUTE; i++) {
                console.log(self.users);
                setTimeout(() => {
                    console.log(self.users);
                    let notProcessedUsers = self.users.filter(function (elem) {
                        console.log(elem);
                        return typeof elem.member.processed == 'undefined';
                    })
                    console.log(notProcessedUsers);


                    if (notProcessedUsers.length === 0) {
                        clearInterval(self.queueInterval);
                        return;
                    }
                    let currentUser = notProcessedUsers[0].member;
                    console.log(currentUser);
                    let formattedMessage = self.formatMessage(message, currentUser.name);
                    let formData = new FormData();
                    formData.append('tag', currentUser.id);
                    formData.append('source', 'lc');
                    formData.append('message', formattedMessage);
                    let ddata = {
                        'tag': currentUser.id,
                        'source': 'lc',
                        'message': 'Hello',
                    }
                    console.log(formData.get('message'));
                    var http = new XMLHttpRequest();

                    var params = 'tag=' + ddata.tag + '&source=lc&message=Hello' + message;
                    http.open('POST', SEND_MESSAGE_API_URL + currentUser.id, true);


                    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                    http.onreadystatechange = () => {

                        self.users.map(function (elem, index) {
                            if (elem.member.id === currentUser.id) {
                                self.users[index].member.processed = true;
                                console.log(elem);

                            }

                        }).processed = true

                    };
                    http.send(params);
                    self.counter++;
                }, i * INTERVAL_BETWEEN_MESSANGES)
            }
        }
        sendMessages();
        this.queueInterval = setInterval(sendMessages, INTERVAL_BETWEEN_QUEUES);


    }

    formatMessage(message, name) {
        let re = '{name}';
        return message.replace(re, name);
    }

}

export default Sender;