function triggerRandomSelection(container) {
    console.log("Randomizer triggered for:", container);

    // 1. Identify the format currently selected in this specific window
    const formatBtn = container.querySelector('button[name="formatid"], button[name="format"]');
    if (!formatBtn) return console.error("Format button not found");
    
    const tierId = formatBtn.value;
    console.log("Current Tier ID:", tierId);

    // 2. Access teams directly from LocalStorage
    const rawTeams = localStorage.getItem('showdown_teams');
    if (!rawTeams) return alert("No teams found in your Teambuilder!");
    const teamList = rawTeams.split('\n').filter(line => line.trim() !== "");

    // 3. Filter teams to match the tier
    const tierSuffix = tierId.replace(/gen\d+/, ""); 
    const genNum = tierId.match(/\d+/) ? tierId.match(/\d+/)[0] : "";
    const matchingIndices = [];
    
    teamList.forEach((t, i) => {
        const lt = t.toLowerCase();
        if (lt.startsWith(tierId + "]") || lt.includes("[" + tierId + "]") ||
            (genNum && lt.includes("gen " + genNum) && lt.includes("] " + tierSuffix)) ||
            lt.includes("[" + tierSuffix + "]")) {
            matchingIndices.push(i);
        }
    });

    if (matchingIndices.length === 0) return alert("No teams found for " + tierId);

    // 4. Select a random team from the matching ones
    const roomId = container.closest('.ps-room')?.id || '';
    const room = window.app.rooms[roomId] || window.app.curSidepane || window.app.curRoom;

    if (room && typeof room.selectTeam === 'function') {
        const randomIndex = matchingIndices[Math.floor(Math.random() * matchingIndices.length)];
        console.log("Selecting team index:", randomIndex);
        room.selectTeam(randomIndex);
        if (room.update) room.update(); 
    } else {
        const teamBtn = container.querySelector('button[name="teamid"], button[name="team"]');
        if (teamBtn) {
            teamBtn.click();
            setTimeout(() => {
                const randomIndex = matchingIndices[Math.floor(Math.random() * matchingIndices.length)];
                const popup = document.querySelector('.ps-popup, .popup-menu');
                const targetBtn = popup?.querySelector(`button[value="${randomIndex}"]`);
                if (targetBtn) targetBtn.click();
            }, 150);
        }
    }
}

function injectRandomButton() {
    const containers = document.querySelectorAll('.mainmenu, .ps-dialog, .challenge');

    containers.forEach(container => {
        if (container.querySelector('.random-team-btn')) return;

        const teamBtn = container.querySelector('button[name="team"], button[name="teamid"]');
        if (teamBtn) {
            const btn = document.createElement('button');
            btn.className = 'button random-team-btn';
            btn.innerText = '🎲 Randomize Team';
            btn.style = 'margin: 5px 0; display: block; width: 100%; background-color: #3e61ad; color: white; border: 1px solid #222; padding: 8px; cursor: pointer; font-weight: bold; border-radius: 5px;';

            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerRandomSelection(container);
            };

            teamBtn.parentNode.insertBefore(btn, teamBtn.nextSibling);
        }
    });
}

const observer = new MutationObserver(injectRandomButton);
observer.observe(document.body, { childList: true, subtree: true });
