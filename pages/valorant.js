import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Valorant() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("high");

  const roles = ["DUELIST","INITIATOR","CONTROLLER","SENTINEL","ALL"];

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "valorantUsers"));
    setUsers(data.docs.map(d => ({ id:d.id, ...d.data() })));
  };

  /* 발로란트 티어 순서 */
  const tierRank = [
    "IRON","BRONZE","SILVER","GOLD",
    "PLATINUM","DIAMOND","ASCENDANT",
    "IMMORTAL","RADIANT"
  ];

  /* 정렬 점수 */
  const getScore = (tier) => {
    if (!tier) return 0;

    const [base, num] = tier.toUpperCase().split(" ");
    const tierIndex = tierRank.indexOf(base);

    let score = tierIndex * 100;

    if (num) {
      const n = parseInt(num);
      if (n >= 1 && n <= 3) {
        score += (4 - n) * 10; // 1이 제일 높음
      }
    }

    return score;
  };

  const getColor = (tier) => {
    const base = tier?.split(" ")[0];
    const map = {
      RADIANT:"#facc15",
      IMMORTAL:"#ef4444",
      ASCENDANT:"#22c55e",
      DIAMOND:"#3b82f6",
      PLATINUM:"#14b8a6",
      GOLD:"#eab308",
      SILVER:"#9ca3af",
      BRONZE:"#92400e",
      IRON:"#6b7280",
    };
    return map[base] || "#999";
  };

  const addUser = async () => {
    if (!name || !tier || !role) return;

    const newUser = {
      name,
      tier: tier.toUpperCase(),
      role
    };

    const docRef = await addDoc(collection(db, "valorantUsers"), newUser);
    setUsers(prev => [...prev, { id:docRef.id, ...newUser }]);

    setName("");
    setTier("");
    setRole("");
  };

  const removeUser = async (id) => {
    await deleteDoc(doc(db, "valorantUsers", id));
    setUsers(prev => prev.filter(u=>u.id !== id));
  };

  const filtered = users
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.tier.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a,b)=>
      sort==="high"
        ? getScore(b.tier)-getScore(a.tier)
        : getScore(a.tier)-getScore(b.tier)
    );

  return (
    <div style={wrap}>
      <h1>🔫 발로란트 인원 리스트</h1>

      {/* 등록 */}
      <div style={box}>
        <div style={row}>
          <input
            placeholder="닉네임"
            value={name}
            onChange={e=>setName(e.target.value)}
            style={input}
          />

          <input
            placeholder="티어 (예: GOLD 2)"
            value={tier}
            onChange={e=>setTier(e.target.value)}
            style={input}
          />

          <select value={role} onChange={e=>setRole(e.target.value)} style={input}>
            <option value="">역할 선택</option>
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>

          <button style={addBtn} onClick={addUser}>
            추가
          </button>
        </div>
      </div>

      {/* 검색 */}
      <div style={box}>
        <input
          placeholder="검색"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          style={input}
        />

        <select value={sort} onChange={e=>setSort(e.target.value)} style={input}>
          <option value="high">티어 높은순</option>
          <option value="low">티어 낮은순</option>
        </select>
      </div>

      {/* 카드 */}
      <div style={grid}>
        {filtered.map(user=>(
          <div key={user.id} style={card}>
            <h3>{user.name}</h3>

            <span style={{...tierTag, background:getColor(user.tier)}}>
              {user.tier}
            </span>

            <div style={roleBox}>
              {user.role}
            </div>

            <button style={delBtn} onClick={()=>removeUser(user.id)}>
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 스타일 */

const wrap = { padding:30, background:"#f3f4f6" };

const box = {
  background:"white",
  padding:20,
  borderRadius:14,
  marginBottom:20
};

const row = {
  display:"flex",
  gap:10,
  flexWrap:"wrap"
};

const input = {
  padding:8,
  border:"1px solid #ddd",
  borderRadius:6
};

const addBtn = {
  padding:"10px 16px",
  background:"#6366f1",
  color:"white",
  border:"none",
  borderRadius:10,
  cursor:"pointer"
};

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",
  gap:16
};

const card = {
  background:"white",
  padding:20,
  borderRadius:20,
  boxShadow:"0 10px 25px rgba(0,0,0,0.08)"
};

const tierTag = {
  color:"white",
  padding:"6px 14px",
  borderRadius:"999px",
  fontSize:12,
  marginTop:5,
  display:"inline-block"
};

const roleBox = {
  marginTop:10,
  background:"#eef2f7",
  padding:10,
  borderRadius:10,
  textAlign:"center"
};

const delBtn = {
  marginTop:10,
  background:"#ef4444",
  color:"white",
  padding:10,
  border:"none",
  borderRadius:10,
  cursor:"pointer"
};