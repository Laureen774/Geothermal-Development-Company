"use client";
import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg("Submitting...");
        

        const res = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        setMsg(data.success ? "Saved to Atlas!" : "Error: " + data.error);
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Test Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{ padding: '10px', width: '300px', marginRight: '10px' }}
                />
                <button type="submit">Submit</button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}