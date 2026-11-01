export type CampusEvent = {
  id: number
  title: string
  date: string
  place: string
  seats: number
}

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'Mountain Picnic & Games',
    date: '20.10.2026',
    place: 'Dynasty Alma-Arasan',
    seats: 30,
  },
  {
    id: 2,
    title: 'Theater Trip: Artishok',
    date: '24.10.2026',
    place: 'Artishok Theater',
    seats: 3, 
  },
  {
    id: 3,
    title: 'Guest Lecture: Secrets of Success',
    date: '27.10.2026',
    place: 'Independence Hall, KBTU',
    seats: 480,
  },
  {
    id: 4,
    title: 'Evening Movie & Pizza Night',
    date: '30.10.2026',
    place: 'Independence Hall, KBTU',
    seats: 180,
  },
]