document.getElementById('pickBtn').addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: "MAIN",
            func: () => {
                // 1. Reset UI
                const popups = document.querySelectorAll('.ps-popup, .popup-menu, .ps-overlay');
                popups.forEach(p => p.remove());
                document.body.classList.remove('ps-overlay-active');

                // 2. Data Gathering
                const rawTeams = localStorage.getItem('showdown_teams');
                if (!rawTeams) return alert("No teams found!");
                const teamList = rawTeams.split('\n').filter(line => line.trim() !== "");

                const formatBtn = document.querySelector('button[name="format"]');
                if (!formatBtn) return alert("Please stay on the Battle screen!");
                
                const tierId = formatBtn.value;
                const tierSuffix = tierId.replace(/gen\d+/, ""); 
                const genNum = tierId.match(/\d+/) ? tierId.match(/\d+/)[0] : "";

                const matchingIndices = [];
                teamList.forEach((t, i) => {
                    const lt = t.toLowerCase();
                    if (lt.startsWith(tierId + "]") || lt.includes("[" + tierId + "]") ||
                        (genNum && lt.includes("gen " + genNum) && lt.includes("] " + tierSuffix))) {
                        matchingIndices.push(i);
                    }
                });

                if (matchingIndices.length === 0) return alert("No teams found for " + tierId);

                // 3. Selection Logic
                const room = window.app.curSidepane || window.app.curRoom || window.app.rooms[''];
                const randomIndex = matchingIndices[Math.floor(Math.random() * matchingIndices.length)];

                if (room && typeof room.selectTeam === 'function') {
                    room.selectTeam(randomIndex);
                    if (room.update) room.update();
                } else {
                    const teamBtn = document.querySelector('button[name="team"]');
                    if (teamBtn) {
                        teamBtn.click();
                        setTimeout(() => {
                            const btn = document.querySelector(`button[value="${randomIndex}"]`);
                            if (btn) btn.click();
                        }, 100);
                    }
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
});