import { useState, useEffect } from 'react'
import AgoraUIKit, { type RtcPropsInterface } from 'agora-react-uikit';

import WhiteBoard from './WhiteBoard'

import { createToken } from './generateToken'

import 'agora-chat-uikit/style.css';

const APP_ID = import.meta.env.VITE_RTC_APP_ID
const TOKEN = import.meta.env.VITE_AGORA_RTC_TOKEN
const CHANNEL = 'wonderverse'

const App = () => {
  const [userName, setUserName] = useState('');
  const [roomToken, setRoomToken] = useState('')
  const [roomUuid, setRoomUuid] = useState('')

  const [videoCall, setVideoCall] = useState(false);

  const rtcProps: RtcPropsInterface = {
    appId: APP_ID,
    channel: CHANNEL,
    token: TOKEN,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  const styles = {
    container: { width: '100vw', height: '100vh', display: 'flex', flex: 1, backgroundColor: '#007bff22'},
    heading: { textAlign: 'center' as const, marginBottom: 0 },
    videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 } as React.CSSProperties,
    nav: { display: 'flex', justifyContent: 'space-around' },
    btn: { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 },
  }

  const SDK_TOKEN = 'NETLESSSDK_YWs9OFZyc3NMZWhqTjhjOHJMYiZleHBpcmVBdD0xNzEzNzc5MDM2NjExJm5vbmNlPTc0YmVhOTMwLTAwODQtMTFlZi1iOWY3LTU1YTgxMWM5MmY1YiZyb2xlPTAmc2lnPTZkYTUyNjdiNGMzNGE0Y2U3OGVmM2EzODk4YTc5MTE1ZjMxYzhmZTQzZTU3ZWJiMzU5MTY5NjczMTAyYzQyOTA'

  const createRoomToken = async (sdkToken: string) => {
    let roomUuid: string;
    // NOTE: 방을 만드는 API
    // await fetch('https://api.netless.link/v5/rooms', {
    //   method: 'post',
    //   headers: {
    //     token: SDK_TOKEN,
    //     "Content-Type": "application/json",
    //     region: "cn-hz"
    //   },
    //   body: JSON.stringify({
    //     "isRecord": false
    //   })
    // })
    // .then(res => res.json())
    // .then(json => {
    //   roomUuid = json.uuid
    //   setRoomUuid(json.uuid)
    // })

    await fetch('https://api.netless.link/v5/rooms', {
      method: 'get',
      headers: {
        token: sdkToken,
        "Content-Type": "application/json",
        region: "cn-hz"
      },
    })
    .then(res => res.json())
    .then(json => {
      roomUuid = json[0].uuid
      setRoomUuid(json[0].uuid)
    })

    await fetch(`https://api.netless.link/v5/tokens/rooms/${roomUuid}`, {
      method: 'post',
      headers: {
        token: sdkToken,
        "Content-Type": "application/json",
        region: "cn-hz"
      },
      body: JSON.stringify({ lifespan: 3600000, role: 'admin' })
    })
    .then(res => res.json())
    .then((json) => setRoomToken(json))
  }

  useEffect(() => {
    createRoomToken(createToken()(import.meta.env.VITE_AGORA_WHITE_AK, import.meta.env.VITE_AGORA_WHITE_SK, 1000 * 60 * 60, {role: 0}))
  }, [])


  return videoCall ? (
    <div style={styles.container}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
      { roomToken && roomUuid && <WhiteBoard nickName={userName} roomToken={roomToken} uuid={roomUuid} /> }
    </div>
  ) : (
    <div>
      <input id="name" name="name" type="text" value={userName} placeholder="이름" onChange={(event) => {
        setUserName(event.target.value)
      }} /> 
      <h3 style={{cursor: 'pointer'}} onClick={() => {
        if (!userName) {
          return alert('이름을 입력해 주세요')
        }
        setVideoCall(true)
      }}>Start Call</h3>
    </div>
  )  
};

export default App
