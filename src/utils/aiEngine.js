/**
 * CivicConnect AI Intelligence Engine
 * 
 * Provides client-side smart categorization, urgency priority scoring,
 * and spatial duplicate detection algorithms.
 */

// Category Keyword Rules
const CATEGORY_KEYWORDS = {
  'Garbage & Waste': ['garbage', 'dump', 'trash', 'waste', 'smell', 'odor', 'dustbin', 'overflow', 'litter', 'plastic'],
  'Road Infrastructure & Potholes': ['pothole', 'road', 'asphalt', 'tar', 'crack', 'pavement', 'divider', 'bump', 'traffic', 'footpath'],
  'Electrical & Streetlights': ['light', 'streetlight', 'lamp', 'dark', 'wire', 'pole', 'electric', 'spark', 'transformer', 'power'],
  'Water Supply & Sewage': ['water', 'pipe', 'leak', 'drain', 'sewage', 'burst', 'supply', 'gush', 'contamination', 'tap'],
  'Drainage & Flooding': ['drainage', 'flood', 'manhole', 'overflow', 'gutter', 'clog', 'stagnant', 'rainwater'],
};

// High-Risk Hazard Keywords for Priority Escalation
const HAZARD_KEYWORDS = [
  'manhole', 'open manhole', 'live wire', 'spark', 'fire', 'hospital', 'school',
  'overflowing', 'burst', 'electric shock', 'flooding', 'accident', 'danger',
  'blocked', 'collapse', 'deep', 'heavy', 'urgent'
];

/**
 * Auto-detect category based on text content
 */
export function analyzeComplaintText(text = '') {
  const lower = text.toLowerCase();

  let bestMatch = 'Other Civic Concern';
  let maxHits = 0;

  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
    const hits = keywords.reduce((acc, word) => acc + (lower.includes(word) ? 1 : 0), 0);
    if (hits > maxHits) {
      maxHits = hits;
      bestMatch = category;
    }
  });

  return {
    suggestedCategory: bestMatch,
    confidenceScore: maxHits > 0 ? Math.min(Math.round((maxHits / 3) * 100), 95) : 50,
  };
}

/**
 * Calculate AI Urgency Priority Score (0 - 100)
 */
export function calculatePriorityScore({ category, urgencyLevel, title = '', description = '' }) {
  let score = 50; // base score

  // Level weight
  if (urgencyLevel === 'High') score += 25;
  else if (urgencyLevel === 'Medium') score += 10;
  else if (urgencyLevel === 'Low') score -= 15;

  // Keyword hazard scanning
  const fullText = `${title} ${description}`.toLowerCase();
  let hazardHits = 0;

  HAZARD_KEYWORDS.forEach((word) => {
    if (fullText.includes(word)) hazardHits += 1;
  });

  score += hazardHits * 8;

  // Category severity adjustment
  if (category.includes('Electrical') || category.includes('Drainage')) {
    score += 10;
  }

  // Clamp score between 15 and 99
  return Math.min(Math.max(score, 15), 99);
}

/**
 * Check for duplicate complaints within geographic radius
 */
export function checkDuplicateReports(newReport, existingComplaints = []) {
  if (!existingComplaints.length) return { isDuplicate: false };

  const newLocationLower = (newReport.location || '').toLowerCase();
  const newCategory = newReport.category;

  const match = existingComplaints.find((item) => {
    const sameCategory = item.category === newCategory;
    const sameLoc = item.location.toLowerCase().includes(newLocationLower) ||
                    newLocationLower.includes(item.location.toLowerCase());
    return sameCategory && sameLoc && item.status !== 'Resolved';
  });

  if (match) {
    return {
      isDuplicate: true,
      masterTicketId: match.id,
      existingTitle: match.title,
      distanceMetres: 45, // simulated distance
    };
  }

  return { isDuplicate: false };
}
