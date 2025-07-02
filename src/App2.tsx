import Sidebar from "./componentsMotion/ui/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentContextProvider } from "./context/content";
import Navbar from "./componentsMotion/ui/Navbar";
import Card from "./componentsMotion/ui/Card";
const Dashboard = () => {
  return (
    <div className="flex">
        <div><Sidebar/></div>
        <div className="flex flex-col w-full">
            <Navbar/>
            {/* Header Actions */}
            <div className="flex justify-between items-center px-8 pt-4">
                <input
                type="text"
                placeholder="Search by Title"
                className="px-4 py-2 rounded-md border outline-none w-1/2"
                />
                <div className="flex gap-4">
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                    Share Brain 🔗
                </button>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md border border-white/20">
                    Add Content ➕
                </button>
                </div>
            </div>

            <div className="flex gap-10 flex-wrap px-8 h-screen overflow-y-auto ">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    </div>
  );
};

const App =  () => {
  return <ContentContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
        </Routes>
    </BrowserRouter>
  </ContentContextProvider>
  
  
}
export default App