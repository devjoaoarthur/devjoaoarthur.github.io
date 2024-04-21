const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Bot's conversation flow
const botQuestions = [
    "Você quer receber uma <b>proposta personalizada</b> para seu negócio?",
    "Para isso preciso de algumas informações <b>rápidas</b> 🙂",
    "Qual é o seu nome?",
    "Prazer em conhecê-lo(a), {name}!",
    "Em qual <b>e-mail</b> gostaria de receber a proposta?",
    "Poderia me informar seu telefone? (Prometo não incomodar🙏)",
    "Legal, estamos quase lá... De qual <b>empresa</b> você fala?",
    "Qual sua principal <b>necessidade</b>?",
    "Por último, qual é o <b>número de colaboradores</b> que seu empresa possui? ",
    "Obrigado, {name}! Em breve eu irei entrar em contato para apresentar a melhor proposta para sua empresa 🤝",
    "Fale comigo agora mesmo!"
];

let currentQuestionIndex = 0; // Index of the current question in the botQuestions array

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<img class="img-bot" src="/joao.jpg" alt="João Arthur"><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").innerHTML = message;
    return chatLi; // return chat <li> element
}

const generateBotResponse = () => {
    const currentQuestion = botQuestions[currentQuestionIndex];
    let response = currentQuestion;

    if (currentQuestionIndex === 2) {
        response = currentQuestion.replace("{name}", userMessage);
    }

    return response;
}

const handleBotQuestion = () => {
    const botResponse = generateBotResponse();

    setTimeout(() => {
        // Display loading animation while bot is typing
        const loadingMessage = createChatLi("", "incoming");
        loadingMessage.innerHTML = `<div class="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`;
        chatbox.appendChild(loadingMessage);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            chatbox.removeChild(loadingMessage); // Remove loading message

            // If the next question is "Quer receber uma proposta personalizada para seu negócio?",
            // display the option button
            if (currentQuestionIndex === 0) {
                const optionsMessage = createChatLi(botQuestions[currentQuestionIndex], "incoming");
                optionsMessage.style.transition = "opacity 0.5s ease";
                const option1 = document.createElement("button");
                option1.textContent = "Sim, quero receber";
                option1.classList.add("option-button");
                option1.addEventListener("click", () => handleOptionSelect("Sim, quero receber"));
                optionsMessage.querySelector("p").appendChild(option1);
                chatbox.appendChild(optionsMessage);
                chatbox.scrollTo(0, chatbox.scrollHeight);
            } else if (currentQuestionIndex === 1) {
                // Display "Para isso preciso de algumas informações rápidas 🙂"
                const botQuestion = botQuestions[currentQuestionIndex];
                const botLi = createChatLi(botQuestion, "incoming");
                chatbox.appendChild(botLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                currentQuestionIndex++; // Move to the next question
                handleBotQuestion(); // Call handleBotQuestion recursively to display the next question
            } else if (currentQuestionIndex === 3) {
                // Display "Prazer em conhecê-lo, nome do usuário"
                const pleasureMessage = createChatLi(botQuestions[currentQuestionIndex].replace("{name}", userMessage), "incoming");
                chatbox.appendChild(pleasureMessage);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                currentQuestionIndex++; // Move to the next question
                handleBotQuestion(); // Call handleBotQuestion recursively to display the next question
            } else if (currentQuestionIndex === 4) {
                // Display "Em qual e-mail gostaria de receber a proposta?"
                const botQuestion = botQuestions[currentQuestionIndex];
                const botLi = createChatLi(botQuestion, "incoming");
                chatbox.appendChild(botLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                waitingForUserInput = true; // Set flag to true to wait for user input
            } else if (currentQuestionIndex === 5) {
                // Display "Poderia me informar seu telefone?"
                const botQuestion = botQuestions[currentQuestionIndex];
                const botLi = createChatLi(botQuestion, "incoming");
                chatbox.appendChild(botLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                waitingForUserInput = true; // Set flag to true to wait for user input
                // Add event listener to format phone number as (dd) 0000-00009
                chatInput.addEventListener("keypress", maskPhoneNumber);
            } else if (currentQuestionIndex === 7) {
                // Display options for the user to choose from
                const optionsMessage = createChatLi(botQuestions[currentQuestionIndex], "incoming");
                optionsMessage.style.transition = "opacity 0.5s ease";
                const option1 = document.createElement("button");
                option1.textContent = "Melhorar o meu site";
                option1.classList.add("option-button");
                option1.addEventListener("click", () => handleOptionSelect("Melhorar o meu site"));
                const option2 = document.createElement("button");
                option2.textContent = "Criar um site";
                option2.classList.add("option-button");
                option2.addEventListener("click", () => handleOptionSelect("Criar um site"));
                const option3 = document.createElement("button");
                option3.textContent = "Outros";
                option3.classList.add("option-button");
                option3.addEventListener("click", () => handleOptionSelect("Outros"));
                optionsMessage.querySelector("p").appendChild(option1);
                optionsMessage.querySelector("p").appendChild(option2);
                optionsMessage.querySelector("p").appendChild(option3);
                chatbox.appendChild(optionsMessage);
                chatbox.scrollTo(0, chatbox.scrollHeight);
            } else if (currentQuestionIndex === 8) {
                // Display "Por último, qual é o número de colaboradores de sua empresa?"
                const optionsMessage = createChatLi(botQuestions[currentQuestionIndex], "incoming");
                optionsMessage.style.transition = "opacity 0.5s ease";
                const option1 = document.createElement("button");
                option1.textContent = "1 a 50";
                option1.classList.add("option-button");
                option1.addEventListener("click", () => handleOptionSelect("1 a 50"));
                const option2 = document.createElement("button");
                option2.textContent = "51 a 100";
                option2.classList.add("option-button");
                option2.addEventListener("click", () => handleOptionSelect("51 a 100"));
                const option3 = document.createElement("button");
                option3.textContent = "Acima de 100";
                option3.classList.add("option-button");
                option3.addEventListener("click", () => handleOptionSelect("Acima de 100"));
                const option4 = document.createElement("button");
                option4.textContent = "Não sei";
                option4.classList.add("option-button");
                option4.addEventListener("click", () => handleOptionSelect("Não sei"));
                optionsMessage.querySelector("p").appendChild(option1);
                optionsMessage.querySelector("p").appendChild(option2);
                optionsMessage.querySelector("p").appendChild(option3);
                optionsMessage.querySelector("p").appendChild(option4);
                chatbox.appendChild(optionsMessage);
                chatbox.scrollTo(0, chatbox.scrollHeight);
            } else if (currentQuestionIndex === 9) {
                // Display "Obrigado, {name}! Em breve eu irei entrar em contato para apresentar a melhor proposta para sua empresa 🤝"
                const botResponseWithName = botResponse.replace("{name}", userMessage);
                const chatLi = createChatLi(botResponseWithName, "incoming");
                chatLi.style.transition = "opacity 0.5s ease";
                chatbox.appendChild(chatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                currentQuestionIndex++; // Move to the next question
                handleBotQuestion(); // Call handleBotQuestion recursively to display the next question
            } else if (currentQuestionIndex === 10) {
                // Display "Fale comigo agora mesmo?"
                const optionsMessage = createChatLi(botQuestions[currentQuestionIndex], "incoming");
                optionsMessage.style.transition = "opacity 0.5s ease";
                const option1 = document.createElement("button");
                option1.textContent = "Falar por WhatsApp";
                option1.classList.add("option-button");
                option1.addEventListener("click", () => {
                    window.open("https://api.whatsapp.com/send?phone=SEU_NUMERO_DE_TELEFONE_AQUI&text=Ol%C3%A1!%20Gostaria%20de%20falar%20agora.", "_blank");
                });
                optionsMessage.querySelector("p").appendChild(option1);
                chatbox.appendChild(optionsMessage);
                chatbox.scrollTo(0, chatbox.scrollHeight);
            } else {
                // Display bot's question
                const botLi = createChatLi(botResponse, "incoming");
                botLi.style.transition = "opacity 0.5s ease";
                chatbox.appendChild(botLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
            }
        }, 600);
    }, 1500);
}

// Function to handle option selection
const handleOptionSelect = (option) => {
    // Append user's selected option to the chatbox
    chatbox.appendChild(createChatLi(option, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    // Remove the option buttons from the chatbox
    const optionButtons = document.querySelectorAll(".option-button");
    optionButtons.forEach(button => button.remove());
    
    currentQuestionIndex++; // Move to the next question
    handleBotQuestion(); // Call handleBotQuestion to display the next question
}

// Function to apply mask for phone number as (dd) 0000-00009
const maskPhoneNumber = (event) => {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        let input = event.target;
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        input.value = value;
        if (value.length == 15) {
            input.removeEventListener("keypress", maskPhoneNumber);
        }
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Validate email if current question is about email
    if (currentQuestionIndex === 4) {
        const email = userMessage;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const errorMessage = "Email inválido";
            chatbox.appendChild(createChatLi(errorMessage, "error"));
            chatbox.scrollTo(0, chatbox.scrollHeight);
            return;
        }
    }
    
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Move to the next bot question
    currentQuestionIndex++;
    if (currentQuestionIndex < botQuestions.length) {
        handleBotQuestion();
    } else {
        // End of conversation
        currentQuestionIndex = 0; // Reset the conversation
    }
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    if (document.body.classList.contains("show-chatbot")) {
        // Start conversation with the first bot question
        handleBotQuestion();
    } else {
        // Reset the conversation if chatbot is closed
        currentQuestionIndex = 0;
    }
});