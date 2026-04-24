import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);

  // 🎯 카드 스타일
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

  // 🎯 드롭다운 스타일
  const dropdownStyle = {
    position: "absolute",
    top: "42px",
    left: 0,
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "8px",
    minWidth: "170px",
    display: "flex",
    flexDirection: "column"
  };

  const itemStyle = {
    padding: "10px",
    textDecoration: "none",
    color: "#333",
    borderRadius: "8px"
  };

  // 🎯 화살표 스타일 (딱 좋은 값)
  const arrowStyle = {
    fontSize: "13px",
    marginLeft: "6px",
    opacity: 0.6,
    position: "relative",
    top: "1px"
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
        gap: "22px",
        padding: "14px 24px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>

        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          쿠로나미 🎮
        </div>

        {/* 👥 소환사 관리 */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpenMenu(openMenu === "member" ? null : "member")}
            style={{ cursor: "pointer" }}
          >
            👥 소환사 관리 <span style={arrowStyle}>▾</span>
          </div>

          {openMenu === "member" && (
            <div style={dropdownStyle}>
              <Link href="/lol" style={itemStyle}>🎮 리그오브레전드</Link>
              <Link href="/valo" style={itemStyle}>🔫 발로란트</Link>
            </div>
          )}
        </div>

        {/* 📢 모집/참여 */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpenMenu(openMenu === "apply" ? null : "apply")}
            style={{ cursor: "pointer" }}
          >
            📢 모집/참여 <span style={arrowStyle}>▾</span>
          </div>

          {openMenu === "apply" && (
            <div style={dropdownStyle}>
              <Link href="/apply" style={itemStyle}>📌 내전 모집/참여</Link>
            </div>
          )}
        </div>

        {/* 🏆 기록실 */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpenMenu(openMenu === "record" ? null : "record")}
            style={{ cursor: "pointer" }}
          >
            🏆 기록실 <span style={arrowStyle}>▾</span>
          </div>

          {openMenu === "record" && (
            <div style={dropdownStyle}>
              <Link href="/lol-record" style={itemStyle}>📊 롤 내전 기록</Link>
              <Link href="/valo-record" style={itemStyle}>📊 발로 내전 기록</Link>
              <Link href="/ranking-all" style={itemStyle}>🥇 통합 랭킹</Link>
            </div>
          )}
        </div>

        {/* 🎯 랭킹 */}
        <Link href="/ranking" style={{ textDecoration: "none", color: "#333" }}>
          🎯 랭킹
        </Link>

        {/* 💰 장부 */}
        <Link href="/finance" style={{ textDecoration: "none", color: "#333" }}>
          💰 장부
        </Link>

      </div>

      {/* 🔥 본문 */}
      <div style={{ padding: "30px" }}>
        <h1 style={{ marginBottom: "25px" }}>쿠로나미 대시보드</h1>

        <div style={{ display: "flex", gap: "20px" }}>

          {/* TOP3 */}
          <div
            style={{ ...cardStyle, flex: 1 }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <h2>🔥 이번 주 TOP 3</h2>
            <p style={{ color: "#888" }}>아직 데이터가 없습니다.</p>
          </div>

          {/* MVP */}
          <div
            style={{ ...cardStyle, flex: 2 }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <h2>🏆 이번 주 MVP</h2>
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
            <h2>📜 최근 내전</h2>
            <p style={{ color: "#888" }}>기록이 없습니다.</p>
          </div>

        </div>
      </div>

    </div>
  );
}