import { writable } from "svelte/store";

export const groupStore = writable(null);
export const roundsStore = writable([]);
export const gameStore = writable(null);
export const scoreboardStore = writable([]);