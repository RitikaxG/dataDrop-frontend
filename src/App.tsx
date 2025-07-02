import { Button } from "./components/ui/Button";
import { Share2, Plus } from "lucide-react"
import { AddContentModal } from "./components/ui/AddContentModal";
import { useState } from "react";
import { SignUp } from "./components/ui/SignUp";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentContextProvider, useContentContext } from "./context/content";
import { Cards, QueryModal } from "./components/ui/AllCards";
import { SearchBox } from "./components/ui/SearchBox";
import { ShareBox } from "./components/ui/ShareBox";
import { SharedBrainPage } from "./components/ui/SharedBrainPage";
import  Sidebar2  from "./componentsMotion/ui/Sidebar";
import Navbar from "./componentsMotion/ui/Navbar";
import Home from "./components/ui/Home";


const Dashboard = () => {
  const [ open, setOpen ] = useState(false);
  const context = useContentContext();

  if(!context){
    throw new Error("No states defined");
  }

  const { setMyBrain, setShareBox } = context;

return (
  <div className="flex h-screen overflow-hidden bg-white">
    <Sidebar2 />

    {/* Right side */}
    <div className="flex flex-col w-full">
      {/* Top Bar (Navbar + Buttons) */}
      <div className="p-4 flex flex-col gap-4">
        <Navbar />
        <div className="flex justify-between items-center pr-4">
          <SearchBox />
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setMyBrain((share) => !share);
                setShareBox((open) => !open);
              }}
              variant="primary"
              text={"Share Brain"}
              startIcon={<Share2 size={17} />}
            />
            <Button
              onClick={() => {
                setOpen(true);
              }}
              text={"Add Content"}
              startIcon={<Plus size={17} />}
            />
          </div>
        </div>
      </div>

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <ShareBox />
        <Cards />
        <QueryModal/>
      </div>

      {/* Modal */}
      <AddContentModal open={open} onClose={() => setOpen(false)} />
     
    </div>
  </div>
);
}

const App =  () => {
  return <ContentContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignUp/>} />
          <Route path="/home" element={<Dashboard/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/shared-brain/:hash" element={<SharedBrainPage/>}/>
        </Routes>
    </BrowserRouter>
  </ContentContextProvider>
  
  
}
export default App
