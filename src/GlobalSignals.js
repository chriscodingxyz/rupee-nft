import { signal } from "@preact/signals-react";

export const nftObj = signal(null);
export const favs = signal(new Set());
export const currency = signal("Eth");
export const timeRange = signal("24h");
export const onlyFavs = signal(false);
export const searchInput = signal("");
export const dark = signal(false);
