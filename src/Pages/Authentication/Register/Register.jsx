import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";   // ✅ Import SweetAlert2

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = UseAxios();
    const location = useLocation()
    const from = location.state?.from || '/'

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            // ✅ Create user in Firebase
            // eslint-disable-next-line no-unused-vars
            const result = await createUser(data.email, data.password);

            // ✅ Update user profile with name & photo
            await updateUserProfile({
                displayName: data.name,
                photoURL: data.photoURL,
            });

            // ✅ Store user in your backend
            const userRes = await axiosInstance.post("/users", {
                name: data.name,
                email: data.email,
                photoURL: data.photoURL
            });
            console.log(userRes.data);

            // ✅ SweetAlert success message
            Swal.fire({
                title: "Registration Successful 🎉",
                text: "Welcome to FitTrackerPro!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            // ✅ Redirect after short delay
            setTimeout(() => navigate(from), 1500);

        } catch (err) {
            console.error("Registration failed", err.message);

            // ✅ SweetAlert error message
            Swal.fire({
                title: "Registration Failed ❌",
                text: err.message || "Something went wrong. Try again!",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center  -200">
            <div className="card w-full max-w-md shadow-2xl  -100 p-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="input input-bordered w-full"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Photo URL */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input
                            type="url"
                            {...register("photoURL", { required: "Photo URL is required" })}
                            className="input input-bordered w-full"
                            placeholder="Enter your profile picture URL"
                        />
                        {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" }
                            })}
                            className="input input-bordered w-full"
                            placeholder="Enter a password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-full">Register</button>
                </form>

                {/* Toggle to Login */}
                <p className="text-center mt-4">
                    Already have an account?
                    <Link to="/login" className="text-primary font-semibold ml-1 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
