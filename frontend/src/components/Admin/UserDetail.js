import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './style.css'

function UserDetails() {
    const [alluser, setAllUser] = useState([]);
    const [state, setState] = useState(false);
    const token = localStorage.getItem("adminConfig");
    let header = { headers: { "Authorization": `Bearer ${token}` } }

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8080/admin/userData", header)
            .then((response) => {
                setAllUser(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [state]);

    const addUser = () => {
        navigate("/adduser");
    };

    const BlockUser = async (_id) => {
        try {
            // const config = {
            //     headers: {
            //         "Authorization": `Bearer ${token}`
            //     },
            // };

            Swal.fire({
                title: "Do you Want to block?",
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.post(
                        "http://127.0.0.1:8080/admin/blockUser",
                        {
                            _id,
                        },
                        header
                    );

                    setState(state ? false : true);
                }
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const unBlockUser = async (_id) => {
        try {
            // const config = {
            //     headers: {
            //         "Authorization": `Bearer ${token}`
            //     },
            // };
            //  setLoading(true)
            Swal.fire({
                title: "Do you Want to unblock?",
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.post(
                        "http://127.0.0.1:8080/admin/unBlockUser",
                        {
                            _id,
                        },
                        header
                    );

                    setState(state ? false : true);
                }
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    return (
        <>
            <div className="flex min-h-screen w-full bg-gray-900" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className="col-span-5 w-full">
                    <div className="overflow-auto lg:overflow-visible w-full">
                        <h1 className="text-white  justify-center text-center font-bold p-8">
                            USER Details
                        </h1>
                        <button
                            type="button"
                            className="inline-block px-6 m-5 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={addUser}
                        >
                            ADD USER
                        </button>
                        <table className=" table text-gray-400 border-separate space-y-3 text-sm w-full">
                            <thead className="bg-gray-800 text-gray-500">
                                <tr>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alluser.map((item, key) => {
                                    return (
                                        <tr key={key} className="bg-gray-800">
                                            <td className="p-3">
                                                <div className="flex align-items-center">
                                                    <div className="ml-1">
                                                        <div className="text-left">{item.name}</div>
                                                        {/* <div className="text-gray-500">mail@rgmail.com</div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3">{item.email}</td>

                                            <td className="p-3">
                                                {item.status ? (
                                                    <span className="bg-green-400 text-gray-50 rounded-md px-2">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-400 text-gray-50 rounded-md px-2">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-3">
                                                {item.status ? (
                                                    <button
                                                        className="bg-red-400 text-gray-50 rounded-md px-2 cursor-pointer"
                                                        onClick={() => {
                                                            BlockUser(item._id);
                                                        }}
                                                    >
                                                        Block
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-green-400 text-gray-50 rounded-md px-2"
                                                        onClick={() => {
                                                            unBlockUser(item._id);
                                                        }}
                                                    >
                                                        Unblock
                                                    </button>
                                                )}
                                                <button
                                                    className="bg-blue-400 text-gray-50 rounded-md px-4 ml-5 cursor-pointer"
                                                    onClick={() => { navigate('/edituser', { state: { _id: item._id } }) }}
                                                >
                                                    {" "}
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );
}

export default UserDetails;