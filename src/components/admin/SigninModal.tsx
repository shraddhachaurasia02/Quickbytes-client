// import axios from "axios";
import { useState, FormEvent } from "react";
// import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useReduxAction } from "../../hooks/UseRedux";
import { InputState } from "../../interface/types";
import Button from "../common/Button";
import Input from "../common/Input";

export default function SigninModal(props:{setIsSignedIn: (val:boolean) => void}) {
    // const navigator = useNavigate();
    // const { setIsSignedIn } = useReduxAction();

    // const { setLoginData } = useReduxAction()
    const [username, setUsername] = useState<InputState>({
        value: "",
        hasError: false,
    });
    const [password, setPassword] = useState<InputState>({
        value: "",
        hasError: false,
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        toast.dismiss();
        let hasError = false;

        //Pattern matching
        if (!password.value.match(/[\S\s]+[\S]+/)) {
            toast.error("Please enter a valid password", {
                position: "bottom-right",
            });
            setPassword((prev) => ({ ...prev, hasError: true }));
            hasError = true;
        }
        if (!username.value.match(/[\S\s]+[\S]+/)) {
            toast.error("Please enter a valid username", {
                position: "bottom-right",
            });
            setUsername((prev) => ({ ...prev, hasError: true }));
            hasError = true;
        }

        if (hasError) return;

        try {
            //TODO VALIDATION ADMIN
            if(username.value !== "admin" || password.value !== "admin"){
                toast.error("Invalid Credentials", {
                    position: "bottom-right",
                });
                return;
            }
            props.setIsSignedIn(true);
            // let response = await axios.post("/user/login", {
            //     username: username.value,
            //     password: password.value,
            // });
            // console.log(response)
            // if (response.status === 200) {
            //     toast.success("SignedIn Successfully", {
            //         position: "bottom-right",
            //     });
            //     localStorage.setItem("token", response.data.token);
            //     setIsSignedIn(true);
            //     setLoginData({
            //         username: username.value,
            //         password: password.value,
            //     });

            //     navigator('/')
            // }
        }
        catch (e: any) {
            console.log(e);
            toast.error(e?.response?.data?.message, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="h-screen w-screen fixed z-50 bg-black/50 backdrop-blur grid place-items-center">
            <div className="card flex flex-col justify-center items-center gap-4 p-4 w-full max-w-lg">
                <h1 className="text-2xl font-bold">
                    Admin Signin
                </h1>
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className="p-2 flex flex-col gap-4 w-full"
                >
                    <Input
                        className="w-full"
                        placeHolder="Enter Your Username"
                        value={username.value}
                        hasError={username.hasError}
                        onChange={(e) =>
                            setUsername({ value: e.target.value, hasError: false })
                        }
                    >
                        Username
                    </Input>
                    <Input
                        className="w-full"
                        placeHolder="Enter Your Password"
                        type="password"
                        value={password.value}
                        hasError={password.hasError}
                        onChange={(e) =>
                            setPassword({
                                value: e.target.value,
                                hasError: false,
                            })
                        }
                    >
                        Password
                    </Input>
                    <Button
                        className="mt-4 bg-[#477203]"
                        
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}