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

  const roles = ["타격대","척후대","전략가","엄호대","ALL"];

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "valorantUsers"));
    setUsers(data.docs.map(d => ({ id:d.id, ...d.data() })));
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

    const newUser = { name, tier, mainRoles, subRoles };

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

  return (
    <div style={wrap}>
      <h1>🔫 발로란트 인원 리스트</h1>

      {/* 입력 */}
      <div style={box}>
        <div style={row}>
          <input placeholder="닉네임" value={name} onChange={e=>setName(e.target.value)} style={input}/>
          <input placeholder="티어 (예: 골드 2)" value={tier} onChange={e=>setTier(e.target.value)} style={input}/>

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
        {users.map(user => (
          <div key={user.id} style={card}>
            <h3>{user.name}</h3>

            {/* 티어 */}
            <div style={{...tierBar, background:getColor(user.tier)}}>
              {user.tier}
            </div>

            {/* 역할 */}
            <div style={roleBox}>
              <div style={roleRow}>
                <span style={label}>주라인</span>
                <div style={badgeWrap}>
                  {(user.mainRoles || []).map(r => (
                    <span key={r} style={mainBadge}>{r}</span>
                  ))}
                </div>
              </div>

              <div style={roleRow}>
                <span style={label}>부라인</span>
                <div style={badgeWrap}>
                  {(user.subRoles || []).map(r => (
                    <span key={r} style={subBadge}>{r}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 삭제 */}
            <button
              style={delBtnBig}
              onClick={()=>removeUser(user.id)}
              onMouseEnter={(e)=> e.target.style.opacity=0.85}
              onMouseLeave={(e)=> e.target.style.opacity=1}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 스타일 */

const wrap = { padding:30, background:"#f3f4f6", minHeight:"100vh" };

const box = { background:"white", padding:20, borderRadius:14, marginBottom:20 };

const row = { display:"flex", gap:10, flexWrap:"wrap" };

const input = { padding:8, border:"1px solid #ddd", borderRadius:6 };

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

const tierBar = {
  color:"white",
  padding:"8px 16px",
  borderRadius:"999px",
  fontSize:13,
  marginTop:8,
  display:"inline-block",
  fontWeight:"bold"
};

const roleBox = {
  marginTop:12,
  background:"#eef2f7",
  padding:12,
  borderRadius:12
};

const roleRow = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:6
};

const badgeWrap = {
  display:"flex",
  gap:6,
  flexWrap:"wrap"
};

const mainBadge = {
  background:"#6366f1",
  color:"white",
  padding:"4px 10px",
  borderRadius:"999px",
  fontSize:12
};

const subBadge = {
  background:"#d1d5db",
  color:"#333",
  padding:"4px 10px",
  borderRadius:"999px",
  fontSize:12
};

const label = {
  fontSize:12,
  color:"#888"
};

const delBtnBig = {
  marginTop:12,
  width:"100%",
  background:"#ef4444",
  color:"white",
  padding:12,
  border:"none",
  borderRadius:12,
  cursor:"pointer",
  fontWeight:"bold",
  transition:"0.2s"
};

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