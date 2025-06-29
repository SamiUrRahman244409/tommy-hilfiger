/**
 * Compatibility shim for code that was generated with the
 * `@v0/hooks/use-cart` import path.
 *
 * It simply re-exports everything from the canonical hook at
 * `@/hooks/use-cart`.
 *
 * Keeping this tiny file around means we don't have to hunt down and
 * change every older import statement.
 */

// Compatibility shim for old @v0/hooks/use-cart imports
export * from "@/hooks/use-cart"
