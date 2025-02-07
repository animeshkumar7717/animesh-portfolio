"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Custom Hook to track relative mouse position
const useRelativeMousePosition = (to: React.RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      if (!to.current) return;
      const { top, left } = to.current.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return [mouseX, mouseY];
};

// Popup component
const Popup = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="border border-white/15 p-6 md:p-10 rounded-xl bg-gradient-to-bl from-[rgba(140,69,255,0.3)] to-black max-w-xs md:max-w-md text-center relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <p className="text-lg md:text-2xl tracking-tight text-white">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300"
      >
        OK
      </button>
    </motion.div>
  </motion.div>
);

export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      response.ok ? setPopupMessage("Mail sent successfully!") : setPopupMessage("Failed to send mail");
    } catch (error) {
      console.error("Error:", error);
      setPopupMessage("Error sending mail");
    }
  };

  const handleClosePopup = () => {
    setPopupMessage(null);
    (document.querySelector("form") as HTMLFormElement)?.reset();
  };

  return (
    <section id="contact" className="py-12 relative z-10" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={borderedDivRef}
          className="max-w-lg md:max-w-3xl mx-auto py-12 md:py-16 px-6 md:px-10 rounded-xl overflow-hidden relative group"
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-[rgb(36,16,66)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"></div>
          <motion.div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
            style={{ maskImage }}
          ></motion.div>
          <div className="relative text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Contact Us
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/70 mt-3">
              We&apos;re here to help. Send us a message, and we&apos;ll respond soon.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-sm mx-auto text-white">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent placeholder-white/60 focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent placeholder-white/60 focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent placeholder-white/60 focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent placeholder-white/60 focus:ring-2 focus:ring-purple-600 transition duration-300"
                rows={4}
              ></textarea>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-8 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      {popupMessage && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </section>
  );
};
