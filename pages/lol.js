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

  // 🎯 티어 출력
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

  // ⭐ 주라인
  const toggleMain = (line) => {
    if (mainLines.includes(line)) {
      setMainLines(mainLines.filter(l => l !== line));
    } else {
      setMainLines([...mainLines, line]);
      setSubLines(subLines.filter(l => l !== line));
    }
  };

  // 🔹 부라인
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
        주라인과 부라인을 선택할 수 있습니다.
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

        {/* 드롭다운 */}
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

            <h3>{user.name}</h3>

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

            {/* ⭐ + 🔹 한 줄 정렬 */}
            <div style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px"
            }}>
              {user.mainLines.map((l, idx) => (
                <span key={"m"+idx} style={{
                  ...lineTag,
                  background: "#6366f1",
                  color: "white"
                }}>
                  {l}
                </span>
              ))}

              {user.subLines.map((l, idx) => (
                <span key={"s"+idx} style={lineTag}>
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
  padding: "6px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px"
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
  gap: "8px"
};

const lineTag = {
  background: "#e5e7eb",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px"
};