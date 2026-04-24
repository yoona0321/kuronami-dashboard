import { useState } from "react";

export default function Lol() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [line, setLine] = useState("");

  const addUser = () => {
    if (!name || !tier || !line) return;

    const newUser = { name, tier, line };
    setUsers([...users, newUser]);

    setName("");
    setTier("");
    setLine("");
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>👥 리그오브레전드 인원 리스트</h1>
      <p style={{ color: "#666" }}>
        등록된 모든 인원의 티어와 라인을 확인할 수 있습니다.
      </p>

      {/* 🔥 등록 영역 */}
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <input
          placeholder="닉네임"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="티어"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          placeholder="라인"
          value={line}
          onChange={(e) => setLine(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={addUser} style={{ marginLeft: "10px" }}>
          추가
        </button>
      </div>

      {/* 🔥 카드 영역 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>

        {users.map((user, i) => (
          <div key={i} style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
          }}>
            <h3>{user.name}</h3>
            <p>티어: {user.tier}</p>
            <p>라인: {user.line}</p>
          </div>
        ))}

      </div>

    </div>
  );
}