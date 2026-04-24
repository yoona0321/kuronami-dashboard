import { useState, useEffect } from "react";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [line, setLine] = useState("");

  // 💾 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("lolUsers");
    if (saved) {
      setUsers(JSON.parse(saved));
    }
  }, []);

  // 💾 저장
  useEffect(() => {
    localStorage.setItem("lolUsers", JSON.stringify(users));
  }, [users]);

  // 🔥 티어 색상 함수
  const getTierColor = (tier) => {
    switch (tier.toUpperCase()) {
      case "MASTER": return "#9333ea";
      case "DIAMOND": return "#3b82f6";
      case "PLATINUM": return "#14b8a6";
      case "GOLD": return "#eab308";
      case "SILVER": return "#9ca3af";
      case "BRONZE": return "#92400e";
      default: return "#6b7280";
    }
  };

  const addUser = () => {
    if (!name || !tier || !line) return;

    const newUser = { name, tier, line };
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

      {/* 입력창 */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
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
          placeholder="티어"
          value={tier}
          onChange={(e) => setTier(e.target.value.toUpperCase())}
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
          <div key={i} style={cardStyle}>

            <h3 style={{ marginBottom: "10px" }}>{user.name}</h3>

            {/* 🔥 티어 배지 */}
            <div style={{
              display: "inline-block",
              padding: "5px 10px",
              borderRadius: "8px",
              background: getTierColor(user.tier),
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "8px"
            }}>
              {user.tier}
            </div>

            <p>라인: {user.line}</p>

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

// 🎨 스타일
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
  padding: "6px 10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};