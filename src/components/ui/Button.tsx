import { ReactElement } from "react"

interface ButtonProps {
    variant?   : "primary" | "secondary"
    text       : string,
    startIcon? : ReactElement,
    endIcon?   : ReactElement,
    onClick?   : () => void
}
export const Button = ( { 
    variant,
    text,
    onClick,
    startIcon
} : ButtonProps ) => {
    return <button onClick={onClick} className={`${variant === "primary" ? "bg-indigo-500" : "bg-[#17203f]"} rounded-md text-white py-2 px-2 flex gap-2  items-center hover:opacity-90 cursor-pointer h-12 w-36 justify-center border-1 border-gray-600`}>
        {text}
        {startIcon}
    </button>
}

