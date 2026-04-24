import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        padding: "15px 30px",
        background: "white",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>

        <Link href="/" style={{ fontWeight: "bold", color: "black", textDecoration: "none" }}>
          쿠로나미 🎮
        </Link>

        <div className="menu">
          <span className="menu-title">👥 소환사 관리 ▾</span>
          <div className="dropdown">
            <Link href="/lol">🎮 리그오브레전드</Link>
            <Link href="/valo">🔫 발로란트</Link>
          </div>
        </div>

        <Link href="/apply">📢 모집/참여</Link>

        <div className="menu">
          <span className="menu-title">🏆 기록실 ▾</span>
          <div className="dropdown">
            <Link href="/lol-record">🎮 롤 내전 기록</Link>
            <Link href="/valo-record">🔫 발로 내전 기록</Link>
            <Link href="/ranking-all">📊 통합 랭킹</Link>
          </div>
        </div>

        <Link href="/ranking">🎯 랭킹</Link>
        <Link href="/finance">💰 장부</Link>

      </div>

      <style jsx>{`
        .menu {
          position: relative;
        }

        .menu-title {
          cursor: pointer;
        }

        .dropdown {
          display: none;
          position: absolute;
          top: 30px;
          left: 0;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 10px;
          min-width: 180px;
        }

        .dropdown a {
          display: block;
          padding: 6px 10px;
          text-decoration: none;
          color: black;
        }

        .dropdown a:hover {
          background: #f3f4f6;
          border-radius: 6px;
        }

        .menu:hover .dropdown {
          display: block;
        }
      `}</style>
    </>
  );
}