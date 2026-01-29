import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkdownEditor from "@/Components/MarkdownEditor";
import { ImageUpload } from "@/Apis/ImageUpload";

export default function Create({ alltags }) {
    const {csrf} = usePage().props;
    const [tagInput, setTagInput] = useState("");
    const [errorTag, setErrorTag] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        image: "",
        tags: [],
    });

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
        document.getElementById("coverImage").value = "";
    };
    // ----- TAG HANDLERS -----
    const handleTagInput = (e) => {
        const val = e.target.value;
        setTagInput(val);

        // Autocomplete suggestions
        if (val.trim() === "") {
            setSuggestions([]);
        } else {
            setSuggestions(
                alltags.filter(
                    (tag) =>
                        tag.toLowerCase().includes(val.toLowerCase()) &&
                        !data.tags.includes(tag),
                ),
            );
        }
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
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            addTag(tagInput.trim());
        }
    };
// ----- handle editor image upload  -----
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

    // ----- FORM SUBMIT -----
    const handleCreate = (e) => {
        e.preventDefault();
        post(route("posts.store"), {
            ...data,
            tags: data.tags,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Create Post" />
            <div className="max-w-5xl h-[100vh] rounded-md my-4 overflow-y-auto scrollbar-dark bg-white mx-auto space-y-6 flex flex-col">
                <h1 className="text-4xl font-bold text-black/50 text-left px-10 mb-6">
                    Create Post
                </h1>

                <form id="createForm" onSubmit={handleCreate} className="space-y-6 flex flex-col flex-grow">
                 <div className="flex-grow space-y-6">
                    {/* Cover image */}
                    <div className="flex items-center gap-2 ml-10">
                      {preview && (
                       <div className="relative w-50 max-w-md">
                           <img
                               src={preview}
                               alt="Cover preview"
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
                            className="border-2 border-black/30 rounded p-2 shadow text-black/70 hover:text-black cursor-pointer"
                        >
                            {preview ? "Change" : "Upload cover image"}
                        </label>
                        {preview && (
                         <button
                        type="button"
                        onClick={removeImage}
                        className=" bg-red-500/70 text-white border-2 p-2 shadow text-sm  rounded hover:bg-black"
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
                        placeholder="Post title goes here .."
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full px-10 text-3xl text-black/80 placeholder:text-black/60 font-bold  rounded focus:outline-none "
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title}</p>
                    )}

                    {/* TAGS */}
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Add up to 4 tags .."
                            value={tagInput}
                            onChange={handleTagInput}
                            onKeyDown={handleTagKeyDown}
                            className="w-full px-10 text-black/50 rounded focus:outline-none"
                        />
                        {suggestions.length > 0 && (
                            <div className="border rounded bg-white  shadow p-2 space-y-1 max-h-40 overflow-y-auto">
                                {suggestions.map((tag, i) => (
                                    <div
                                        key={i}
                                        className="px-10 hover:bg-gray-100 text-black cursor-pointer"
                                        onClick={() => addTag(tag)}
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
                        {errorTag && <p className="text-red-500">{errorTag}</p>}
                    </div>

                  <MarkdownEditor
                      value={data.description}
                      onChange={(val) => setData("description", val)}
                      onImageUpload={handleImageUpload}
                      error={errors.description}
                   />
                </div>
                </form>
            </div>
           {/* SUBMIT */}
            <div className="w-fit mx-auto my-4 p-3 bg-black/80 dark:bg-blue-800 text-white font-bold rounded hover:bg-gray-800">
             <button form="createForm" type="submit" disabled={processing}>
              {processing ? (
                  <FontAwesomeIcon icon="spinner" spin />
              ) : (
                  "Publish"
              )}
              </button>
            </div>
                  
        </>
    );
}
