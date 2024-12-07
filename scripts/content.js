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
        const projectName = currentURL.split("/").pop();
        console.log("Project Title:", projectTitle);
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
                    const link = `https://raw.githubusercontent.com/Matsadura/42Project_Compass/refs/heads/main/learning_objectives/${projectName}.json`;
                    learningButton.onclick = () => fetchDataAndShowPanel(link);
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
            const projectName = currentURL.split("/")[3]
            console.log("Project Name:", projectName);
            const projectSummary = document.querySelector(".project-summary-item").nextElementSibling;
            console.log("Project Summary:", projectSummary);
            if (projectSummary) {
                const resourceButton = document.createElement("button");
                resourceButton.innerText = "Resources";
                resourceButton.classList.add("btn", "btn-primary");
                resourceButton.title = "Click to see the resources of this project";
                projectSummary.appendChild(resourceButton);
                console.log("resourceButton inserted");

                const learningButton = document.createElement("button");
                learningButton.innerText = "Learning Objectives";
                learningButton.classList.add("btn", "btn-primary");
                learningButton.style.marginTop = "2px";
                learningButton.style.marginBottom = "2px";
                learningButton.title = "Click to see the learning objectives of this project";
                const link = `https://raw.githubusercontent.com/Matsadura/42Project_Compass/refs/heads/main/learning_objectives/${projectName}.json`;
                learningButton.onclick = () => fetchDataAndShowPanel(link);
                projectSummary.appendChild(learningButton);
                console.log("learningButton inserted");

                const howButton = document.createElement("button");
                howButton.innerText = "How to learn";
                howButton.classList.add("btn", "btn-primary");
                howButton.title = "Click to learn how to learn";
                projectSummary.appendChild(howButton);
                console.log("howButton inserted");
            }

    }
});

function fetchDataAndShowPanel(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            showPanel(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showPanel(data) {
    // Create the dimmed background
    const dimmedBackground = document.createElement('div');
    dimmedBackground.style.position = 'fixed';
    dimmedBackground.style.top = '0';
    dimmedBackground.style.left = '0';
    dimmedBackground.style.width = '100%';
    dimmedBackground.style.height = '100%';
    dimmedBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    dimmedBackground.style.zIndex = '9998';
    dimmedBackground.onclick = () => {
        document.body.removeChild(dimmedBackground);
        document.body.removeChild(panel);
    };

    // Create the panel
    const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '50%';
    panel.style.left = '50%';
    panel.style.transform = 'translate(-50%, -50%)';
    panel.style.width = '50%';
    panel.style.maxHeight = '80%';
    panel.style.overflowY = 'auto';
    panel.style.backgroundColor = 'white';
    panel.style.padding = '20px';
    panel.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    panel.style.zIndex = '9999';

    // Add content to the panel
    const contentElement = document.createElement('div');
    contentElement.innerHTML = formatJSON(data);
    panel.appendChild(contentElement);

    // Append the dimmed background and panel to the body
    document.body.appendChild(dimmedBackground);
    document.body.appendChild(panel);
}

function formatJSON(data) {
    function createList(obj) {
        let html = '<ul>';
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                html += `<li>`;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    html += createList(obj[key]);
                } else {
                    html += `<strong>${obj[key]}</strong>`;
                }
                html += '</li>';
            }
        }
        html += '</ul>';
        return html;
    }
    return createList(data);
}