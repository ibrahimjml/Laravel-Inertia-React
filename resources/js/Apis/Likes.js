import { route } from "ziggy-js";

export async function sendLikes({ type, id, count, csrf }) {
  const res = await fetch(type === 'post' 
                    ? route('like') 
                    : route('comments.likes',id), {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf,
    },
    body: JSON.stringify({ type, id, count }),
  });

  if (!res.ok) throw new Error("Like failed");
  return res.json();
}

export async function undoLikes({ type, id, csrf }) {
  const res = await fetch(type === 'post' 
                    ? route('undo.like') 
                    : route('comments.undo',id), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf,
    },
    body: JSON.stringify({ type, id }),
  });

  if (!res.ok) throw new Error("Undo failed");
  return res.json();
}