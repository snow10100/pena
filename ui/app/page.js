import BokehBackground from "./components/common/BgBlur";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BokehBackground />
      <h1 className="text-4xl font-bold text-gray-300 shadow-md">Hello to the UI!</h1>
      <img className='h-48'
      src="https://media.topito.com/wp-content/uploads/2013/09/animals_working_07-310x163.jpg" alt="logo"/>
      <h2 className="text-2xl font-bold text-gray-300 shadow-md">We will make the UI soon hopefully</h2>
    </main>
  );
}
