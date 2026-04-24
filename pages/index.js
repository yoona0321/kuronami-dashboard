import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);

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
    color: "#333"
  };

  const arrowStyle = {
    fontSize: "15px",
    marginLeft: "6px",
    opacity: 0.7
  };

  return (
    <div style={{ padding: "30px" }}>

      {/* 🔥 메뉴바 */}
      <div style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "white",
        borderRadius: "10px"
      }}>

        <div style={{ fontWeight: "bold" }}>
          쿠로나미 🎮
        </div>

        {/* 👥 소환사 관리 (hover 적용) */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setOpenMenu("member")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div style={{ cursor: "pointer" }}>
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
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setOpenMenu("apply")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div style={{ cursor: "pointer" }}>
            📢 모집/참여 <span style={arrowStyle}>▾</span>
          </div>

          {openMenu === "apply" && (
            <div style={dropdownStyle}>
              <Link href="/apply" style={itemStyle}>📌 내전 모집/참여</Link>
            </div>
          )}
        </div>

        {/* 🏆 기록실 */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setOpenMenu("record")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div style={{ cursor: "pointer" }}>
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

        <Link href="/ranking">🎯 랭킹</Link>
        <Link href="/finance">💰 장부</Link>

      </div>

    </div>
  );
}