import React, { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>("");
    function onSubmit(e: FormDataEvent) {
        e.preventDefault();
        setSubmitted(true);
        if (!email.trim() || !password.trim() || !confirmPass.trim()) {
            setError("Email and password are required fields");
            return;
        }
        if (password !== confirmPass) {
            setError("Passwords don't match");
            return;
        }
        setSubmitted(true);
        setError(null);
    }
    useEffect(() => {
        if (submitted)
            window.location.href = "/"
    }, [submitted])
    return (
        <main className="mx-auto max-w-md px-6 py-10">
            <section>
                <div>
                    <FiLogIn />
                    <h1>Log in</h1>
                </div>
                <p>
                    Welcome to Concert Hub
                </p>
                {!submitted &&

                    <form>
                        <label>
                            <span>Email</span>
                            <input
                                type="email"
                                placeholder="aaaa@email.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <span>Password</span>
                            <input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                            required
                        </label>
                        {error && <p>{error}</p>}
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                        <p>
                            Already have an account?(" ") <Link to="/login">Log in</Link>
                        </p>
                    </form>
                }
            </section>
        </main>
    );

}