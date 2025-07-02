import { X } from "lucide-react"
import axios from "axios";
import Youtube from "../../assets/youtube.png";
import Twitter from "../../assets/twitter.png";
import Doc from "../../assets/docs.webp";
import Image from "../../assets/image.png";
import Link from "../../assets/link.png";
import Pdf from "../../assets/pdf.webp";

import { RefObject, useEffect, useState } from "react";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import { useContentContext } from "../../context/content";

import { motion, AnimatePresence } from "motion/react";

export enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter",
    Docs    = "Docs",
    Pdf     = "Pdf",
    Image   = "Image",
    Webpage = "Webpage"
}

export const options = [{
    text  : "Youtube",
    image : Youtube,
    value : ContentType.Youtube
},{
    text  : "Twitter",
    image : Twitter,
    value : ContentType.Twitter
},{
    text  : "Docs",
    image : Doc,
    value : ContentType.Docs
},{
    text  : "Pdf",
    image : Pdf,
    value : ContentType.Pdf
},{
    text  : "Image",
    image : Image,
    value : ContentType.Image
},{
    text  : "Webpage",
    image : Link,
    value : ContentType.Webpage
}]


interface ModalProps {
    open : boolean,
    onClose? : () => void
}
export const AddContentModal = ({
    open,
    onClose
} : ModalProps ) => {

    const context = useContentContext();
    if(!context){
        throw new Error("useContentContext must be used within a ContentContextProvider");
    }

    const { setRefetch, urlRef, type, setType } = context;

    
    const [ selectedType, setSelectedType ] = useState<string>("");

    useEffect(()  => {
        if(open){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "";
        }

        return () => { document.body.style.overflow = "" };
    },[open])

  

    const addContent   = async () => {
        try{
            console.log(type);
            console.log(localStorage.getItem("token"));
            if(type === ContentType.Pdf){
                const response = await axios.post(`${BACKEND_URL}/api/v1/content`,{
                    type : type,
                    link : urlRef.current?.value
                },{
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
                        "Accept": "application/pdf",
                        "Accept-Language": "en-US,en;q=0.9",
                    }
                })
                console.log(response);
           }
           else{
                await axios.post(`${BACKEND_URL}/api/v1/content`,{
                    type : type,
                    link : urlRef.current?.value
                },{
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                    }
                })
           }
            
            setRefetch(prev => !prev);
        }
        catch(err){
            console.log(`Error adding contents ${err}`);
        }
    }


    return (
    <AnimatePresence>
    { open && <motion.div 
    initial={{ 
        opacity: 0
    }}

    animate={{ 
        opacity: 1 }}

    exit={{ 
        opacity: 0 }}

    className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
        <div className="bg-[#17203f] opacity-90 z-40 fixed inset-0 items-center justify-center"></div>
        <motion.div
            initial={{
                opacity : 0,
                scale : 0.9
            }}
            animate={{
                opacity : 1,
                scale : 1
            }}
            exit={{
                opacity : 0,
                scale : 0.9
            }}

            transition={{
                duration : 0.2,
                ease : "easeInOut"
            }}
            className="bg-white shadow-2xl p-4 flex flex-col rounded-xl gap-4 w-[30rem] max-h-[90vh] z-60 overflow-y-auto">
            <span className="flex justify-end "><X  className="hover:bg-gray-300 rounded-md cursor-pointer" onClick={(e)=>{
                e.stopPropagation()
                onClose?.()
            }}/></span>
            <InputBox reference={urlRef} onChange={() => {

            }} placeholder="Paste your URL"/>
            <div className="pl-2  text-gray-600 font-bold">Select Type</div>
            <div className="flex flex-wrap items-center gap-8">
                { options.map(option => (
                     <LogoElement clicked={selectedType === option.text} onClick={()=>{
                        setSelectedType(option.text);
                        setType(option.value)
                     }} icon={option.image as string} text={option.text}/>
                ))}
            </div>

            <div onClick={async ()=>{
                onClose?.()
                await addContent()
            }} 
            
            className={`flex justify-center mx-auto`}><Button text="Submit"/></div>
        </motion.div>
    </motion.div>}
    </AnimatePresence>
    )
}

interface InputProps {
    onChange? : () => void,
    placeholder : string,
    reference   : RefObject<HTMLInputElement | null>
}
const InputBox = ({ onChange, placeholder, reference } : InputProps ) => {

    return <input ref={reference} className="p-2 border-1 rounded-md border-gray-300" type="text" onChange={onChange} placeholder={placeholder}/>
}

interface LogoElementProps {
    clicked? : boolean,
    onClick? : () => void,
    icon : string,
    text : string
}
export const LogoElement = ({
    clicked,
    onClick,
    icon, 
    text
}: LogoElementProps) => {
    return (
        <div 
            className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all duration-200 shadow-md hover:scale-105 ${
                clicked ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white'
            }`}
            onClick={onClick}
        >
            <div className="w-12 h-12 mb-2">
                <img src={icon} alt={text} className="w-full h-full object-contain" />
            </div>
            <div className={`text-xs font-medium ${clicked ? 'text-blue-600' : 'text-gray-800'}`}>
                {text}
            </div>
        </div>
    );
};



