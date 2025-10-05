import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import type { Pet } from "../data/mockPets"; 

interface PetFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (pet: Pet) => void;
  editingPet: Pet | null;
}

export function PetFormDialog({
  open,
  onClose,
  onSave,
  editingPet,
}: PetFormDialogProps) {
  const [formData, setFormData] = useState<Omit<Pet, "id">>({
    name: "",
    species: "",
    breed: "",
    birthday: "",
    photo: "",
  });

  // ✅ Load form data when editing
  useEffect(() => {
    if (editingPet) {
      const { name, species, breed, birthday, photo } = editingPet;
      setFormData({ name, species, breed, birthday, photo });
    } else {
      setFormData({
        name: "",
        species: "",
        breed: "",
        birthday: "",
        photo: "",
      });
    }
  }, [editingPet, open]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingPet) {
      onSave({ ...formData, id: editingPet.id });
    } else {
      // Create a new Pet (mock data or real backend in future)
      onSave({
        ...formData,
        id: Date.now().toString(),
      });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          width: "100%",
          maxWidth: "28rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "rgb(31, 41, 55)",
              }}
            >
              {editingPet ? "Edit Pet" : "Add New Pet"}
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgb(55, 65, 81)",
                  marginBottom: "0.5rem",
                }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter pet's name"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid rgb(209, 213, 219)",
                  borderRadius: "0.75rem",
                  outline: "none",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Species */}
            <div>
              <label
                htmlFor="species"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgb(55, 65, 81)",
                  marginBottom: "0.5rem",
                }}
              >
                Species
              </label>
              <select
                id="species"
                value={formData.species}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid rgb(209, 213, 219)",
                  borderRadius: "0.75rem",
                  outline: "none",
                  fontSize: "1rem",
                  backgroundColor: "white",
                }}
              >
                <option value="">Select species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Breed */}
            <div>
              <label
                htmlFor="breed"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgb(55, 65, 81)",
                  marginBottom: "0.5rem",
                }}
              >
                Breed
              </label>
              <input
                id="breed"
                type="text"
                value={formData.breed}
                onChange={handleChange}
                required
                placeholder="Enter breed"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid rgb(209, 213, 219)",
                  borderRadius: "0.75rem",
                  outline: "none",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Birthday */}
            <div>
              <label
                htmlFor="birthday"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgb(55, 65, 81)",
                  marginBottom: "0.5rem",
                }}
              >
                Birthday
              </label>
              <input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid rgb(209, 213, 219)",
                  borderRadius: "0.75rem",
                  outline: "none",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="photo"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgb(55, 65, 81)",
                  marginBottom: "0.5rem",
                }}
              >
                Photo URL
              </label>
              <input
                id="photo"
                type="url"
                value={formData.photo}
                onChange={handleChange}
                required
                placeholder="https://example.com/pet-photo.jpg"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid rgb(209, 213, 219)",
                  borderRadius: "0.75rem",
                  outline: "none",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                paddingTop: "1rem",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "0.5rem 1rem",
                  border: "1px solid rgb(209, 213, 219)",
                  color: "rgb(55, 65, 81)",
                  borderRadius: "9999px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgb(59, 130, 246)",
                  color: "white",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                {editingPet ? "Update" : "Add"} Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
