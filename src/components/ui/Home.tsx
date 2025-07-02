import {motion, useAnimationFrame} from "motion/react";
import { options } from "./AddContentModal";
import Preview from "../../assets/DashScreen.png";
import { useNavigate } from "react-router-dom";

export default function Home(){
    return <div className="flex flex-col w-full">
        <NavHome/>
        <div className="flex flex-col justify-center items-center text-center px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
            One Drop <span className="text-indigo-600">Infinite Insights</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-zinc-600 max-w-xl font-medium">
            dataDrop extracts, summarizes, tags, and makes your content searchable with AI.
            Save links from anywhere, query them with natural language.
          </p>
          <ButtonMotion/>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
            <SupportedContents/>
        </div>
         
         <Features/>
         <DashboardPreview modal={Preview}/>
         <Footer/>
    </div>
}

export const NavHome = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 sm:px-10 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-zinc-800">data</span>
        <span className="text-indigo-600">Drop</span>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        <motion.button onClick={()=>{
          navigate("/signin")
        }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2 sm:py-3 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 transition"
        >
          Sign Up
        </motion.button>

        <motion.button onClick={()=>{
          navigate("/signin")
        }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2 sm:py-3 border-2 border-black text-black hover:bg-black hover:text-white font-medium rounded-full transition"
        >
          Sign In
        </motion.button>
      </div>
    </nav>
  );
};



export const ButtonMotion = () => {
  const navigate = useNavigate();
  return (
    <motion.button onClick={()=>{
      navigate("/signin")
    }}
      whileHover={{
        rotateX: 15,
        rotateY: -10,
        boxShadow: "0px 15px 40px rgba(99,102,241,0.5)", // Tailwind indigo-500
        y: -6,
      }}
      whileTap={{
        scale: 0.98,
        rotateX: 0,
        rotateY: 0,
        boxShadow: "0px 8px 25px rgba(99,102,241,0.4)",
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="group relative bg-indigo-500 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg mt-8 transition-all duration-300"
    >
      <span className="group-hover:text-white transition-colors duration-300 text-base sm:text-lg">
        Get Started
      </span>

      {/* Subtle bottom highlight */}
      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

      {/* Glowing blur on hover */}
      <span className="absolute inset-x-0 bottom-0 h-[8px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};
export const SupportedContents = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-white via-indigo-50 to-white">
      <h3 className="text-center text-3xl font-semibold text-zinc-800 mb-10">
        Supported Content Types
      </h3>

      <div className="relative overflow-hidden max-w-5xl mx-auto px-6">
        <Marquee>
          {options.map((option, i) => (
            <IconComponent key={i} icon={option.image} text={option.text} />
          ))}
        </Marquee>

        {/* Gradient Fades on Edges */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};


const IconComponent = ({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4 }}
      className="flex flex-col items-center gap-2 px-6 py-4 bg-white rounded-2xl shadow-md hover:shadow-xl hover:bg-indigo-50 transition-all duration-300 min-w-[120px]"
    >
      <div className="w-10 h-10 mb-2">
        <img src={icon} alt={text} className="w-full h-full object-contain" />
      </div>
      <div className="text-sm text-center font-medium text-zinc-700">{text}</div>
    </motion.div>
  );
};



import { useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { Features } from "./Features";

const Marquee = ({ children }: { children: React.ReactNode }) => {
  const baseX = useMotionValue(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    baseX.set(baseX.get() - (0.04 * delta)); // speed
  });

  // Use modulus to loop
  const x = useTransform(baseX, (latest) => `${latest % -1000}px`);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-6 w-fit"
        ref={marqueeRef}
        style={{ x }}
      >
        {/* Duplicate children for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export const DashboardPreview = ({
  modal
}: {
  modal : string
}) => {
  return (
    <div className="px-8 flex justify-center mt-8">
      <motion.img
        src={modal}
        alt="Preview"
        className="scale-90 rounded-2xl"
        initial={{ boxShadow: "0 0 0px rgba(99,102,241,0.3)" }}
        animate={{
          boxShadow: [
            "0 0 5px rgba(99,102,241,0.3)",
            "0 0 20px rgba(99,102,241,0.6)",
            "0 0 5px rgba(99,102,241,0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-zinc-100 border-t border-zinc-200 py-8 mt-24">
      <div className="text-center text-sm text-zinc-500">
        <span className="font-semibold text-zinc-700">data</span>
        <span className="font-semibold text-indigo-600">Drop</span> &nbsp;·&nbsp; 
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

