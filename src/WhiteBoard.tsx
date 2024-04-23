import { useFastboard, Fastboard } from "@netless/fastboard-react";

const WhiteBoard = ({nickName, roomToken, uuid}: {nickName: string, roomToken: string, uuid: string}) => {
  console.log(nickName, roomToken, uuid, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  const fastboard = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "zH-UAP4XEe6X_REUu_elzA/yxXnbmP4zpsxBQ",
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