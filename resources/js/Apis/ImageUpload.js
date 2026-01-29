export async function ImageUpload({ csrf }) {
 return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async (e) => {
            try {
                const file = e.target.files[0];
                if (!file) return reject("No file selected");

                const formData = new FormData();
                formData.append("image", file);

                const res = await fetch(route("posts.uploadImage"), {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": csrf,
                        Accept: "application/json",
                    },
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error("Upload failed");
                }

                const json = await res.json();

                if (!json.url) {
                    throw new Error("No image URL returned");
                }

                resolve({
                    url: json.url,
                });
            } catch (err) {
                reject(err);
            }
        };

        input.click();
    });
}