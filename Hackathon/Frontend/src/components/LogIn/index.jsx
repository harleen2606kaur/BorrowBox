import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./login.css"
import { apiRequest } from "../../api"
export const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const validate = () => {
        const newErrors = {}

        if (!email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email"
        }

        if (!password) {
            newErrors.password = "Password is required"
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
            const result = await apiRequest("/api/login", {
                email: email.trim(),
                password
            })

            const token = result.token || result.accessToken

            if (!token) {
                throw new Error("Login response does not contain a token")
            }

            localStorage.setItem("token", token)

            if (result.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                )
            }

            navigate("/dashboard")

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

            <h1>Welcome to BorrowBox!</h1>

            <div className="div">
                <form onSubmit={handleSubmit} noValidate>

                    {errors.general && (
                        <p className="error">{errors.general}</p>
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
                        placeholder="Enter your password"
                    />

                    {errors.password && (
                        <span className="error">{errors.password}</span>
                    )}

                    <button
                        className="button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                    <p>
                        Don't have an account?
                        <Link to="/signup"> Sign Up</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}
