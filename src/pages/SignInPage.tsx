import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { InputState } from "../interface/types";
import { useReduxAction } from "../hooks/UseRedux";
import axios from "../axios";

export default function SignInPage()
{

  const navigator = useNavigate();
  const { setIsSignedIn } = useReduxAction();

  const { setLoginData } = useReduxAction()
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

    try
    {
      let response = await axios.post("/user/login", {
        username: username.value,
        password: password.value,
      });
      // console.log(response)
      if(response.status === 200)
      {
        toast.success("SignedIn Successfully", {
          position: "bottom-right",
        });
        localStorage.setItem("token", response.data.data.token);
        setIsSignedIn(true);
        setLoginData({
          username: username.value,
          password: password.value,
        });

        navigator('/')
      }
    }
    catch(e: any)
    {
      console.log(e);
      toast.error(e?.response?.data?.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    // <section className="min-h-screen mx-auto container flex flex-col justify-center items-center">
    <section className="min-h-screen flex">
      <div className="bg-primary grow pattern relative">
        <img
          className="h-full absolute left-0 top-0 w-full object-cover"
          src="https://i.pinimg.com/1200x/e6/76/ca/e676cab97e5909a306b752998d5a21ac.jpg"
          alt="side-image"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8 h-screen w-full md:w-128 p-4">
        <h1 className="text-2xl md:text-4xl font-bold">
          Sign in to your account
        </h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="p-2 md:p-8 flex flex-col gap-4 w-full"
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
            className="w-full bg-[#477023]"
            color="primary"
          >
            Sign in
          </Button>
          <h1 className="text-center text-text/70">
            Don't have an account?{" "}
            <Link className="text-accent" to="/signup">
              Sign up
            </Link>
          </h1>
        </form>
      </div>
    </section>
  );
}
