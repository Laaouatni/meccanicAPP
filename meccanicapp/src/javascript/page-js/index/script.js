let btn = document.querySelectorAll("a");

btn.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        if (window.innerWidth < 800) {
            el.scrollIntoView({ behavior: "smooth", block: 'center' });
            console.log("entered on mobile");
        } else {
            let scrollAfterTime = setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: 'center' });
                console.log("pc, 1 second after, started scrolling");
            }, 1500);

            el.addEventListener('mouseleave', () => {
                clearTimeout(scrollAfterTime);
                console.log("leave on pc, before the 1500")
            });
        }
    });
});

let apiInfo = {
    "nameUser": "laaouatni",
    "nameRepo": "meccanicAPP",
    "htmlEl": document.getElementById("json-info-repo").querySelector("pre code")
}

let gitApiUrl = `https://api.codetabs.com/v1/loc/?github=${apiInfo.nameUser}/${apiInfo.nameRepo}`;

fetch(gitApiUrl)
    .then(response => response.json())
    .then((data) => {
        let repoLinesJson = {
            "CSS": `${data[0].linesOfCode}`,
            "HTML": `${data[1].linesOfCode}`,
            "JS": `${data[2].linesOfCode}`,
            "linesOfCodeTotal": `${data[7].linesOfCode}`
        };

        apiInfo.htmlEl.textContent = `let numOfLines = ${JSON.stringify(repoLinesJson, null, 2) ? JSON.stringify(repoLinesJson, null, 2) : "errore, riprovare a ricaricare la pagina"}`;

        hljs.highlightElement(apiInfo.htmlEl);
    })