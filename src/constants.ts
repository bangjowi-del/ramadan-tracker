export interface RamadanDay {
  date: string;
  sahar: string;
  iftar: string;
  dayName: string;
}

export const RAMADAN_DATA: RamadanDay[] = [
  { date: "2026-02-19", dayName: "Do", sahar: "05:57", iftar: "17:49" },
  { date: "2026-02-20", dayName: "Fr", sahar: "05:55", iftar: "17:51" },
  { date: "2026-02-21", dayName: "Sa", sahar: "05:53", iftar: "17:52" },
  { date: "2026-02-22", dayName: "So", sahar: "05:51", iftar: "17:54" },
  { date: "2026-02-23", dayName: "Mo", sahar: "05:49", iftar: "17:56" },
  { date: "2026-02-24", dayName: "Di", sahar: "05:47", iftar: "17:57" },
  { date: "2026-02-25", dayName: "Mi", sahar: "05:45", iftar: "17:59" },
  { date: "2026-02-26", dayName: "Do", sahar: "05:43", iftar: "18:01" },
  { date: "2026-02-27", dayName: "Fr", sahar: "05:41", iftar: "18:02" },
  { date: "2026-02-28", dayName: "Sa", sahar: "05:39", iftar: "18:04" },
  { date: "2026-03-01", dayName: "So", sahar: "05:37", iftar: "18:06" },
  { date: "2026-03-02", dayName: "Mo", sahar: "05:35", iftar: "18:07" },
  { date: "2026-03-03", dayName: "Di", sahar: "05:33", iftar: "18:09" },
  { date: "2026-03-04", dayName: "Mi", sahar: "05:31", iftar: "18:11" },
  { date: "2026-03-05", dayName: "Do", sahar: "05:29", iftar: "18:12" },
  { date: "2026-03-06", dayName: "Fr", sahar: "05:27", iftar: "18:14" },
  { date: "2026-03-07", dayName: "Sa", sahar: "05:25", iftar: "18:16" },
  { date: "2026-03-08", dayName: "So", sahar: "05:22", iftar: "18:17" },
  { date: "2026-03-09", dayName: "Mo", sahar: "05:20", iftar: "18:19" },
  { date: "2026-03-10", dayName: "Di", sahar: "05:18", iftar: "18:21" },
  { date: "2026-03-11", dayName: "Mi", sahar: "05:16", iftar: "18:22" },
  { date: "2026-03-12", dayName: "Do", sahar: "05:14", iftar: "18:24" },
  { date: "2026-03-13", dayName: "Fr", sahar: "05:12", iftar: "18:25" },
  { date: "2026-03-14", dayName: "Sa", sahar: "05:10", iftar: "18:27" },
  { date: "2026-03-15", dayName: "So", sahar: "05:07", iftar: "18:29" },
  { date: "2026-03-16", dayName: "Mo", sahar: "05:05", iftar: "18:30" },
  { date: "2026-03-17", dayName: "Di", sahar: "05:03", iftar: "18:32" },
  { date: "2026-03-18", dayName: "Mi", sahar: "05:01", iftar: "18:33" },
  { date: "2026-03-19", dayName: "Do", sahar: "04:59", iftar: "18:35" },
];

export const SHAWWAL_DATA: RamadanDay[] = [
  { date: "2026-03-21", dayName: "Sa", sahar: "04:54", iftar: "18:38" },
  { date: "2026-03-22", dayName: "So", sahar: "04:52", iftar: "18:40" },
  { date: "2026-03-23", dayName: "Mo", sahar: "04:50", iftar: "18:41" },
  { date: "2026-03-24", dayName: "Di", sahar: "04:48", iftar: "18:43" },
  { date: "2026-03-25", dayName: "Mi", sahar: "04:46", iftar: "18:45" },
  { date: "2026-03-26", dayName: "Do", sahar: "04:43", iftar: "18:46" },
];

export const DUAS = {
  sahar: {
    arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
    transliteration: "Wa bi-sawmi ghadin nawaytu min shahri ramadan",
    translation: "Ich beabsichtige morgen den Fastentag des Monats Ramadan zu halten.",
  },
  iftar: {
    arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allahumma laka sumtu wa 'ala rizqika aftartu",
    translation: "O Allah, für Dich habe ich gefastet und mit Deiner Gabe breche ich mein Fasten.",
  },
};
