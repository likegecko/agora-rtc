import { useFastboard, Fastboard } from "@netless/fastboard-react";

const WhiteBoard = ({nickName, roomToken, uuid}: {nickName: string, roomToken: string, uuid: string}) => {
  const fastboard = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: import.meta.env.VITE_AGORA_WHITE_APP_ID,
      region: "cn-hz",
    },
    joinRoom: {
      uid: nickName,
      uuid,
      roomToken,
      userPayload: {
        nickName
      }
    },
  })) 

  
  return <div
      style={{
        height: "100vh",
        width: "50%",
        border: "1px solid",
        background: "#f1f2f3",
      }}
    >
      <Fastboard app={fastboard} />
    </div>
}

export default WhiteBoard;