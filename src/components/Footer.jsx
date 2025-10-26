import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0c10]">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Human Emotion Interface</div>
            <div className="text-xs text-white/60">Decode tone. Deliver intent. Communicate clearly.</div>
          </div>
          <a
            href="mailto:hello@emotioninterface.ai"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          >
            <Mail size={16} />
            hello@emotioninterface.ai
          </a>
        </div>
        <div className="mt-6 text-[11px] text-white/50">© {new Date().getFullYear()} Human Emotion Interface. All rights reserved.</div>
      </div>
    </footer>
  );
}
