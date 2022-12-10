# JBNU ChatBot
## Description 
#### < 전북대학교 캠퍼스 도우미 >

  전북대학교 학생을 위한 간단한 챗봇으로, 크게 4가지의 기능을 가지고 있습니다.
  
  
  1. 랜덤으로 인사를 합니다.
  
  2. 전북대학교 학사일정을 제공합니다.
  
  3. 진수원 메뉴와 평가를 제공합니다. (Today / Week)
  
  4. 학과 별 학과 사무실의 위치를 제공합니다.

-------
## 프로젝트 정보
__설치__

  1. nodejs 설치
    
    sudo apt-get install nodejs npm
    또는 Node.js 설치. (url: https://nodejs.org/ko/download/)

  2. 깃허브 연결, 소스 다운로드
    
    git init
    git remote add origin https://github.com/EYaHo/ChatBot-team11.git
    git pull origin main
    
    git branch develop
    git checkout develop
    git pull origin main
    
    npm install

  3. 슬랙 봇 생성
    
    슬랙에 slack bot 앱 추가
    SlackBot 폴더에 token 파일 생성 후, 자신이 슬랙에 추가한 봇의 토큰 저장

    <for Test>
    슬랙에 봇 테스트 용 채널 생성
    SlackBot 폴더에 channelID 파일 생성 후 테스트 용 채널 ID 저장

__사용법__
    
  0. 서버 실행
    
    nodejs SlackBot/index.js
    node SlackBot/index.js  (Node.js로 설치한 경우)
    

  1. 봇에게 인사
    
    'Hi'를 입력하면 '안녕하세요.', '반갑습니다.', '환영합니다.' 중 랜덤으로 인사를 합니다.
    

  2. 학사 일정 안내
    
    '학사일정'을 입력하고 월/일 형태로 날짜를 입력합니다. 
    해당 날짜의 학사일정을 알려줍니다.
    

  3. 진수원 오늘의 메뉴 안내 및 평가
    
    '오늘 밥 뭐야'를 입력하면 오늘의 진수원 중식 식단과 이에 대한 평가를 안내해줍니다. 
    '이번주 뭐 나와'를 입력하면 이번 주 진수원 요일 별 중식 식단과 평가를 안내해줍니다.
    평가는 ★☆☆, ★★☆, ★★★ 총 3단계로 구성됩니다.
    

  4. 학과 사무실 안내
    
    '학과 사무실 안내'를 입력한 후, 학과 명을 영어로 입력하면 학과 사무실이 위치한 대학, 건물 번호, 방 번호를 알려줍니다.
    학과 명 입력시, 대/소문자 및 띄어쓰기를 모두 허용합니다.
    입력한 학과 이름이 정확하지 않더라도 가장 유사한 학과에 대한 정보를 알려줍니다. 
  
--------
## Contribute

__기여__

    airbnb-base eslint 적용

    검사: eslint *.js 
    검사& 수정: eslint *.js --fix
  

__단일 테스트__

    테스트는 mocha로 진행합니다.

    테스트용 spec 파일을 실행하려면 channelID 파일 생성 후 슬랙 테스트 채널 ID를 저장합니다.    
        
    mocha *.spec.js 실행
    (.github/workflows/main.yml에 자신이 작성한 *.spec.js 파일 추가 필요)
  
-------
## 라이선스

MIT License

Copyright (c) 2022 EYaHo, chaanheeLEE, syu357

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
