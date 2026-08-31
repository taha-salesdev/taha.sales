export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    try {
        // Vercel normally parses the body for us.
        // This also handles cases where the body arrives as a string.
        let body = req.body;

        if (typeof body === "string") {
            const params = new URLSearchParams(body);
            body = Object.fromEntries(params.entries());
        }

        body = body || {};

        const name = body.Name || "";
        const email = body.Email || "";
        const subject = body.Subject || "";
        const message = body.Message || "";
        const turnstileToken = body["cf-turnstile-response"];

        // Make sure CAPTCHA was completed
        if (
            typeof turnstileToken !== "string" ||
            turnstileToken.length === 0
        ) {
            return res.status(400).send(
                "Please complete the CAPTCHA before sending your message."
            );
        }

        // Make sure the Vercel environment variable exists
        if (!process.env.TURNSTILE_SECRET) {
            console.error("TURNSTILE_SECRET is missing.");
            return res.status(500).send(
                "Server configuration error. Please try again later."
            );
        }

        // Verify Turnstile with Cloudflare
        const verifyResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    secret: process.env.TURNSTILE_SECRET,
                    response: turnstileToken
                })
            }
        );

        const verification = await verifyResponse.json();
        console.log("Turnstile verification:", JSON.stringify(verification));

        if (!verification.success) {
            return res.status(403).send(
                "CAPTCHA verification failed. Please refresh the page and try again."
            );
        }

        // Prepare data for FormSubmit
        const formData = new URLSearchParams();

        formData.append("Name", name);
        formData.append("Email", email);
        formData.append("Subject", subject);
        formData.append("Message", message);

        formData.append("_subject", "New Portfolio Inquiry");
        formData.append("_template", "table");
        formData.append("_captcha", "false");
        formData.append(
            "_next",
            "https://tahasalesdev.vercel.app/thankyou.html"
        );

        // Forward verified submission to FormSubmit
        const formSubmitResponse = await fetch(
            "https://formsubmit.co/tahaatworknow@gmail.com",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "https://tahasalesdev.vercel.app/contact.html"
                },
                body: formData.toString()
            }
        );
        
        if (!formSubmitResponse.ok) {
            const errBody = await formSubmitResponse.text();
            console.error("FormSubmit error:", formSubmitResponse.status, errBody);
            return res.status(500).send(
                "Your message could not be sent. Please try again."
            );
        }

        // Successful submission
        return res.redirect(
            303,
            "https://tahasalesdev.vercel.app/thankyou.html"
        );

    } catch (error) {
        console.error("CONTACT FUNCTION ERROR:", error);

        return res.status(500).send(
            "Something went wrong while sending your message. Please try again later."
        );
    }
}
