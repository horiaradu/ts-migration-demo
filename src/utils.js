// @ts-check

/**
 * Paginates an array.
 * @param {any[]} items
 * @param {number} page
 * @param {number} pageSize
 */
function paginate(items, page, pageSize) {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}

/**
 * Formats a date as ISO string, or returns null.
 * @param {Date | null | undefined} date
 * @returns {string | null}
 */
function formatDate(date) {
    if (!date) return null;
    return date.toISOString();
}

/**
 * Strips null and undefined values from an object (shallow).
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
function compact(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v != null)
    );
}

export { paginate, formatDate, compact };
