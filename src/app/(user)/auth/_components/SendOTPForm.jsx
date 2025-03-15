"use client";

import Loading from "@/components/Loading";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";

function SendOTPForm({ phoneNumber, onChange, onSubmit, isGetting }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <TextField
        label="شماره موبایل"
        name="phoneNumber"
        value={phoneNumber}
        onChange={onChange}
        //   type="tel"
        className=""
        //   isRequired
      />
      {isGetting ? (
        <Loading  />
      ) : (
        <Button type="submit" className="btn btn--primary w-full">
          تایید
        </Button>
      )}
    </form>
  );
}

export default SendOTPForm;
