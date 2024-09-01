import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const gender = form.gender.value;
        const status = form.status.value;
        



        createUser(email, password)
            .then(user => {
                console.log(user);
                console.log('log in success');
                fetch('https://management-server-nu.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password, gender, status, user })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if(data.acknowledged == true){
                            Swal.fire({
                                title: 'Welcome!',
                                text: 'Do you want to continue',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                              })
                        }
                        form.reset()
                    })
            })
            .catch(error => {
                console.log(error.massage);
            })
    }

    return (
        <div>
            <div className="border w-full  border-black pb-6">
                <h1 className="bg-green-700 text-center border-black border-1 p-2">User Management System</h1>
                <Link to={'/allusers'}><h1>All User</h1></Link>
                <div>
                    <h1 className="text-center font-medium ">New User</h1>
                    <p className="text-center text-xs ">Use the below form to create a new account</p>
                    <div className="border border-slate-300 rounded w-2/3 mx-auto mt-6 p-16">
                        <form action="" onSubmit={handleSubmit} >
                            <label className="text-gray-500 font-medium opacity-80" htmlFor="">Name</label><br />
                            <input className="border-2 border-opacity-90 border-gray-400 w-full px-2 py-1 rounded-md mb-3    " type="text" name="name" id="" placeholder="Enter your name" /><br />
                            <label className="text-gray-500 font-medium opacity-80" htmlFor="">Email</label><br />
                            <input className="border-2 border-opacity-90 border-gray-400 w-full px-2 py-1 mb-3 rounded-md" type="email" name="email" id="" placeholder="Enter your Email" />
                            <label className="text-gray-500 font-medium opacity-80" htmlFor="">Password</label><br />
                            <input className="border-2 border-opacity-90 border-gray-400 w-full px-2 py-1 mb-3 rounded-md" type="password" name="password" id="" placeholder="Type password" />

                            <label className="flex mb-3 " htmlFor=""><span className="mr-5 text-gray-500 font-medium opacity-80">Gender</span>
                                <input type="radio" name="gender" id="male" value="Male" /><span className="pr-4">Male</span>
                                <input type="radio" name="gender" id="female" value="Female" /><span>Female</span>
                            </label>
                            <label className="flex" htmlFor="">
                                <span className="mr-7 text-gray-500 font-medium opacity-80">Status</span>
                                <input type="radio" name="status" value="active" id="active" />
                                <span className="pr-4">Active</span>
                                <input type="radio" name="status" value="InActive" id="inactive" />
                                <span>Inactive</span>
                            </label>
                            <input className="btn btn-block bg-green-500 text-white mt-6" type="submit" value="Save" />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;