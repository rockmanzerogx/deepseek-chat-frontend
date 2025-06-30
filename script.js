const BACKEND_URL = "https://deepseek-chat-backend.onrender.com/chat";

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const fileInput = document.getElementById("file-input");
    const chatBox = document.getElementById("chat-box");

    // Mostrar mensaje del usuario
    chatBox.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;

    try {
        const formData = new FormData();
        formData.append("message", userInput);
        
        // Si se subió un archivo, agregarlo al FormData
        if (fileInput.files.length > 0) {
            formData.append("document", fileInput.files[0]);
            chatBox.innerHTML += `<p><em>(Documento "${fileInput.files[0].name}" enviado)</em></p>`;
        }

        const response = await fetch(BACKEND_URL, {
            method: "POST",
            body: formData  // ¡No headers Content-Type para FormData!
        });

        const data = await response.json();
        
        if (data.error) {
            chatBox.innerHTML += `<p><strong>Error:</strong> ${data.error}</p>`;
        } else {
            chatBox.innerHTML += `<p><strong>DeepSeek:</strong> ${data.response}</p>`;
        }
    } catch (error) {
        chatBox.innerHTML += `<p><strong>Error:</strong> ${error.message}</p>`;
    } finally {
        // Limpiar inputs después de enviar
        document.getElementById("user-input").value = "";
        fileInput.value = "";
    }
}