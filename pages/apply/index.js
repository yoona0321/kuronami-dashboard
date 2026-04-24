import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Apply() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [max, setMax] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocs(collection(db, "applyPosts"));
    setPosts(data.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const createPost = async () => {
    if (!title) return;

    const newPost = {
      title,
      max,
      participants: []
    };

    const docRef = await addDoc(collection(db, "applyPosts"), newPost);

    setModalOpen(false);
    setTitle("");
    setMax(10);

    router.push(`/apply/${docRef.id}`);
  };

  return (
    <div style={wrap}>
      
      {/* 상단 */}
      <div style={top}>
        <h1>📢 파티 모집</h1>

        <button style={createBtn} onClick={() => setModalOpen(true)}>
          + 파티 생성
        </button>
      </div>

      {/* 리스트 */}
      {posts.map(post => (
        <div key={post.id} style={card}>
          
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <span style={status(post)}>
              {post.participants?.length >= post.max ? "마감됨" : "모집중"}
            </span>

            <div style={countBox}>
              {post.participants?.length || 0} / {post.max}
            </div>
          </div>

          <h3 style={{marginTop:10}}>
            {post.title || "제목 없음"}
          </h3>

          <p style={{color:"#888", fontSize:13}}>
            방장: -
          </p>

          <button
            style={enterBtn}
            onClick={() => router.push(`/apply/${post.id}`)}
          >
            입장하기
          </button>

        </div>
      ))}

      {/* 🔥 모달 */}
      {modalOpen && (
        <div style={overlay}>
          <div style={modal}>
            <h3>🎮 파티 생성</h3>

            <input
              placeholder="모집글 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={input}
            />

            <input
              placeholder="최대 인원"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              style={input}
            />

            <div style={{display:"flex", gap:10, marginTop:10}}>
              <button onClick={()=>setModalOpen(false)} style={cancelBtn}>
                취소
              </button>

              <button onClick={createPost} style={createBtn}>
                생성하기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* 스타일 */

const wrap = {
  padding:30,
  background:"#f3f4f6",
  minHeight:"100vh"
};

const top = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20
};

const card = {
  background:"white",
  padding:20,
  borderRadius:16,
  marginBottom:15,
  boxShadow:"0 6px 15px rgba(0,0,0,0.08)"
};

const enterBtn = {
  marginTop:10,
  width:"100%",
  padding:10,
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:10,
  cursor:"pointer",
  fontWeight:"bold"
};

const createBtn = {
  background:"#2563eb",
  color:"white",
  padding:"10px 16px",
  border:"none",
  borderRadius:10,
  cursor:"pointer",
  fontWeight:"bold"
};

const cancelBtn = {
  background:"#e5e7eb",
  padding:"10px 16px",
  border:"none",
  borderRadius:10,
  cursor:"pointer"
};

const status = (post) => ({
  background: post.participants?.length >= post.max ? "#ef4444" : "#22c55e",
  color:"white",
  padding:"4px 10px",
  borderRadius:999,
  fontSize:12
});

const countBox = {
  background:"#eef2ff",
  padding:"6px 10px",
  borderRadius:10,
  fontWeight:"bold"
};

const overlay = {
  position:"fixed",
  top:0,
  left:0,
  width:"100%",
  height:"100%",
  background:"rgba(0,0,0,0.4)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  zIndex:999
};

const modal = {
  background:"white",
  padding:20,
  borderRadius:14,
  width:350,
  display:"flex",
  flexDirection:"column",
  gap:10
};

const input = {
  padding:10,
  borderRadius:8,
  border:"1px solid #ddd"
};