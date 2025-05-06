const BACKEND_URL = "https://deepseek-chat-backend.onrender.com/chat"; // Usa tu URL de Render

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();
        chatBox.innerHTML += `<p><strong>DeepSeek:</strong> ${data.response}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>Error:</strong> No se pudo conectar al backend.</p>`;
    }
}