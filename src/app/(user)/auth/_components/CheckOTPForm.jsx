"use client";

import Button from "@/ui/Button";
import OTPInput from "react-otp-input";
import { PencilIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/Loading";

function CheckOTPForm({
  otp,
  isChecking,
  onSubmit,
  setOtp,
  phoneNumber,
  onBack,
  time,
  onResendOtp,
}) {
  return (
    <div className="flex flex-col items-start space-y-5">
      <span className="flex gap-2 text-secondary-600">
        کد به شماره موبایل <p className="font-bold">{phoneNumber}</p> ارسال شد
      </span>
      {time > 0 ? (
        <p className="flex gap-2 text-secondary-800">
          <span className="text-primary-800 font-bold">{time}</span>
          ثانیه تا ارسال مجدد کد
        </p>
      ) : (
        <button className="text-primary-700" onClick={onResendOtp}>
          ارسال مجدد
        </button>
      )}

      <div className="flex items-center gap-2">
        <span>ویرایش شماره موبایل</span>
        <button onClick={onBack}>
          <PencilIcon className="size-5 text-primary-500" />
        </button>
      </div>
      <form dir="ltr" className="form items-center" onSubmit={onSubmit}>
        <p className="text-lg font-bold">کد تایید را وارد کنید</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: "0.5rem",
          }}
          containerStyle="flex gap-2 justify-center"
          renderInput={(props) => <input {...props} />}
        />
        {isChecking ? (
            <Loading />
        ) : (
          <Button type="submit" className="btn btn--primary w-full">
            تایید
          </Button>
        )}
      </form>
    </div>
  );
}

export default CheckOTPForm;
