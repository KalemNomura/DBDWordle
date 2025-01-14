import fetch from 'node-fetch';
import path from 'path';
import { promises as fs } from 'fs';

async function fetchKillersData() {
    try {
        const response = await fetch('./killers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const killers = await response.json();
        console.log(killers);
        return killers;
    } catch (error) {
        console.error('Error fetching killers data:', error);
    }
}

fetchKillersData();