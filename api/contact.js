export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
    try {
        let body = req.body;
        if (typeof body === "string") {
            const params = new URLSearchParams(body);
            body = Object.fromEntries(params.entries());
        }
        body = body || {};
        const turnstileToken = body["cf-turnstile-response"];

        if (typeof turnstileToken !== "string" || turnstileToken.length === 0) {
            return res.status(400).json({ success: false, message: "Please complete the CAPTCHA before sending your message." });
        }

        if (!process.env.TURNSTILE_SECRET) {
            console.error("TURNSTILE_SECRET is missing.");
            return res.status(500).json({ success: false, message: "Server configuration error. Please try again later." });
        }

        const verifyResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    secret: process.env.TURNSTILE_SECRET,
                    response: turnstileToken
                })
            }
        );

        const verification = await verifyResponse.json();
        console.log("Turnstile verification:", JSON.stringify(verification));

        if (!verification.success) {
            return res.status(403).json({ success: false, message: "CAPTCHA verification failed. Please refresh and try again." });
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("CONTACT FUNCTION ERROR:", error);
        return res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
}
