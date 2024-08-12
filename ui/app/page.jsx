import BokehBackground from "./components/common/BgBlur";
import ChatInputField from "./components/chat/ChatInputField";

export default function Home() {
  return (
    <main className="">
      {/* <BokehBackground /> */}
    
      <div className="flex"> 


        {/* Sidebar */}
        <div className="flex-1"> 
          <h1>Main content</h1>
          <div className="w-full mt-auto">
            <ChatInputField />
          </div>
        </div>
      </div>
    </main>
  );
}
