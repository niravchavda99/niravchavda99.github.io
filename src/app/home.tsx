"use client";

import ScrollToTop from "react-scroll-to-top";
import { ChevronUpIcon } from "lucide-react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { ReactNode } from "react";

interface HomeProps {
  children: ReactNode;
}

export function Home({ children }: HomeProps) {
  return (
    <>
      <ScrollToTop
        smooth
        style={{
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: "24px",
          right: "24px",
          width: "40px",
          height: "40px",
          boxShadow:
            "0 0 0 1px rgba(34,211,238,0.3), 0 0 20px rgba(34,211,238,0.15)",
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(167,139,250,0.1))",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(34,211,238,0.3)",
        }}
        component={<ChevronUpIcon size={16} color="#22d3ee" />}
      />
      <Navbar />
      <div className="relative min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#060b14] text-left">
        {/* Dot grid background */}
        <div
          className="fixed inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none -z-10 dark:opacity-100 opacity-0 transition-opacity duration-500"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Ambient gradient orbs */}
        <div className="fixed top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none -z-10 bg-cyan-300/10 dark:bg-cyan-400/5 blur-[140px]" />
        <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none -z-10 bg-violet-300/10 dark:bg-violet-500/5 blur-[120px]" />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none -z-10 bg-emerald-300/5 dark:bg-emerald-400/3 blur-[160px]" />

        <div className="flex flex-col flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
