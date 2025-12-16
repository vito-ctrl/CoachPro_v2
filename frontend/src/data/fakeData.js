export const athleteStats = {
  total: 30,
  upcoming: 3,
  cancelled: 2,
};

export const upcomingSessions = [
  {
    id: 1,
    coach: "vito",
    sport: "Fitness",
    date: "2025-01-10",
    time: "10:00 - 11:00",
  },
  {
    id: 2,
    coach: "Sara Ali",
    sport: "Yoga",
    date: "2025-01-12",
    time: "18:00 - 19:00",
  },
];

export const coachStats = {
  pending: 4,
  today: 2,
  tomorrow: 3,
};

export const nextSession = {
  athlete: "Aymane E.",
  sport: "Fitness",
  date: "2025-01-09",
  time: "16:00 - 17:00",
};

export const coachesList = [
  {
    id: 1,
    name: "John Doe",
    sport: "Fitness",
    experience: 5,
    photo: "/src/assets/images/coach-default.jpg"
  },
  {
    id: 2,
    name: "Sara Ali",
    sport: "Yoga",
    experience: 8,
    photo: "/src/assets/images/coach-default.jpg"
  },
  {
    id: 3,
    name: "Mike Johnson",
    sport: "Cardio",
    experience: 6,
    photo: "/src/assets/images/coach-default.jpg"
  }
];

export const athleteReservations = [
  {
    id: 1,
    coach: "John Doe",
    sport: "Fitness",
    date: "2025-01-10",
    time: "10:00 - 11:00",
    status: "Pending",
  },
  {
    id: 2,
    coach: "Sara Ali",
    sport: "Yoga",
    date: "2025-01-12",
    time: "18:00 - 19:00",
    status: "Accepted",
  },
];

export const coachReservations = [
  {
    id: 1,
    athlete: "Aymane E.",
    sport: "Fitness",
    date: "2025-01-10",
    time: "10:00 - 11:00",
    status: "Pending",
  },
  {
    id: 2,
    athlete: "Lina M.",
    sport: "Yoga",
    date: "2025-01-12",
    time: "18:00 - 19:00",
    status: "Accepted",
  },
];

export const coachAvailability = [
  { day: "Monday", time: "10:00 - 11:00", status: "available" },
  { day: "Monday", time: "14:00 - 15:00", status: "booked" },
  { day: "Tuesday", time: "09:00 - 10:00", status: "available" },
  { day: "Wednesday", time: "16:00 - 17:00", status: "available" },
  { day: "Thursday", time: "11:00 - 12:00", status: "booked" },
  { day: "Friday", time: "13:00 - 14:00", status: "available" },
];


export const coachProfiles = [
  {
    id: 1,
    name: "John Doe",
    sport: "Fitness",
    experience: 5,
    certifications: ["Certified Personal Trainer", "Nutrition Coach"],
    bio: "Passionate about helping athletes achieve their goals. Specializes in strength training and fitness programs.",
    email: "john@example.com",
    phone: "+212 600 123 456",
    photo: "/src/assets/images/coach-default.jpg",
  },
  {
    id: 2,
    name: "Sara Ali",
    sport: "Yoga",
    experience: 8,
    certifications: ["Yoga Alliance Certified", "Mindfulness Instructor"],
    bio: "Yoga instructor with 8 years of experience. Focus on flexibility, balance, and mental wellbeing.",
    email: "sara@example.com",
    phone: "+212 600 654 321",
    photo: "/src/assets/images/coach-default.jpg",
  },
];
