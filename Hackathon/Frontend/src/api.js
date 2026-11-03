
const API_URL = "http://localhost:3000";

export const apiRequest = async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Server returned HTML instead of JSON:", text);

        throw new Error(
            "Backend API not found. Check your server URL and routes."
        );
    }

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Request failed");
    }

    return result;
};
