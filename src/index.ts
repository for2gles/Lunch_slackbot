// 업데이트 된 src/index.ts

import express from 'express';
import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import { createServer } from 'http';
import { get_userinfo, get_today_purchase } from './function';

// 생성한 슬랙앱에 대한 키값들
import CONFIG from '../config/bot.json';
import moment from 'moment';
/* 
  {
    "SIGNING_SECRET": "XXXX",
    "BOT_USER_OAUTH_ACCESS_TOKEN": "xoxb-XXXX"
  }
 */

const memory = {}
set_member_reset();

// 슬랙에서 슬랙앱에게 접근가능한 엔드포인트를 만들기 위해 웹서버(express)를 사용
const app = express();

const slackEvents = createEventAdapter(CONFIG.SIGNING_SECRET);
const webClient = new WebClient(CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN);

// 메시지 이벤트 구독하기
slackEvents.on('message', async (event) => {
  // console.log(event);
  const split_text: string[] = event.text.split(' ');
  if (event.text == '$초기화' || event.text == '$밥먹자') {
    set_member_reset();
    await do_order_chat(event);
  }

  if (event.text == '$상태' || event.text == '$현황') {
    await do_order_chat(event);
  }

  if (event.text == '$패스') {
    const userinfo = await get_userinfo(event.user);
    if (memory[userinfo.user.real_name] != '패스') {
      memory[userinfo.user.real_name] = '패스';
      webClient.chat.postMessage({
        text: `${CONFIG.MEMBER[userinfo.user.real_name]} : 오늘은 패스할게요~`,
        channel: event.channel
      });
    } else {
      webClient.chat.postMessage({
        text: '이미 패스했잖아욧!',
        channel: event.channel
      });
    }
  }


  if (split_text[0] == '$주문') {
    if (split_text.length == 1) {
      webClient.chat.postMessage({
        text: '주문할 항목을 입력해주세요~',
        channel: event.channel
      });
      return;
    }
    split_text.shift();
    const userinfo = await get_userinfo(event.user);
    memory[userinfo.user.real_name] = split_text.join(' ');
    webClient.chat.postMessage({
      text: `${CONFIG.MEMBER[userinfo.user.real_name]} : ${split_text.join(' ')} 주문완료`,
      channel: event.channel
    });
  }


  if (event.text == '$사용법') {
    webClient.chat.postMessage({
      "channel": event.channel,
      "text": "점심주문하세요~",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "점심 주문 사용법",
            "emoji": true
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*- 명령어 -*\n\n*$사용법* : 사용방법을 안내합니다.\n*$초기화 | $밥먹자* : 주문상태를 초기화합니다.\n*$상태 | $현황* : 현재 주문상태를 확인할 수 있습니다.\n*$주문* : 주문을 합니다!\n ex) $주문 제육덮밥 곱배기요~"
          }
        }
      ]
    });
  }
});

// 메지지 이벤트 엔드포인트를 express 에 등록하기
app.use('/slack/events', slackEvents.requestListener());

// express 웹 서버 실행
createServer(app).listen(3003, () => {
  console.log('run slack bot');
});

function set_member_reset() {
  for (const thisMember of Object.keys(CONFIG.MEMBER)) {
    memory[thisMember] = '주문대기';
  }
}

async function do_order_chat(event) {

  let orderinfo = '';
  for (const [key, value] of Object.entries(memory)) {
    orderinfo += `${CONFIG.MEMBER[key]} : ${value} \n`
  }
  webClient.chat.postMessage({
    "channel": event.channel,
    "text": "점심주문하세요~",
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "점심 주문",
          "emoji": true
        }
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*금일메뉴선택자:*\n" + CONFIG.MENU_CHOICE[moment().day() - 1]
          },
          {
            "type": "mrkdwn",
            "text": "*금주주문담당자:*\n" + get_today_purchase()
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*주문현황:*\n" + orderinfo
          }
        ]
      }
    ]
  });
}