import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'

const SignIn = () => {
    const user = useLoaderData();
    const { _id, name, email } = user
    console.log(_id);
    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const updateUser = { name, email };
        fetch(`https://management-server-nu.vercel.app/users/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'success!',
                        text: 'Update successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
                console.log(data);
            })
    }

    return (
        <div>
            <div className="border w-full h-56 border-black">
                <h1 className="bg-green-700 text-center border-black border-1 p-2">User Management System</h1>
                <div>
                    <h1 className="text-center font-medium ">Update User details</h1>
                    <p className="text-center text-xs ">Use the below form to create a new account</p>
                    <div className="border border-slate-300 rounded w-2/3 mx-auto mt-6 p-16">
                        <form action="" onSubmit={handleUpdate}  >
                            <label className="text-gray-500 font-medium opacity-80" htmlFor="">Name</label><br />
                            <input className="border-2 border-opacity-90 border-gray-400 w-full px-2 py-1 rounded-md mb-3  " defaultValue={name} type="text" name="name" id="" placeholder="Enter your name" /><br />
                            <label className="text-gray-500 font-medium opacity-80" htmlFor="">Email</label><br />
                            <input className="border-2 border-opacity-90 border-gray-400 w-full px-2 py-1 mb-3 rounded-md" type="email" defaultValue={email} name="email" id="" placeholder="Enter your Email" />
                            <input className="btn btn-block bg-green-500 text-white mt-6" type="submit" value="Update" />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;