import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const QueryBox = () => {
    const queryRef = useRef<HTMLInputElement>(null);
    const [loader, setLoader ]            = useState(false);
    const [ gptResponse, setGptResponse ] = useState("");

    const queryResponse = async () => {
        setLoader(true);
        try{
            const response  = await axios.post(`${BACKEND_URL}/api/v1/embeddings/getQuery`,{
                query : queryRef.current?.value
            },{
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            setLoader(false);
            setGptResponse(response.data.gptResponse);
            setTimeout(()=>{
                if (queryRef.current) {
                    queryRef.current.value = "";
                  }
            },1000)
        }
        catch(err){
            throw new Error(`Error getting gpt response ${err}`);
        }
        
    }

    return <div className="max-h-60 w-full bg-white flex flex-col gap-6">
        <div className="flex gap-3">
            <input ref={queryRef} className="rounded-full border-1 bg-white w-full h-11 px-3 py-2 text-sm text-gray-500 " placeholder="Ask a Query"></input>
            <div onClick={queryResponse} className="rounded-full  border-1 border-white h-10 px-1 mt-1 bg-gray-300 hover:bg-gray-500"><ArrowUp className="text-black w-8 h-9 p-1 "/></div>
        </div>
        

        {loader ? <div className="rounded-full bg-gray-300 w-6 h-6 motion-preset-pulse-md duration-1000"></div>
        :
        <div className="text-gray-400 whitespace-pre-line max-h-screen overflow-y-auto"><ReactMarkdown>{gptResponse}</ReactMarkdown></div>
        }
    </div>
}