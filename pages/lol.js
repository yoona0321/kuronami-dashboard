import { useState, useEffect } from "react";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [line, setLine] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lolUsers");
    if (saved) {
      setUsers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lolUsers", JSON.stringify(users));
  }, [users]);

  // 🎨 티어 색상
  const getTierColor = (tier) => {
    const base = tier.toUpperCase().split(" ")[0];

    switch (base) {
      case "CHALLENGER": return "#ef4444";
      case "GRANDMASTER": return "#f97316";
      case "MASTER": return "#9333ea";
      case "DIAMOND": return "#3b82f6";
      case "EMERALD": return "#10b981";
      case "PLATINUM": return "#14b8a6";
      case "GOLD": return "#eab308";
      case "SILVER": return "#9ca3af";
      case "BRONZE": return "#92400e";
      case "IRON": return "#6b7280";
      default: return "#6b7280";
    }
  };

  // 🔥 출력 포맷 (핵심)
  const formatTier = (tier) => {
    const parts = tier.toUpperCase().split(" ");
    const base = parts[0];
    const value = parts[1];

    const highTier = ["CHALLENGER", "GRANDMASTER", "MASTER"];

    if (highTier.includes(base) && value) {
      return `${base} ${value}LP`;
    }

    if (value) {
      return `${base} ${value}`;
    }

    return base;
  };

  const addUser = () => {
    if (!name || !tier || !line) return;

    const newUser = {
      name,
      tier: tier.toUpperCase(),
      line
    };

    setUsers([...users, newUser]);

    setName("");
    setTier("");
    setLine("");
  };

  const removeUser = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  return (
    <div style={{
      padding: "30px",
      background: "#f3f4f6",
      minHeight: "100vh"
    }}>

      <h1 style={{ marginBottom: "10px" }}>
        👥 리그오브레전드 인원 리스트
      </h1>

      <p style={{ color: "#666", marginBottom: "25px" }}>
        등록된 모든 인원의 티어와 라인을 확인할 수 있습니다.
      </p>

      {/* 입력 */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "14px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <input
          placeholder="닉네임"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="티어 (예: GOLD 3 / MASTER 300)"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="라인"
          value={line}
          onChange={(e) => setLine(e.target.value)}
          style={inputStyle}
        />

        <button onClick={addUser} style={buttonStyle}>
          추가
        </button>
      </div>

      {/* 카드 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        {users.map((user, i) => (
          <div
            key={i}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 16px 30px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
            }}
          >

            <h3 style={{ marginBottom: "10px" }}>{user.name}</h3>

            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>

              <span style={{
                background: getTierColor(user.tier),
                color: "white",
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {formatTier(user.tier)}
              </span>

              <span style={{
                background: "#e5e7eb",
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "12px"
              }}>
                {user.line}
              </span>

            </div>

            <div style={{
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "13px",
              color: "#555",
              marginBottom: "10px"
            }}>
              🚧 전적 / 승률 / 포인트 (추후 추가 예정)
            </div>

            <button
              onClick={() => removeUser(i)}
              style={deleteBtn}
            >
              삭제
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

// 스타일
const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  padding: "8px 14px",
  background: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  transition: "all 0.2s ease"
};