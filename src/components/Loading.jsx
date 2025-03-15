import { SyncLoader } from "react-spinners";

function Loading({ size = 10, margin = 3, speed = 0.7 }) {
  return (
    <div className="flex w-full items-center justify-center">
      <SyncLoader
        className="flex"
        color="rgb(var(--color-primary-700))"
        cssOverride={{ justifyItems: "center" }}
        margin={margin}
        size={size}
        speedMultiplier={speed}
      />
    </div>
  );
}

export default Loading;
