export default function Home() {
  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ marginBottom: "25px" }}>쿠로나미 대시보드</h1>

      <div style={{ display: "flex", gap: "20px" }}>

        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          flex: 1
        }}>
          <h2>🔥 이번 주 TOP 3</h2>
          <p style={{ color: "#888" }}>아직 데이터가 없습니다.</p>
        </div>

        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          flex: 2
        }}>
          <h2>🏆 이번 주 MVP</h2>
          <div style={{ background: "#eef2ff", padding: "20px", borderRadius: "12px" }}>
            <p style={{ color: "#555" }}>아직 MVP가 선정되지 않았습니다.</p>
          </div>
        </div>

        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          flex: 1
        }}>
          <h2>📜 최근 내전</h2>
          <p style={{ color: "#888" }}>기록이 없습니다.</p>
        </div>

      </div>

    </div>
  );
}