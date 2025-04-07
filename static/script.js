async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const message = input.value.trim();

    if (!message) return;

    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);

    const loadingMsg = document.createElement("div");
    loadingMsg.classList.add("message", "bot");
    loadingMsg.textContent = "Thinking about your investment...";
    chatBox.appendChild(loadingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/get_advice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        loadingMsg.textContent = data.advice || data.error || "No response.";
    } catch (error) {
        loadingMsg.textContent = "Error connecting to the server.";
    }

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("chatForm").addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage();
});

document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});