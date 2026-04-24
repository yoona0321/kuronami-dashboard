import Link from "next/link";

export default function Lol() {

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