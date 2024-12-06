// Wait for the page to fully load
window.addEventListener('load', function() {
    console.log("Page fully loaded");
    const currentURL = window.location.href;
    console.log("Current URL:", currentURL);

    const loginSpan = document.querySelector("span[data-login]");
    if (loginSpan) {
        const loginValue = loginSpan.dataset.login;
        console.log("Login :", loginValue.trim());
    } else {
        console.log("Can't find Login");
    }

    if (currentURL.startsWith("https://projects.intra.42.fr/projects/")) {
        const headers = document.querySelectorAll("h4");
        console.log("Found headers:", headers);
        headers.forEach(header => {
            console.log("Header text:", header.textContent.trim());
            if (header.textContent.trim() === "Description") {
                const projectDescItem = header.closest('.project-desc-item');
                if (projectDescItem) {
                    const resourceButton = document.createElement("button");
                    resourceButton.innerText = "Resources";
                    resourceButton.classList.add("btn", "btn-primary");
                    resourceButton.title = "Click to see the resources of this project";
                    projectDescItem.appendChild(resourceButton);
                    console.log("resourceButton inserted");

                    const learningButton = document.createElement("button");
                    learningButton.innerText = "Learning Objectives";
                    learningButton.classList.add("btn", "btn-primary");
                    learningButton.style.marginLeft = "2px";
                    learningButton.style.marginRight = "2px";
                    learningButton.title = "Click to see the learning objectives of this project";
                    projectDescItem.appendChild(learningButton);
                    console.log("learningButton inserted");

                    const howButton = document.createElement("button");
                    howButton.innerText = "How to learn";
                    howButton.classList.add("btn", "btn-primary");
                    howButton.title = "Click to learn how to learn";
                    projectDescItem.appendChild(howButton);
                    console.log("howButton inserted");
                }
            }
        });
    } else if ( currentURL.startsWith("https://projects.intra.42.fr") && (currentURL.endsWith("mine") || currentURL.endsWith(loginSpan.dataset.login))) {
            console.log(`My projects page ${loginSpan.dataset.login}`);
    }
});