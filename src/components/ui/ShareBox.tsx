import { useEffect, useState } from "react";
import { useContentContext } from "../../context/content"
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../../config";
import { AnimatePresence, motion } from "motion/react";

export const ShareBox = () => {
    const [ success, setSuccess ] = useState("");

    const context = useContentContext();
    if(!context){
        throw new Error("No state defined");
    }

    const [ clicked, setClicked ] = useState(false);
    const { shareBox, link, setShareBox, myBrain, setMyBrain, shareUrl, setShareUrl } = context;
    
    const copyToClipboard = async () => {
        try{
            if(myBrain){
                await navigator.clipboard.writeText(shareUrl);
            }
            else{
                await navigator.clipboard.writeText(link);
            }
            
            setSuccess("Link copied to clipboard");
            setClicked(true);
            setTimeout(()=>{
                setClicked(false)
                setShareBox(open => !open)
                if(myBrain){
                    setMyBrain(open => !open)
                } 
            },500)
        }
        catch(err){
            throw new Error(`Error copying link to clipboard ${err}`);
        }
    }

    useEffect(()=>{
        const getShareUrl  = async () : Promise<{ hash : string }> => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                share : true
            },{
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data);
            return response.data;
        }
        if(myBrain){
            (async () => {
                try{
                    const response = await getShareUrl();
                    setShareUrl(`${FRONTEND_URL}/shared-brain/${response.hash}`)
                }  
                catch(err){
                    throw new Error(`Error generating share url ${err}`);
                }
            })()
        }
    },[myBrain])

    return (
    <AnimatePresence>
        {shareBox && <motion.div 

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
                className="bg-white p-4 flex flex-col rounded-lg gap-4 w-[30rem] h-auto z-60 overflow-y-auto">
                    <div className="flex">
                        <input className="border-1 w-[80%] p-2 rounded-lg" readOnly value={myBrain ? shareUrl : link}></input>
                        <Button onClick={()=>{
                            copyToClipboard()
                        }} text="copy"></Button>
                    </div>
                   
                    {clicked ? <div className="flex justify-center text-red-500">{success}!</div> : ""}
                </motion.div>
                
        </motion.div>}
    </AnimatePresence>   
    ) 
}