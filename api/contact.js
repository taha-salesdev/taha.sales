export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const {
            Name,
            Email,
            Subject,
            Message,
            "cf-turnstile-response": turnstileToken
        } = req.body;

        // Check Turnstile token
        if (!turnstileToken) {
            return res.status(400).send("Please complete the CAPTCHA.");
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
                    secret: process.env.0x4AAAAAAEi_hnjLdep_q-6XxNUi19qZYwk,
                    response: turnstileToken
                })
            }
        );

        const verification = await verifyResponse.json();

        if (!verification.success) {
            return res.status(403).send(
                "CAPTCHA verification failed. Please try again."
            );
        }

        // Send the form to FormSubmit
        const formData = new URLSearchParams();

        formData.append("Name", Name || "");
        formData.append("Email", Email || "");
        formData.append("Subject", Subject || "");
        formData.append("Message", Message || "");

        formData.append("_subject", "New Portfolio Inquiry");
        formData.append("_template", "table");
        formData.append("_captcha", "false");

        const formSubmitResponse = await fetch(
            "https://formsubmit.co/tahaatworknow@gmail.com",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            }
        );

        if (!formSubmitResponse.ok) {
            return res.status(500).send(
                "Unable to send your message. Please try again."
            );
        }

        // Redirect user after successful submission
        return res.redirect(303, "/thankyou.html");

    } catch (error) {
        console.error("Contact form error:", error);

        return res.status(500).send(
            "Something went wrong. Please try again later."
        );
    }
}
