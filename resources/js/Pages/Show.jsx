import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "@/ziggylocale";
import moment from "moment";
import Morearticles from "../Components/Morearticles";
import Postreportmodel from "../Components/Postreportmodel";
import Commentsmodel from "./Comments/Commentsmodel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLikes from "@/Hooks/useLikes";
import LikePostButton from "@/Components/Ui/LikePostButton";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useMessagesT } from "@/i18n/helpers/useMessagesT";


export default function Show({
    posts,
    canmodify,
    canreport,
    tags,
    morearticles,
    reportReasons,
}) {
    const { auth, comments, sort, csrf } = usePage().props;
    const direction = document.documentElement.dir;
    const m = useMessagesT();
    // Likes Hook
    const {
        userLikeCount,
        displayTotal,
        pendingLikes,
        showLikeEffect,
        heartAnimation,
        handleLike,
        handleUndo,
    } = useLikes({
        type: "post",
        id: posts.id,
        csrf,
        initialUserLikes: posts.user_like ?? 0,
        initialTotalLikes: posts.likes_sum_count ?? 0,
    });
    const [isFollowing, setIsFollowing] = useState(
        posts.user.is_followed ?? false,
    );
    const [showmodel, setshowmodel] = useState(false);
    const [showReportmodel, setshowReportmodel] = useState(false);
    const [showcommentmodel, setshowCommentmodel] = useState(false);
    const { delete: destroy } = useForm();

    const togglemodel = () => setshowmodel(!showmodel);

    const handleDelete = (postSlug) => {
        if (confirm("Are you sure you want to delete this post?")) {
            destroy(route("posts.destroy", { post: postSlug }), {
                preserveScroll: true,
            });
        }
    };
    const handleFollowToggle = () => {
        router.post(
            route("togglefollow", { user: posts.user.id }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsFollowing((prev) => !prev);
                    setshowmodel(false);
                },
            },
        );
    };
    const opencomment = () => {
        setshowCommentmodel(true);
    };

    return (
        <>
            <Head title={posts.title.slice(0, 5)} />
            <div className=" flex justify-center">
                <div className=" bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-[50%] dark:border-gray-700 dark:bg-gray-800">
                    <img
                        className="p-5 roubded-lg object-cover w-full rounded-t-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg"
                        src={posts.image}
                        alt={posts.title}
                    />
                    <div className="py-5 px-4 leading-normal">
                        <div className="flex items-center justify-center">
                            <h5 className="mb-2 text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                                {posts.title}
                            </h5>
                        </div>
                        <span className="flex justify-center items-center pb-3">
                            <FontAwesomeIcon
                                icon="user"
                                className=" text-gray-600 dark:text-white"
                            ></FontAwesomeIcon>
                            <button className="font-semibold ms-2 text-green-500 dark:text-blue-500">
                                {posts.user.name}
                            </button>
                            <span className="ms-2">
                                <b>·</b>
                                <small className="ms-2">
                                    <FontAwesomeIcon
                                        icon="clock"
                                        className="me-2"
                                    ></FontAwesomeIcon>
                                    {moment(posts.created_at).fromNow()}
                                </small>
                            </span>
                            {isFollowing && (
                                <span className="ml-2">
                                    <b>·</b>
                                    <small className="ml-2">Following</small>
                                </span>
                            )}
                        </span>
                    </div>
                    <div className="flex justify-between mr-3">
                        <div className="flex items-center justify-start gap-3 px-4 pb-3 ">
                            {tags &&
                                tags.map((tag) => (
                                    <button
                                        key={tag}
                                        className="bg-slate-600 px-2 py-px text-white text-sm rounded-full"
                                    >
                                        {tag}
                                    </button>
                                ))}
                        </div>
                        <div className="relative me-2">
                            <button onClick={togglemodel}>
                                <FontAwesomeIcon icon="ellipsis"></FontAwesomeIcon>
                            </button>
                            {/* show model  */}
                            {showmodel && (
                                <div
                                    className={`absolute z-50 ${!canmodify ? "top-[-100px]" : "top-[-250px]"} ${direction === "rtl" ? "left-0" : "right-6"} border dark:border-slate-200 bg-white dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40`}
                                >
                                    {canmodify && (
                                        <>
                                            <Link
                                                href={route(
                                                    "posts.edit",
                                                    { post: posts.slug },
                                                )}
                                                className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-gray-800/80 dark:text-white text-left "
                                            >
                                                {m('edit_post')}
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(posts.slug)
                                                }
                                                className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-gray-800/80 dark:text-white text-left "
                                            >
                                                {m('delete_post')}
                                            </button>
                                        </>
                                    )}
                                    {auth.user.id !== posts.user.id && (
                                        <button
                                            onClick={handleFollowToggle}
                                            className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-gray-800/80 dark:text-white text-left "
                                        >
                                            {isFollowing
                                                ? "Unfollow"
                                                : "Follow"}
                                        </button>
                                    )}
                                    {canreport && (
                                        <button
                                            onClick={() => {
                                                setshowReportmodel(
                                                    !showReportmodel,
                                                );
                                            }}
                                            className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-gray-800/80 dark:text-white text-left "
                                        >
                                            {m('report')}
                                        </button>
                                    )}
                                    {userLikeCount > 0 && (
                                        <button
                                            onClick={() => {
                                                handleUndo();
                                                setShowModel(false);
                                            }}
                                            className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-gray-800/80 dark:text-white text-left"
                                        >
                                            {m('undo')}
                                            <small className="text-red-500 ms-2">
                                                +{userLikeCount}
                                            </small>{" "}
                                            Lik{userLikeCount > 1 ? "es" : "e"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-[50%] mx-auto mt-5 prose dark:prose-invert max-w-none">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                  components={{
                            h1: ({ node, ...props }) => (
                                <h1
                                    className="text-4xl font-bold my-4"
                                    {...props}
                                />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2
                                    className="text-3xl font-bold my-3"
                                    {...props}
                                />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3
                                    className="text-2xl font-bold my-3"
                                    {...props}
                                />
                            ),
                            hr: ({ node, ...props }) => (
                                <hr
                                    className="border-t-2 border-gray-300 my-4"
                                    {...props}
                                />
                            ),
                            mark: ({ node, ...props }) => (
                                <mark
                                    className="bg-gray-300/50 dark:bg-yellow-300/50 rounded-md px-2"
                                    {...props}
                                />
                            ),
                        }}
                >
                    {posts.description}
                </ReactMarkdown>
            </div>
            {/* like|comment|share model */}
            <div className="relative container mx-auto my-10 lg:w-[30%] w-fit h-14 space-x-2 flex justify-center items-center gap-2 border-2 border-gray-200/60 dark:border-0 rounded-full px-2 sm:px-6 py-3 text-md lg:text-xl dark:bg-gray-800/80 bg-white/70">
                <LikePostButton
                    onLike={handleLike}
                    displayTotal={displayTotal}
                    userLikeCount={userLikeCount}
                    pendingLikes={pendingLikes}
                    heartAnimation={heartAnimation}
                    showLikeEffect={showLikeEffect}
                />
                <div className="h-4 w-px bg-gray-400"></div>
                <span
                    onClick={opencomment}
                    className="px-2  h-full flex items-center justify-center gap-1 cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={["far", "comment"]}
                        className=" dark:text-white mr-1"
                    ></FontAwesomeIcon>
                    {posts.comments_count > 0 && <b>{posts.comments_count}</b>}
                </span>
                <div className="h-4 w-px bg-gray-400"></div>
                <span className="px-2 h-full flex items-center justify-center gap-1 ">
                    <FontAwesomeIcon icon={faShareFromSquare} />
                </span>
            </div>

            {/* more articles */}
            {morearticles.length > 0 && (
                <>
                    <p className="dark:text-white/60 border-b-2 w-fit mx-auto text-center border-b-gray-200/60 text-lg font-semibold mt-5 capitalize">
                        More Articles
                    </p>
                    <div className="grid gap-10 mx-auto mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-5">
                        {morearticles.map((post) => (
                            <Morearticles key={post.id} post={post} />
                        ))}
                    </div>
                </>
            )}
            {/* report model */}
            {showReportmodel && (
                <Postreportmodel
                    close={() => setshowReportmodel(false)}
                    reasons={reportReasons}
                    slug={posts.slug}
                    postId={posts.id}
                />
            )}
            {/* comment model */}
            {showcommentmodel && (
                <Commentsmodel
                    count={posts.comments_count}
                    slug={posts.slug}
                    postuserId={posts.user.id}
                    comments={comments}
                    onClose={() => setshowCommentmodel(false)}
                    reasons={reportReasons}
                    type="comment"
                    sort={sort}
                />
            )}
        </>
    );
}
