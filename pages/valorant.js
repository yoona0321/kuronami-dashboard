import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Valorant() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [mainRoles, setMainRoles] = useState([]);
  const [subRoles, setSubRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("high");

  const roles = ["타격대","척후대","전략가","엄호대","ALL"];

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "valorantUsers"));
    setUsers(data.docs.map(d => ({ id:d.id, ...d.data() })));
  };

  /* 티어 */
  const tierRank = [
    "아이언","브론즈","실버","골드",
    "플레티넘","다이아몬드","초월자",
    "불멸","레디언트"
  ];

  const getScore = (tier) => {
    if (!tier) return 0;

    const parts = tier.split(" ");
    const base = parts[0];
    const num = parts[1];

    const tierIndex = tierRank.indexOf(base);
    let score = tierIndex * 100;

    if (base !== "레디언트" && num) {
      const n = parseInt(num);
      if (n >= 1 && n <= 3) {
        score += (4 - n) * 10;
      }
    }

    return score;
  };

  const getColor = (tier) => {
    const base = tier?.split(" ")[0];
    const map = {
      레디언트:"#facc15",
      불멸:"#ef4444",
      초월자:"#22c55e",
      다이아몬드:"#3b82f6",
      플레티넘:"#14b8a6",
      골드:"#eab308",
      실버:"#9ca3af",
      브론즈:"#92400e",
      아이언:"#6b7280",
    };
    return map[base] || "#999";
  };

  /* 역할 토글 */
  const toggleMain = (r) => {
    setMainRoles(prev =>
      prev.includes(r) ? prev.filter(x=>x!==r) : [...prev, r]
    );
    setSubRoles(prev => prev.filter(x=>x!==r));
  };

  const toggleSub = (r) => {
    setSubRoles(prev =>
      prev.includes(r) ? prev.filter(x=>x!==r) : [...prev, r]
    );
    setMainRoles(prev => prev.filter(x=>x!==r));
  };

  const addUser = async () => {
    if (!name || !tier || mainRoles.length === 0) return;

    const newUser = {
      name,
      tier,
      mainRoles,
      subRoles
    };

    const docRef = await addDoc(collection(db, "valorantUsers"), newUser);
    setUsers(prev => [...prev, { id:docRef.id, ...newUser }]);

    setName("");
    setTier("");
    setMainRoles([]);
    setSubRoles([]);
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
          <input placeholder="닉네임" value={name} onChange={e=>setName(e.target.value)} style={input}/>
          <input placeholder="티어 (예: 골드 2)" value={tier} onChange={e=>setTier(e.target.value)} style={input}/>

          {/* 역할 드롭다운 */}
          <div style={{position:"relative"}}>
            <div style={dropdownBtn} onClick={()=>setOpen(!open)}>
              역할 선택 ▼
            </div>

            {open && (
              <div style={dropdown}>
                <b>주라인</b>
                {roles.map(r=>(
                  <label key={r}>
                    <input type="checkbox"
                      checked={mainRoles.includes(r)}
                      onChange={()=>toggleMain(r)}
                    /> {r}
                  </label>
                ))}

                <hr/>

                <b>부라인</b>
                {roles.map(r=>(
                  <label key={r}>
                    <input type="checkbox"
                      checked={subRoles.includes(r)}
                      onChange={()=>toggleSub(r)}
                    /> {r}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button style={addBtn} onClick={addUser}>추가</button>
        </div>
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
              <div>주라인: {user.mainRoles.join(", ")}</div>
              <div>부라인: {user.subRoles.join(", ")}</div>
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

/* 스타일 추가 */

const dropdownBtn = {
  padding:"8px",
  border:"1px solid #ddd",
  borderRadius:6,
  cursor:"pointer"
};

const dropdown = {
  position:"absolute",
  top:40,
  background:"white",
  padding:10,
  border:"1px solid #ddd",
  borderRadius:8,
  zIndex:999,
  display:"flex",
  flexDirection:"column",
  gap:5
};