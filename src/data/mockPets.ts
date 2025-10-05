// src/data/mockPets.ts
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthday: string;
  photo: string;
}

export const mockPets: Pet[] = [
  {
    id: "1",
    name: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    birthday: "2020-03-15",
    photo:
      "https://images.unsplash.com/photo-1687211818108-667d028f1ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    name: "Whiskers",
    species: "Cat",
    breed: "Orange Tabby",
    birthday: "2019-07-22",
    photo:
      "https://images.unsplash.com/photo-1712592000997-ea7ccaeb9725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    name: "Charlie",
    species: "Dog",
    breed: "Beagle",
    birthday: "2021-11-08",
    photo:
      "https://images.unsplash.com/photo-1606833694770-40a04762ac16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

export interface ActivityLog {
  id: string;
  date: string;
  activity: string;
  note: string;
  petName: string;
  petId: string;
}

export const mockLogs: ActivityLog[] = [
  {
    id: "1",
    date: "2025-10-01",
    activity: "Walk",
    note: "Morning walk in the park, very energetic",
    petName: "Bella",
    petId: "1",
  },
  {
    id: "2",
    date: "2025-10-01",
    activity: "Feeding",
    note: "Breakfast - ate all food",
    petName: "Bella",
    petId: "1",
  },
  {
    id: "3",
    date: "2025-10-01",
    activity: "Playtime",
    note: "Played with favorite toy for 30 minutes",
    petName: "Whiskers",
    petId: "2",
  },
  {
    id: "4",
    date: "2025-09-30",
    activity: "Vet Visit",
    note: "Annual checkup - all healthy!",
    petName: "Charlie",
    petId: "3",
  },
  {
    id: "5",
    date: "2025-09-30",
    activity: "Walk",
    note: "Evening walk, 20 minutes",
    petName: "Charlie",
    petId: "3",
  },
];
