
import routes from "./Router/index.js"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

let assignedCssClass = "ind"

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    
    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();

    const css = await view.getCss();
    let clss = match.route.path.split('/')[1];
    if(clss.localeCompare('')==0){clss = "ind"}

    let head = document.querySelector("head");

    if(assignedCssClass.localeCompare(clss) != 0){ 
    let previousCss = document.querySelectorAll("head ." + assignedCssClass);
        for(let i = 0; i < previousCss.length; i++){
            previousCss[i].parentElement.removeChild(previousCss[i]);
        }
    }
    assignedCssClass = clss

    if(css.length > 0){
        let relatedCss = document.querySelectorAll("head ." + clss);
        for(let i = 0; i < relatedCss.length; i++){
            relatedCss[i].parentElement.removeChild(relatedCss[i]);
        }
     
        for(let i = 0; i < css.length; i++){
           let link = document.createElement("link");
            link.setAttribute("rel","stylesheet");link.setAttribute("class", clss);link.setAttribute("type","text/css");link.setAttribute("href",css[i]);
            head.appendChild(link)
        }
    }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});