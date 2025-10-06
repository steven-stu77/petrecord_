// src/data/mockPets.ts

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthday: string;
  photo: string;
}

export interface ActivityLog {
  id: string;
  date: string;
  activity: string;
  note: string;
  petName: string;
  petId: string;
}

// ✅ Firestore REST API setup
const FIREBASE_PROJECT_ID = "petrecord-84cb4"; // Your Firebase project ID
const FIREBASE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

// --- Helper functions ---
function mapDocToPet(doc: any): Pet {
  return {
    id: doc.name.split("/").pop(),
    name: doc.fields.name.stringValue,
    species: doc.fields.species.stringValue,
    breed: doc.fields.breed.stringValue,
    birthday: doc.fields.birthday.stringValue,
    photo: doc.fields.photo.stringValue,
  };
}

function mapDocToLog(doc: any): ActivityLog {
  return {
    id: doc.name.split("/").pop(),
    date: doc.fields.date.stringValue,
    activity: doc.fields.activity.stringValue,
    note: doc.fields.note.stringValue,
    petName: doc.fields.petName.stringValue,
    petId: doc.fields.petId.stringValue,
  };
}

// ---------- PETS CRUD ---------- //

// Fetch all pets
export async function fetchPets(): Promise<Pet[]> {
  const res = await fetch(`${FIREBASE_BASE_URL}/pets`);
  const json = await res.json();
  if (!json.documents) return [];
  return json.documents.map(mapDocToPet);
}

// Add a new pet
export async function addPet(pet: Omit<Pet, "id">): Promise<void> {
  await fetch(`${FIREBASE_BASE_URL}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        name: { stringValue: pet.name },
        species: { stringValue: pet.species },
        breed: { stringValue: pet.breed },
        birthday: { stringValue: pet.birthday },
        photo: { stringValue: pet.photo },
      },
    }),
  });
}

// Update a pet
export async function updatePet(pet: Pet): Promise<void> {
  await fetch(`${FIREBASE_BASE_URL}/pets/${pet.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        name: { stringValue: pet.name },
        species: { stringValue: pet.species },
        breed: { stringValue: pet.breed },
        birthday: { stringValue: pet.birthday },
        photo: { stringValue: pet.photo },
      },
    }),
  });
}

// Delete a pet
export async function deletePet(id: string): Promise<void> {
  await fetch(`${FIREBASE_BASE_URL}/pets/${id}`, { method: "DELETE" });
}

// ---------- ACTIVITY LOGS CRUD ---------- //

// Fetch all activity logs
export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  const res = await fetch(`${FIREBASE_BASE_URL}/activityLogs`);
  const json = await res.json();
  if (!json.documents) return [];
  return json.documents.map(mapDocToLog);
}

// Add a new activity log
export async function addActivityLog(log: Omit<ActivityLog, "id">): Promise<void> {
  await fetch(`${FIREBASE_BASE_URL}/activityLogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        date: { stringValue: log.date },
        activity: { stringValue: log.activity },
        note: { stringValue: log.note },
        petName: { stringValue: log.petName },
        petId: { stringValue: log.petId },
      },
    }),
  });
}

// Update an activity log
export async function updateActivityLog(log: ActivityLog): Promise<void> {
  await fetch(`${FIREBASE_BASE_URL}/activityLogs/${log.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        date: { stringValue: log.date },
        activity: { stringValue: log.activity },
        note: { stringValue: log.note },
        petName: { stringValue: log.petName },
        petId: { stringValue: log.petId },
      },
    }),
  });
}

// Delete an activity log
export async function deleteActivityLog(id: string): Promise<void> {
  await fetch(`${FIREBASE_BASE_URL}/activityLogs/${id}`, { method: "DELETE" });
}

// ---------- Default-like mock for backward compatibility ----------
export const mockPets = await fetchPets();
export const mockLogs = await fetchActivityLogs();
