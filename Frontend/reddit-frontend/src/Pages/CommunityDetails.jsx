import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import PostCard from "../Components/PostCard";

import API from "../Services/Api";

function CommunityDetails() {

  const { id } = useParams();

  // STATES

  const [community, setCommunity] =
    useState(null);

  const [posts, setPosts] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  // CURRENT USER

  const username =
    localStorage.getItem(
      "username"
    );

  const email =
    localStorage.getItem(
      "email"
    );

  // FETCH COMMUNITY

  const fetchCommunity =
    async () => {

      try {

        const response =
          await API.get(
            `/community/${id}`
          );

        setCommunity(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  // FETCH POSTS

  const fetchPosts =
    async () => {

      try {

        const response =
          await API.get(
            `/post/community/${id}`
          );

        setPosts(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  // IMAGE CHANGE

  const handleImageChange =
    (e) => {

      const file =
        e.target.files[0];

      if (file) {

        setImageFile(file);

        setImagePreview(
          URL.createObjectURL(file)
        );
      }
    };

  // CREATE POST

  const handleCreatePost =
    async (e) => {

      e.preventDefault();

      try {

        let imageUrl = "";

        if (imageFile) {

          const reader =
            new FileReader();

          reader.readAsDataURL(
            imageFile
          );

          reader.onload =
            async () => {

              imageUrl =
                reader.result;

              await createPost(
                imageUrl
              );
            };

        } else {

          await createPost("");
        }

      } catch (error) {

        console.log(error);
      }
    };

  // SAVE POST

  const createPost =
    async (imageUrl) => {

      try {

        const postData = {

          title,

          content,

          authorName:
            username,

          imageUrl
        };

        const response =
          await API.post(

            `/post/create/${id}`,

            postData
          );

        // USER POSTS

        const existingPosts =
          JSON.parse(

            localStorage.getItem(
              `posts_${email}`
            )

          ) || [];

        existingPosts.push(
          response.data
        );

        localStorage.setItem(

          `posts_${email}`,

          JSON.stringify(
            existingPosts
          )
        );

        // RESET

        setTitle("");

        setContent("");

        setImageFile(null);

        setImagePreview("");

        fetchPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // UPVOTE

  const handleUpvote =
    async (postId) => {

      try {

        await API.post(
          `/post/upvote/${postId}`
        );

        fetchPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // DOWNVOTE

  const handleDownvote =
    async (postId) => {

      try {

        await API.post(
          `/post/downvote/${postId}`
        );

        fetchPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // DELETE POST

  const handleDeletePost =
    async (postId) => {

      try {

        await API.delete(
          `/post/delete/${postId}`
        );

        fetchPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // SAVE POST

  const handleSavePost =
    (postId) => {

      const savedPosts =
        JSON.parse(

          localStorage.getItem(
            `savedPosts_${email}`
          )

        ) || [];

      const postToSave =
        posts.find(
          (p) =>
            p.id === postId
        );

      const alreadySaved =
        savedPosts.some(
          (p) =>
            p.id === postId
        );

      if (!alreadySaved) {

        savedPosts.push(
          postToSave
        );

        localStorage.setItem(

          `savedPosts_${email}`,

          JSON.stringify(
            savedPosts
          )
        );

        alert(
          "Post Saved ⭐"
        );
      }
    };

  // ADD COMMENT

  const handleAddComment =
    async (
      postId,
      comment
    ) => {

      if (!comment.trim()) {

        return;
      }

      try {

        await API.post(

          `/comment/${postId}`,

          {
            message: comment,

            username:
              username
          }
        );

        fetchPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // INITIAL FETCH

  useEffect(() => {

    fetchCommunity();

    fetchPosts();

  }, [id]);

  return (

    <div className="
      bg-[#F6F7F8]
      min-h-screen
    ">

      {/* NAVBAR */}

      <Navbar />

      {/* MAIN */}

      <div className="
        flex
        gap-8
        px-8
        py-10
      ">

        {/* SIDEBAR */}

        <div className="
          w-[280px]
          shrink-0
        ">

          <Sidebar />

        </div>

        {/* CONTENT */}

        <div className="
          flex-1
          max-w-5xl
          mx-auto
        ">

          {/* COMMUNITY HEADER */}

          {community && (

            <div className="
              bg-white
              rounded-[32px]
              shadow-sm
              border
              border-gray-100
              p-8
              mb-8
            ">

              <div className="
                flex
                items-center
                gap-6
              ">

                {/* AVATAR */}

                <div className="
                  w-24
                  h-24
                  rounded-full
                  bg-orange-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-5xl
                  font-bold
                ">

                  {
                    community.name
                    ?.charAt(0)
                    ?.toUpperCase()
                  }

                </div>

                {/* INFO */}

                <div>

                  <h1 className="
                    text-4xl
                    font-bold
                    text-gray-900
                    mb-2
                  ">

                    {community.name}

                  </h1>

                  <p className="
                    text-gray-500
                    text-lg
                    mb-2
                  ">

                    Created by{" "}

                    <span className="
                      text-orange-500
                      font-semibold
                    ">

                      {
                        community.creatorName
                      }

                    </span>

                  </p>

                  <p className="
                    text-gray-700
                    text-lg
                  ">

                    {
                      community.description
                    }

                  </p>

                </div>

              </div>

            </div>

          )}

          {/* CREATE POST */}

          <div className="
            bg-white
            rounded-[32px]
            shadow-sm
            border
            border-gray-100
            p-8
            mb-8
          ">

            <h2 className="
              text-3xl
              font-bold
              mb-8
            ">

              Create Post ✍️

            </h2>

            <form
              onSubmit={
                handleCreatePost
              }
              className="
                space-y-5
              "
            >

              {/* TITLE */}

              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  text-lg
                  outline-none
                  focus:border-orange-500
                  placeholder:text-gray-400
                "
              />

              {/* CONTENT */}

              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                rows="5"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  text-lg
                  resize-none
                  outline-none
                  focus:border-orange-500
                  placeholder:text-gray-400
                "
              />

              {/* IMAGE */}

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                "
              />

              {/* PREVIEW */}

              {imagePreview && (

                <img
                  src={imagePreview}
                  alt="Preview"
                  className="
                    w-full
                    max-h-[400px]
                    object-cover
                    rounded-3xl
                    border
                    border-gray-100
                  "
                />

              )}

              {/* BUTTON */}

              <button
                type="submit"
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  text-lg
                  transition
                "
              >

                Create Post

              </button>

            </form>

          </div>

          {/* POSTS */}

          <div className="
            space-y-8
          ">

            {

              posts.length > 0 ?

              (

                posts.map(
                  (post) => (

                    <PostCard
                      key={post.id}
                      post={post}
                      onUpvote={
                        handleUpvote
                      }
                      onDownvote={
                        handleDownvote
                      }
                      onDeletePost={
                        handleDeletePost
                      }
                      onSavePost={
                        handleSavePost
                      }
                      onAddComment={
                        handleAddComment
                      }
                    />

                  )
                )

              )

              :

              (

                <div className="
                  bg-white
                  rounded-3xl
                  p-10
                  text-center
                  text-gray-500
                  text-xl
                  shadow-sm
                ">

                  No posts yet 🚀

                </div>

              )

            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default CommunityDetails;