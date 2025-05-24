import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Blogcard({ post, request, type, id }) {
  const userCount = post.user_like ?? 0;  
  const totalLikesCount = post.likes_sum_count ?? 0; 
  
  const [userLikeCount, setUserLikeCount] = useState(userCount);
  const [likeTotal, setLikeTotal] = useState(totalLikesCount);
  const [showmodel,setshowmodel] = useState(false);

  const togglemodel = ()=> setshowmodel(!showmodel); 

  const params = {
    ...(request.search && { search: request.search }),
    ...(request.user && { user: request.user }),
    ...(request.tag && { tag: request.tag }),
  };

const handleLike = async () => {
  if (userLikeCount >= 10) return;
 const token = document.querySelector('meta[name="csrf-token"]')?.content;
  
  try {
    const response = await fetch('/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      body: JSON.stringify({ type, id }),
    });

  if (response.ok) {
      const data = await response.json();
      setUserLikeCount(data.userLikes);
      setLikeTotal(data.totalLikes);
    }
  } catch (error) {
    console.error('Like failed', error);
  }
};

const handleUndo = async () => {
   const token = document.querySelector('meta[name="csrf-token"]')?.content;

  try {
    const response = await fetch('/undo-like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      body: JSON.stringify({ type, id }),
    });

  
     if (response.ok) {
      const data = await response.json();
      setUserLikeCount(data.userLikes);
      setLikeTotal(data.totalLikes);
    }
    
  } catch (error) {
    console.error('Undo failed', error);
  }
};
  const selectTag = (tag) => {
    router.get(route("home", { ...params, tag: tag.trim() }));
  };

  const selectname = (userID) => {
    router.get(route("home", { ...params, user: userID }));
  };

  return (
    <div className="bg-white dark:border-2 border-slate-600 dark:bg-gray-800 rounded-md shadow-lg overflow-hidden h-full flex flex-col justify-between">
      <div>
        <Link href={route("posts.show", post.id)}>
          <img
            className="w-full h-48 object-cover object-center"
            src={
              post.image ? `/images/${post.image}` : "storage/images/default.jpg"
            }
            alt=""
          />
        </Link>
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2">{post.title.slice(0, 60)}...</h3>
          <p>Posted : {moment(post.created_at).fromNow()}</p>
          <span>
            <i className="fa-solid fa-user text-gray-600 dark:text-white"></i>{" "}
            <button
              onClick={() => selectname(post.user.id)}
              className="font-semibold text-green-500 dark:text-blue-500"
            >
              {post.user.name}
            </button>
          </span>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex items-center justify-start gap-3 pb-3 mt-2">
              {post.hashtags.map((tag) => (
                <button
                  onClick={() => selectTag(tag.name)}
                  key={tag.id}
                  className="bg-slate-600 px-2 py-px text-white text-sm rounded-full"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}


        <div className="flex items-center justify-between">
        <button
        onClick={handleLike}
        disabled={userLikeCount  >= 10}
        className={`px-2 py-1  rounded ${userLikeCount  >= 10 ? "opacity-50 cursor-not-allowed" : ""}`}>
        <i className={`fa-heart mr-2 ${userLikeCount  > 0 ? "fa-solid text-red-500" : "fa-regular text-red-600 dark:text-red-800"}`}></i>
        {likeTotal}
        </button>

  {userLikeCount  > 0 && (
  <div className="relative flex items-center">
    <button onClick={togglemodel}>
      <i className="fa-solid fa-ellipsis"></i>
    </button>

    {showmodel && (
      <div  className="absolute z-50 top-[-70px] right-[-6px] border dark:border-slate-200 bg-slate-600 dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40">
        <button  onClick={(e) => { handleUndo(); setshowmodel(false); }}
          className="block w-full px-6 py-3 hover:bg-slate-700 text-left"  >
          Undo <small className="text-red-500">+{userLikeCount }</small> Likes
        </button>
      </div>
    )}
  </div>
)}
  </div>
        </div>
      </div>
    </div>
  );
}
