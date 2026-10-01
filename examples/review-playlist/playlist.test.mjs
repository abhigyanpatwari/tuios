import assert from "node:assert/strict";
import test from "node:test";
import { remainingTracks, uniqueQueue, pageTracks } from "./playlist.mjs";

test("a replan includes each remaining block track once", () => {
  assert.deepEqual(remainingTracks(["aired", "next", "last"], 1), ["next", "last"]);
});

test("queue duplicates are identified by URI rather than title", () => {
  const onAir = { uri: "track:1", title: "same-title" };
  const duplicate = { uri: "track:1", title: "different-title" };
  const distinct = { uri: "track:2", title: "same-title" };
  assert.deepEqual(uniqueQueue(onAir, [duplicate, distinct]), [onAir, distinct]);
});

test("a complete page retains its final track", () => {
  assert.deepEqual(pageTracks(["a", "b", "c", "d"], 1, 2), ["c", "d"]);
});
