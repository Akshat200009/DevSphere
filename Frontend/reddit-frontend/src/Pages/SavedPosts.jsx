import { useEffect, useState } from "react";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import PostCard from "../Components/PostCard";

import API from "../Services/Api";

function SavedPosts() {

  const [savedPosts, setSavedPosts] =
    useState([]);

  // FETCH SAVED POSTS

  const fetchSavedPosts =
    async () => {

      try {

        const res = await API.get(
          "/post/saved"
        );

        setSavedPosts(res.data);

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

        fetchSavedPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // SAVE POST

  const handleSavePost =
    async (postId) => {

      try {

        await API.post(
          `/post/save/${postId}`
        );

        alert("Post Saved ⭐");

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

        fetchSavedPosts();

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

        fetchSavedPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // COMMENT

  const handleAddComment =
    async (
      postId,
      commentContent
    ) => {

      if (!commentContent.trim()) {

        return;
      }

      try {

        await API.post(
          `/comment/create/${postId}`,
          {
            username: "Akshat",
            text: commentContent
          }
        );

        fetchSavedPosts();

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchSavedPosts();

  }, []);

  return (

    <div className="
      bg-[#F6F7F8]
      min-h-screen
    ">

      {/* NAVBAR */}

      <Navbar />

      {/* MAIN LAYOUT */}

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

        {/* MAIN CONTENT */}

        <div className="
          flex-1
          max-w-5xl
          mx-auto
        ">

          {/* HEADER */}

          <div className="
            bg-white
            rounded-[32px]
            shadow-sm
            border
            border-gray-100
            p-8
            mb-8
          ">

            <h1 className="
              text-5xl
              font-bold
              text-gray-900
            ">

              ⭐ Saved Posts

            </h1>

            <p className="
              text-gray-500
              mt-2
              text-lg
            ">

              Your bookmarked posts

            </p>

          </div>

          {/* POSTS */}

          <div className="space-y-8">

            {savedPosts.length > 0 ? (

              savedPosts.map((item) => (

                <PostCard
                  key={item.id}
                  post={item.post}

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

              ))

            ) : (

              <div className="
                bg-white
                rounded-3xl
                p-10
                text-center
                text-gray-500
                text-xl
                shadow-sm
              ">

                No saved posts yet ⭐

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default SavedPosts;