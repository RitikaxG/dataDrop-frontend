import { motion } from "motion/react";
import { useState } from "react";

export default function Navbar(){
    const [ hovered, setHovered ] = useState<number | null>(null);

    const navbarItems = [
        {
            title : "Login",
            link : "/signin"
        },{
            title : "Home",
            link : "/"
        }
    ]
    return <div className="flex p-6 justify-between w-full bg-white">
        <div className="text-xl">
            <span className="font-bold">data</span>
            <span className=" font-bold text-indigo-700">Drop</span>
        </div>

        <div>
             {navbarItems.map((item,idx) => (
                <a key={idx} onMouseEnter={()=>{
                    setHovered(idx)
                }} 
                
                onMouseLeave={()=>{
                    setHovered(null)
                }}

                className="relative px-12 py-4" href={item.link}>
                
                {hovered === idx && 
                <motion.div 
                layoutId="hovered"
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-indigo-700 to-indigo-500 w-full h-full rounded-full z-0"></motion.div>
                }

                <span className={`relative z-10 transition-colors duration-75 font-semibold ${hovered === idx ? "text-white" : "text-black"}`}>{item.title}</span>
                </a>
            ))}
        </div>

    </div>
}



