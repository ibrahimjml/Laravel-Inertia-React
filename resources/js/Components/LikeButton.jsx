import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { route } from "ziggy-js";

export default function LikeButton({
  authUser,
  onShowLikers,
  onLike,
  displayTotal,
  userLikeCount,
  pendingLikes,
  heartAnimation,
  showLikeEffect,
}) {
  return (
    <>
        {authUser ? (
          <button className="px-2 py-1">
            <FontAwesomeIcon
              onClick={onLike}
              icon={[
                userLikeCount + pendingLikes > 0 ? "fas" : "far",
                "heart",
              ]}
              className={`text-red-500 mr-1 ${heartAnimation}`}
            />
            <span onClick={onShowLikers}>{displayTotal}</span>
          </button>
        ) : (
          <Link href={route("login")}>
            <FontAwesomeIcon icon={["far", "heart"]} className="text-red-500 mr-1" />
            {displayTotal}
          </Link>
        )}

      {showLikeEffect && (
        <div className="absolute -top-8 -right-2 animate-bounce text-red-500 font-bold">
          +{Number(userLikeCount + pendingLikes)}
        </div>
      )}
    </>
  );
}
