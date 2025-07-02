import React, { useState, createContext, ReactNode, useContext, useRef, RefObject } from "react";
import { ContentType } from "../components/ui/AddContentModal";
import { Content } from "../components/ui/AllCards";

export interface ContextType {
    refetch    : boolean,
    setRefetch : React.Dispatch<React.SetStateAction<boolean>>,
    urlRef     : RefObject<HTMLInputElement | null>,
    type       : ContentType,
    setType    : React.Dispatch<React.SetStateAction<ContentType>>,
    content    : Content[],
    setContent : React.Dispatch<React.SetStateAction<Content[]>>,
    isOpen     : boolean,
    setIsOpen  : React.Dispatch<React.SetStateAction<boolean>>,
    
    link        : string,
    setLink     : React.Dispatch<React.SetStateAction<string>>,
    shareBox    : boolean,
    setShareBox : React.Dispatch<React.SetStateAction<boolean>>,
    myBrain     : boolean,
    setMyBrain  : React.Dispatch<React.SetStateAction<boolean>>,
    shareUrl    : string,
    setShareUrl : React.Dispatch<React.SetStateAction<string>>,

    cardModal    : boolean,
    setCardModal : React.Dispatch<React.SetStateAction<boolean>>,

    selectedContent    : Content | null,
    setSelectedContent : React.Dispatch<React.SetStateAction<Content | null>>;

    sharePage   : boolean,
    isSharePage : React.Dispatch<React.SetStateAction<boolean>>

    queryMe    : boolean,
    setQueryMe : React.Dispatch<React.SetStateAction<boolean>>

}
export const ContentContext = createContext<ContextType | undefined>(undefined); 

interface ContextProviderProps {
    children : ReactNode;
}
export const ContentContextProvider = ({children} : ContextProviderProps ) => {

    const [ refetch, setRefetch ]    = useState<boolean>(false);
    const urlRef                     = useRef<HTMLInputElement>(null);
    const [type, setType ]           = useState(ContentType.Youtube);
    const [ content, setContent ]    = useState<Content[]>([]);
    const [ isOpen, setIsOpen ]      = useState(true);
    const [link, setLink]            = useState("");
    const [ shareBox, setShareBox ]  = useState(false);
    const [ myBrain, setMyBrain ]    = useState(false);
    const [ cardModal, setCardModal] = useState(false);
    const [ shareUrl, setShareUrl ]  = useState("");
    const [ selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [ sharePage, isSharePage]  = useState(false);
    const [ queryMe, setQueryMe ]    = useState(false);

    return <ContentContext.Provider value={{
        refetch,
        setRefetch,
        urlRef,
        type,
        setType,
        content,
        setContent,
        isOpen,
        setIsOpen,
        link,
        setLink,
        shareBox,
        setShareBox,
        myBrain,
        setMyBrain,
        shareUrl,
        setShareUrl,
        cardModal,
        setCardModal,
        selectedContent,
        setSelectedContent,
        sharePage,
        isSharePage,
        queryMe,
        setQueryMe,
        
    }}>
        {children}
    </ContentContext.Provider>
}

export const useContentContext = () => useContext(ContentContext);