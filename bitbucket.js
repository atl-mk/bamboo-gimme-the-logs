const buildsSummarySection = document.querySelector(`div[data-testid="expanded-BuildStatus"]`);

const addBuildLinks = () => {
    const buildLinks = buildsSummarySection.getElementsByTagName('a');

    for (let buildLink of buildLinks) {
        const isBambooLink = !!buildLink.pathname.match(/([0-9A-Z]+-[0-9A-Z]+-[0-9A-Z]+)/g);

        if (isBambooLink) {
            const linkClassName = "gimme-logs-link";
            const buildSummary = buildLink.parentNode.parentNode.parentNode;

            const __elementsOrNullWithLink = buildSummary.getElementsByClassName(linkClassName);
            const hasGimmeLogsLink = __elementsOrNullWithLink && __elementsOrNullWithLink.length > 0

            // Prevent infinite looping with appending a child to what is being observed for mutations
            if (!hasGimmeLogsLink) {
                const link = document.createElement("a");
                link.href = `${buildLink.href + '/log'}`;
                link.className = linkClassName
                link.style.marginLeft = 'auto'
                link.style.textAlign = 'center'
                link.innerHTML = `🪵 LOGS`;

                buildSummary.appendChild(link);
            }
        }
    }
};

const buildsSummaryMutationObserverConfig = { childList: true, subtree: true };
const buildsSummaryMutationObserver = new MutationObserver(addBuildLinks);
buildsSummaryMutationObserver.observe(buildsSummarySection, buildsSummaryMutationObserverConfig);
