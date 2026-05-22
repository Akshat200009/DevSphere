import { useNavigate } from "react-router-dom";

function CommunityCard({ community }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition p-6">

            {/* TOP */}

            <div className="flex items-center gap-4 mb-4">

                {/* AVATAR */}

                <div className="bg-orange-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">

                    {community.name?.charAt(0)}

                </div>

                {/* INFO */}

                <div>

                    <h2 className="text-2xl font-bold">

                        {community.name}

                    </h2>

                    <p className="text-gray-500">

                        Created by {community.createdBy}

                    </p>

                </div>

            </div>

            {/* DESCRIPTION */}

            <p className="text-gray-700 leading-7 mb-5">

                {community.description}

            </p>

            {/* BOTTOM */}

            <div className="flex items-center justify-between">

                <div className="text-sm text-gray-500">

                    🔥 Trending Community
                </div>

                <button
                    onClick={() =>
                        navigate(
                            `/community/${community.id}`
                        )
                    }
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-2xl transition"
                >
                    Open
                </button>

            </div>

        </div>
    );
}

export default CommunityCard;