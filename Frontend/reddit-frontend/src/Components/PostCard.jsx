import { useState } from "react";

function PostCard({
  post,
  onUpvote,
  onDownvote,
  onDeletePost,
  onSavePost,
  onAddComment
}) {

  const [comment, setComment] =
    useState("");

  return (

    <div className="
      bg-white
      rounded-[32px]
      shadow-sm
      border
      border-gray-100
      p-7
      hover:shadow-lg
      transition-all
      duration-300
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        {/* LEFT */}

        <div className="
          flex
          items-center
          gap-4
        ">

          {/* AVATAR */}

          <div className="
            w-16
            h-16
            rounded-full
            bg-gradient-to-r
            from-orange-500
            to-red-500
            text-white
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            shadow-md
          ">

            {
              post.authorName
                ?.charAt(0)
            }

          </div>

          {/* INFO */}

          <div>

            <h3 className="
              text-2xl
              font-bold
              text-gray-900
            ">

              {post.authorName}

            </h3>

            <p className="
              text-gray-500
              text-sm
            ">

              Posted in{" "}

              <span className="
                text-orange-500
                font-semibold
              ">

                {
                  post.community?.name
                }

              </span>

            </p>

          </div>

        </div>

      </div>

      {/* TITLE */}

      <h2 className="
        text-4xl
        font-bold
        text-gray-900
        mb-4
        leading-tight
      ">

        {post.title}

      </h2>

      {/* CONTENT */}

      <p className="
        text-gray-700
        text-lg
        leading-relaxed
        mb-6
      ">

        {post.content}

      </p>

      {/* IMAGE */}

      {post.imageUrl && (

        <img
          src={post.imageUrl}
          alt="Post"
          className="
            w-full
            max-h-[550px]
            object-cover
            rounded-3xl
            mb-6
            border
            border-gray-100
          "
        />

      )}

      {/* ACTIONS */}

      <div className="
        flex
        flex-wrap
        items-center
        gap-4
        mb-7
      ">

        {/* UPVOTE */}

        <button
          onClick={() =>
            onUpvote(post.id)
          }
          className="
            bg-green-100
            hover:bg-green-200
            px-5
            py-3
            rounded-full
            font-semibold
            transition
          "
        >

          ⬆️ Upvote

        </button>

        {/* DOWNVOTE */}

        <button
          onClick={() =>
            onDownvote(post.id)
          }
          className="
            bg-red-100
            hover:bg-red-200
            px-5
            py-3
            rounded-full
            font-semibold
            transition
          "
        >

          ⬇️ Downvote

        </button>

        {/* SAVE */}

        <button
          onClick={() =>
            onSavePost(post.id)
          }
          className="
            bg-yellow-100
            hover:bg-yellow-200
            px-5
            py-3
            rounded-full
            font-semibold
            transition
          "
        >

          ⭐ Save

        </button>

        {/* DELETE */}

        <button
          onClick={() =>
            onDeletePost(post.id)
          }
          className="
            bg-gray-900
            hover:bg-black
            text-white
            px-5
            py-3
            rounded-full
            font-semibold
            transition
          "
        >

          🗑 Delete

        </button>

        {/* VOTE COUNT */}

        <div className="
          bg-gray-100
          px-5
          py-3
          rounded-full
          font-bold
          text-gray-700
        ">

          🔥 {post.voteCount || 0}
          Votes

        </div>

      </div>

      {/* COMMENT INPUT */}

      <div className="
        bg-gray-50
        rounded-3xl
        p-5
        border
        border-gray-100
        mb-6
      ">

        <div className="
          flex
          gap-4
          items-center
        ">

          {/* AVATAR */}

          <div className="
            w-12
            h-12
            rounded-full
            bg-orange-500
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-lg
            shrink-0
          ">

            A

          </div>

          {/* INPUT */}

          <input
            type="text"
            placeholder="
              Share your thoughts...
            "
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            className="
              flex-1
              bg-white
              border
              border-gray-300
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-orange-500
            "
          />

          {/* BUTTON */}

          <button
            onClick={() => {

              onAddComment(
                post.id,
                comment
              );

              setComment("");
            }}
            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-7
              py-4
              rounded-2xl
              font-bold
              transition
            "
          >

            Post

          </button>

        </div>

      </div>

      {/* COMMENTS */}

      <div className="
        space-y-4
        max-h-[400px]
        overflow-y-auto
        pr-2
      ">

        {post.comments?.length > 0 ? (

          post.comments.map(
            (c, index) => (

              <div
                key={index}
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  p-5
                  shadow-sm
                "
              >

                {/* TOP */}

                <div className="
                  flex
                  items-center
                  gap-4
                  mb-3
                ">

                  {/* AVATAR */}

                  <div className="
                    w-12
                    h-12
                    rounded-full
                    bg-gradient-to-r
                    from-orange-500
                    to-red-500
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-lg
                  ">

                    {
                      c.username
                        ?.charAt(0)
                    }

                  </div>

                  {/* NAME */}

                  <div>

                    <h4 className="
                      font-bold
                      text-gray-900
                      text-lg
                    ">

                      {c.username}

                    </h4>

                    <p className="
                      text-gray-400
                      text-sm
                    ">

                      Community member

                    </p>

                  </div>

                </div>

                {/* COMMENT */}

                <p className="
                  text-gray-700
                  leading-relaxed
                  text-lg
                  pl-16
                ">

                  {c.message}

                </p>

              </div>

            )
          )

        ) : (

          <div className="
            bg-gray-50
            rounded-3xl
            p-8
            text-center
            text-gray-500
          ">

            No comments yet 🚀

          </div>

        )}

      </div>

    </div>
  );
}

export default PostCard;