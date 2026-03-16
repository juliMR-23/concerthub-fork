import { useState, useEffect} from "react";
import { FiLogIn } from "react-icons/fi";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string | null>("");
    const [submitted, setSubmitted] = useState(false);
    function onSubmit(e: any) {
        e.preventDefault();
        setSubmitted(true);
        if (!email.trim() || !password.trim()) {
            setError("Email and password are required fields");
            return;
        }
        setError(null);
    }
    useEffect(()=>{
        if(submitted)
            window.location.href = "/"

    },[submitted])
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
                            />
                        </label>
                        <label>
                            <span>Password</span>
                            <input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </label>
                        {error && <p>{error}</p>
                        }
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                        <p>
                            Don't have an account? (" ") <Link to="/signup">Create one</Link>
                        </p>
                    </form>
                }
            </section>
        </main>
    );
}