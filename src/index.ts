#!/usr/bin/env node
import "dotenv/config";

/**
 * CLI entry point: run | verify | eval | approve
 * Wiring lands Saturday alongside SPEC.md. For now this just confirms the
 * scaffold executes end to end.
 */
const [, , command, ...args] = process.argv;

const commands = new Set(["run", "verify", "eval", "approve"]);

function main() {
  if (!command || !commands.has(command)) {
    console.log("usage: rekey <run|verify|eval|approve> [...args]");
    process.exitCode = command ? 1 : 0;
    return;
  }

  console.log(`[rekey] "${command}" received args=${JSON.stringify(args)}`);
  console.log(`[rekey] TARGET=${process.env.TARGET ?? "(unset, defaulting to mock)"}`);
  console.log(`[rekey] not implemented yet — see README.md and SPEC.md`);
}

main();
