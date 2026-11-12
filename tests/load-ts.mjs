// Tests use the existing TypeScript compiler; no separate test/transpiler dependency.
import ts from 'typescript';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname, extname } from 'node:path';

export function loadTs(entry, env = {}) {
  const cache = new Map();
  function load(file) {
    file = resolve(file);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const nativeRequire = createRequire(file);
    const source = readFileSync(file, 'utf8').replace('import.meta.env', JSON.stringify(env));
    const { outputText } = ts.transpileModule(source, { compilerOptions: {
      target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    } });
    const require = id => {
      if (!id.startsWith('.') && !id.startsWith('@/')) return nativeRequire(id);
      const base = id.startsWith('@/') ? resolve('src', id.slice(2)) : resolve(dirname(file), id);
      const path = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`].find(existsSync);
      if (!path) throw new Error(`Cannot resolve ${id} from ${file}`);
      return extname(path) === '.json' ? JSON.parse(readFileSync(path, 'utf8')) : load(path);
    };
    new Function('require', 'module', 'exports', outputText)(require, module, module.exports);
    return module.exports;
  }
  return load(entry);
}
