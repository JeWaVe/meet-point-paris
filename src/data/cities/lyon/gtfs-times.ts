/**
 * Inter-station travel times in minutes (placeholder - will be populated via GTFS pipeline).
 * Key format: "stationA|stationB" -> time in minutes.
 */
export const gtfsSegmentTimes: Record<string, number> = {};

/**
 * Per-line average headway in minutes (placeholder - will be populated via GTFS pipeline).
 */
export const gtfsHeadways: Record<string, { peak: number | null; offpeak: number | null; evening: number | null }> = {};

/**
 * Transfer times between stations of different lines (placeholder).
 */
export const gtfsTransferTimes: Record<string, number> = {};
