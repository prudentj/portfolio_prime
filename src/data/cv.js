// Returns the CV data for a version. No name = the main (Tech Lead / EM) CV.
// A variant in cv.json overrides top-level fields and, per org hash, the first role's bullets. Facts never differ.
import base from './cv.json';

export function cvFor(name) {
  const cv = structuredClone(base);
  delete cv.variants;
  cv.path = '/';
  if (!name) return cv;
  const v = base.variants[name];
  if (!v) throw new Error(`Unknown CV variant: ${name}`);
  const { roles = {}, _note, sharedFiles, ...top } = v;
  Object.assign(cv, top);
  for (const o of cv.orgs) if (roles[o.hash]) Object.assign(o.roles[0], roles[o.hash]);
  return cv;
}

export const variantNames = Object.keys(base.variants || {});
