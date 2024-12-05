// Wait for the page to fully load
window.addEventListener('load', function() {
    console.log("Page fully loaded");
    const headers = document.querySelectorAll("h4");
    console.log("Found headers:", headers);
    headers.forEach(header => {
        console.log("Header text:", header.textContent.trim());
        if (header.textContent.trim() === "Description") {
            const projectDescItem = header.closest('.project-desc-item');
            if (projectDescItem) {
                const button = document.createElement("button");
                button.innerText = "Learning Objectives";
                button.classList.add("btn", "btn-primary");
                projectDescItem.appendChild(button);
                console.log("Button inserted");
            }
        }
    });
});