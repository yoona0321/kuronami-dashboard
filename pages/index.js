import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const menuStyle = (path) => ({
    color: router.pathname === path ? "#4f46e5" : "#333",
    fontWeight: router.pathname === path ? "bold" : "normal",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: "8px",
  });

  return (
    <div style={{
      background: "#f5f7fb",
      minHeight: "100vh",
      fontFamily: "sans-serif"
    }}>

      {/* 🔥 메뉴바 */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        gap: "18px",
        padding: "14px 20px",
        background: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <div style={{ fontWeight: "bold" }}>쿠로나미 🎮</div>

        <Link href="/member" style={menuStyle("/member")}>👥 멤버 관리</Link>
        <Link href="/apply" style={menuStyle("/apply")}>📢 모집/참여</Link>
        <Link href="/record" style={menuStyle("/record")}>📊 기록실</Link>
        <Link href="/ranking" style={menuStyle("/ranking")}>🏆 랭킹</Link>
        <Link href="/finance" style={menuStyle("/finance")}>💰 장부</Link>
      </div>

      <div style={{ padding: "20px" }}>
        <h1>쿠로나미 대시보드</h1>

        <div style={{ display: "flex", gap: "20px" }}>

          {/* TOP3 */}
          <div style={{ flex: 1 }}>
            <h2>🔥 이번 주 TOP 3</h2>
            <p style={{ color: "#777" }}>아직 데이터가 없습니다.</p>
          </div>

          {/* MVP */}
          <div style={{ flex: 2 }}>
            <h2>🏆 이번 주 MVP</h2>
            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px"
            }}>
              <p style={{ color: "#777" }}>
                아직 MVP가 선정되지 않았습니다.
              </p>
            </div>
          </div>

          {/* 최근 내전 */}
          <div style={{ flex: 1 }}>
            <h2>📜 최근 내전</h2>
            <p style={{ color: "#777" }}>기록이 없습니다.</p>
          </div>

        </div>
      </div>
    </div>
  );
}