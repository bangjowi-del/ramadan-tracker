import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Moon, 
  Sun, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Info, 
  MapPin, 
  Volume2,
  Heart
} from "lucide-react";
import { RAMADAN_DATA, SHAWWAL_DATA, DUAS, RamadanDay } from "./constants";

const ALL_DATA = [...RAMADAN_DATA, ...SHAWWAL_DATA];

export default function App() {
  const [now, setNow] = useState(new Date());
  const [showDua, setShowDua] = useState<"sahar" | "iftar" | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayStr = now.toISOString().split("T")[0];
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const todayData = useMemo(() => ALL_DATA.find(d => d.date === todayStr), [todayStr]);
  const tomorrowData = useMemo(() => ALL_DATA.find(d => d.date === tomorrowStr), [tomorrowStr]);

  const nextEvent = useMemo(() => {
    if (!todayData) return null;

    const [saharH, saharM] = todayData.sahar.split(":").map(Number);
    const [iftarH, iftarM] = todayData.iftar.split(":").map(Number);

    const saharTime = new Date(now);
    saharTime.setHours(saharH, saharM, 0, 0);

    const iftarTime = new Date(now);
    iftarTime.setHours(iftarH, iftarM, 0, 0);

    if (now < saharTime) {
      return { type: "Sahar", time: saharTime, label: "Beginn des Fastens" };
    } else if (now < iftarTime) {
      return { type: "Iftar", time: iftarTime, label: "Fastenbrechen" };
    } else if (tomorrowData) {
      const [nextSaharH, nextSaharM] = tomorrowData.sahar.split(":").map(Number);
      const nextSaharTime = new Date(tomorrow);
      nextSaharTime.setHours(nextSaharH, nextSaharM, 0, 0);
      return { type: "Sahar", time: nextSaharTime, label: "Beginn des Fastens (Morgen)" };
    }
    return null;
  }, [now, todayData, tomorrowData, tomorrow]);

  const countdown = useMemo(() => {
    if (!nextEvent) return null;
    const diff = nextEvent.time.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  }, [nextEvent, now]);

  const fastProgress = useMemo(() => {
    if (!todayData) return 0;
    const [saharH, saharM] = todayData.sahar.split(":").map(Number);
    const [iftarH, iftarM] = todayData.iftar.split(":").map(Number);
    
    const start = new Date(now);
    start.setHours(saharH, saharM, 0, 0);
    
    const end = new Date(now);
    end.setHours(iftarH, iftarM, 0, 0);
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const current = now.getTime() - start.getTime();
    return (current / total) * 100;
  }, [now, todayData]);

  const isFasting = fastProgress > 0 && fastProgress < 100;

  const ramadanDayIndex = useMemo(() => {
    return RAMADAN_DATA.findIndex(d => d.date === todayStr);
  }, [todayStr]);

  const currentAshra = useMemo(() => {
    if (ramadanDayIndex === -1) return null;
    const day = ramadanDayIndex + 1;
    if (day <= 10) return { title: "1. Ashra", subtitle: "Tage der Gnade", color: "text-emerald-600" };
    if (day <= 20) return { title: "2. Ashra", subtitle: "Tage der Vergebung", color: "text-blue-600" };
    return { title: "3. Ashra", subtitle: "Erlösung von der Hölle", color: "text-red-600" };
  }, [ramadanDayIndex]);

  const eidDate = "2026-03-20";
  const isEid = todayStr === eidDate;

  return (
    <div className="min-h-screen bg-[#E6E9EF] text-[#4A5568] font-sans p-6 md:p-12 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#E6E9EF] rounded-xl shadow-[6px_6px_12px_#b8bec9,-6px_-6px_12px_#ffffff]">
            <Moon className="w-5 h-5 text-[#F27D26]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Ramadan 2026</h1>
            <div className="flex items-center gap-2">
              <p className="text-xs opacity-60 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Obertshausen
              </p>
              {currentAshra && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/50 shadow-sm ${currentAshra.color}`}>
                  {currentAshra.title}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{now.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <p className="text-2xl font-bold tracking-tighter text-[#2D3748]">
            {now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
            <span className="text-sm opacity-40 ml-1">{now.toLocaleTimeString('de-DE', { second: '2-digit' })}</span>
          </p>
        </div>
      </header>

      {/* Main Countdown Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#E6E9EF] rounded-[2rem] shadow-[12px_12px_24px_#b8bec9,-12px_-12px_24px_#ffffff] p-8 mb-8 relative"
      >
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-50 mb-2">
            Nächstes Ereignis
          </p>
          <h2 className="text-3xl font-black text-[#2D3748] mb-1">
            {nextEvent?.type === "Sahar" ? "Sahar" : "Iftar"}
          </h2>
          <p className="text-sm opacity-60 mb-6">{nextEvent?.label}</p>

          <div className="flex gap-4 mb-8">
            <div className="flex-1 bg-[#E6E9EF] rounded-2xl shadow-[inset_4px_4px_8px_#b8bec9,inset_-4px_-4px_8px_#ffffff] p-4 text-center">
              <p className="text-2xl font-bold text-[#F27D26]">{countdown?.hours.toString().padStart(2, '0')}</p>
              <p className="text-[10px] uppercase font-bold opacity-40">Std</p>
            </div>
            <div className="flex-1 bg-[#E6E9EF] rounded-2xl shadow-[inset_4px_4px_8px_#b8bec9,inset_-4px_-4px_8px_#ffffff] p-4 text-center">
              <p className="text-2xl font-bold text-[#F27D26]">{countdown?.minutes.toString().padStart(2, '0')}</p>
              <p className="text-[10px] uppercase font-bold opacity-40">Min</p>
            </div>
            <div className="flex-1 bg-[#E6E9EF] rounded-2xl shadow-[inset_4px_4px_8px_#b8bec9,inset_-4px_-4px_8px_#ffffff] p-4 text-center">
              <p className="text-2xl font-bold text-[#F27D26]">{countdown?.seconds.toString().padStart(2, '0')}</p>
              <p className="text-[10px] uppercase font-bold opacity-40">Sek</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase opacity-40">
              <span>Fastenfortschritt</span>
              <span>{Math.round(fastProgress)}%</span>
            </div>
            <div className="h-3 w-full bg-[#E6E9EF] rounded-full shadow-[inset_2px_2px_4px_#b8bec9,inset_-2px_-2px_4px_#ffffff] overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${fastProgress}%` }}
                className="h-full bg-gradient-to-r from-[#F27D26] to-[#FF9A44] rounded-full shadow-[0_0_10px_rgba(242,125,38,0.4)]"
              />
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none overflow-hidden rounded-[2rem]">
          <Moon className="w-48 h-48" />
        </div>

        {/* Ashra Subtitle */}
        {currentAshra && (
          <div className="absolute bottom-4 right-8 text-right opacity-20 pointer-events-none">
            <p className="text-xs font-black uppercase tracking-tighter">{currentAshra.subtitle}</p>
          </div>
        )}
      </motion.div>

      {/* Today & Tomorrow Grid */}
      <div className="w-full max-w-md grid grid-cols-2 gap-6 mb-8">
        {/* Today */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#E6E9EF] rounded-3xl shadow-[8px_8px_16px_#b8bec9,-8px_-8px_16px_#ffffff] p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-[#F27D26]" />
            <span className="text-xs font-bold uppercase opacity-50">Heute</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold opacity-40 uppercase">Sahar</p>
                <p className="text-xl font-bold text-[#2D3748]">{todayData?.sahar || "--:--"}</p>
              </div>
              <button 
                onClick={() => setShowDua("sahar")}
                className="p-2 bg-[#E6E9EF] rounded-lg shadow-[4px_4px_8px_#b8bec9,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bec9,inset_-2px_-2px_4px_#ffffff]"
              >
                <Volume2 className="w-3 h-3 opacity-60" />
              </button>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold opacity-40 uppercase">Iftar</p>
                <p className="text-xl font-bold text-[#2D3748]">{todayData?.iftar || "--:--"}</p>
              </div>
              <button 
                onClick={() => setShowDua("iftar")}
                className="p-2 bg-[#E6E9EF] rounded-lg shadow-[4px_4px_8px_#b8bec9,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bec9,inset_-2px_-2px_4px_#ffffff]"
              >
                <Volume2 className="w-3 h-3 opacity-60" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tomorrow */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#E6E9EF] rounded-3xl shadow-[8px_8px_16px_#b8bec9,-8px_-8px_16px_#ffffff] p-5 opacity-80"
        >
          <div className="flex items-center gap-2 mb-4">
            <ChevronRight className="w-4 h-4 text-[#4A5568]" />
            <span className="text-xs font-bold uppercase opacity-50">Morgen</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold opacity-40 uppercase">Sahar</p>
              <p className="text-xl font-bold text-[#2D3748]">{tomorrowData?.sahar || "--:--"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold opacity-40 uppercase">Iftar</p>
              <p className="text-xl font-bold text-[#2D3748]">{tomorrowData?.iftar || "--:--"}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dua Modal / Overlay */}
      <AnimatePresence>
        {showDua && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-10 md:p-16 bg-black/10 backdrop-blur-sm"
            onClick={() => setShowDua(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-[#E6E9EF] rounded-[2.5rem] shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_#ffffff] p-8 text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-[#E6E9EF] rounded-2xl shadow-[6px_6px_12px_#b8bec9,-6px_-6px_12px_#ffffff] flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-8 h-8 text-[#F27D26]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D3748] mb-4">
                Dua für {showDua === "sahar" ? "Sahar" : "Iftar"}
              </h3>
              <p className="text-2xl font-arabic leading-relaxed mb-4 text-[#2D3748] dir-rtl">
                {DUAS[showDua].arabic}
              </p>
              <p className="text-sm italic opacity-60 mb-4">
                "{DUAS[showDua].transliteration}"
              </p>
              <div className="p-4 bg-[#E6E9EF] rounded-2xl shadow-[inset_4px_4px_8px_#b8bec9,inset_-4px_-4px_8px_#ffffff] text-sm leading-relaxed">
                {DUAS[showDua].translation}
              </div>
              <button 
                onClick={() => setShowDua(null)}
                className="mt-8 w-full py-4 bg-[#E6E9EF] rounded-2xl shadow-[6px_6px_12px_#b8bec9,-6px_-6px_12px_#ffffff] font-bold text-[#F27D26] active:shadow-[inset_2px_2px_4px_#b8bec9,inset_-2px_-2px_4px_#ffffff]"
              >
                Schließen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upcoming Days List */}
      <div className="w-full max-w-md mb-8 px-2">
        <h3 className="text-sm font-bold uppercase opacity-40 mb-4 px-2">Nächste Tage</h3>
        <div className="relative">
          <div className="max-h-[320px] overflow-y-auto px-4 py-4 -mx-4 space-y-5 scrollbar-hide hover:scrollbar-default transition-all">
            {ALL_DATA.filter(d => d.date > tomorrowStr).map((day, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={day.date}
                className="bg-[#E6E9EF] rounded-2xl shadow-[6px_6px_12px_#b8bec9,-6px_-6px_12px_#ffffff] p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E6E9EF] rounded-xl shadow-[inset_2px_2px_4px_#b8bec9,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-xs font-bold text-[#F27D26]">
                    {day.dayName}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2D3748]">{new Date(day.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</p>
                    <p className="text-[10px] opacity-40">Ramadan Tag {RAMADAN_DATA.findIndex(d => d.date === day.date) + 1 || "Shawwal"}</p>
                  </div>
                </div>
                <div className="flex gap-6 text-right">
                  <div>
                    <p className="text-[8px] font-bold opacity-30 uppercase">Sahar</p>
                    <p className="text-sm font-bold text-[#2D3748]">{day.sahar}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold opacity-30 uppercase">Iftar</p>
                    <p className="text-sm font-bold text-[#2D3748]">{day.iftar}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Gradient Fade to indicate scroll */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#E6E9EF] via-[#E6E9EF]/80 to-transparent pointer-events-none rounded-b-2xl z-10" />
        </div>
      </div>

      {/* Eid Info Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mb-8 overflow-hidden bg-gradient-to-br from-[#F27D26] to-[#FF9A44] rounded-3xl p-[1px] shadow-[8px_8px_16px_#b8bec9,-8px_-8px_16px_#ffffff]"
      >
        <div className="bg-[#E6E9EF] rounded-[1.45rem] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F27D26] to-[#FF9A44] rounded-2xl flex items-center justify-center shadow-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase opacity-40">Festtag</p>
              <h3 className="text-lg font-black text-[#2D3748]">Eid-ul-Fitr 2026</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-[#F27D26]">20. März 2026</p>
            <p className="text-[10px] opacity-60">In Obertshausen</p>
          </div>
        </div>
      </motion.div>

      {/* Footer Gimmick */}
      <footer className="w-full max-w-md text-center mt-auto py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E6E9EF] rounded-full shadow-[inset_2px_2px_4px_#b8bec9,inset_-2px_-2px_4px_#ffffff] text-[10px] font-bold uppercase tracking-widest opacity-40">
          <Heart className="w-3 h-3 text-[#F27D26]" />
          Ramadan Mubarak Obertshausen
        </div>
      </footer>
    </div>
  );
}
