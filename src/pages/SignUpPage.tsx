import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { InputState } from "../interface/types";
import axios from "../axios";
import { useReduxAction } from "../hooks/UseRedux";

export default function SignUpPage()
{
  const navigator = useNavigate();

  const { setIsSignedIn } = useReduxAction();

  const [email, setEmail] = useState<InputState>({
    value: "",
    hasError: false,
  });
  const [password, setPassword] = useState<InputState>({
    value: "",
    hasError: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<InputState>({
    value: "",
    hasError: false,
  });
  const [username, setUsername] = useState<InputState>({
    value: "",
    hasError: false,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    toast.dismiss();
    let hasError = false;

    //Pattern matching
    if (
      !email.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setEmail((prev) => ({ ...prev, hasError: true }));
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
      });
      hasError = true;
    }

    if (!password.value.match(/[\S\s]+[\S]+/)) {
      setPassword((prev) => ({ ...prev, hasError: true }));
      toast.error("Please enter a valid password", {
        position: "bottom-right",
      });
      hasError = true;
    }
    if (!confirmPassword.value.match(/[\S\s]+[\S]+/)) {
      toast.error("Please enter a valid password", {
        position: "bottom-right",
      });
      setConfirmPassword((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }
    if (!username.value.match(/[\S\s]+[\S]+/)) {
      toast.error("Please enter a valid username", {
        position: "bottom-right",
      });
      setUsername((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (confirmPassword.value != password.value) {
      toast.error("The Passwords do no match", {
        position: "bottom-right",
      });
      setPassword((prev) => ({ ...prev, hasError: true }));
      setConfirmPassword((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (hasError) return;

    try
    {
      let response = await axios.post("/user/signup", {
        email: email.value,
        password: password.value,
        username: username.value,
      });
      console.log(response);
      if (response.status === 200)
      {
        toast.success("Account Created Successfully", {
          position: "bottom-right",
        });

        localStorage.setItem("token", response.data.data.token);
        setIsSignedIn(true);
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
          src="https://i.pinimg.com/1200x/91/ea/fb/91eafbd5f3d434b44c317518360540ca.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8 h-screen w-full md:w-128 p-4">
        <h1 className="text-2xl md:text-4xl font-bold">Create an account</h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="p-2 md:p-8 flex flex-col gap-4 w-full"
        >
          <div className="flex flex-wrap gap-4">
            <Input
              className="w-48 grow"
              placeHolder="Enter Your Username"
              value={username.value}
              hasError={username.hasError}
              onChange={(e) =>
                setUsername({ value: e.target.value, hasError: false })
              }
            >
              Username
            </Input>
          </div>
          <Input
            className="w-full"
            placeHolder="example@website.com"
            value={email.value}
            hasError={email.hasError}
            onChange={(e) =>
              setEmail({ value: e.target.value, hasError: false })
            }
          >
            Email
          </Input>
          <Input
            className="w-full"
            placeHolder="Enter Your Password"
            type="password"
            value={password.value}
            hasError={password.hasError}
            onChange={(e) =>
              setPassword({ value: e.target.value, hasError: false })
            }
          >
            Password
          </Input>
          <Input
            className="w-full"
            placeHolder="Enter Your Password"
            type="password"
            value={confirmPassword.value}
            hasError={confirmPassword.hasError}
            onChange={(e) =>
              setConfirmPassword({ value: e.target.value, hasError: false })
            }
          >
            Confirm Password
          </Input>
          <Button className="bg-[#477023]" color="primary">
            Create Account
          </Button>
          <h1 className="text-center text-text/70">
            Already have an account?{" "}
            <Link className="text-accent" to="/signin">
              Sign in
            </Link>
          </h1>
        </form>
      </div>
    </section>
  );
}
