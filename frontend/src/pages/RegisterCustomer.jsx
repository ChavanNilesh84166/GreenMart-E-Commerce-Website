import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { registerCustomer } from "../services/user"

function RegisterCustomer() {
    const [firstName, SetFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [dob, setDob] = useState('')



    // get the navigation hook
    const navigate = useNavigate()


    const onCancel = () => {
        navigate('/login');
    };

    const isValidEmail = () => {
        return email.includes('@');
    };

    const onRegisterCustomer = async () => {
        if (firstName.length === 0) {
            toast.error('Hey! Enter your name');
        } else if (lastName.length === 0) {
            toast.error('Enter correct username');
        } else if (email.length === 0) {
            toast.error('Hey! Enter your email');
        } else if (!isValidEmail()) {
            toast.warning('Email is not valid');
        } else if (password.length === 0) {
            toast.error('Hey! Enter a password');
        } else if (confirmPassword.length === 0) {
            toast.error('Hey! Confirm your password');
        } else if (password !== confirmPassword) {
            toast.error('Password does not match!');
        } else if (mobileNumber.length === 0 || mobileNumber.length !== 10) {
            toast.error('Enter correct mobile number');
        } else {
            try {
                const result = await registerCustomer(firstName, lastName, email, password, dob, mobileNumber);
                toast.success('Successfully registered a new customer');
                navigate('/login');
            } catch (error) {
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div>

            <h2 className="page-header text-center">Register</h2>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="form">
                        <div className="mb-3">
                            <label htmlFor="">First Name</label>
                            <input
                                onChange={(e) => SetFirstName(e.target.value)}
                                type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Last Name</label>
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Confirm Password</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Mobile Number</label>
                            <input
                                onChange={(e) => setMobileNumber(e.target.value)}
                                type="Number" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Birthdate</label>
                            <input
                                onChange={(e) => setDob(e.target.value)}
                                type="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <div>Already have an account? <Link to='/login'>Login here</Link></div>
                            <br />
                            <br />
                            <button onClick={onRegisterCustomer} className='btn btn-success' style={{ marginRight: '15px' }}>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">REGISTER</span>
                            </button>

                            <button onClick={onCancel} className='btn btn-danger'>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">CANCEL</span>
                            </button>

                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>

        </div>
    )
}

export default RegisterCustomer