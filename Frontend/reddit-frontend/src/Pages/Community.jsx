import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

import API from "../Services/Api";

function Community() {

  const [communities, setCommunities] =
    useState([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [creatorName, setCreatorName] =
    useState("");

  // SEARCH STATE

  const [searchTerm, setSearchTerm] =
    useState("");

  // FETCH COMMUNITIES

  const fetchCommunities =
    async () => {

      try {

        const res = await API.get(
          "/community/all"
        );

        setCommunities(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  // CREATE COMMUNITY

  const handleCreateCommunity =
    async (e) => {

      e.preventDefault();

      try {

        const communityData = {

          name,
          description,
          creatorName
        };

        await API.post(
          "/community/create",
          communityData
        );

        fetchCommunities();

        setName("");
        setDescription("");
        setCreatorName("");

      } catch (error) {

        console.log(error);
      }
    };

  // FILTERED COMMUNITIES

  const filteredCommunities =
    communities.filter((community) =>
      community.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  useEffect(() => {

    fetchCommunities();

  }, []);

  return (

    <div className="
      bg-[#F6F7F8]
      min-h-screen
    ">

      {/* NAVBAR */}

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
      />

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

          {/* PAGE HEADER */}

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
              mb-3
            ">

              🌍 Communities

            </h1>

            <p className="
              text-gray-500
              text-lg
            ">

              Discover and join amazing
              communities

            </p>

          </div>

          {/* CREATE COMMUNITY */}

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
              text-4xl
              font-bold
              mb-7
            ">

              Create Community 🚀

            </h2>

            <form
              onSubmit={
                handleCreateCommunity
              }
              className="space-y-5"
            >

              {/* NAME */}

              <input
                type="text"
                placeholder="Community Name"
                value={name}
                onChange={(e) =>
                  setName(
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
                "
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows="4"
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
                "
              />

              {/* CREATOR */}

              <input
                type="text"
                placeholder="Creator Name"
                value={creatorName}
                onChange={(e) =>
                  setCreatorName(
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
                "
              />

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

                Create Community

              </button>

            </form>

          </div>

          {/* COMMUNITY GRID */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
          ">

            {filteredCommunities.length > 0 ? (

              filteredCommunities.map(
                (community) => (

                  <Link
                    to={`/community/${community.id}`}
                    key={community.id}
                  >

                    <div className="
                      bg-white
                      rounded-[32px]
                      shadow-sm
                      border
                      border-gray-100
                      p-8
                      hover:shadow-xl
                      hover:-translate-y-2
                      hover:scale-[1.02]
                      transition-all
                      duration-300
                      cursor-pointer
                    ">

                      {/* TOP */}

                      <div className="
                        flex
                        items-center
                        gap-5
                        mb-5
                      ">

                        <div className="
                          w-20
                          h-20
                          rounded-full
                          bg-orange-500
                          text-white
                          flex
                          items-center
                          justify-center
                          text-4xl
                          font-bold
                        ">

                          {community.name?.charAt(0)}

                        </div>

                        <div>

                          <h2 className="
                            text-3xl
                            font-bold
                            text-gray-900
                          ">

                            {community.name}

                          </h2>

                          <p className="
                            text-gray-500
                            mt-1
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

                        </div>

                      </div>

                      {/* DESCRIPTION */}

                      <p className="
                        text-gray-700
                        text-lg
                        leading-relaxed
                      ">

                        {
                          community.description
                        }

                      </p>

                    </div>

                  </Link>

                )
              )

            ) : (

              <div className="
                bg-white
                rounded-3xl
                p-10
                text-center
                text-gray-500
                text-xl
                shadow-sm
                col-span-2
              ">

                No communities found 🚀

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Community;