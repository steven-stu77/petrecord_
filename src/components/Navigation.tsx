import type { CSSProperties, ReactNode, FC } from "react";

interface IconWrapperProps {
  children: ReactNode;
  style?: CSSProperties;
}

const IconWrapper: FC<IconWrapperProps> = ({ children, style }) => (
  <span style={{ ...style, fontSize: "1.25rem" }}>{children}</span>
);

const icons = {
  dashboard: "🏠",
  pets: "🐾",
  logs: "📊",
  reports: "📄",
};

interface NavItem {
  id: keyof typeof icons;
  label: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "pets", label: "Pets" },
  { id: "logs", label: "Logs" },
  { id: "reports", label: "Reports" },
];

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: FC<NavigationProps> = ({
  currentPage,
  onNavigate,
}) => {
  return (
    <nav
      style={{
        backgroundColor: "white",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem",
          }}
        >
          {/* Logo Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconWrapper
              style={{ color: "rgb(59, 130, 246)", fontSize: "2rem" }}
            >
              🐾
            </IconWrapper>
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "rgb(59, 130, 246)",
              }}
            >
              PetRecord
            </span>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {navItems.map(({ id, label }) => {
              const isActive = currentPage === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.75rem",
                    border: "none",
                    cursor: "pointer",
                    background: isActive
                      ? "linear-gradient(to right, rgba(122, 169, 245, 1), rgb(236, 72, 153))"
                      : "transparent",
                    color: isActive ? "white" : "rgb(55, 65, 81)",
                    boxShadow: isActive
                      ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget.style.backgroundColor =
                        "rgb(243, 244, 246)"),
                        (e.currentTarget.style.transform = "scale(1.05)");
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget.style.backgroundColor = "transparent"),
                        (e.currentTarget.style.transform = "scale(1)");
                    }
                  }}
                >
                  <IconWrapper>{icons[id]}</IconWrapper>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
