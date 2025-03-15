"use client";

import { useEffect, useState } from "react";
import SendOTPForm from "./_components/SendOTPForm";
import { checkOTPApi, getOTPApi } from "@/services/authServices";
import CheckOTPForm from "./_components/CheckOTPForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { isPending: isGetting, mutateAsync: getOtp } = useMutation({
    mutationFn: getOTPApi,
  });
  const { isPending: isChecking, mutateAsync: checkOtp } = useMutation({
    mutationFn: checkOTPApi,
  });
  // const { isPending: isLoading, mutateAsync: getUser } = useMutation({
  //   mutationFn: getUserApi,
  // });

  const [time, setTime] = useState(RESEND_TIME);
  const [otp, setOtp] = useState("");

  const PhoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const SendOTPFormHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await getOtp({ phoneNumber });
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
      toast.success(data.message);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  const CheckOTPFormHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await checkOtp({ phoneNumber, otp });
      document.location.href = "/";
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
      toast.success(message);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval((t) => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            isGetting={isGetting}
            phoneNumber={phoneNumber}
            onSubmit={SendOTPFormHandler}
            onChange={PhoneNumberHandler}
          />
        );

      case 2:
        return (
          <CheckOTPForm
            time={time}
            isChecking={isChecking}
            onSubmit={CheckOTPFormHandler}
            otp={otp}
            setOtp={setOtp}
            onBack={() => setStep(1)}
            phoneNumber={phoneNumber}
            onResendOtp={SendOTPFormHandler}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-full sm:max-w-screen-sm ">{renderSteps()}</div>
    </div>
  );
}

export default AuthPage;
