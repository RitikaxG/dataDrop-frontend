import { RefObject, useEffect, useRef, useState } from "react";
import Brain from "../../assets/brain.png";
import Signed from "../../assets/signed.png";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const navigate = useNavigate();

    const [ response, setResponse ] = useState<string | null>(null);
    const [ signinResponse, setSigninResponse ] = useState<string | null>(null);

    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef  = useRef<HTMLInputElement>(null);
    const emailRef     = useRef<HTMLInputElement>(null);
    const passwordRef  = useRef<HTMLInputElement>(null);
    const signinRef    = useRef<HTMLDivElement>(null)

    const inputs = [
        {
            type : "text",
            placeholder : "First Name",
            reference   : firstnameRef
        },{
            type : "text",
            placeholder : "Last Name",
            reference   : lastnameRef
        },{
            type : "email",
            placeholder : "Email",
            reference   : emailRef
        },{
            type : "password",
            placeholder : "Password",
            reference   : passwordRef
        }
    ]

    useEffect(()=>{
        const interval = setTimeout(() => {
            setResponse(null);
        },5000)

        return () => { 
            clearTimeout(interval);
        }
    },[response])

    const [ login, setLogin ] = useState(false);
    const loginInput = inputs.slice(2,4);
    
    const signup = async () => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                firstname : firstnameRef.current?.value,
                lastname  : lastnameRef.current?.value,
                email     : emailRef.current?.value,
                password  : passwordRef.current?.value
            })
            if(response.data.message){
                setResponse(response.data.message);
            }
            else{
                setResponse(response.data);
            }
        }
            
        catch(err : any){
            if(axios.isAxiosError(err)){
                if(err.response?.status === 401){
                    setResponse("User already exists. Please sign in!");
                    setTimeout(()=>{
                        setLogin(true);
                    },2000)
                }
                else if(err.response && err.response.data?.error?.length > 0 ){
                    const firstError = err.response.data.error[0];
                    setResponse(`${firstError.field} : ${firstError.message}`);
                }
                else{
                    setResponse(`Something went wrong ${err}`);
                }
            }
            else{
                setResponse("Unexpected error occurred");
            }
        }
    }

    const signin = async () => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                email    : emailRef.current?.value,
                password : passwordRef.current?.value
            })
            localStorage.setItem("token",response.data.token);
            setSigninResponse(response.data.message);

            setTimeout(()=>{
                navigate("/home");
            },1000)
        }
        catch(err){
            if(axios.isAxiosError(err)){
                if(err.response?.status === 401){
                    setSigninResponse("user not found");
                }
                else if(err.response?.status === 403){
                    setSigninResponse("Incorrect password");
                }
                else{
                    setSigninResponse(`Something went wrong ${err}`)
                }
            }
            else{
                setSigninResponse("An unknown error occurred");
            }
        }
    }

    return <div className="flex flex-col justify-center items-center w-screen h-screen bg-[#0a122c]">
        <div className="flex  w-[80%] h-[80%] ">
            {/* Left Section */}

            {!login ? <div className=" bg-[#6a74c5] items-center flex flex-col py-28 w-[50%] rounded-2xl rounded-r-none shadow-[0_10px_30px_rgba(255,255,255,0.1)] motion-preset-slide-right transition-all duration-1000">
                <div className="text-white text-6xl font-thin ">Hello, friend!</div>
                <div className="text-light pt-2 text-white opacity-80 text-center w-[50%]">Enter your personal details to start your journey with us</div>
                <div ref={signinRef}
                 onClick={()=>{
                    setLogin(login => !login)
                }}
                 className="z-50 text-white rounded-full border-1 border-white px-20 text-center py-4 text-lg mt-6 cursor-pointer hover:bg-white hover:opacity-90 hover:border-black hover:text-black">Sign In</div>
                <div><img className="scale-118" src={Brain}/></div>
            </div>
            
        : 
            <div className="bg-white flex flex-col w-[50%] px-20 justify-center rounded-r-none rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.1)]  motion-preset-slide-right transition-all duration-1000">
                <div className="flex text-[36px] font-light text-[#0a122c] justify-center pb-12">
                    <span>Signin to &nbsp;</span>
                    <span className="font-semibold">data</span>
                    <span className=" font-semibold text-indigo-700">Drop</span>
                </div>
                <div className="flex flex-col justify-center">
                {loginInput.map(input => (
                    <InputBox reference={input.reference} type={input.type} placeholder={input.placeholder}/>
                ))}
                </div>
                <div onClick={signin}
                className="text-white text-lg bg-[#17203f] rounded-full w-xs flex justify-center mt-16 py-4 mx-auto cursor-pointer hover:bg-[#4743a2]">Sign In</div>

                <div className="pt-6 text-red-500 flex justify-center">{signinResponse}</div>
            </div>
        
        }
            {/* Right Section */}
            {!login ? <div className="bg-white flex flex-col w-[50%] px-20 justify-center rounded-l-none rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.1)] motion-preset-slide-left transition-all duration-1000">
                <div className="flex text-5xl font-light text-[#0a122c] justify-center pb-12">Create Account</div>
                <div className="flex flex-col justify-center">
                {inputs.map(input => (
                    <InputBox reference={input.reference} type={input.type} placeholder={input.placeholder}/>
                ))}
                </div>
                <div onClick={signup}
                className="text-white text-lg bg-[#17203f] rounded-full w-xs flex justify-center mt-16 py-4 mx-auto cursor-pointer hover:bg-[#4743a2]">Sign Up</div>

                <div className="text-red-500 flex justify-center pt-6">{response}</div>
                
            </div> 
            
            :
            <div className=" bg-[#6a74c5] items-center flex flex-col py-28 w-[50%] rounded-2xl rounded-l-none shadow-[0_10px_30px_rgba(255,255,255,0.1)] motion-preset-slide-left transition-all duration-1000 ">
                <div className="text-white text-6xl font-thin ">Welcome Back!</div>
                <div className="text-light pt-2 text-white opacity-80 text-center w-[50%]">To keep connected with us please login with your personal details</div>
                <div 
                  onClick={()=>{
                    setLogin(login => !login)
                 }}
                 className="z-50 text-white rounded-full border-1 border-white px-20 text-center py-4 text-lg mt-6 cursor-pointer hover:bg-white hover:opacity-90 hover:border-black hover:text-black">Sign Up</div>
                <div><img className="" src={Signed}/></div>
            </div>
            }
        </div>
    </div>
}

interface InputBox {
    type        : string
    placeholder : string,
    onChange?   : () => void,
     reference   : RefObject<HTMLInputElement | null>
}


const InputBox = ({
    type,
    placeholder,
    onChange,
    reference
} : InputBox ) => {
    return <input ref={reference} type={type} placeholder={placeholder} onChange={onChange} className="border-b-1 border-gray-400 font-light text-gray-600 px-4 pt-8 pb-2 focus:outline-none"></input>
}