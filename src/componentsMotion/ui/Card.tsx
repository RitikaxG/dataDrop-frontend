import { IconX, IconMessage, IconRotate360,IconView360Number, type IconProps } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Card(){
    const [ open,setOpen ] = useState(true);

    return <div className="flex justify-start px-4 py-10">
        {/* // Card */}
        <AnimatePresence>
        {open && 
        <motion.div
        exit={{
            opacity : 0,
            scale : 0.98,
            filter : "blur(10px)"
        }}

        initial={{
            opacity : 0,
            scale : 0.98,
            filter : "blur(10px)"
        }}

        animate={{
            opacity : 1,
            scale : 1.05,
            filter : "blur(0px)"
        }}

        transition={{
            duration : 0.3,
            ease : "easeInOut"

        }}

        className="flex flex-col w-80 h-[28rem] min-h-[26rem] shadow-lg rounded-xl bg-white p-6">
            <h2 className="font-bold text-[10px] flex justify-center">Aceternity UI Components</h2>
            <p className="text-[8px] text-neutral-400 pt-2">A collection of UI components for your project get on with it.</p>

            <div className="flex justify-center my-2">
                <button type="button" onClick={() => {
                    setOpen(open => !open)
                }} className="flex justify-center items-center gap-1 shadow-md rounded-md px-4 py-2 w-fit text-[10px]">
                    <img src=""/>
                    Aceternity
                    <IconX size={12}/>
                </button>
            </div>
            

            <div className="relative flex-1 bg-gray-100 border-dashed border-neutral-600 rounded-lg shadow-md my-2">
                <motion.div
                    initial={{
                        opacity: 0,
                        scale : 0.98,
                        filter : "blur(10px)"
                    }}

                    whileHover={{
                        opacity : 1,
                        scale : 1.05,
                        filter : "blur(0px)"
                    }}

                    transition={{
                        type : "spring",
                        stiffness : 100,
                        damping : 15
                    }}

                    className="absolute inset-0 divide-y divide-neutral-300 bg-white rounded-lg border-1 border-neutral-200">
                    <FeatureComponent Logo={IconMessage} title="Aceternity UI components" description="a collection of UI compoents"/>
                    <FeatureComponent Logo={IconRotate360} title="Some other components" description="Here goes another subtitle"/>
                    <FeatureComponent Logo={IconView360Number} title="360 Degree Survelliance" description="Best in class you know"/>
                </motion.div>
            </div>
        </motion.div>
    }
    </AnimatePresence>
    </div>
}

interface featureProps {
    Logo : React.ComponentType<IconProps>
    title : string,
    description : string
}
const FeatureComponent = ({
    Logo,
    title,
    description
} : featureProps) => {
    return <div className="flex gap-2 p-4 items-center">
        {/* // Logo */}
        <div className="shadow-lg p-3 rounded-md">
            <Logo/>
        </div>

        <div className="flex flex-col gap-1">
            <div className="text-[8px] font-semibold">{title}</div>
            <div className="text-neutral-400 text-[8px]">{description}</div>
        </div>

    </div>
}
