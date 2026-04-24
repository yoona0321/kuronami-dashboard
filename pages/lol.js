import { useState, useEffect } from "react";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");

  const [mainLines, setMainLines] = useState([]);
  const [subLines, setSubLines] = useState([]);
  const [open, setOpen] = useState(false);

  const lineList = ["ALL", "TOP", "JUNGLE", "MID", "ADC", "SUP"];

  useEffect(() => {
    const saved = localStorage.getItem("lolUsers");
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lolUsers", JSON.stringify(users));
  }, [users]);

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

  const toggleMain = (line) => {
    if (mainLines.includes(line)) {
      setMainLines(mainLines.filter(l => l !== line));
    } else {
      setMainLines([...mainLines, line]);
      setSubLines(subLines.filter(l => l !== line));
    }
  };

  const toggleSub = (line) => {
    if (subLines.includes(line)) {
      setSubLines(subLines.filter(l => l !== line));
    } else {
      setSubLines([...subLines, line]);
      setMainLines(mainLines.filter(l => l !== line));
    }
  };

  const addUser = () => {
    if (!name || !tier || mainLines.length === 0) return;

    setUsers([
      ...users,
      {
        name,
        tier: tier.toUpperCase(),
        mainLines,
        subLines
      }
    ]);

    setName("");
    setTier("");
    setMainLines([]);
    setSubLines([]);
  };

  const removeUser = (i) => {
    setUsers(users.filter((_, idx) => idx !== i));
  };

  return (
    <div style={{
      padding: "30px",
      background: "#f3f4f6",
      minHeight: "100vh"
    }}>

      <h1>👥 리그오브레전드 인원 리스트</h1>
      <p style={{ color: "#666", marginBottom: "25px" }}>
        주라인 / 부라인을 선택해 등록할 수 있습니다.
      </p>

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

        <div style={{ position: "relative", marginTop: "10px" }}>
          <div onClick={() => setOpen(!open)} style={dropdownButton}>
            라인 선택 ▼
          </div>

          {open && (
            <div style={dropdownBox}>

              <div style={{ fontWeight: "bold" }}>⭐ 주라인</div>
              {lineList.map((l) => (
                <label key={l} style={checkboxItem}>
                  <input
                    type="checkbox"
                    checked={mainLines.includes(l)}
                    onChange={() => toggleMain(l)}
                  />
                  {l}
                </label>
              ))}

              <hr style={{ margin: "10px 0" }} />

              <div style={{ fontWeight: "bold" }}>🔹 부라인</div>
              {lineList.map((l) => (
                <label key={l} style={checkboxItem}>
                  <input
                    type="checkbox"
                    checked={subLines.includes(l)}
                    onChange={() => toggleSub(l)}
                  />
                  {l}
                </label>
              ))}

            </div>
          )}
        </div>

        <button onClick={addUser} style={buttonStyle}>
          추가
        </button>
      </div>

      {/* 카드 */}
      <div style={gridStyle}>
        {users.map((user, i) => (
          <div key={i} style={cardStyle}>

            <h3 style={{ margin: 0 }}>{user.name}</h3>

            {/* 티어만 표시 (라인 제거됨) */}
            <div style={{ marginTop: "6px" }}>
              <span style={{
                background: getTierColor(user.tier),
                color: "white",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {formatTier(user.tier)}
              </span>
            </div>

            {/* 라인 박스 */}
            <div style={lineBox}>

              <div style={rowStyle}>
                <span style={labelStyle}>주라인</span>
                <div style={tagWrap}>
                  {user.mainLines.map((l, idx) => (
                    <span key={idx} style={mainTag}>{l}</span>
                  ))}
                </div>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>부라인</span>
                <div style={tagWrap}>
                  {user.subLines.map((l, idx) => (
                    <span key={idx} style={subTag}>{l}</span>
                  ))}
                </div>
              </div>

            </div>

            {/* 🔥 삭제 버튼 (hover 효과 추가) */}
            <button
              onClick={() => removeUser(i)}
              style={deleteBtn}
              onMouseEnter={(e) => {
                e.target.style.background = "#dc2626";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ef4444";
                e.target.style.transform = "scale(1)";
              }}
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

const dropdownButton = {
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer",
  background: "white",
  width: "220px"
};

const dropdownBox = {
  position: "absolute",
  top: "40px",
  left: 0,
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  zIndex: 10
};

const checkboxItem = {
  display: "block",
  marginBottom: "5px"
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
  padding: "8px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease"
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
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const lineBox = {
  background: "#f1f5f9",
  borderRadius: "12px",
  padding: "12px"
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "6px"
};

const labelStyle = {
  fontSize: "12px",
  color: "#666",
  width: "60px"
};

const tagWrap = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
  justifyContent: "flex-end"
};

const mainTag = {
  background: "#6366f1",
  color: "white",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px"
};

const subTag = {
  background: "#e5e7eb",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px"
};