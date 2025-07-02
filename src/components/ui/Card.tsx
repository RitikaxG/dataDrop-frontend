import { Share2, Trash, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Tweet } from "react-tweet";
import axios from "axios";
import { motion } from "motion/react";
import mql from "@microlink/mql"
import { useContentContext } from "../../context/content";
import { BACKEND_URL } from "../../config";
import { QueryBox } from "./QueryBox";

interface CardProps {
    link      : string,
    myTitle?  : string
    type      : string
    tags      : string[],
    contentId : string,
    alignment? : "horizontal" | "vertical" | "modal",
    onClick? : () => void,
    summary? : string
}
export const Card = ({
    link,
    type,
    tags,
    myTitle,
    contentId,
    alignment,
    onClick,
    summary

} : CardProps ) => {
    const [ id, setId ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ image, setImage ] = useState("");

    const context = useContentContext();
    if(!context){
        throw new Error("useContentContext must be used within a ContentContextProvider");
    }

    const { urlRef, setRefetch, setLink, setShareBox, sharePage, queryMe } = context;


    const iconStyles = "hover:bg-gray-200 rounded-md p-1 cursor-pointer text-black";

    const extractId = ( url : string, type : string ) : string => {
        let match;
        if(type === "Youtube"){
            const myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
            match = myregexp.exec(url);
        }

        else if(type === "Twitter"){
            match = url.match(/(?:twitter\.com|x\.com)\/[^\/]+\/status\/(\d+)/);
        }

        else if(type === "Docs"){
            match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        }

        return match ? match[1] : "";
    }

    const deleteContent = async () => {
        try{
            await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`,{
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }  
            })
            setRefetch(prev => !prev);
        }
        catch(err){
            throw new Error(`Error deleting content ${err}`);
        }
        
    }

    const shareContent = () => {
        setLink(link)
        setShareBox(open => !open)
    }

    useEffect(()=>{

        if(type === "Webpage"){
            const webPreview = async ( url : string ) => {
                
                const { data } : any  =  await mql(url);
                setLoading(false);
                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image.url);
            }

            webPreview(link);
        }
        
        if(type === "Twitter" || type === "Image" ){
            setLoading(false);
        }

        if(type === "Pdf"){
            link = urlRef.current ? urlRef.current.value : "";
        }
        const extractedId = setId(extractId(link,type));
        console.log(extractedId);
    },[link,type])



    return alignment === "horizontal"
            ?
        <div onClick={onClick} className="flex items-center w-full max-w-4xl bg-gray-100 rounded-2xl shadow-md p-4 gap-4">
        {/* Image/Preview */}
        <div className="flex-shrink-0 w-48 h-28 rounded-md overflow-hidden bg-white flex items-center justify-center">
           <a href={link} target="_blank" rel="noopener noreferrer">
            {loading && (
              <div className="w-full h-60 flex items-center justify-center">
                <LoaderCircle className="animate-spin" size={40} />
              </div>
            )}

            {/* Type-specific embeds */}
            {type === "Youtube" && (
              <iframe
                className="w-full h-[240px]"
                src={`https://www.youtube.com/embed/${id}`}
                allowFullScreen
                onLoad={() => setLoading(false)}
              ></iframe>
            )}

            {type === "Twitter" && <Tweet id={id} />}

            {type === "Pdf" && (
              <embed
                src={link}
                width="100%"
                height="240px"
                onLoad={() => setLoading(false)}
                type="application/pdf"
              />
            )}

            {type === "Docs" && (
              <iframe
                src={`https://docs.google.com/document/d/${id}/edit?embedded=true`}
                width="100%"
                height="240px"
                onLoad={() => setLoading(false)}
              ></iframe>
            )}

            {type === "Image" && (
              <img src={link} className="h-[240px] w-full object-contain rounded-md" />
            )}

            {type === "Webpage" && (
              <div className="flex flex-col gap-2 items-center justify-center h-[240px] p-2">
                <img src={image} className="w-20 h-20 object-cover rounded-md" />
                <div className="font-semibold text-sm">{title}</div>
                <div className="text-xs text-neutral-500">{description}</div>
              </div>
            )}
          </a>
        </div>

        {/* Title + Description */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold truncate">
                {myTitle || title}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {description}
              </div>
              {/* Tags */}
                <div className="flex items-start gap-1">
                    {tags.map((tag) => (
                        <div
                        key={tag}
                        className="bg-indigo-500 px-3 py-1 rounded-md text-white text-xs"
                        >
                        #{tag}
                    </div>
                    ))}
                </div>
            </div>
            
           
          </div>
        </div>

        
      </div>
    :
     <div onClick={onClick} 
    className={`${sharePage || alignment === "modal"  ? "w-200 h-[50rem] " : "w-86 h-[30rem]  "} ${queryMe && alignment === "modal"  ? "w-250 h-[55rem] " : "w-86 h-[30rem]  "} flex flex-col shadow-lg  rounded-xl bg-white p-6 gap-4`}>
      
      {/* Top Icons */}
      {!sharePage &&
        <div className="flex justify-end text-black gap-2 h-[2rem]">
        <Share2 onClick={shareContent} size={20} className={iconStyles} />
        <Trash onClick={deleteContent} size={20} className={iconStyles} />
      </div>
      }
      

      {/* Title */}
      <div className="font-bold text-[15px] text-center h-[3rem] flex items-center justify-center">
        {myTitle}
      </div>

      {/* Content/Preview */}
      <div className="relative flex-1 bg-gray-100 border border-neutral-200 rounded-lg overflow-hidden max-h-60">
        <motion.div
          initial={{ opacity: 1, scale: 0.98, filter: "blur(0px)" }}
          whileHover={{ opacity: 1, scale: 1.03, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="absolute inset-0 bg-white"
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            {loading && (
              <div className="w-full h-60 flex items-center justify-center">
                <LoaderCircle className="animate-spin" size={40} />
              </div>
            )}

            {/* Type-specific embeds */}
            {type === "Youtube" && (
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${id}`}
                allowFullScreen
                onLoad={() => setLoading(false)}
              ></iframe>
            )}

            {type === "Twitter" && <Tweet id={id} />}

            {type === "Pdf" && (
              <embed
                src={link}
                width="100%"
                height="240px"
                onLoad={() => setLoading(false)}
                type="application/pdf"
              />
            )}

            {type === "Docs" && (
              <iframe
                src={`https://docs.google.com/document/d/${id}/edit?embedded=true`}
                width="100%"
                height="240px"
                onLoad={() => setLoading(false)}
              ></iframe>
            )}

            {type === "Image" && (
              <img src={link} className="h-[240px] w-full object-contain rounded-md" />
            )}

            {type === "Webpage" && (
              <div className="flex flex-col gap-2 items-center justify-center h-[240px] p-2">
                <img src={image} className="w-20 h-20 object-cover rounded-md" />
                <div className="font-semibold text-sm">{title}</div>
                <div className="text-xs text-neutral-500">{description}</div>
              </div>
            )}
          </a>
        </motion.div>
      </div>

      {/* Summary */}
      {alignment === "modal" && 
        <div className="flex flex-col gap-2">
            <div className="font-bold">Summary</div>
            <div className={`text-neutral-600 text-sm whitespace-pre-line overflow-y-auto [mask-image:linear-gradient(to_top,transparent,black_50%)] ${alignment === "modal" && queryMe ? "max-h-40" : "max-h-80"}`}>{summary}</div>
        </div>
      }

      {queryMe && alignment === "modal" && <div className="w-full">
        <QueryBox/>
        </div>}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 min-h-[48px] mt-2">
        {tags.map(tag => (
          <div
            key={tag}
            className="bg-indigo-500 h-fit px-3 py-2 rounded-md text-white text-xs"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
};