import { useEffect, useRef, useState } from "react";
import { sendLikes, undoLikes } from "@/Api/Likes";

export default function useLikes({
  type,
  id,
  csrf,
  initialUserLikes = 0,
  initialTotalLikes = 0,
  maxLikes = 30,
}) {
  //  server likes
  const [userLikeCount, setUserLikeCount] = useState(Number(initialUserLikes));
  const [likeTotal, setLikeTotal] = useState(Number(initialTotalLikes));

  // optimistic
  const [pendingLikes, setPendingLikes] = useState(0);

  // ui
  const [showLikeEffect, setShowLikeEffect] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState("");

  // refs
  const debounceTimer = useRef(null);
  const animationTimer = useRef(null);
  const pendingRef = useRef(0);

  useEffect(() => {
    pendingRef.current = pendingLikes;
  }, [pendingLikes]);

  const handleLike = () => {
    if (userLikeCount + pendingRef.current >= maxLikes) {
      setShowLikeEffect(false);
      setHeartAnimation("animate-shake");
      clearTimeout(animationTimer.current);
      animationTimer.current = setTimeout(() => setHeartAnimation(""), 300);
      return;
    }

    // 🔥 instant UI
    setPendingLikes((p) => p + 1);
    setHeartAnimation("animate-pop");
    setShowLikeEffect(true);

    clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(() => {
      setHeartAnimation("");
      setShowLikeEffect(false);
    }, 300);

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(flushLikes, 2000);
  };

  const flushLikes = async () => {
    const count = pendingRef.current;
    if (count === 0) return;

    try {
      const data = await sendLikes({ type, id, count, csrf });
      setUserLikeCount(Number(data.userLikes));
      setLikeTotal(Number(data.totalLikes));
    } catch (e) {
      console.error(e);
    } finally {
      setPendingLikes(0);
    }
  };

  const handleUndo = async () => {
    try {
      const data = await undoLikes({ type, id, csrf });
      setUserLikeCount(Number(data.userLikes));
      setLikeTotal(Number(data.totalLikes));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer.current);
      clearTimeout(animationTimer.current);
    };
  }, []);

  return {
    userLikeCount,
    likeTotal,
    pendingLikes,
    displayTotal: likeTotal + pendingLikes,
    showLikeEffect,
    heartAnimation,
    handleLike,
    handleUndo,
  };
}
