export default function Home() {
  return (
    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      color: "white",
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
          <ul>
            <li>1위 carryyy - 79킬</li>
            <li>2위 중갈맨 - 77킬</li>
            <li>3위 동네 - 65킬</li>
          </ul>
        </div>

        {/* 중앙 */}
        <div style={{ flex: 2 }}>
          <h2>🏆 이번 주 MVP</h2>
          <div style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <h3>Reina #KR1</h3>
            <p>승률 100% | KDA 4.07</p>
          </div>
        </div>

        {/* 오른쪽 */}
        <div style={{ flex: 1 }}>
          <h2>📜 최근 내전</h2>
          <ul>
            <li>2026-04-23 단판 매치</li>
            <li>2026-04-22 단판 매치</li>
          </ul>
        </div>

      </div>
    </div>
  );
}