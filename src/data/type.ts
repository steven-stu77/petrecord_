// src/types.ts
export interface Pet {
  id?: string;
  name: string;
  age: number;
  breed?: string;
  notes?: string;
  imageUrl?: string;
  createdAt?: string; // ISO 字串, 例如 new Date().toISOString()
}
