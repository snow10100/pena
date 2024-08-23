import SideBar from "../../components/common/SideBar";

export default function RootLayout({ children }) {
  // TODO context: model status
  // TODO context: summary report
  return (
    <div className="p-4 sm:ml-[20rem]">
      <SideBar />
      {children}
    </div>
  );
}
