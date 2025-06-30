const BACKEND_URL = "https://deepseek-chat-backend.onrender.com/chat";

async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    const fileInput = document.getElementById("file-input");
    const chatBox = document.getElementById("chat-box");
    const loadingIndicator = document.getElementById("loading-indicator");

    if (!userInput) {
        chatBox.innerHTML += `<p class="error">Por favor escribe un mensaje</p>`;
        return;
    }

    // Mostrar mensaje del usuario
    chatBox.innerHTML += `<p class="user-message">Tú: ${userInput}</p>`;
    
    // Mostrar indicador de carga
    loadingIndicator.style.display = "block";
    
    try {
        const formData = new FormData();
        formData.append("message", userInput);
        
        if (fileInput.files.length > 0) {
            formData.append("document", fileInput.files[0]);
            chatBox.innerHTML += `<p class="file-info">Archivo enviado: ${fileInput.files[0].name}</p>`;
        }

        const response = await fetch(BACKEND_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Error ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        chatBox.innerHTML += `<p class="ai-message">DeepSeek: ${data.response}</p>`;
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<p class="error">Error: ${error.message}</p>`;
    } finally {
        loadingIndicator.style.display = "none";
        document.getElementById("user-input").value = "";
        fileInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Manejar Enter key
document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});