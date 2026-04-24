import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const menuStyle = (path) => ({
    color: router.pathname === path ? "#4f46e5" : "#555",
    fontWeight: router.pathname === path ? "bold" : "500",
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    transition: "all 0.2s ease"
  });

  const cardStyle = {
    background: "linear-gradient(135deg, #ffffff, #f9fafb)",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    cursor: "pointer"
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.12)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.06)";
  };

  return (
    <div style={{
      background: "#f3f4f6",
      minHeight: "100vh",
      fontFamily: "sans-serif"
    }}>

      {/* 🔥 메뉴바 */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "18px",
        padding: "14px 24px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          쿠로나미 🎮
        </div>

        <Link href="/member" style={menuStyle("/member")}>👥 멤버 관리</Link>
        <Link href="/apply" style={menuStyle("/apply")}>📢 모집/참여</Link>
        <Link href="/record" style={menuStyle("/record")}>📊 기록실</Link>
        <Link href="/ranking" style={menuStyle("/ranking")}>🏆 랭킹</Link>
        <Link href="/finance" style={menuStyle("/finance")}>💰 장부</Link>
      </div>

      <div style={{ padding: "30px" }}>
        <h1 style={{ marginBottom: "25px" }}>쿠로나미 대시보드</h1>

        <div style={{ display: "flex", gap: "20px" }}>

          {/* TOP3 */}
          <div
            style={{ ...cardStyle, flex: 1 }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <h2 style={{ marginBottom: "10px" }}>🔥 이번 주 TOP 3</h2>
            <p style={{ color: "#888" }}>아직 데이터가 없습니다.</p>
          </div>

          {/* MVP */}
          <div
            style={{ ...cardStyle, flex: 2 }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <h2 style={{ marginBottom: "10px" }}>🏆 이번 주 MVP</h2>
            <div style={{
              background: "#eef2ff",
              padding: "20px",
              borderRadius: "12px"
            }}>
              <p style={{ color: "#555" }}>
                아직 MVP가 선정되지 않았습니다.
              </p>
            </div>
          </div>

          {/* 최근 내전 */}
          <div
            style={{ ...cardStyle, flex: 1 }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <h2 style={{ marginBottom: "10px" }}>📜 최근 내전</h2>
            <p style={{ color: "#888" }}>기록이 없습니다.</p>
          </div>

        </div>
      </div>
    </div>
  );
}