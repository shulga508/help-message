import {GET_ONLINE_USERS_API_URL} from "../config/constants.js";

class List
{
    constructor() {
        this.users = [];
    }

    getUserList = async () => {
        let res = await fetch(GET_ONLINE_USERS_API_URL);
        console.log(res);
        let response = await res.json();
        console.log(response);
        this.users = response[0].updates;
        console.log(this.users)
    }

    filterUsers(filters) {
        this.targetUsers = this.users.filter(function (elem) {
            let ageFilter = filters.age && filters.age != '0' ? elem.member.age == filters.age : true;
            let countryFilter = filters.country && filters.country != '0' ? elem.member.country == filters.country : true;
            let vipFilter = filters.isVip && filters.isVip == 'apply' ? elem.member.isVip === true : true;
            return ageFilter && countryFilter && vipFilter;
        })
    }
}

export default List;