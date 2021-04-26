// BEGIN POLYFILLS
HTMLElement.prototype.appendFirst = function(childNode) {
    if (this.firstChild) {
        this.insertBefore(childNode, this.firstChild);
    } else {
        this.appendChild(childNode);
    }
};
// END POLYFILLS





const __rawContextPath = location.pathname.match(/^.*(?=(\/browse.*))/g)[0]
const CONTEXT_PATH = !!__rawContextPath.length ? "/" + __rawContextPath : "";

const pathWithoutContextPath = location.pathname.replace(CONTEXT_PATH, "");
const buildKey = pathWithoutContextPath.match(/([0-9A-Z]+-[0-9A-Z]+-[0-9A-Z]+)/g);
const jobKey = pathWithoutContextPath.match(/([0-9A-Z]+-[0-9A-Z]+-[0-9A-Z]+-[0-9A-Z]+)/g);

const notOnJobSummary = !jobKey;

const logsLink = notOnJobSummary ?
    `${location.origin}${CONTEXT_PATH}/browse/${buildKey}/log` :
    `${location.origin}${CONTEXT_PATH}/download/${buildKey}/build_logs/${jobKey}.log`;

const link = document.createElement("a");
link.href = logsLink;
link.className = "aui-button aui-button-link"
link.style.width = "100%"
link.style.textAlign = "center"
link.style.backgroundColor = "#f0f0f0";
link.innerHTML.bold();
link.innerHTML = `GIMME THE LOGS`;

const summarySection = document.getElementsByClassName("aui-page-panel-content")[0]

summarySection.appendFirst(link)
