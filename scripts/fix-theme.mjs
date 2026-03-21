import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const PATTERNS_DIR = 'src/patterns';

// Class replacements: remove Tailwind class, add style prop if needed
const CLASS_REMOVALS = [
  // Background removals
  [/\bbg-white\b/g, ''],
  [/\bshadow-lg\b/g, ''],
  [/\bshadow-md\b/g, ''],

  // Text gray → remove (we'll add style props separately)
  [/\btext-gray-900\b/g, ''],
  [/\btext-gray-800\b/g, ''],
  [/\btext-gray-700\b/g, ''],
  [/\btext-gray-600\b/g, ''],
  [/\btext-gray-500\b/g, ''],
  [/\btext-gray-400\b/g, ''],
  [/\btext-gray-300\b/g, ''],

  // Border gray
  [/\bborder-gray-200\b/g, ''],
  [/\bborder-gray-300\b/g, ''],
  [/\bborder-gray-100\b/g, ''],

  // Background gray
  [/\bbg-gray-50\b/g, ''],
  [/\bbg-gray-100\b/g, ''],
  [/\bbg-gray-200\b/g, ''],

  // Red variants
  [/\btext-red-900\b/g, ''],
  [/\btext-red-800\b/g, ''],
  [/\btext-red-700\b/g, ''],
  [/\btext-red-600\b/g, ''],
  [/\btext-red-500\b/g, ''],
  [/\btext-red-400\b/g, ''],
  [/\bbg-red-50\b/g, ''],
  [/\bbg-red-100\b/g, ''],
  [/\bbg-red-200\b/g, ''],
  [/\bbg-red-600\b/g, ''],
  [/\bborder-red-200\b/g, ''],
  [/\bborder-red-300\b/g, ''],
  [/\bborder-red-500\b/g, ''],

  // Green variants
  [/\btext-green-900\b/g, ''],
  [/\btext-green-800\b/g, ''],
  [/\btext-green-700\b/g, ''],
  [/\btext-green-600\b/g, ''],
  [/\btext-green-500\b/g, ''],
  [/\btext-green-400\b/g, ''],
  [/\bbg-green-50\b/g, ''],
  [/\bbg-green-100\b/g, ''],
  [/\bbg-green-600\b/g, ''],
  [/\bborder-green-200\b/g, ''],
  [/\bborder-green-300\b/g, ''],
  [/\bborder-green-500\b/g, ''],

  // Blue variants
  [/\btext-blue-900\b/g, ''],
  [/\btext-blue-800\b/g, ''],
  [/\btext-blue-700\b/g, ''],
  [/\btext-blue-600\b/g, ''],
  [/\btext-blue-500\b/g, ''],
  [/\btext-blue-400\b/g, ''],
  [/\bbg-blue-50\b/g, ''],
  [/\bbg-blue-100\b/g, ''],
  [/\bbg-blue-600\b/g, ''],
  [/\bborder-blue-200\b/g, ''],
  [/\bborder-blue-300\b/g, ''],
  [/\bborder-blue-500\b/g, ''],

  // Amber variants
  [/\btext-amber-900\b/g, ''],
  [/\btext-amber-800\b/g, ''],
  [/\btext-amber-700\b/g, ''],
  [/\btext-amber-600\b/g, ''],
  [/\btext-amber-500\b/g, ''],
  [/\btext-amber-400\b/g, ''],
  [/\bbg-amber-50\b/g, ''],
  [/\bbg-amber-100\b/g, ''],
  [/\bbg-amber-200\b/g, ''],
  [/\bborder-amber-200\b/g, ''],
  [/\bborder-amber-300\b/g, ''],

  // Hover variants with colors
  [/\bhover:bg-red-700\b/g, ''],
  [/\bhover:bg-red-50\b/g, ''],
  [/\bhover:bg-blue-700\b/g, ''],
  [/\bhover:bg-blue-50\b/g, ''],
  [/\bhover:bg-green-700\b/g, ''],
  [/\bhover:bg-green-50\b/g, ''],
  [/\bhover:bg-gray-50\b/g, ''],
  [/\bhover:bg-gray-100\b/g, ''],
  [/\bhover:bg-amber-300\b/g, ''],

  // Focus variants
  [/\bfocus:ring-red-500\b/g, ''],
  [/\bfocus:ring-blue-500\b/g, ''],
  [/\bfocus:ring-green-500\b/g, ''],

  // White text (on colored bg — keep as is, these are intentional)
  // [/\btext-white\b/g, ''],  // DON'T remove — needed on colored buttons

  // Clean up double/triple spaces in classNames
];

// Full line pattern replacements for common wrapper divs
const STYLE_ADDITIONS = [
  // Common wrapper: white card → terminal card
  [
    /className="([^"]*)\brounded-2xl\b([^"]*)"(?!\s*style)/g,
    'className="$1rounded-2xl$2" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}'
  ],
];

function getAllTsxFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...getAllTsxFiles(full));
    } else if (full.endsWith('.tsx')) {
      results.push(full);
    }
  }
  return results;
}

let totalChanges = 0;
const files = getAllTsxFiles(PATTERNS_DIR);

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const original = content;

  // Apply class removals
  for (const [pattern, replacement] of CLASS_REMOVALS) {
    content = content.replace(pattern, replacement);
  }

  // Clean up multiple spaces in className strings
  content = content.replace(/className="([^"]*)"/g, (match, classes) => {
    const cleaned = classes.replace(/\s{2,}/g, ' ').trim();
    return `className="${cleaned}"`;
  });

  // Remove empty className=""
  content = content.replace(/\s*className=""\s*/g, ' ');

  if (content !== original) {
    writeFileSync(file, content);
    const changes = (original.length - content.length);
    console.log(`Fixed: ${file} (${Math.abs(changes)} chars changed)`);
    totalChanges++;
  }
}

console.log(`\nDone: ${totalChanges} files modified`);
