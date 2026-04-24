import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      background: "#f5f7fb",
      minHeight: "100vh",
      color: "#111",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>

      {/* 🔥 상단 메뉴바 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        marginBottom: "30px",
        padding: "14px 20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          쿠로나미 🎮
        </div>

        <Link href="/member">👥 멤버 관리</Link>
        <Link href="/apply">📢 모집/참여</Link>
        <Link href="/record">📊 기록실</Link>
        <Link href="/ranking">🏆 랭킹</Link>
        <Link href="/finance">💰 장부</Link>
      </div>

      {/* 🧩 메인 내용 */}
      <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>
        쿠로나미 대시보드
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
            <p style={{ color: "#777" }}>
              아직 MVP가 선정되지 않았습니다.
            </p>
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