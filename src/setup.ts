// Side-effect import: must be imported before any module that reads env vars.
// ESM hoists all imports, but evaluates them in source order —
// so importing this first ensures env vars are set before config.js loads.
process.env.DB_PATH = ":memory:";
