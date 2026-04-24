import { useState, useEffect } from "react";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [lines, setLines] = useState([]); // 🔥 배열로 변경

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

  // 티어 출력
  const formatTier = (tier) => {
    const parts = tier.toUpperCase().split(" ");
    const base = parts[0];
    const value = parts[1];

    const highTier = ["CHALLENGER", "GRANDMASTER", "MASTER"];

    if (highTier.includes(base) && value) {
      return `${base} ${value}LP`;
    }

    if (value) return `${base} ${value}`;
    return base;
  };

  // 🔥 라인 토글
  const toggleLine = (line) => {
    if (lines.includes(line)) {
      setLines(lines.filter(l => l !== line));
    } else {
      setLines([...lines, line]);
    }
  };

  const addUser = () => {
    if (!name || !tier || lines.length === 0) return;

    const newUser = {
      name,
      tier: tier.toUpperCase(),
      lines
    };

    setUsers([...users, newUser]);

    setName("");
    setTier("");
    setLines([]);
  };

  const removeUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const lineList = ["TOP", "JUNGLE", "MID", "ADC", "SUP"];

  return (
    <div style={{
      padding: "30px",
      background: "#f3f4f6",
      minHeight: "100vh"
    }}>

      <h1>👥 리그오브레전드 인원 리스트</h1>
      <p style={{ color: "#666", marginBottom: "25px" }}>
        여러 라인을 선택할 수 있습니다.
      </p>

      {/* 입력 */}
      <div style={boxStyle}>
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

        {/* 🔥 멀티 라인 버튼 */}
        <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
          {lineList.map((l) => (
            <button
              key={l}
              onClick={() => toggleLine(l)}
              style={{
                padding: "6px 10px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background: lines.includes(l) ? "#6366f1" : "#e5e7eb",
                color: lines.includes(l) ? "white" : "#333"
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <button onClick={addUser} style={buttonStyle}>
          추가
        </button>
      </div>

      {/* 카드 */}
      <div style={gridStyle}>
        {users.map((user, i) => (
          <div key={i} style={cardStyle}>

            <h3>{user.name}</h3>

            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
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
            </div>

            {/* 🔥 여러 라인 표시 */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {user.lines.map((l, idx) => (
                <span key={idx} style={lineTag}>
                  {l}
                </span>
              ))}
            </div>

            <button onClick={() => removeUser(i)} style={deleteBtn}>
              삭제
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

// 스타일
const boxStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "30px"
};

const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  marginTop: "10px",
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
};

const lineTag = {
  background: "#e5e7eb",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px"
};