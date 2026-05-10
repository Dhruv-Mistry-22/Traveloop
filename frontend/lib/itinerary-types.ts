export type ActivityCategory = "hotel" | "food" | "flight" | "activity"

export interface Activity {
  id: string
  name: string
  category: ActivityCategory
  time: string
  duration: string
  cost: number
}

export interface TripSection {
  id: string
  city: string
  country: string
  flag: string
  dateFrom: string
  dateTo: string
  budget: number
  activities: Activity[]
}

export const INITIAL_SECTIONS: TripSection[] = [
  {
    id: "s1",
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    dateFrom: "Jun 10",
    dateTo: "Jun 14",
    budget: 1200,
    activities: [
      {
        id: "a1",
        name: "Check-in — Hotel Le Marais",
        category: "hotel",
        time: "3:00 PM",
        duration: "4 nights",
        cost: 480,
      },
      {
        id: "a2",
        name: "Dinner at Café de Flore",
        category: "food",
        time: "7:30 PM",
        duration: "1.5 hrs",
        cost: 65,
      },
      {
        id: "a3",
        name: "Eiffel Tower Visit",
        category: "activity",
        time: "10:00 AM",
        duration: "2 hrs",
        cost: 30,
      },
    ],
  },
  {
    id: "s2",
    city: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    dateFrom: "Jun 14",
    dateTo: "Jun 18",
    budget: 950,
    activities: [
      {
        id: "a4",
        name: "Flight CDG → FCO",
        category: "flight",
        time: "9:15 AM",
        duration: "2h 20m",
        cost: 110,
      },
      {
        id: "a5",
        name: "Hotel Artemide",
        category: "hotel",
        time: "2:00 PM",
        duration: "4 nights",
        cost: 520,
      },
      {
        id: "a6",
        name: "Colosseum Tour",
        category: "activity",
        time: "11:00 AM",
        duration: "3 hrs",
        cost: 45,
      },
    ],
  },
  {
    id: "s3",
    city: "Barcelona",
    country: "Spain",
    flag: "🇪🇸",
    dateFrom: "Jun 18",
    dateTo: "Jun 22",
    budget: 880,
    activities: [
      {
        id: "a7",
        name: "Flight FCO → BCN",
        category: "flight",
        time: "8:00 AM",
        duration: "2h 05m",
        cost: 95,
      },
      {
        id: "a8",
        name: "Hotel Arts Barcelona",
        category: "hotel",
        time: "1:00 PM",
        duration: "4 nights",
        cost: 560,
      },
    ],
  },
  {
    id: "s4",
    city: "London",
    country: "UK",
    flag: "🇬🇧",
    dateFrom: "Jun 22",
    dateTo: "Jun 26",
    budget: 1100,
    activities: [
      {
        id: "a9",
        name: "Flight BCN → LHR",
        category: "flight",
        time: "7:30 AM",
        duration: "2h 15m",
        cost: 85,
      },
      {
        id: "a10",
        name: "The Savoy Hotel",
        category: "hotel",
        time: "3:00 PM",
        duration: "4 nights",
        cost: 720,
      },
    ],
  },
]
