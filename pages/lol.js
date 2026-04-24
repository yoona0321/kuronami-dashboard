export default function Lol() {
  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ marginBottom: "10px" }}>
        👥 리그오브레전드 인원 리스트
      </h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        등록된 모든 인원의 티어와 라인을 확인할 수 있습니다.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }}>
          <h3>carryyy #2003</h3>
          <p>티어: MASTER</p>
          <p>KDA: 4.07</p>
          <p>승률: 72%</p>
          <p>라인: ADC</p>
        </div>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }}>
          <h3>뚬칫냥 #KR2</h3>
          <p>티어: MASTER</p>
          <p>KDA: 3.8</p>
          <p>승률: 65%</p>
          <p>라인: JUNGLE</p>
        </div>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }}>
          <h3>메롱 강아지 #0526</h3>
          <p>티어: Unranked</p>
          <p>KDA: 2.1</p>
          <p>승률: 55%</p>
          <p>라인: ADC</p>
        </div>

      </div>

    </div>
  );
}