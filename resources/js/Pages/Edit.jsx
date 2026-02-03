import { Head, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkdownEditor from "@/Components/MarkdownEditor";
import { ImageUpload } from "@/Apis/ImageUpload";
import { toast } from 'react-toastify';
import { useMessagesT } from "../i18n/helpers/useMessagesT";
import { route } from "@/ziggylocale";

export default function Edit({ posts, tags,alltags }) {
    const { csrf, flash, locale } = usePage().props;
    const m = useMessagesT();
    const [tagInput, setTagInput] = useState("");
    const [errorTag, setErrorTag] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [preview, setPreview] = useState(posts.image || null);
    

    const { data, setData, post, processing, errors } = useForm({
        title: posts.title,
        description: posts.description,
        image: null,
        remove_image: false,
        tags: tags,
        _method: "PUT",
    });

    /* ---------------- IMAGE ---------------- */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setData("image", file);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setPreview(null);
        setData("image", null);
        setData("remove_image", true);
        document.getElementById("coverImage").value = "";
    };

    /* ---------------- TAGS ---------------- */

    const handleTagInput = (e) => {
        const val = e.target.value;
        setTagInput(val);

        if (!val.trim()) {
            setSuggestions([]);
            return;
        }

        setSuggestions(
            alltags.filter(
                (tag) =>
                    tag.toLowerCase().includes(val.toLowerCase()) &&
                    !data.tags.includes(tag),
            ),
        );
    };

    const addTag = (tag) => {
        if (data.tags.length >= 4) {
            setErrorTag("You hit the max limit of 4 tags.");
            return;
        }

        setData("tags", [...data.tags, tag]);
        setTagInput("");
        setSuggestions([]);
        setErrorTag("");
    };

    const removeTag = (index) => {
        setData(
            "tags",
            data.tags.filter((_, i) => i !== index),
        );
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            addTag(tagInput.trim());
        }
    };

const handleImageUpload = async () => {
    try {
        const { url } = await ImageUpload({ csrf });

        setData(
            "description",
            data.description + `\n![Image description](${url})\n`
        );
    } catch (err) {
        console.error(err);
    }
};

    const handleUpdate = (e) => {
        e.preventDefault();

        post(route("posts.update", { post: posts.slug }), {
            preserveScroll: true,
            forceFormData: true,
        });
    };
useEffect(() => {
  if (flash.status || flash.success) {
    flash.success ? toast.success(flash.success) : toast.info(flash.status)
  }
}, [flash.status]);
    return (
        <>
            <Head title={`Edit ${posts.title}`} />
              <span className="flex items-center justify-center gap-2 my-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon
              icon="info-circle"
              className="text-yellow-400 w-4 h-4"
            />
            <small>
              {m("editing_in",{lang: m(`lang.${locale}`)})}
            </small>
            </span>
            <div className="max-w-5xl h-[100vh] rounded-md my-4 overflow-y-auto scrollbar-dark bg-white mx-auto space-y-6 flex flex-col">
                <h1 className="text-4xl font-bold text-black/50 px-10">
                    Edit Post
                </h1>

                <form id="editForm" onSubmit={handleUpdate} className="space-y-6 flex flex-col flex-grow">
                    {/* COVER IMAGE */}
                    <div className="flex items-center gap-2 ml-10">
                        {preview && (
                            <div className="relative w-50 max-w-md">
                                <img
                                    src={preview}
                                    className="rounded-md border w-full h-40 object-cover"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            id="coverImage"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        <label
                            htmlFor="coverImage"
                            className="border-2 border-black/50 rounded p-2 shadow text-black/70 hover:text-black cursor-pointer"
                        >
                            {preview ? "Change" : "Upload cover image"}
                        </label>

                        {preview && (
                            <button
                                type="button"
                                onClick={removeImage}
                                className="bg-red-500/70 text-white p-2 rounded hover:bg-black"
                            >
                                Remove
                            </button>
                        )}

                        {errors.image && (
                            <p className="text-red-500">{errors.image}</p>
                        )}
                    </div>

                    {/* TITLE */}
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full px-10 text-3xl font-bold text-black/80 focus:outline-none"
                        placeholder="Post title goes here..."
                    />

                    {/* TAGS */}
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInput}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Add up to 4 tags..."
                            className="w-full px-10 text-black/50 focus:outline-none"
                        />

                        {suggestions.length > 0 && (
                            <div className="border rounded bg-white shadow p-2 max-h-40 overflow-y-auto">
                                {suggestions.map((tag, i) => (
                                    <div
                                        key={i}
                                        onClick={() => addTag(tag)}
                                        className="px-10 hover:bg-gray-100 cursor-pointer"
                                    >
                                        #{tag}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 px-10">
                            {data.tags.map((tag, i) => (
                                <div
                                    key={i}
                                    className="px-3 py-1 bg-gray-200 text-black/60 rounded-full flex items-center gap-1"
                                >
                                    #{tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(i)}
                                        className="text-red-500 font-bold"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                        {errorTag && (
                            <p className="text-red-500">{errorTag}</p>
                        )}
                    </div>

                    {/* EDITOR */}
                    <MarkdownEditor
                        value={data.description}
                        onChange={(val) =>
                            setData("description", val)
                        }
                        onImageUpload={handleImageUpload}
                        error={errors.description}
                    />

                </form>
            </div>
            <div  className="w-fit mx-auto my-4 p-3 bg-black/80 dark:bg-blue-800 text-white font-bold rounded hover:bg-gray-800">
            {/* SUBMIT */}
            <button form="editForm" type="submit"  disabled={processing}>
                {processing ? (
                    <FontAwesomeIcon icon="spinner" spin />
                ) : (
                    "Update Post"
                )}
            </button>
            </div>
        </>
    );
}
