# Lunch_slackbot
점심식사 슬랙봇입니다.

#### 설치방법

먼저 Git Clone을 받아주세요

```
git clone https://github.com/for2gles/Lunch_slackbot.git
```

npm install을 진행해주세요

```
npm install
```

Config 폴더에 bot.json.sample 파일을 복사하여 bot.json 파일로 저장해줍니다.
Slack의 SIGNING_SECRET, BOT_USER_OAUTH_ACCESS_TOKEN 를 입력해줍니다.
MEMBER : 실제 이름과 호칭이 들어갑니다. Slack에 이름과 "**님" 과같이 호칭을 적어주시면 됩니다.
MENU_CHOICE : 적혀있는것과 같이 요일별 메뉴선택자를 노출시켜줍니다. 호칭을 적어주시면 됩니다.
PURCHASE : 결제할사람을 순서대로 작성해주면 됩니다. 호칭을 적어주시면 됩니다. 순서조정은 src/function.ts > Line 21 에 - 17값을 조정해주면 됩니다.


```
npm run start
```

GOOD LUCK
