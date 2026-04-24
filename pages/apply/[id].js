import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function ApplyDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const ref = doc(db, "applyPosts", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPost({ id: snap.id, ...snap.data() });
      }
    };

    load();
  }, [id]);

  // 🔥 삭제 기능
  const removePost = async () => {
    if (!confirm("이 파티를 삭제할까요?")) return;

    await deleteDoc(doc(db, "applyPosts", id));

    alert("삭제 완료");
    router.push("/apply");
  };

  if (!post) return <div style={{ padding: 30 }}>불러오는 중...</div>;

  return (
    <div style={wrap}>

      {/* 🔥 상단 */}
      <div style={top}>
        <h1>{post.title}</h1>

        <button style={deleteBtn} onClick={removePost}>
          🗑 삭제
        </button>
      </div>

      {/* 참여 인원 */}
      <div style={box}>
        참여 인원 {post.participants?.length || 0} / {post.max}
      </div>

      {/* 대기 인원 */}
      <div style={{ marginTop: 30 }}>
        <h3>👥 참가자</h3>

        <div style={list}>
          {(post.participants || []).map((p, i) => (
            <div key={i} style={userCard}>
              {p.name}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* 🎨 스타일 */

const wrap = {
  padding: 30,
  background: "#f3f4f6",
  minHeight: "100vh"
};

const top = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const box = {
  marginTop: 15,
  background: "white",
  padding: 15,
  borderRadius: 12,
  fontWeight: "bold"
};

const list = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 10
};

const userCard = {
  background: "white",
  padding: 10,
  borderRadius: 10,
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold"
};