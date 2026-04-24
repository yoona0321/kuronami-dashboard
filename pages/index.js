export default function Home() {
  return (
    <div style={{
      background: "#f5f7fb",
      minHeight: "100vh",
      color: "#111",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        쿠로나미 대시보드 🎮
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        
        {/* 왼쪽 */}
        <div style={{ flex: 1 }}>
          <h2>🔥 이번 주 TOP 3</h2>
          <p style={{ color: "#777" }}>아직 데이터가 없습니다.</p>
        </div>

        {/* 중앙 */}
        <div style={{ flex: 2 }}>
          <h2>🏆 이번 주 MVP</h2>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}>
            <p style={{ color: "#777" }}>아직 MVP가 선정되지 않았습니다.</p>
          </div>
        </div>

        {/* 오른쪽 */}
        <div style={{ flex: 1 }}>
          <h2>📜 최근 내전</h2>
          <p style={{ color: "#777" }}>기록이 없습니다.</p>
        </div>

      </div>
    </div>
  );
}