module.exports = {
  // Using fake extensions is a trick to run tasks concurrently.
  // See https://github.com/okonet/lint-staged/issues/934
  "*.{ts,type-check}": () => "bun typecheck",
  "*.{ts,lint,svelte,json,md}": (filenames) =>
    `bun lint --fix ${filenames.join(" ")}`,
};
