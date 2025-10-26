import React from 'react';
import { MessageSquare, Shield, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Sparkles className="text-violet-300" size={22} />,
    title: 'Micro‑emotion decoding',
    desc: 'Detects stress, confidence, sarcasm, uncertainty, and tension from voice or video in real time.'
  },
  {
    icon: <MessageSquare className="text-amber-300" size={22} />,
    title: 'Intent‑aligned rewriting',
    desc: 'Transforms your raw message into polite, firm, warm, or neutral tones—without losing meaning.'
  },
  {
    icon: <Heart className="text-rose-300" size={22} />,
    title: 'Therapy & wellbeing',
    desc: 'Track emotional patterns session‑to‑session for coaches, therapists, and journaling.'
  },
  {
    icon: <Shield className="text-cyan-300" size={22} />,
    title: 'Privacy first',
    desc: 'Local processing options and selective redaction. Your emotions are yours.'
  }
];

export default function Features() {
  return (
    <section className="relative bg-[#0b0c10] py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold tracking-tight"
        >
          Emotion AI that actually listens
        </motion.h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-white/10">
                  {f.icon}
                </div>
                <h3 className="font-medium">{f.title}</h3>
              </div>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
