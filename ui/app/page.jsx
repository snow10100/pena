import BokehBackground from "./components/common/BgBlur";
import ChatInputField from "./components/chat/ChatInputField";

export default function Home() {
  return (
    <main className="h-[90vh] sm:h-[95vh]">
      <div className="grid h-full grid-rows-2">
        <div className="overflow-y-auto">
          {/* This is the chat content area */}
          {/* <ChatContent /> */}
        </div>
        <div className="self-end">
          {/* This is the chat input field */}
          <ChatInputField />
        </div>
      </div>
    </main>

  );
}
