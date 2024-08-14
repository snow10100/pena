import BokehBackground from "./components/common/BgBlur";
import ChatInputField from "./components/chat/ChatInputField";
import UserChatBubble from "./components/chat/UserChatBubble";

export default function Home() {
  return (
    <main className="h-[90vh] sm:h-[95vh]">
      <div className="grid h-full grid-rows-2">
        <div className="overflow-y-auto">
          {/* This is the chat content area */}
          {/* <ChatContent /> */}
          <UserChatBubble>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet provident nam, soluta optio, debitis, animi illum nesciunt dolorum quidem atque autem expedita dolorem earum quibusdam officia aspernatur perspiciatis id ex?</UserChatBubble>
          </div>
        <div className="self-end">
          {/* This is the chat input field */}
          <ChatInputField />
        </div>
      </div>
    </main>
  );
}
