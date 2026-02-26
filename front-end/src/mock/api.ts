/**
 * Mock API — simulates async data fetching per client.
 *
 * Each client lives in its own folder (SRP):
 *   mock/clients/{clientId}/config.ts   → ClientConfig
 *   mock/clients/{clientId}/products.ts → Product[]
 *
 * Replace these imports with real fetch() calls to a backend without
 * changing anything in the components.
 */

import type { ClientConfig, Product } from './types';

// ── Static registry — one import per client ──────────────────────────────────
import { config as emeraldGroceryConfig } from './clients/emerald-grocery/config';
import { products as emeraldGroceryProducts } from './clients/emerald-grocery/products';

import { config as greyGroceryConfig } from './clients/grey-grocery/config';
import { products as greyGroceryProducts } from './clients/grey-grocery/products';

import { config as greenMvpConfig } from './clients/green-mvp/config';
import { products as greenMvpProducts } from './clients/green-mvp/products';

import { config as fashionBlackConfig } from './clients/fashion-black/config';
import { products as fashionBlackProducts } from './clients/fashion-black/products';

import { config as fashionGoldConfig } from './clients/fashion-gold-luxury/config';
import { products as fashionGoldProducts } from './clients/fashion-gold-luxury/products';

import { config as liquorBlackConfig } from './clients/liqour-black/config';
import { products as liquorBlackProducts } from './clients/liqour-black/products';

import { config as liquorOrangeConfig } from './clients/liquor-orange/config';
import { products as liquorOrangeProducts } from './clients/liquor-orange/products';

import { config as restaurantBlackConfig } from './clients/restaurant-black/config';
import { products as restaurantBlackProducts } from './clients/restaurant-black/products';

// ── Registry map ─────────────────────────────────────────────────────────────
const CONFIGS: Record<string, ClientConfig> = {
    'emerald-grocery': emeraldGroceryConfig,
    'grey-grocery': greyGroceryConfig,
    'green-mvp': greenMvpConfig,
    'fashion-black': fashionBlackConfig,
    'fashion-gold-luxury': fashionGoldConfig,
    'liqour-black': liquorBlackConfig,
    'liquor-orange': liquorOrangeConfig,
    'restaurant-black': restaurantBlackConfig,
};

const PRODUCTS: Record<string, Product[]> = {
    'emerald-grocery': emeraldGroceryProducts,
    'grey-grocery': greyGroceryProducts,
    'green-mvp': greenMvpProducts,
    'fashion-black': fashionBlackProducts,
    'fashion-gold-luxury': fashionGoldProducts,
    'liqour-black': liquorBlackProducts,
    'liquor-orange': liquorOrangeProducts,
    'restaurant-black': restaurantBlackProducts,
};

// ── Simulated network delay (ms) ─────────────────────────────────────────────
const DELAY = 300;

function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getClientConfig(clientId: string): Promise<ClientConfig> {
    await sleep(DELAY);
    const config = CONFIGS[clientId];
    if (!config) throw new Error(`No mock client found for id: "${clientId}"`);
    return config;
}

export async function getProducts(
    clientId: string,
    category?: string,
): Promise<Product[]> {
    await sleep(DELAY);
    const all = PRODUCTS[clientId] ?? [];
    if (!category || category.toLowerCase().includes('all')) return all;
    return all.filter(p => p.category === category);
}

/** All registered client IDs */
export const CLIENT_IDS = Object.keys(CONFIGS);
