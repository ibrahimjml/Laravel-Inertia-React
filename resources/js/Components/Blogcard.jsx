import { Link, router, usePage } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import Wholiked from './Who_liked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LikeButton from "./LikeButton";
import useLikes from "@/Hooks/useLikes";

export default function Blogcard({ post, request, auth }) {
  const authUser = auth.user;
  const { csrf , likers} = usePage().props;
  // Likes Hook
  const { userLikeCount, displayTotal, pendingLikes, showLikeEffect, heartAnimation, handleLike, handleUndo} = useLikes({
    type: "post",
    id: post.id,
    csrf,
    initialUserLikes: post.user_like ?? 0,
    initialTotalLikes: post.likes_sum_count ?? 0,
   });
   // who liked post
  const postLikers = likers[post.id] || [];

  const [loadedImages, setLoadedImages] = useState({});

  const [showLikeModal, setShowLikeModal] = useState(false);
  
  const [isFollowing, setIsFollowing] = useState(post.user.is_followed ?? false);
  const [showModel, setShowModel] = useState(false);


  const params = {
    ...(request.search && { search: request.search }),
    ...(request.user && { user: request.user }),
    ...(request.tag && { tag: request.tag }),
    ...(request.sort && { sort: request.sort }),
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
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
        <p>
          <FontAwesomeIcon icon='clock' className="mr-2 text-gray-600 dark:text-white"/>
           {moment(post.created_at).fromNow()}
        </p>


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
          <div className="flex items-center gap-3">
             <LikeButton
                 authUser = {authUser}
                 onShowLikers = {toggleLikeModal}
                 onLike = {handleLike}
                 displayTotal = {displayTotal}
                 userLikeCount = {userLikeCount}
                 pendingLikes = {pendingLikes}
                 heartAnimation = {heartAnimation}
                 showLikeEffect = {showLikeEffect}/>

              <span onClick={() => router.visit(route("posts.show", post.id))}
                    className="cursor-pointer">
                <FontAwesomeIcon icon="comment" />
                <b className="ml-1">{post.comments_count}</b>
             </span>
           </div>

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
