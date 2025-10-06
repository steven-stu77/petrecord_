import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import {
  // Pet,
  // ActivityLog,
  fetchPets,
  fetchActivityLogs,
  addActivityLog,
  updateActivityLog,
  deleteActivityLog,
} from "../data/mockPets";


// ---------- UI Components ---------- //

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  size?: "sm" | "md";
  variant?: "ghost" | "solid";
  type?: "button" | "submit";
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style,
  size,
  variant,
  type = "button",
}) => {
  const baseStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: 500,
    transition: "all 0.15s ease-in-out",
    cursor: "pointer",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
  };

  const variantStyle =
    variant === "ghost"
      ? { backgroundColor: "transparent", color: "initial" }
      : { backgroundColor: "rgb(59, 130, 246)", color: "white" };

  const sizeStyle =
    size === "sm" ? { padding: "4px 8px", fontSize: "0.875rem" } : {};

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...variantStyle, ...sizeStyle, ...style }}
      type={type}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
const Input: React.FC<InputProps> = ({
  value,
  onChange,
  style,
  type = "text",
  ...rest
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    style={{
      padding: "8px 12px",
      border: "1px solid rgb(209, 213, 219)",
      borderRadius: "6px",
      outline: "none",
      width: "100%",
      ...style,
    }}
    {...rest}
  />
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onValueChange: (value: string) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  style,
  children,
  ...rest
}) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    style={{
      padding: "8px 12px",
      border: "1px solid rgb(209, 213, 219)",
      borderRadius: "6px",
      outline: "none",
      width: "100%",
      backgroundColor: "white",
      ...style,
    }}
    {...rest}
  >
    {children}
  </select>
);

const Badge: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <span
    style={{
      display: "inline-flex",
      padding: "4px 8px",
      fontSize: "0.75rem",
      fontWeight: 600,
      borderRadius: "9999px",
      ...style,
    }}
  >
    {children}
  </span>
);

const Plus = () => <span style={{ fontSize: "1.25rem" }}>＋</span>;
const Search = () => <span style={{ fontSize: "1rem" }}>🔍</span>;
const Edit = () => <span style={{ fontSize: "1rem" }}>✏️</span>;
const Trash2 = () => <span style={{ fontSize: "1rem" }}>❌</span>;

// ---------- Dialog Component ---------- //

interface LogFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ActivityLog) => void;
  editingLog: ActivityLog | null;
  pets: Pet[];
}

const LogFormDialog: React.FC<LogFormDialogProps> = ({
  open,
  onClose,
  onSave,
  editingLog,
  pets,
}) => {
  const [formData, setFormData] = useState<ActivityLog>({
    id: "",
    petId: "",
    petName: "",
    activity: "Walk",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editingLog) setFormData(editingLog);
    else
      setFormData({
        id: "",
        petId: "",
        petName: "",
        activity: "Walk",
        note: "",
        date: new Date().toISOString().split("T")[0],
      });
  }, [editingLog, open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "448px",
          width: "100%",
          margin: "0 16px",
        }}
      >
        <h2
          style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "16px" }}
        >
          {editingLog ? "Edit Log" : "Add New Log"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Select
            value={formData.petId}
            onValueChange={(value) => {
              const pet = pets.find((p) => p.id === value);
              setFormData({
                ...formData,
                petId: value,
                petName: pet?.name || "",
              });
            }}
            required
          >
            <option value="">Select Pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </Select>

          <Select
            value={formData.activity}
            onValueChange={(value) =>
              setFormData({ ...formData, activity: value })
            }
          >
            {[
              "Walk",
              "Feeding",
              "Playtime",
              "Grooming",
              "Vet Visit",
              "Training",
              "Medication",
            ].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>

          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <textarea
            placeholder="Add a note..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid rgb(209, 213, 219)",
              borderRadius: "6px",
              minHeight: "80px",
            }}
            required
          />

          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <Button
              onClick={onClose}
              style={{
                backgroundColor: "rgb(229,231,235)",
                color: "rgb(75,85,99)",
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Main Component ---------- //

export const BehaviorLogs: React.FC = () => {
  const navigate = useNavigate();
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

  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<ActivityLog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPet, setFilterPet] = useState("all");
  const [filterActivity, setFilterActivity] = useState("all");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [fetchedPets, fetchedLogs] = await Promise.all([
        fetchPets(),
        fetchActivityLogs(),
      ]);
      setPets(fetchedPets);
      setLogs(fetchedLogs);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSaveLog = async (logData: ActivityLog) => {
    if (logData.id) {
      await updateActivityLog(logData);
      setLogs((prev) => prev.map((l) => (l.id === logData.id ? logData : l)));
    } else {
      const newId = await addActivityLog(logData);
      if (newId) {
        setLogs((prev) => [{ ...logData, id: newId }, ...prev]);
      }
    }
  };

  const handleDeleteLog = async (id: string) => {
    await deleteActivityLog(id);
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.petName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPet = filterPet === "all" || log.petId === filterPet;
    const matchesActivity =
      filterActivity === "all" || log.activity === filterActivity;
    return matchesSearch && matchesPet && matchesActivity;
  });

  const activityColors: Record<string, React.CSSProperties> = {
    Walk: { backgroundColor: "#DDF0FF", color: "#1D4ED8" },
    Feeding: { backgroundColor: "#DCFFDC", color: "#166534" },
    Playtime: { backgroundColor: "#FFFADC", color: "#78350F" },
    Grooming: { backgroundColor: "#FFDDF0", color: "#8F0051" },
    "Vet Visit": { backgroundColor: "#F0DCFF", color: "#581C87" },
    Training: { backgroundColor: "#FFE6C8", color: "#8C3000" },
    Medication: { backgroundColor: "#FFDCDC", color: "#991B1B" },
    Other: { backgroundColor: "#F3F4F6", color: "#111827" },
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FEF9F5",
        }}
      >
        <div style={{ fontSize: "1.5rem", color: "#6B7280" }}>Loading...</div>
      </div>
    );
  }

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
      <Navigation currentPage="logs" onNavigate={onNavigate} />
      <div style={{ maxWidth: 1280, margin: "auto", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ fontSize: "2.25rem", fontWeight: 700 }}>
                Activity Logs
              </h1>
              <p style={{ color: "#6B7280" }}>
                Track and manage daily activities for your pets
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingLog(null);
                setDialogOpen(true);
              }}
              style={{
                background: "linear-gradient(to right, #4ADE80, #60A5FA)",
                borderRadius: "9999px",
                color: "white",
                padding: "8px 24px",
              }}
            >
              <Plus /> Add Log
            </Button>
          </div>
        </motion.div>

        <div
          style={{
            background: "linear-gradient(to bottom right, white, #F9FAFB)",
            borderRadius: 24,
            padding: 24,
            marginBottom: 24,
            border: "1px solid #E5E7EB",
          }}
        >
          <div style={{ display: "flex", gap: 16, flexWrap: "nowrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 220px", position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: 10, zIndex: 1 }}>
                <Search />
              </span>
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: 32 }}
              />
            </div>
            <div style={{ minWidth: 160 }}>
              <Select value={filterPet} onValueChange={setFilterPet}>
                <option value="all">All Pets</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </Select>
            </div>
            <div style={{ minWidth: 160 }}>
              <Select value={filterActivity} onValueChange={setFilterActivity}>
                <option value="all">All Activities</option>
                {[
                  "Walk",
                  "Feeding",
                  "Playtime",
                  "Grooming",
                  "Vet Visit",
                  "Training",
                  "Medication",
                ].map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              borderRadius: 24,
            }}
          >
            <thead style={{ backgroundColor: "#F9FAFB" }}>
              <tr>
                <th style={th}>Date</th>
                <th style={th}>Pet</th>
                <th style={th}>Activity</th>
                <th style={th}>Note</th>
                <th style={{ ...th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={td}>{new Date(log.date).toLocaleDateString()}</td>
                  <td style={td}>{log.petName}</td>
                  <td style={td}>
                    <Badge
                      style={
                        activityColors[log.activity] || activityColors.Other
                      }
                    >
                      {log.activity}
                    </Badge>
                  </td>
                  <td
                    style={{
                      ...td,
                      maxWidth: 400,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {log.note}
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingLog(log);
                        setDialogOpen(true);
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLog(log.id)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLogs.length === 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "#6B7280" }}>
              No logs found matching your filters
            </div>
          )}
        </motion.div>
      </div>

      <LogFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveLog}
        editingLog={editingLog}
        pets={pets}
      />
    </div>
  );
};

const th: React.CSSProperties = {
  padding: "12px 24px",
  textAlign: "left",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "#6B7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
const td: React.CSSProperties = {
  padding: "16px 24px",
  fontSize: "0.875rem",
  color: "#111827",
  borderBottom: "1px solid #E5E7EB",
};