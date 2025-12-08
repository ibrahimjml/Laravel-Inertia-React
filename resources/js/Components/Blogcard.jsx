import { Link, router, usePage } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { route } from "ziggy-js";
import Wholiked from './Who_liked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Blogcard({ post, request, type, id, auth }) {
  const authUser = auth.user;
  const { csrf ,likers} = usePage().props
  const postLikers = likers[post.id] || [];
  const MAX_LIKES = 30;

  const [loadedImages, setLoadedImages] = useState({});

  const [userLikeCount, setUserLikeCount] = useState(post.user_like ?? 0);
  const [likeTotal, setLikeTotal] = useState(post.likes_sum_count ?? 0);
  const [pendingLikes, setPendingLikes] = useState(0);
  const [showLikeEffect, setShowLikeEffect] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState("");
  const [showLikeModal, setShowLikeModal] = useState(false);
  
  const [isFollowing, setIsFollowing] = useState(post.user.is_followed ?? false);
  const [showModel, setShowModel] = useState(false);

  const debounceTimer = useRef(null);
  const animationTimeoutRef = useRef(null);

  const params = {
    ...(request.search && { search: request.search }),
    ...(request.user && { user: request.user }),
    ...(request.tag && { tag: request.tag }),
    ...(request.sort && { sort: request.sort }),
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleLike = () => {
    if (userLikeCount + pendingLikes >= MAX_LIKES){
      setShowLikeEffect(false);
      setHeartAnimation("animate-shake");
    
    clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setHeartAnimation("");
    }, 400);
    return;
    }

    setHeartAnimation("animate-pop");
    setShowLikeEffect(true);

    clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setHeartAnimation("");
      setShowLikeEffect(false);
    }, 400);

// send count likes to backend
    setPendingLikes((prev) => {
      const newCount = prev + 1;

      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        sendLikes(newCount);
      }, 1000);

      return newCount;
    });
  };

  const sendLikes = async (count) => {

    try {
      const response = await fetch("/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf,
        },
        body: JSON.stringify({ type, id, count }),
      });

      if (response.ok) {
        const data = await response.json();
         setUserLikeCount(data.userLikes);
        setLikeTotal(data.totalLikes);
      }
    } catch (err) {
      console.error("Failed to send likes", err);
    } finally {
      setPendingLikes(0);
    }
  };

  const handleUndo = async () => {

    try {
      const response = await fetch("/undo-like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf,
        },
        body: JSON.stringify({ type, id }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserLikeCount(data.userLikes);
        setLikeTotal(data.totalLikes);
      }
    } catch (error) {
      console.error("Undo failed", error);
    }
  };

  const handleFollowToggle = () => {
    router.post(route("togglefollow", post.user.id),{}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsFollowing((prev) => !prev);
        setShowModel(false);
      },
    });
  };

  const selectTag = (tag) => {
    router.get(route("home", { ...params, tag: tag.trim() }));
  };

  const selectname = (userID) => {
    router.get(route("home", { ...params, user: userID }));
  };

  const closeModal = () => setShowLikeModal(false);
  const toggleModel = () => setShowModel(!showModel);
  const toggleLikeModal = () => setShowLikeModal(!showLikeModal);
  const buttonsCount = (userLikeCount > 0 ? 1 : 0) + (authUser && authUser.id !== post.user.id ? 1 : 0);

  useEffect(() => {
    setIsFollowing(post.user.is_followed ?? false);
  }, [post.user.is_followed]);

  useEffect(() => {
    return () => {
      clearTimeout(animationTimeoutRef.current);
      clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <div className="bg-white dark:border-2 border-slate-600 dark:bg-gray-800 rounded-md shadow-lg overflow-hidden h-full flex flex-col justify-between">
      <div className="relative w-full h-48">
        {!loadedImages[post.id] && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <FontAwesomeIcon icon='spinner' spin className=" text-gray-400 text-xl"></FontAwesomeIcon>
          </div>
        )}
        <Link href={route("posts.show", post.id)}>
          <img
            className={`w-full h-48 object-cover object-center transition-opacity duration-300 ${loadedImages[post.id] ? "opacity-100" : "opacity-0"}`}
            src={post.image}
            alt={post.title}
            loading="lazy"
            onLoad={() => handleImageLoad(post.id)}
          />
        </Link>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{post.title.slice(0, 60)}...</h3>
        <p>Posted: {moment(post.created_at).fromNow()}</p>

        <span>
          <FontAwesomeIcon icon='user' className=" text-gray-600 dark:text-white"></FontAwesomeIcon>
          <button onClick={() => selectname(post.user.id)} className="font-semibold ml-2 text-green-500 dark:text-blue-500">
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
              <button key={tag.id} onClick={() => selectTag(tag.name)} className="bg-slate-600 px-2 py-px text-white text-sm rounded-full">
                {tag.name}
              </button>
            ))}
          </div>
        )}

        <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3 justify-start">
           { authUser ? (
             <button className="px-2 py-1 rounded transition-all">
              <FontAwesomeIcon onClick={handleLike}
               icon={[(userLikeCount + pendingLikes > 0) ? 'fas' : 'far', 'heart']}
               className={`mr-2 text-red-500 dark:text-red-500 ${heartAnimation}`}/>
               <span onClick={toggleLikeModal}>
                {pendingLikes > 0 ? Number(likeTotal) + Number(pendingLikes) : likeTotal}
               </span>
            </button>
          ) : (
            <Link href={route('login')} className="px-2 py-1 rounded transition-all">
              <FontAwesomeIcon icon={['far', 'heart']} className="mr-2 text-red-500 dark:text-red-500"/>
              <span>{likeTotal}</span>
            </Link>
          )}
            <span onClick={() => router.visit(route('posts.show',post.id))}
              className="cursor-pointer">
              {post.comments.length >0 && 
              <>
              <FontAwesomeIcon icon='comment' ></FontAwesomeIcon>
              <b className="ml-1">{post.comments_count}</b>
              </>
              }
            </span>
        </div>
          {showLikeEffect &&  (
            <div className="absolute -top-8 -right-2 animate-bounce">
              <div className="text-red-500 text-xl font-bold">+{ userLikeCount + pendingLikes}</div>
            </div>
          )}

          <div className="relative flex items-center">
            {buttonsCount >= 1 && (
              <button onClick={toggleModel}>
                <FontAwesomeIcon icon='ellipsis'></FontAwesomeIcon>
              </button>
            )}

            {showModel && (
              <div className={`absolute z-50 ${buttonsCount === 2 ? "top-[-120px]" : "top-[-70px]"} right-[-6px] border dark:border-slate-200 bg-slate-600 dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40`}>
                {userLikeCount > 0 && (
                  <button onClick={() => { handleUndo(); setShowModel(false); }} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">
                    Undo <small className="text-red-500">+{userLikeCount}</small> Lik{userLikeCount > 1 ? "es" : "e"}
                  </button>
                )}
                {authUser && authUser.id !== post.user.id && (
                  <button onClick={handleFollowToggle} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            )}
          </div>

          {showLikeModal && <Wholiked likers={postLikers} closeModal={closeModal} />}
        </div>
      </div>
    </div>
  );
}
