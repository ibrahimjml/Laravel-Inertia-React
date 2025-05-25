import { Link, router, usePage } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { route } from "ziggy-js";
import Wholiked from './Who_liked';
import { space } from "postcss/lib/list";

export default function Blogcard({ post, request, type, id ,auth}) {
  const userCount = post.user_like ?? 0;  
  const totalLikesCount = post.likes_sum_count ?? 0; 
  const authUser = auth.user;

  const [userLikeCount, setUserLikeCount] = useState(userCount);
  const [likeTotal, setLikeTotal] = useState(totalLikesCount);
  const [showmodel,setshowmodel] = useState(false);
  const [showLikeEffect, setShowLikeEffect] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState("");
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(post.user.is_followed ?? false);

  const animationTimeoutRef = useRef(null);
  const likeEffectTimeoutRef = useRef(null);

  const { likers } = usePage().props;
  const postLikers = likers[post.id] || [];

  const handleShowLikeModal  =  () => setShowLikeModal(!showLikeModal);

  const togglemodel = ()=> setshowmodel(!showmodel); 


  const params = {
    ...(request.search && { search: request.search }),
    ...(request.user && { user: request.user }),
    ...(request.tag && { tag: request.tag }),
  };

const handleLike = async () => {
  if (userLikeCount >= 10) {
    // show shake animation
    setHeartAnimation("animate-shake");
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => setHeartAnimation(""), 300);
    return;
  }
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
      setShowLikeEffect(true);

      if (likeEffectTimeoutRef.current) {
          clearTimeout(likeEffectTimeoutRef.current);
        }
        likeEffectTimeoutRef.current = setTimeout(() => {
          setShowLikeEffect(false);
          likeEffectTimeoutRef.current = null;
        }, 1000);
        // Animation
      setHeartAnimation(data.userLikes === 10 ? "animate-shake" : "animate-pop");
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = setTimeout(() => setHeartAnimation(""), 300);
    }
  } catch (error) {
    console.error('Like failed', error);
    setShowLikeEffect(false);
  }
};

useEffect(() => {
    return () => {
      if (likeEffectTimeoutRef.current) {
        clearTimeout(likeEffectTimeoutRef.current);
      }
    };
  }, []);



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

const handleFollowToggle = () => {
  router.post(route('togglefollow', post.user.id), {}, {
    preserveState: true,
    preserveScroll: true,
    onSuccess: () => {
      setIsFollowing((prev) => !prev);
      setshowmodel(false);
    },
  });
};
// sync follow state
useEffect(() => {
  setIsFollowing(post.user.is_followed ?? false);
}, [post.user.is_followed]);
// close showmodel
const closeModal = () => setShowLikeModal(false);
const buttonsCount =(userLikeCount > 0 ? 1 : 0) + (authUser && authUser.id !== post.user.id ? 1 : 0);
  return (
    <div className="bg-white dark:border-2 border-slate-600 dark:bg-gray-800 rounded-md shadow-lg overflow-hidden h-full flex flex-col justify-between">
    
        <Link href={route("posts.show", post.id)}>
          <img
            className="w-full h-48 object-cover object-center"
            src={post.image}
            alt={post.title}
          />
        </Link>
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2">{post.title.slice(0, 60)}...</h3>
          <p>Posted : {moment(post.created_at).fromNow()}</p>
          <span>
            <i className="fa-solid fa-user text-gray-600 dark:text-white"></i>
            <button
              onClick={() => selectname(post.user.id)}
              className="font-semibold ml-2 text-green-500 dark:text-blue-500"
            >
              {post.user.name}
            </button>
            {isFollowing && (
              <span className="ml-2">
              <b>·</b>
            <small className="ml-2">Following</small>
              </span>
            )}
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

  <div className="relative flex items-center justify-between">
  <button
    className="px-2 py-1 rounded transition-all">
  <i onClick={handleLike} className={`fa-heart mr-2 ${userLikeCount > 0 ? "fa-solid text-red-500" : "fa-regular text-red-500 dark:text-red-500"} ${heartAnimation}`}></i>
    <span onClick={handleShowLikeModal}>{likeTotal}</span>
    </button>
 {showLikeEffect && (
    <div className="absolute -top-8 -right-2 animate-bounce">
      <div className="text-red-500 text-xl font-bold">+{userLikeCount}</div>
        </div>
      )}
            
  
  <div className="relative flex items-center">
    {buttonsCount >=1 &&(
  <button onClick={togglemodel}>
      <i className="fa-solid fa-ellipsis"></i>
    </button>
    )}
  

    {showmodel && (
      <div  className={`absolute z-50 ${buttonsCount ===2 ? 'top-[-120px]' : 'top-[-70px]'} right-[-6px] border dark:border-slate-200 bg-slate-600 dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40`}>
        {userLikeCount >0 && (
          <button  onClick={(e) => { handleUndo(); setshowmodel(false); }}
          className="block w-full px-6 py-3 hover:bg-slate-700 text-left"  >
          Undo <small className="text-red-500">+{userLikeCount }</small> Lik{userLikeCount >1 ? 'es':'e'}
        </button>
        )}
        
        {authUser && authUser.id !== post.user.id && (
        <button
          onClick={handleFollowToggle}
          className="block w-full px-6 py-3 hover:bg-slate-700 text-left ">
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
      </div>
    )}
  </div>

    {showLikeModal && (
    <Wholiked likers={postLikers} closeModal={closeModal}/>
)}
  </div>
        </div>
    
    </div>


  );
}
