import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import { useContentContext } from "../../context/content";
import { Content } from "./AllCards";

export const SearchBox = () => {

    const [ searchQuery, setSearchQuery ] = useState("");

    const context = useContentContext();
    if(!context){
        throw new Error("useContentContext must be used within a ContentContextProvider");
    }

    const { setContent } = context;

    const searchContent  = async ( title : string ) => {
        try{
            const response  = await axios.post<{matchedContents : Content[]}>(`${BACKEND_URL}/api/v1/content/search`,{
                title : title
            },{
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.matchedContents);
            setContent(response.data.matchedContents);
            setTimeout(()=>{
                setSearchQuery("")
            },2000)
            
        }
        catch(err){
            throw new Error(`Error searching content ${err}`);
        }
        
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(searchQuery.trim() != ""){
                searchContent(searchQuery)
                
            }
        },1000)

        return () => clearTimeout(timer);
    },[searchQuery])

    return <input value={searchQuery} onChange={(e)=>{
        setSearchQuery(e.target.value)
    }} type="text" placeholder="Search by Title" className="border-1 border-gray-400 rounded-lg px-5 py-3 w-[70%] ml-8 bg-white"></input>
}