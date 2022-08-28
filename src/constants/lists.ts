// used to mark unsupported tokens, these are hosted lists of unsupported tokens

export const UNSUPPORTED_LIST_URLS: string[] = [];
export const ARBITRUM_LIST = 'https://bridge.arbitrum.io/token-list-42161.json';
export const BEETHOVEN_LIST = 'https://raw.githubusercontent.com/wavelength-velas/assets/main/generated/listed.tokensinfo.json';

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
    ARBITRUM_LIST,
    BEETHOVEN_LIST,
    ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [BEETHOVEN_LIST];
