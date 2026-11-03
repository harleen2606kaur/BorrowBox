import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../LogIn/login.css"
import { apiRequest } from "../../api"

export const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const validate = () => {
        const newErrors = {}

        if (!name.trim()) {
            newErrors.name = "Name is required"
        } else if (!/^[a-zA-Z ]+$/.test(name.trim())) {
            newErrors.name = "Only letters are allowed"
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must contain at least 2 characters"
        }

        if (!email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email"
        }

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 8) {
            newErrors.password = "Minimum 8 characters required"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
            newErrors.password =
                "Use uppercase, lowercase, number and special character"
        }

        if (!confirmPass) {
            newErrors.confirmPass = "Please confirm your password"
        } else if (password !== confirmPass) {
            newErrors.confirmPass = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) return

        setLoading(true)
        setErrors({})

        try {
            await apiRequest("/api/register", {
                name: name.trim(),
                email: email.trim(),
                password
            })

            alert("Account created successfully! Please log in.")

            navigate("/")

        } catch (error) {
            setErrors({ general: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="body">
            <div className="logo">
                <img src="/src/assets/logo.png" alt="BorrowBox" />
            </div>

            <h1>Create Account / Sign Up</h1>

            <div className="div">
                <form onSubmit={handleSubmit} noValidate>

                    {errors.general && (
                        <p className="error">{errors.general}</p>
                    )}

                    <label>Name:</label>
                    <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setErrors({ ...errors, name: "", general: "" })
                        }}
                        placeholder="Enter your name"
                    />

                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}

                    <label>Email:</label>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setErrors({ ...errors, email: "", general: "" })
                        }}
                        placeholder="Enter your email"
                    />

                    {errors.email && (
                        <span className="error">{errors.email}</span>
                    )}

                    <label>Password:</label>
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setErrors({ ...errors, password: "", general: "" })
                        }}
                        placeholder="Create password"
                    />

                    {errors.password && (
                        <span className="error">{errors.password}</span>
                    )}

                    <label>Confirm Password:</label>
                    <input
                        className="input"
                        type="password"
                        value={confirmPass}
                        onChange={(e) => {
                            setConfirmPass(e.target.value)
                            setErrors({ ...errors, confirmPass: "", general: "" })
                        }}
                        placeholder="Confirm password"
                    />

                    {errors.confirmPass && (
                        <span className="error">{errors.confirmPass}</span>
                    )}

                    <button
                        className="button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                </form>
            </div>
        </div>
    )
}
