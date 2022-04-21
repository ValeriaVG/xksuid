/**
 * Encodes buffer to base62
 * @param {DataView} view
 */
export function base62(view: DataView): string;

/**
 * Decodes base62 string to buffer
 * @param str
 * @returns buffer
 */
export function debase62(str: string): Uint8Array;

/**
 * Converts UNIX timestamp to (x)KSUID epoch timestamp
 * @param timestamp ms
 * @param desc order, `true` indicates xKSUID
 * @returns seconds
 */
export function toEpoch(timestamp: number, desc?: boolean): number;

/**
 * Generates cryptographically strong random buffer
 * @returns 16 bytes of random binary values
 */
export function randomBytes(): Uint8Array;

/**
 * Generates new (x)KSUID based on current timestamp
 * @param desc
 * @param timestamp ms
 * @returns 27 chars KSUID or 28 chars for xKSUID
 */
export function generate(desc: boolean, timestamp: number): string;

/**
 * Parses (x)KSUID string to timestamp and random part
 * @param ksuid
 * @return parsed value
 */
export function parse(ksuid: string): { ts: Date; rnd: Uint8Array };
