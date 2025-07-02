import { useEffect, useState } from "react"
import axios from "axios";
import { useContentContext } from "../../context/content";
import { Card } from "./Card";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { motion } from "motion/react";
import { Content } from "./AllCards";

export const SharedBrainPage = () => {
    const context = useContentContext();
    if(!context){
        throw new Error(`No states defined`);
    }    

    const { setCardModal, setSelectedContent, isSharePage } = context;
    
    const [ sharedContents, setSharedContents ] = useState<Content[]>([]);
    const { hash } = useParams();
    console.log(hash);
    // When component mounts
    useEffect(()=>{
        const fetchSharedContent = async () => {
            try{
                
                const response = await axios.get<{content : Content[]}>(`${BACKEND_URL}/api/v1/brain/${hash}`);
                console.log(response.data.content);
                setSharedContents(response.data.content);
            }
            catch(err){
                throw new Error(`Error fetching shared page ${err}`);
            }
        }
        fetchSharedContent();

        isSharePage(true);
        return () => {
            isSharePage(false);
        }
    },[])

    return <div className="flex flex-col bg-white min-h-screen">
    <div className="bg-gray-200 h-12 items-center flex px-4 font-bold text-xl mb-24">
        <span>data</span>
        <span className="text-indigo-700">Drop</span>
    </div>

    <div className="flex flex-col justify-center gap-10 items-center">
        {
        sharedContents.map(content => (
            <Card onClick={()=>{
                setSelectedContent(content);
                setCardModal((modal) => !modal)
            }} alignment="horizontal" link={content.link} contentId={content._id} type={content.type} myTitle={content.title} tags={content.tags}/>
        ))
    }</div>

    <CardModal/>
    </div>
}



export const CardModal = () => {
    const context = useContentContext();
    if(!context){
        throw new Error(`No states defined`);
    }    

  const { cardModal, setCardModal, selectedContent } = context;

  if (!cardModal || !selectedContent) return null;

  const handleClose = () => setCardModal(false);

  return cardModal && (
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
