export function formatSigned(n: number): string {
  return n >= 0 ? `+ ${n}^\\circ` : `- ${Math.abs(n)}^\\circ`;
}

export function buildEqualitySteps(
  rule: string, a: number, b: number, c: number, d: number, x: number, alpha: number, beta: number
): string[] {
  return [
    `\\text{${rule}: } \\alpha = \\beta`,
    `${a}x ${formatSigned(b)} = ${c}x + ${d}^\\circ`,
    `${a}x - ${c}x = ${d}^\\circ - ${b}^\\circ`,
    `${a - c}x = ${d - b}^\\circ \\implies x = ${x}`,
    `\\alpha = ${a} \\cdot (${x}) ${formatSigned(b)} = ${alpha}^\\circ \\implies \\beta = ${beta}^\\circ`,
    `\\text{Rta: } x = ${x}, \\quad \\alpha = ${alpha}^\\circ, \\quad \\beta = ${beta}^\\circ`
  ];
}

export function buildSumSteps(
  rule: string, a: number, b: number, c: number, d: number, total: number, x: number, alpha: number, beta: number
): string[] {
  return [
    `\\text{${rule}: } \\alpha + \\beta = ${total}^\\circ`,
    `(${a}x ${formatSigned(b)}) + (${c}x ${formatSigned(d)}) = ${total}^\\circ`,
    `${a + c}x + ${b + d}^\\circ = ${total}^\\circ`,
    `${a + c}x = ${total}^\\circ - ${b + d}^\\circ = ${total - (b + d)}^\\circ \\implies x = ${x}`,
    `\\alpha = ${alpha}^\\circ, \\quad \\beta = ${total}^\\circ - ${alpha}^\\circ = ${beta}^\\circ`,
    `\\text{Rta: } x = ${x}, \\quad \\alpha = ${alpha}^\\circ, \\quad \\beta = ${beta}^\\circ`
  ];
}
