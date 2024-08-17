import SideBar from "../../components/common/SideBar";

export default function RootLayout({ children }) {
  return (
    <div className="p-4 sm:ml-[20rem]">
      <SideBar />
      {children}
    </div>
  );
}
