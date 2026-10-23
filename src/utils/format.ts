/**
 * Formats JavaScript/JSON values to valid Python representation for UI display.
 * Python booleans: True / False (capitalized)
 * Python None: None (capitalized)
 * Python strings, lists, dictionaries, numbers
 */

export function formatPythonValue(val: any, quoteStrings = true): string {
  if (val === null || val === undefined) {
    return 'None';
  }
  if (typeof val === 'boolean') {
    return val ? 'True' : 'False';
  }
  if (typeof val === 'number') {
    return String(val);
  }
  if (typeof val === 'string') {
    return quoteStrings ? `"${val}"` : val;
  }
  if (Array.isArray(val)) {
    return `[${val.map((item) => formatPythonValue(item, true)).join(', ')}]`;
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val).map(
      ([k, v]) => `"${k}": ${formatPythonValue(v, true)}`
    );
    return `{${entries.join(', ')}}`;
  }
  return String(val);
}

/**
 * Formats a map of variables into Python assignment statements:
 * e.g. { age: 16, has_ticket: true, is_vip: false }
 * => "age = 16, has_ticket = True, is_vip = False"
 */
export function formatVariableMap(vars?: Record<string, any>): string {
  if (!vars || typeof vars !== 'object') return '';
  return Object.entries(vars)
    .map(([k, v]) => `${k} = ${formatPythonValue(v, true)}`)
    .join(', ');
}
