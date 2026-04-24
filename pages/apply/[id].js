import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

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

  if (!post) return <div style={{ padding: 30 }}>불러오는 중...</div>;

  return (
    <div style={{ padding: 30 }}>
      <h1>{post.title}</h1>

      <div style={{ marginTop: 10 }}>
        참여 인원 {post.participants?.length || 0} / {post.max}
      </div>
    </div>
  );
}