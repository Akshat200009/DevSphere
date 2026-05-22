import {
  useEffect,
  useState
} from "react";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import PostCard from "../Components/PostCard";

import API from "../Services/Api";

function Profile() {

  const [posts, setPosts] =
    useState([]);

  const [savedPosts, setSavedPosts] =
    useState([]);

  const [communityCount,
    setCommunityCount] =
    useState(0);

  const username =
    localStorage.getItem(
      "username"
    );

  const email =
    localStorage.getItem(
      "email"
    );

  // FETCH POSTS

  const fetchPosts =
    async () => {

      try {

        const response =
          await API.get(
            "/post/all"
          );

        const userPosts =
          response.data.filter(
            (post) =>
              post.authorName ===
              username
          );

        setPosts(userPosts);

      } catch (error) {

        console.log(error);
      }
    };

  // SAVED POSTS

  const loadSavedPosts =
    () => {

      const saved =
        JSON.parse(

          localStorage.getItem(
            `savedPosts_${email}`
          )

        ) || [];

      setSavedPosts(saved);
    };

  // COMMUNITIES

  const loadCommunities =
    () => {

      const userCommunities =
        JSON.parse(

          localStorage.getItem(
            `communities_${email}`
          )

        ) || [];

      setCommunityCount(
        userCommunities.length
      );
    };

  useEffect(() => {

    fetchPosts();

    loadSavedPosts();

    loadCommunities();

  }, []);

  return (

    <div className="
      bg-[#F6F7F8]
      min-h-screen
    ">

      <Navbar />

      <div className="
        flex
        gap-8
        px-8
        py-10
      ">

        {/* SIDEBAR */}

        <div className="
          w-[280px]
        ">

          <Sidebar />

        </div>

        {/* MAIN */}

        <div className="
          flex-1
        ">

          {/* PROFILE CARD */}

          <div className="
            bg-[#FFF9F2]
            rounded-[32px]
            p-8
            shadow-sm
            border
            border-orange-100
            mb-8
          ">

            <div className="
              flex
              items-center
              gap-8
            ">

              {/* PROFILE IMAGE */}

              <div className="
                w-40
                h-40
                rounded-full
                bg-gradient-to-br
                from-orange-500
                to-pink-500
                flex
                items-center
                justify-center
                text-white
                text-6xl
                font-bold
                shrink-0
              ">

                {
                  username
                  ?.charAt(0)
                  ?.toUpperCase()
                }

              </div>

              {/* DETAILS */}

              <div>

                {/* NAME */}

                <h1 className="
                  text-5xl
                  font-bold
                  text-[#0F172A]
                  mb-2
                ">

                  {username}

                </h1>

                {/* EMAIL */}

                <p className="
                  text-2xl
                  text-gray-500
                  mb-4
                ">

                  {email}

                </p>

                {/* ROLE */}

                <div className="
                  inline-block
                  bg-orange-100
                  text-orange-600
                  px-5
                  py-2
                  rounded-full
                  font-semibold
                  text-base
                  mb-4
                ">

                  🚀 Full Stack Developer

                </div>

                {/* BIO */}

                <p className="
                  text-xl
                  text-gray-600
                ">

                  Passionate developer 🚀

                </p>

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="
            grid
            grid-cols-3
            gap-6
            mb-8
          ">

            {/* TOTAL POSTS */}

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
            ">

              <h3 className="
                text-gray-500
                text-xl
                mb-3
              ">

                Total Posts

              </h3>

              <p className="
                text-5xl
                font-bold
                text-orange-500
              ">

                {posts.length}

              </p>

            </div>

            {/* SAVED POSTS */}

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
            ">

              <h3 className="
                text-gray-500
                text-xl
                mb-3
              ">

                Saved Posts

              </h3>

              <p className="
                text-5xl
                font-bold
                text-orange-500
              ">

                {savedPosts.length}

              </p>

            </div>

            {/* COMMUNITIES */}

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
            ">

              <h3 className="
                text-gray-500
                text-xl
                mb-3
              ">

                Communities

              </h3>

              <p className="
                text-5xl
                font-bold
                text-orange-500
              ">

                {communityCount}

              </p>

            </div>

          </div>

          {/* POSTS */}

          <div className="
            bg-white
            rounded-[32px]
            p-8
            shadow-sm
          ">

            <h2 className="
              text-4xl
              font-bold
              mb-10
            ">

              Your Posts ✍️

            </h2>

            {

              posts.length > 0 ?

              (

                <div className="
                  space-y-8
                ">

                  {

                    posts.map(
                      (post) => (

                        <PostCard
                          key={post.id}
                          post={post}
                        />

                      )
                    )

                  }

                </div>

              )

              :

              (

                <div className="
                  text-center
                  py-20
                ">

                  <div className="
                    text-7xl
                    mb-4
                  ">

                    ✍️

                  </div>

                  <h3 className="
                    text-4xl
                    font-bold
                    text-gray-800
                    mb-4
                  ">

                    No Posts Yet

                  </h3>

                  <p className="
                    text-xl
                    text-gray-500
                  ">

                    Start sharing your thoughts with the community 🚀

                  </p>

                </div>

              )

            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;