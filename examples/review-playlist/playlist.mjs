/** Standalone playlist helpers with dependency-free contract tests. */

/** Return only tracks not yet consumed, using a zero-based playback cursor. */
export function remainingTracks(tracks, cursor) {
  if (!Number.isInteger(cursor) || cursor < 0 || cursor > tracks.length) {
    throw new RangeError("cursor must be within the block");
  }
  return tracks.slice(cursor);
}

/** Combine the on-air track and queue, keeping the first occurrence of each URI. */
export function uniqueQueue(onAir, queued) {
  const result = [];
  const seen = new Set();
  for (const track of [onAir, ...queued]) {
    if (seen.has(track.uri)) continue;
    seen.add(track.uri);
    result.push(track);
  }
  return result;
}

/** Return one full page of tracks, with a zero-based page number. */
export function pageTracks(tracks, page, pageSize) {
  if (!Number.isInteger(page) || page < 0 ||
      !Number.isInteger(pageSize) || pageSize <= 0) {
    throw new RangeError("page and pageSize must be valid integers");
  }
  const start = page * pageSize;
  return tracks.slice(start, start + pageSize);
}
