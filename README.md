따로 구축된 토큰 서버가 없으므로 배포시 수동으로 토큰 주입이 필요함
VITE_AGORA_SDK_TOKEN --> whiteboard api 사용시 필요한 토큰으로 `node src/generateToken.js` 실행하여 생성 후 주입
VITE_AGORA_RTC_TOKEN --> rtc 사용시 필요한 토큰으로 agora 콘솔에서 temp token 생성 후 주입