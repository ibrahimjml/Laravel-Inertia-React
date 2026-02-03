import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LikePostButton({
  ShowLikers,
  onLike,
  displayTotal,
  userLikeCount,
  pendingLikes,
  heartAnimation,
  showLikeEffect,
}) {
  return (
    <>
      <button className="px-2 py-1 rounded transition-all">
            <FontAwesomeIcon onClick={onLike}
               icon={[(userLikeCount + pendingLikes > 0) ? 'fas' : 'far', 'heart']}
               className={`me-2 text-red-500 dark:text-red-500 ${heartAnimation}`}/>

          <span onClick={ShowLikers}>
               {displayTotal}
          </span>
      </button>
        
      {showLikeEffect &&  (
          <div className={`absolute -top-8 ${route().current('posts.show') ? 'left-16' : '-right-2'} animate-bounce`}>
              <div className="text-red-500 text-xl font-bold">+{ Number(userLikeCount + pendingLikes)}</div>
          </div>
        )}
    </>
  )
}
