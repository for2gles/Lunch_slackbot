import axios from "axios";
import moment from "moment";
import CONFIG from '../config/bot.json';
export async function get_userinfo(user: string) {
    const result = await axios.get(
        `https://slack.com/api/users.info?user=${user}`,
        {
            headers: {
                Authorization: `Bearer ${CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN}`
            }
        }
    );
    return result.data
}



export function get_today_purchase() {
    const thisWeek = moment().week();
    const total = CONFIG.PURCHASE.length;
    let thisIndex = thisWeek - 17;//허팀부터 시작했습니다 22번째주에 index5번 허팀
    if (Math.floor(thisIndex / total) >= 1) {
        thisIndex -= (total * Math.floor(thisIndex / total));
    }
    return CONFIG.PURCHASE[thisIndex];
}