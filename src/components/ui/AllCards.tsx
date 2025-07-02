import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect } from "react";
import { useContentContext } from "../../context/content";
import { Card } from "./Card";
import { motion } from "motion/react";


interface User {
    _id       : string,
    firstname : string,
    lastname  : string
}

export interface Content {
    _id     : string,
    type    : "Youtube" | "Twitter" | "Docs" | "Pdf" | "Image" | "Webpage",
    link    : string,
    title   : string,
    tags    : string[],
    summary : string,
    userId  : User,
    __v     : number;
}


export const Cards = () => {

    const context = useContentContext();
    if(!context){
        throw new Error("useContentContext must be used within a ContentContextProvider")
    }

    const { refetch, content, setContent, setQueryMe, setSelectedContent } = context;

    useEffect(()=>{
        const getContents  = async () => {
            try{
                const response = await axios.get<{contents : Content[]}>(`${BACKEND_URL}/api/v1/content`);
                setContent(response?.data?.contents);
            }
            catch(err){
                throw new Error(`Error fetching contents ${err}`);
            }
        }

        getContents()
    },[refetch])

    return <div className="flex flex-wrap gap-12 p-8">
        { content.map(myContent => (
            <Card onClick={()=>{
                setQueryMe((query) => !query)
                setSelectedContent(myContent)
            }} alignment="vertical" contentId={myContent._id} link={myContent.link} type={myContent.type} myTitle={myContent.title} tags={myContent.tags}/>
        ))}
    </div>
    
   
}

export const QueryModal = () => {
    const context = useContentContext();
    if(!context){
        throw new Error(`No states defined`);
    }    

  const { queryMe, setQueryMe , selectedContent } = context;

  if (!queryMe || !selectedContent) return null;

  const handleClose = () => setQueryMe(false);

  return queryMe && (
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
        delay : 0.3,
        ease : "easeInOut"
    }}
    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="absolute inset-0" onClick={handleClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity : 0, scale : 0.9 }}
        transition={{ delay : 0.3,
            ease : "easeInOut"
        }}
        className="z-50"
      >
        <Card
          alignment="modal"
          link={selectedContent.link}
          contentId={selectedContent._id}
          type={selectedContent.type}
          myTitle={selectedContent.title}
          tags={selectedContent.tags}
          summary={selectedContent.summary}
        />
      </motion.div>
    </motion.div>
  );
};
