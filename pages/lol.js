import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");

  const [mainLines, setMainLines] = useState([]);
  const [subLines, setSubLines] = useState([]);
  const [open, setOpen] = useState(false);

  const lineList = ["ALL", "TOP", "JUNGLE", "MID", "ADC", "SUP"];

  // 🔥 Firestore 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "lolUsers"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(data);
    };
    fetchData();
  }, []);

  // 🎨 티어 색상
  const getTierColor = (tier) => {
    if (!tier) return "#6b7280";
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
    if (!tier) return "UNRANKED";

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

  // ➕ 추가
  const addUser = async () => {
    if (!name || !tier || mainLines.length === 0) {
      alert("닉네임 / 티어 / 주라인 입력해라");
      return;
    }

    const newUser = {
      name,
      tier: tier.toUpperCase(),
      mainLines,
      subLines
    };

    const docRef = await addDoc(collection(db, "lolUsers"), newUser);

    setUsers(prev => [...prev, { id: docRef.id, ...newUser }]);

    setName("");
    setTier("");
    setMainLines([]);
    setSubLines([]);
  };

  // ❌ 삭제
  const removeUser = async (id) => {
    await deleteDoc(doc(db, "lolUsers", id));
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div style={container}>

      <h1>👥 리그오브레전드 인원 리스트</h1>

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

        <div style={{ position: "relative", marginTop: "10px" }}>
          <div onClick={() => setOpen(!open)} style={dropdownButton}>
            라인 선택 ▼
          </div>

          {open && (
            <div style={dropdownBox}>
              <b>⭐ 주라인</b>
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

              <hr />

              <b>🔹 부라인</b>
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
        {users.map((user) => (
          <div key={user.id} style={cardStyle}>

            <h3 style={{ marginBottom: "6px" }}>{user.name}</h3>

            <span style={{
              background: getTierColor(user.tier),
              color: "white",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "bold",
              width: "fit-content"
            }}>
              {formatTier(user.tier)}
            </span>

            {/* 📦 라인 박스 */}
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

            <button
              onClick={() => removeUser(user.id)}
              style={deleteBtn}
              onMouseEnter={(e) => {
                e.target.style.background = "#dc2626";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ef4444";
                e.target.style.transform = "translateY(0)";
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

/* 스타일 */
const container = {
  padding: "30px",
  background: "#f3f4f6",
  minHeight: "100vh"
};

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
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
};

const checkboxItem = {
  display: "block",
  marginBottom: "5px"
};

const buttonStyle = {
  marginTop: "10px",
  padding: "8px",
  background: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px"
};

const cardStyle = {
  background: "white",
  padding: "22px",
  borderRadius: "20px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const lineBox = {
  background: "#eef2f7",
  borderRadius: "14px",
  padding: "14px"
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "6px"
};

const labelStyle = {
  fontSize: "12px",
  color: "#777"
};

const tagWrap = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap"
};

const mainTag = {
  background: "#6366f1",
  color: "white",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "500"
};

const subTag = {
  background: "#e5e7eb",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px"
};

const deleteBtn = {
  marginTop: "6px",
  padding: "12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  transition: "all 0.2s ease"
};