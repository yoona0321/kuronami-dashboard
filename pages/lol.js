import Link from "next/link";

export default function Lol() {

  const users = [
    { name: "carryyy #2003", tier: "MASTER", kda: 4.07, winrate: 72, line: "ADC" },
    { name: "뚬칫냥 #KR2", tier: "MASTER", kda: 3.8, winrate: 65, line: "JUNGLE" },
    { name: "메롱 강아지 #0526", tier: "Unranked", kda: 2.1, winrate: 55, line: "ADC" },
  ];

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>

      {/* 🔥 메뉴바 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "25px",
        padding: "15px 30px",
        background: "white",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <Link href="/" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>
          쿠로나미 🎮
        </Link>

        <Link href="/lol">👥 소환사 관리</Link>
        <Link href="/apply">📢 모집/참여</Link>
        <Link href="/lol-record">🏆 기록실</Link>
        <Link href="/ranking">🎯 랭킹</Link>
        <Link href="/finance">💰 장부</Link>
      </div>

      {/* 🔥 본문 */}
      <div style={{ padding: "30px" }}>

        {/* 제목 */}
        <div style={{ marginTop: "20px" }}>
          <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            👥 리그오브레전드 인원 리스트
          </h1>

          <p style={{
            marginTop: "5px",
            color: "#666",
            fontSize: "14px"
          }}>
            등록된 모든 인원의 티어와 라인을 확인할 수 있습니다.
          </p>
        </div>

        {/* 카드 리스트 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}>

          {users.map((user, i) => (
            <div key={i} style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
            }}>
              <h3>{user.name}</h3>

              <p style={{ marginTop: "10px" }}>
                티어: <b>{user.tier}</b>
              </p>

              <p>KDA: {user.kda}</p>
              <p>승률: {user.winrate}%</p>
              <p>라인: {user.line}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}