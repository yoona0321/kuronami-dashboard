import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const toggleMenu = (e, menu) => {
    e.stopPropagation();
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // 🎨 카드 스타일
  const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease",
    cursor: "pointer"
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.12)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
  };

  // 🎯 메뉴 hover 스타일
  const menuTextStyle = {
    cursor: "pointer",
    fontSize: "15px",
    position: "relative",
    paddingBottom: "4px",
    transition: "color 0.2s ease"
  };

  const underlineStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2px",
    width: "0%",
    background: "#6366f1",
    transition: "width 0.3s ease"
  };

  const dropdownStyle = {
    position: "absolute",
    top: "45px",
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

  const arrowStyle = {
    fontSize: "14px",
    marginLeft: "6px",
    opacity: 0.6
  };

  // hover 효과 함수
  const handleMenuHover = (e) => {
    e.currentTarget.style.color = "#6366f1";
    e.currentTarget.querySelector(".underline").style.width = "100%";
  };

  const handleMenuLeave = (e) => {
    e.currentTarget.style.color = "#333";
    e.currentTarget.querySelector(".underline").style.width = "0%";
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>

      {/* 🔥 메뉴바 */}
      <div style={{
        display: "flex",
        gap: "22px",
        padding: "15px 25px",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>

        <div style={{ fontWeight: "bold", fontSize: "17px" }}>
          쿠로나미 🎮
        </div>

        {/* 👥 소환사 관리 */}
        <div style={{ position: "relative" }}>
          <div
            onClick={(e) => toggleMenu(e, "member")}
            style={menuTextStyle}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            👥 소환사 관리 <span style={arrowStyle}>▾</span>
            <div className="underline" style={underlineStyle}></div>
          </div>

          {openMenu === "member" && (
            <div style={dropdownStyle}>
              <Link href="/lol" style={itemStyle}>🎮 리그오브레전드</Link>
              <Link href="/valo" style={itemStyle}>🔫 발로란트</Link>
            </div>
          )}
        </div>

        {/* 📢 모집 */}
        <div style={{ position: "relative" }}>
          <div
            onClick={(e) => toggleMenu(e, "apply")}
            style={menuTextStyle}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            📢 모집/참여 <span style={arrowStyle}>▾</span>
            <div className="underline" style={underlineStyle}></div>
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
            onClick={(e) => toggleMenu(e, "record")}
            style={menuTextStyle}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            🏆 기록실 <span style={arrowStyle}>▾</span>
            <div className="underline" style={underlineStyle}></div>
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
        <Link href="/ranking" style={{ textDecoration: "none" }}>
          <div
            style={menuTextStyle}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            🎯 랭킹
            <div className="underline" style={underlineStyle}></div>
          </div>
        </Link>

        {/* 💰 장부 */}
        <Link href="/finance" style={{ textDecoration: "none" }}>
          <div
            style={menuTextStyle}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            💰 장부
            <div className="underline" style={underlineStyle}></div>
          </div>
        </Link>

      </div>

      {/* 🔥 본문 */}
      <div style={{ padding: "30px" }}>
        <h1 style={{ marginBottom: "25px" }}>쿠로나미 대시보드</h1>

        <div style={{ display: "flex", gap: "20px" }}>

          <div style={{ ...cardStyle, flex: 1 }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <h2>🔥 이번 주 TOP 3</h2>
            <p style={{ color: "#888" }}>아직 데이터가 없습니다.</p>
          </div>

          <div style={{ ...cardStyle, flex: 2 }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <h2>🏆 이번 주 MVP</h2>
            <div style={{ background: "#eef2ff", padding: "20px", borderRadius: "12px" }}>
              <p style={{ color: "#555" }}>아직 MVP가 선정되지 않았습니다.</p>
            </div>
          </div>

          <div style={{ ...cardStyle, flex: 1 }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <h2>📜 최근 내전</h2>
            <p style={{ color: "#888" }}>기록이 없습니다.</p>
          </div>

        </div>
      </div>

    </div>
  );
}