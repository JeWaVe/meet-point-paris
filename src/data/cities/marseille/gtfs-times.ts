// Placeholder — will be generated from GTFS RTM data
// Run: node scripts/extract-gtfs.mjs marseille && node scripts/build-gtfs-data.mjs marseille

export const gtfsSegmentTimes: Record<string, number> = {};

export const gtfsHeadways: Record<string, { peak: number | null; offpeak: number | null; evening: number | null }> = {};

export const gtfsTransferTimes: Record<string, number> = {};
