export type Period = { id: number; start: number; end: number; category: string };
export type Event = { id: number, year: number, description: string };

const event: Event = {
  id: 1,
  year: 1982,
  description:
    "Большое и важное событие, имевшее место быть",
};

const events: Event[] = [];

const generateMultipleEvents = (act: Event) => {
  events.push(act);

  if (act.id === 40) return;

  generateMultipleEvents({
    id: act.id + 1,
    year: act.year + 1,
    description: act.description,
  });
};

generateMultipleEvents(event);

const periods: Period[] = [
  { id: 1, start: 1982, end: 1987, category: "Интернет" },
  { id: 2, start: 1988, end: 1992, category: "Кино" },
  { id: 3, start: 1994, end: 1999, category: "Музыка" },
  { id: 4, start: 2000, end: 2007, category: "Геополитика" },
  { id: 5, start: 2008, end: 2014, category: "Литература" },
  { id: 6, start: 2015, end: 2022, category: "Наука" },
];

export { events, periods };
