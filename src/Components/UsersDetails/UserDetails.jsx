import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'

const UserDetails = () => {
    const loadUsers = useLoaderData()
    const [users, setUsers] = useState(loadUsers)
    const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://management-server-nu.vercel.app/users/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        const remainUser = users.filter(user => user._id !== id)
                        setUsers(remainUser)
                    })
            }
        });


    }

    return (
        <div>
            <div className="border w-full pb-5 border-black">
                <h1 className="bg-green-700 text-center border-black border-1 p-2">User Management System</h1>
                <Link to={'/signup'}><h1>Sign up</h1></Link>
                <div className="overflow-x-auto w-3/4 mx-auto mt-7 ">
                    <table className="table bg-slate-900">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((user, index) => (
                                <tr key={user._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Link to={`/users/${user._id}`}>
                                            <button className="btn btn-circle hover:bg-green-500 p-2">
                                                <img src="/public/8725908_file_edit_alt_icon.svg" alt="" />
                                            </button></Link>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-circle hover:bg-red-500 ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}





                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;