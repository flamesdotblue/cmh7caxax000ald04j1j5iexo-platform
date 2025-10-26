import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const tones = [
  { key: 'politeFirm', label: 'Polite but firm' },
  { key: 'neutralPro', label: 'Neutral professional' },
  { key: 'warmEmp', label: 'Warm empathetic' },
  { key: 'direct', label: 'Direct concise' },
  { key: 'sarcasmProof', label: 'Sarcasm‑proof' }
];

function cleanSpaces(str) {
  return str.replace(/\s+/g, ' ').replace(/\s+([,.!?;:])/g, '$1').trim();
}

function softenCaps(str) {
  return str.replace(/[A-Z]{3,}/g, (m) => m[0] + m.slice(1).toLowerCase());
}

function normalizePunctuation(str) {
  return str
    .replace(/!{2,}/g, '!')
    .replace(/\?{2,}/g, '?')
    .replace(/\.\.+/g, '…');
}

function replaceHarshPhrases(str) {
  const swaps = [
    [/you need to/gi, 'could you please'],
    [/you should/gi, 'it would help to'],
    [/that\'s wrong/gi, "I see it differently"],
    [/this is unacceptable/gi, 'this needs adjustment'],
    [/asap/gi, 'as soon as possible'],
    [/now/gi, 'soon'],
  ];
  return swaps.reduce((acc, [r, v]) => acc.replace(r, v), str);
}

function addHedges(str) {
  const starters = ['From my perspective,', 'It seems that', 'I might be missing something, but'];
  const lead = starters[Math.floor(Math.random() * starters.length)];
  return `${lead} ${str}`;
}

function makeConcise(str) {
  return str
    .replace(/\b(I think|I believe|In my opinion|Just)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function deSarcasm(str) {
  return str
    .replace(/\b(sure|yeah right|great)\b[.!?]?/gi, 'noted')
    .replace(/\b(obviously|clearly)\b/gi, '')
    .replace(/\s+/g, ' ') 
    .trim();
}

function transform(text, toneKey) {
  if (!text) return '';
  let t = text;
  t = cleanSpaces(t);
  t = softenCaps(t);
  t = normalizePunctuation(t);

  switch (toneKey) {
    case 'politeFirm': {
      t = replaceHarshPhrases(t);
      if (!/^please\b/i.test(t)) t = t.replace(/^(.*)$/i, 'Please $1');
      t = t.replace(/\b(can you|could you)\b/gi, 'Please');
      // add a firm close
      if (!/[.!?]$/.test(t)) t += '.';
      t += ' I need this to stay on track.';
      break;
    }
    case 'neutralPro': {
      t = replaceHarshPhrases(t);
      t = deSarcasm(t);
      t = makeConcise(t);
      t = t.replace(/\b(hey|hi|hello)\b[, ]?/gi, '');
      if (!/[.!?]$/.test(t)) t += '.';
      break;
    }
    case 'warmEmp': {
      t = replaceHarshPhrases(t);
      t = deSarcasm(t);
      t = `I appreciate your effort. ${t}`;
      t = t.replace(/\b(please)\b/gi, 'please');
      if (!/[.!?]$/.test(t)) t += '.';
      t += ' Thank you for understanding.';
      break;
    }
    case 'direct': {
      t = makeConcise(t);
      t = deSarcasm(t);
      t = t.replace(/[,;:]/g, '.');
      t = t.split('.').map(s => s.trim()).filter(Boolean).join('. ');
      if (!/[.!?]$/.test(t)) t += '.';
      break;
    }
    case 'sarcasmProof': {
      t = deSarcasm(t);
      t = addHedges(t);
      if (!/[.!?]$/.test(t)) t += '.';
      break;
    }
    default:
      break;
  }

  return t;
}

export default function Demo() {
  const [input, setInput] = useState("I NEED this now!!! You're wrong. Can you fix it ASAP?");
  const [tone, setTone] = useState('politeFirm');
  const output = useMemo(() => transform(input, tone), [input, tone]);

  return (
    <section id="demo" className="relative py-20 bg-gradient-to-b from-[#0b0c10] to-[#0b0c10]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold">Try it now</h3>
            <p className="mt-2 text-white/70">Paste your raw message. Pick a tone. Get a version that matches your intent.</p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-2">
              {tones.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTone(t.key)}
                  className={`text-sm rounded-md border px-3 py-2 transition ${tone === t.key ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label className="text-sm text-white/70">Your raw message</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                className="mt-2 w-full rounded-lg bg-black/40 border border-white/10 p-4 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Type what you really said or want to say..."
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90"
              >
                Rewrite
                <ArrowRight size={16} />
              </a>
              <span className="text-xs text-white/60">Local-only demo. Voice/video coming soon.</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="h-full rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">Rewritten output</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(output || '');
                  }}
                  className="text-xs rounded-md border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20"
                >
                  Copy
                </button>
              </div>
              <div className="mt-3 rounded-lg bg-black/30 p-4 min-h-[180px] whitespace-pre-wrap leading-relaxed text-white/90">
                {output || 'Your rewrite will appear here.'}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <MiniMeter label="Confidence" value={tone === 'warmEmp' ? 52 : tone === 'politeFirm' ? 68 : tone === 'direct' ? 75 : 60} />
                <MiniMeter label="Stress" value={tone === 'direct' ? 30 : tone === 'politeFirm' ? 25 : 18} hue={20} />
                <MiniMeter label="Sarcasm" value={tone === 'sarcasmProof' ? 2 : 10} hue={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniMeter({ label, value, hue = 200 }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-3">
      <div className="text-xs text-white/70">{label}</div>
      <div className="mt-2 h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full"
          style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: `linear-gradient(90deg, hsla(${hue},80%,65%,1), hsla(${hue+30},80%,60%,1))` }}
        />
      </div>
      <div className="mt-1 text-right text-[10px] text-white/60">{Math.round(value)}%</div>
    </div>
  );
}
