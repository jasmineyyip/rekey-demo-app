import Database from "better-sqlite3";
import type { EffectRecord, RunRecord } from "../types.js";

/**
 * Effect ledger: the source of truth for "did this already happen."
 * Every write-side tool call checks here first, keyed on (runId, step, target).
 */
export class Ledger {
  private db: Database.Database;

  constructor(path = "rekey.db") {
    this.db = new Database(path);
    this.db.pragma("journal_mode = WAL");
    this.migrate();
  }

  private migrate() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS runs (
        run_id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        target_user_arn TEXT NOT NULL,
        state TEXT NOT NULL,
        protected INTEGER NOT NULL DEFAULT 0,
        consumers_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS effects (
        run_id TEXT NOT NULL,
        step TEXT NOT NULL,
        target TEXT NOT NULL,
        status TEXT NOT NULL,
        evidence TEXT,
        created_at TEXT NOT NULL,
        PRIMARY KEY (run_id, step, target)
      );
    `);
  }

  /** Returns the existing effect if (runId, step, target) was already attempted. */
  findEffect(runId: string, step: string, target: string): EffectRecord | undefined {
    const row = this.db
      .prepare(`SELECT * FROM effects WHERE run_id = ? AND step = ? AND target = ?`)
      .get(runId, step, target) as any;
    if (!row) return undefined;
    return {
      runId: row.run_id,
      step: row.step,
      target: row.target,
      status: row.status,
      evidence: row.evidence,
      createdAt: row.created_at,
    };
  }

  recordEffect(effect: EffectRecord): void {
    this.db
      .prepare(
        `INSERT INTO effects (run_id, step, target, status, evidence, created_at)
         VALUES (@runId, @step, @target, @status, @evidence, @createdAt)
         ON CONFLICT(run_id, step, target) DO UPDATE SET
           status = excluded.status,
           evidence = excluded.evidence`
      )
      .run({
        runId: effect.runId,
        step: effect.step,
        target: effect.target,
        status: effect.status,
        evidence: effect.evidence ?? null,
        createdAt: effect.createdAt,
      });
  }

  upsertRun(run: RunRecord): void {
    this.db
      .prepare(
        `INSERT INTO runs (run_id, provider, target_user_arn, state, protected, consumers_json, created_at, updated_at)
         VALUES (@runId, @provider, @targetUserArn, @state, @protected, @consumers, @createdAt, @updatedAt)
         ON CONFLICT(run_id) DO UPDATE SET
           state = excluded.state,
           updated_at = excluded.updated_at`
      )
      .run({
        runId: run.runId,
        provider: run.provider,
        targetUserArn: run.targetUserArn,
        state: run.state,
        protected: run.protected ? 1 : 0,
        consumers: JSON.stringify(run.consumers),
        createdAt: run.createdAt,
        updatedAt: run.updatedAt,
      });
  }

  getRun(runId: string): RunRecord | undefined {
    const row = this.db.prepare(`SELECT * FROM runs WHERE run_id = ?`).get(runId) as any;
    if (!row) return undefined;
    return {
      runId: row.run_id,
      provider: row.provider,
      targetUserArn: row.target_user_arn,
      state: row.state,
      protected: !!row.protected,
      consumers: JSON.parse(row.consumers_json),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  close(): void {
    this.db.close();
  }
}
