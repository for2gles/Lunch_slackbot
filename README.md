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

#### 사용법

```
$사용법 : 사용법을 안내해줍니다.
$초기화 / $밥먹자 : 내역(기록)을 초기화해줍니다.
$패스 : 금일 식사를 패스합니다.
$주문 [메뉴] : 메뉴를 주문합니다.
$상태 / $현황 : 현재 주문상태를 정리하여 보여줍니다.
```


#### 예시

![SlackBot](https://i.ibb.co/c6pB6ZN/2021-07-07-8-13-08.png)

GOOD LUCK


