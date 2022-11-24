# 전북대 챗봇

## Description
전북대학교 캠퍼스 도우미

  전북대 학생을 위한 간단한 챗봇입니다.
  

  인사도 합니다. 어떤 인사를 해 줄지는 랜덤입니다.
  
  전북대 학사일정을 제공합니다.
  
  오늘의 진수원 식당 메뉴를 제공합니다. (구현 예정)
  
  학과사무실의 위치를 제공합니다.

-------
## 프로젝트 정보
__설치__

  1. nodejs 설치
    
    sudo apt-get install nodejs npm
    또는 Node.js 설치. url: https://nodejs.org/ko/download/

  2. 깃허브 연결, 소스 다운로드
    
    git init
    git remote add origin https://github.com/EYaHo/ChatBot-team11.git
    git pull origin main
    
    git branch develop
    git checkout develop
    git pull origin develop
    ==> 현재 main branch에 PR 되지 않아 develop 브랜치에서 받아와야 합니다.
    
    npm install

    <for Test>
    npm install mocha -g
    ==> 현재 의존성 트리(package.json)에 mocha가 포함되어 있지 않습니다. mocha를 사용하려면 실행. -- 추후 조사 필요.

  3. 슬랙 봇 생성
    
    슬랙에 slack bot 앱 추가
    SlackBot 폴더에 token 이란 이름의 파일 생성 후 자신이 슬랙에 추가한 봇의 토큰 저장.

    <for Test>
    슬랙에 봇 테스트 용 채널을 생성.
    SlackBot 폴더에 channelID 파일 생성 후 테스트 용 채널의 ID를 저장.

__사용법__
    
  0. 서버 실행
    
    nodejs SlackBot/index.js
    node SlackBot/index.js  (Node.js로 설치한 경우)
    

  1. 봇에게 인사
    
    'Hi'를 입력하면 '안녕하세요.', '반갑습니다.', '환영합니다.' 중 랜덤으로 인사를 합니다.
    

  2. 학사/일정
    
    학사일정을 입력하면 날짜를 입력받는 상태가 됩니다.
    이후 날짜를 8/4 이런 형태로 입력하면 해당 날짜의 학사일정을 알려줍니다.
    

  3. 진수원 메뉴
    
    구현 예정
    

  4. 학과사무실
    
    봇에게 학과 이름을 입력하면 학과 사무실이 위치한 대학, 건물 번호, 방 번호를 알려줍니다.
  
--------
## Contribute

__기여__

    코드에 기여하고 싶다면 코드에 eslint를 적용하십시오. 룰은 airbnb-base 입니다.

    검사: eslint *.js 
    검사& 수정: eslint *.js --fix
  

__단일 테스트__

    테스트는 mocha로 검사합니다.

    spec 파일을 실행하려면 channelID 파일 생성 후 슬랙 테스트 채널 ID 저장.
    mocha *.spec.js 실행.
    .github/workflows/main.yml에 자신이 작성한 *.spec.js 파일들을 추가해 주십시오.
  
-------
## 라이선스

MIT 라이선스를 따릅니다.
