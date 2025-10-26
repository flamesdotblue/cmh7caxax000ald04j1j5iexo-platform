import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Mic, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10]/40 via-[#0b0c10]/70 to-[#0b0c10] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Sparkles size={14} />
            Real-time Emotion-to-Text Translator
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Say what you feel.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300"> Be understood by AI & people.</span>
          </h1>
          <p className="mt-5 text-white/80 text-lg max-w-2xl">
            Your voice or face carries micro‑emotions. We decode them—stress, confidence, sarcasm—and rewrite your message, email, or post to match your true intent.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-black px-5 py-3 font-medium hover:bg-white/90 transition">
              Try the Demo
              <ArrowRight size={18} />
            </a>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 border border-white/10 px-5 py-3 font-medium hover:bg-white/20 transition">
              <Mic size={18} />
              Use Voice (soon)
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
