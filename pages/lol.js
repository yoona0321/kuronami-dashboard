import { useState, useEffect } from "react";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");

  const [mainLines, setMainLines] = useState([]);
  const [subLines, setSubLines] = useState([]);
  const [open, setOpen] = useState(false);

  const lineList = ["ALL", "TOP", "JUNGLE", "MID", "ADC", "SUP"];

  // ✅ 처음 로딩할 때만 불러오기 (핵심)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lolUsers");
      if (saved) {
        setUsers(JSON.parse(saved));
      }
    } catch (e) {
      console.error("불러오기 실패", e);
      setUsers([]);
    }
  }, []);

  // ✅ users 바뀔 때마다 저장
  useEffect(() => {
    try {
      localStorage.setItem("lolUsers", JSON.stringify(users));
    } catch (e) {
      console.error("저장 실패", e);
    }
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

    const newUser = {
      name,
      tier: tier.toUpperCase(),
      mainLines,
      subLines
    };

    setUsers(prev => [...prev, newUser]); // 🔥 안전한 방식

    setName("");
    setTier("");
    setMainLines([]);
    setSubLines([]);
  };

  const removeUser = (i) => {
    setUsers(users.filter((_, idx) => idx !== i));
  };

  return (
    <div style={{ padding: "30px", background: "#f3f4f6", minHeight: "100vh" }}>

      <h1>👥 리그오브레전드 인원 리스트</h1>

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
            <h3>{user.name}</h3>

            <span style={{
              background: getTierColor(user.tier),
              color: "white",
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "12px"
            }}>
              {formatTier(user.tier)}
            </span>

            <div style={lineBox}>
              <div>
                <b>주라인:</b> {user.mainLines.join(", ")}
              </div>
              <div>
                <b>부라인:</b> {user.subLines.join(", ")}
              </div>
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
  background: "white",
  border: "1px solid #ddd",
  padding: "10px"
};

const checkboxItem = {
  display: "block"
};

const buttonStyle = {
  marginTop: "10px",
  padding: "8px",
  background: "#6366f1",
  color: "white",
  border: "none"
};

const deleteBtn = {
  marginTop: "10px",
  background: "#ef4444",
  color: "white",
  padding: "6px",
  border: "none"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px"
};

const lineBox = {
  marginTop: "10px",
  background: "#f1f5f9",
  padding: "10px",
  borderRadius: "8px"
};