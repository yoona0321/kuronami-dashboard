import Link from "next/link";

export default function Lol() {
import Link from "next/link";

{/* 🔥 메뉴바 시작 */}
<div style={{
  display: "flex",
  alignItems: "center",
  gap: "30px",
  padding: "15px 30px",
  background: "white",
  borderBottom: "1px solid #eee",
  position: "sticky",
  top: 0,
  zIndex: 100,
  fontWeight: "500"
}}>

  {/* 로고 */}
  <Link href="/" style={{ textDecoration: "none", color: "black" }}>
    <b>쿠로나미 🎮</b>
  </Link>

  {/* 🔽 소환사 관리 */}
  <div style={{ position: "relative" }}>
    <span style={{ cursor: "pointer" }}>👥 소환사 관리 ▾</span>

    <div style={{
      position: "absolute",
      top: "30px",
      left: 0,
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "10px",
      display: "none"
    }} className="dropdown">

      <Link href="/lol" style={{ display: "block", padding: "5px 10px" }}>
        🎮 리그오브레전드
      </Link>

      <Link href="/valo" style={{ display: "block", padding: "5px 10px" }}>
        🔫 발로란트
      </Link>

    </div>
  </div>

  {/* 모집/참여 */}
  <Link href="/apply">📢 모집/참여</Link>

  {/* 🔽 기록실 */}
  <div style={{ position: "relative" }}>
    <span>🏆 기록실 ▾</span>

    <div style={{
      position: "absolute",
      top: "30px",
      left: 0,
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "10px",
      display: "none"
    }}>

      <Link href="/lol-record">🎮 롤 내전 기록</Link>
      <Link href="/valo-record">🔫 발로 내전 기록</Link>
      <Link href="/ranking-all">📊 통합 랭킹</Link>

    </div>
  </div>

  {/* 바로 이동 메뉴 */}
  <Link href="/ranking">🎯 랭킹</Link>
  <Link href="/finance">💰 장부</Link>

</div>

{/* 🔥 드롭다운 CSS */}
<style jsx>{`
  div:hover > .dropdown {
    display: block;
  }
`}</style>
  // 🔥 서버원 데이터 (여기만 계속 추가하면 됨)
  const users = [
    {
      name: "carryyy #2003",
      tier: "MASTER",
      kda: "4.07",
      winrate: "72%",
      line: "ADC"
    },
    {
      name: "뚬칫냥 #KR2",
      tier: "MASTER",
      kda: "3.8",
      winrate: "65%",
      line: "JUNGLE"
    },
    {
      name: "메롱 강아지 #0526",
      tier: "Unranked",
      kda: "2.1",
      winrate: "55%",
      line: "ADC"
    }
  ];

  return (
    <div style={{ padding: "30px", background: "#f3f4f6", minHeight: "100vh" }}>

      <Link href="/">← 홈으로</Link>

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
            <p>승률: {user.winrate}</p>
            <p>라인: {user.line}</p>

          </div>
        ))}

      </div>

    </div>
  );
}