import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PetFormDialog } from "../components/PetFormDialog";
import {
  fetchPets,
  addPet,
  updatePet,
  deletePet,
  type Pet,
} from "../data/mockPets";
import { Navigation } from "../components/Navigation";

interface PetRecordsProps {}

export function PetRecords(_: PetRecordsProps) {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 🟢 Load pets from Firestore
  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const data = await fetchPets();
        setPets(data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, [setPets]);

  // 🧭 Navigation
  const onNavigate = (page: string) => {
    switch (page) {
      case "dashboard":
        navigate("/");
        break;
      case "pets":
        navigate("/petrecord");
        break;
      case "logs":
        navigate("/logs");
        break;
      case "reports":
        navigate("/reports");
        break;
      default:
        break;
    }
  };

  // ➕ Add
  const handleAddPet = () => {
    setEditingPet(null);
    setDialogOpen(true);
  };

  // ✏️ Edit
  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setDialogOpen(true);
  };

  // 🗑️ Delete
  const handleDeletePet = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await deletePet(id); // Firestore REST DELETE
      setPets((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  // 💾 Save (add or update)
  const handleSavePet = async (petData: Pet) => {
    try {
      if (petData.id) {
        await updatePet(petData); // Firestore PATCH
        setPets((prev) => prev.map((p) => (p.id === petData.id ? petData : p)));
      } else {
        const newPet: Pet = {
          ...petData,
          id: Date.now().toString(),
        };
        await addPet(newPet); // Firestore POST
        setPets((prev) => [...prev, newPet]);
      }
    } catch (err) {
      console.error("Error saving pet:", err);
    }
  };

  // 🐶 Click pet card
  const handlePetClick = (pet: Pet) => {
    onNavigate("logs");
  };

  // 🧱 UI
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        background: "#FEF9F5",
      }}
    >
      <Navigation currentPage="pets" onNavigate={onNavigate} />
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 700 }}>Your Pets</h1>
            <p style={{ color: "#6b7280" }}>
              Manage your furry friends and their records
            </p>
          </div>

          <button
            onClick={handleAddPet}
            style={{
              background: "linear-gradient(to right, #bbf7d0, #bfdbfe)",
              color: "#065f46",
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
              display: "flex",
              alignItems: "center",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}>+</span>
            Add Pet
          </button>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>Loading pets...</p>
        ) : pets.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No pets found. Add your first one!
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {pets.map((pet, index) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  y: -4,
                }}
              >
                <div
                  onClick={() => handlePetClick(pet)}
                  style={{
                    background: "white",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    padding: "1.5rem",
                    cursor: "pointer",
                    border: "1px solid #f3f4f6",
                  }}
                >
                  <motion.div
                    style={{
                      overflow: "hidden",
                      borderRadius: "0.5rem",
                      marginBottom: "1rem",
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={pet.photo}
                      alt={pet.name}
                      style={{
                        width: "100%",
                        height: "12rem",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Pet+Photo";
                      }}
                    />
                  </motion.div>

                  <div style={{ marginBottom: "1rem" }}>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#1f2937",
                      }}
                    >
                      {pet.name}
                    </h3>
                    <p style={{ color: "#4b5563" }}>
                      {pet.species} • {pet.breed}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Born: {new Date(pet.birthday).toLocaleDateString()}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid #f3f4f6",
                    }}
                  >
                    {/* Edit */}
                      <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPet(pet);
                    }}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "#FEF9F5",
                      color: "black",
                      border: "none",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f7eda8ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#FEF9F5")
                    }
                  >
                    ✏️ Edit
                  </button>

                    {/* Delete */}
                    <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${pet.name}?`
                        )
                      ) {
                        handleDeletePet(pet.id);
                      }
                    }}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      background: "#FCA5A5",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      fontSize: "1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f55c5cff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#FCA5A5")
                    }
                  >
                    🗑
                  </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <PetFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSavePet}
        editingPet={editingPet}
      />
    </div>
  );
}
