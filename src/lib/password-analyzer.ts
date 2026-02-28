export interface AnalysisResult {
  lengthPass: boolean;
  casePass: boolean;
  numSpecPass: boolean;
  consecutivePass: boolean;
  namePass: boolean;
  breachCount: number;
  score: number;
  loading: boolean;
}

function hasConsecutiveNumbers(password: string): boolean {
  const digits = password.replace(/[^0-9]/g, '');
  if (digits.length < 3) return false;
  
  for (let i = 0; i <= digits.length - 3; i++) {
    const a = parseInt(digits[i]);
    const b = parseInt(digits[i + 1]);
    const c = parseInt(digits[i + 2]);
    // ascending like 123, 456
    if (b === a + 1 && c === b + 1) return true;
    // descending like 321, 987
    if (b === a - 1 && c === b - 1) return true;
  }
  return false;
}

export async function checkPwnedApi(password: string): Promise<number> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha1 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    
    const prefix = sha1.slice(0, 5);
    const suffix = sha1.slice(5);
    
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) return -1;
    
    const text = await response.text();
    for (const line of text.split('\n')) {
      const [hash, count] = line.split(':');
      if (hash.trim() === suffix) return parseInt(count.trim());
    }
    return 0;
  } catch {
    return -1;
  }
}

export function analyzePassword(password: string, name: string): Omit<AnalysisResult, 'breachCount' | 'loading'> {
  const lengthPass = password.length >= 12;
  const casePass = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const numSpecPass = /\d/.test(password) && /[^a-zA-Z0-9]/.test(password);
  const consecutivePass = !hasConsecutiveNumbers(password);
  const namePass = name.length === 0 || !password.toLowerCase().includes(name.toLowerCase());

  let score = 100;
  if (!lengthPass) score -= 20;
  if (!casePass) score -= 20;
  if (!numSpecPass) score -= 20;
  if (!consecutivePass) score -= 15;
  if (!namePass) score -= 25;

  return { lengthPass, casePass, numSpecPass, consecutivePass, namePass, score };
}
