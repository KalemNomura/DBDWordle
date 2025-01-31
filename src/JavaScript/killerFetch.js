export async function fetchKillersData() {
    try {
        const response = await fetch('/src/json/killers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const killers = await response.json();
        const killerDetails = killers.map(killer => ({
            name: killer.name,
            gender: killer.gender,
            nationality: killer.nationality,
            dlc: killer.dlc,
            difficulty: killer.difficulty,
            portrait: killerInfo.imgs.portrait
        }));
        return killerDetails;
    } catch (error) {
        console.error('Error fetching killers data:', error);
    }
}