import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { RefreshCcw, LogOut } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useContentContext } from "../../context/content";
import { useNavigate } from "react-router-dom";
import { ContentType, options } from "../../components/ui/AddContentModal";



export default function Sidebar2(){

    const navigate = useNavigate();
    const context  = useContentContext();

    if(!context){
        throw new Error("useContentContext must be used within a ContentContextProvider");
    }

    const { isOpen, setIsOpen, setContent, content, setRefetch } = context;


    const fetchTypes = async ( type : ContentType) => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/content/type`,{
                type : type
            })
            console.log(response.data);
            setContent(response.data.contents);
            
        }
        catch(err){
            throw new Error(`Error fetching contents of type ${err}`);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    useEffect(()=>{
        console.log(content);
    },[content]);

    const sidebarVariants = {
        open : {
            width : "16rem",
             transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
    }
        },
        closed : {
            width : "4.5rem"
        }
    }

  const parentVariants = {
    open : {
        transition : {
            staggerChildren : 0.07,
            delayChildren : 0.2
        }
    },
    closed : {
        transition : {
            staggerChildren : 0.05,
            staggerDirection : -1
        }
    }
  }

    return <motion.div
    
        initial={false}
        animate={isOpen ? "open":"closed"}
        exit="closed"
        transition={{
            duration : 0.3
        }}
        >
        <motion.div 
        variants={sidebarVariants}
        className={`flex flex-col left-0 top-0 h-screen gap-12 p-4 overflow-y-hidden  bg-neutral-100 ${!open ? "items-center": ""}`}>
            <div className="flex items-center justify-between">
            {isOpen && <div className="text-md font-medium">
                Dashboard
                </div>}
            <button onClick={() => {
                setIsOpen(open => !open)
            }} className="rounded-full shadow-lg p-2">{isOpen ? <IconChevronLeft size={16}/>: <IconChevronRight size={16}/>}</button>
            </div>

            <div onClick={()=>{
                        setRefetch(prev => !prev)
                    }} className="mb-2 p-2 rounded-md cursor-pointer flex justify-center hover:bg-neutral-300 bg-gray-200"><RefreshCcw size={16}/></div>
            <motion.div
            variants={parentVariants}
            className="flex flex-col gap-8">
                
                {options.map(option => (
                    <SidebarComponent onClick={()=>{
                fetchTypes(option.value)
            }} Icon={option.image} name={option.text} isOpen={isOpen}/>
                ))}
            </motion.div>

            <div onClick={logout} className="mt-32 flex justify-center hover:bg-neutral-300 bg-gray-200 p-2 cursor-pointer  rounded-md gap-1 transition-all duration-150"><LogOut size={18}/></div>

        </motion.div>
        
    </motion.div>
}

interface SidebarComponentProps{
    Icon : string,
    name : string,
    isOpen : boolean,
    onClick? : () => void,
}
export const SidebarComponent = ({
    Icon,
    name,
    isOpen,
    onClick
   
}: SidebarComponentProps ) => {
      const childVariants = {
        open : {
            opacity : 1,
            y : 0,
        },
        closed : {
            opacity : 0,
            y : -5
        }
    }


    return <motion.div onClick={onClick} variants={childVariants} className="flex gap-6 items-center hover:bg-neutral-300 p-2 rounded-lg curosr-pointer">
        <div><img className={"w-8 h-8"}  src={Icon}/></div>
        
     {isOpen && <div className="text-sm font-medium">{name}</div>}
        
    </motion.div>
}






