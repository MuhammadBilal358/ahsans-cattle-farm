// Starting content — mirrors what was on the original static site.
// Feel free to edit this file before running "npm run seed", or just
// edit everything later from the Admin Dashboard once it's running.

module.exports = [
  // ---------------- CATTLE (Qurbani) ----------------
  {
    category: 'cattle', order: 1, icon: '🐂',
    title: 'Strong & Robust', tag: 'Qurbani Cattle · 01',
    description: 'A healthy, powerful animal with a bold black-and-white coat. Solid, muscular build with a calm temperament — raised on a balanced diet with full veterinary care.',
    specs: [
      { label: 'Build', value: 'Large & muscular' },
      { label: 'Coat', value: 'Black & white patched' },
      { label: 'Health', value: 'Fully vaccinated' },
      { label: 'Status', value: 'Available now' }
    ]
  },
  {
    category: 'cattle', order: 2, icon: '🐂',
    title: 'Striking & Sturdy', tag: 'Qurbani Cattle · 02',
    description: 'Heavy build, healthy and impressive to look at. A calm, well-fed animal with a bright white coat, raised with regular veterinary checkups.',
    specs: [
      { label: 'Build', value: 'Heavy & well-fed' },
      { label: 'Coat', value: 'White' },
      { label: 'Health', value: 'Fully vaccinated' },
      { label: 'Status', value: 'Available now' }
    ]
  },
  {
    category: 'cattle', order: 3, icon: '🐂',
    title: 'Well-Built', tag: 'Qurbani Cattle · 03',
    description: 'A strong, healthy animal with a rich brown coat. Good muscle tone and an alert, well-cared-for appearance.',
    specs: [
      { label: 'Build', value: 'Strong & well-toned' },
      { label: 'Coat', value: 'Rich brown' },
      { label: 'Health', value: 'Fully vaccinated' },
      { label: 'Status', value: 'Available now' }
    ]
  },
  {
    category: 'cattle', order: 4, icon: '🐂',
    title: 'Distinctive & Eye-Catching', tag: 'Qurbani Cattle · 04',
    description: 'A healthy animal with beautiful natural markings. Unique spotted coat, good frame, and raised with the same care as every animal on the farm.',
    specs: [
      { label: 'Build', value: 'Well-proportioned' },
      { label: 'Coat', value: 'Spotted' },
      { label: 'Health', value: 'Fully vaccinated' },
      { label: 'Status', value: 'Available now' }
    ]
  },

  // ---------------- DAIRY ----------------
  {
    category: 'dairy', order: 1, icon: '🐄', origin: 'Pakistan',
    title: 'Sahiwal', tag: 'Dairy Breed',
    description: "One of Pakistan's finest native dairy breeds — heat-tolerant, gentle-natured and known for consistent milk production.",
    specs: [
      { label: 'Category', value: 'Dairy Cow' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Temperament', value: 'Gentle & heat-tolerant' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'dairy', order: 2, icon: '🐄', origin: 'Pakistan',
    title: 'Cholistani', tag: 'Dairy Breed',
    description: 'A hardy desert-bred breed from the Cholistan region, well suited to local conditions with dependable output.',
    specs: [
      { label: 'Category', value: 'Dairy Cow' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Temperament', value: 'Hardy, desert-adapted' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'dairy', order: 3, icon: '🐄', origin: 'Pakistan',
    title: 'Red Sindhi', tag: 'Dairy Breed',
    description: 'A resilient native breed valued for adapting well to hot climates while maintaining steady milk yield.',
    specs: [
      { label: 'Category', value: 'Dairy Cow' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Temperament', value: 'Resilient, heat-adapted' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'dairy', order: 4, icon: '🐄', origin: 'Imported Line',
    title: 'Holstein Friesian (Improved)', tag: 'Dairy Breed',
    description: 'Selectively bred from imported genetics for higher milk volume, raised locally with careful feeding and care.',
    specs: [
      { label: 'Category', value: 'Dairy Cow' },
      { label: 'Origin', value: 'Imported Line' },
      { label: 'Temperament', value: 'Calm, needs good feed & care' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'dairy', order: 5, icon: '🐄', origin: 'Imported Line',
    title: 'Jersey Cross', tag: 'Dairy Breed',
    description: 'A cross-bred dairy animal combining imported Jersey genetics with local hardiness for a balanced, easy-to-keep milker.',
    specs: [
      { label: 'Category', value: 'Dairy Cow' },
      { label: 'Origin', value: 'Imported Line' },
      { label: 'Temperament', value: 'Easy-going, easy to keep' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'dairy', order: 6, icon: '🐃', origin: 'Pakistan',
    title: 'Nili-Ravi Buffalo', tag: 'Dairy Breed',
    description: 'A premium Pakistani dairy buffalo breed, prized for rich, high-fat milk and a calm temperament.',
    specs: [
      { label: 'Category', value: 'Dairy Buffalo' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Temperament', value: 'Calm' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },

  // ---------------- GOATS ----------------
  {
    category: 'goats', order: 1, icon: '🐐', origin: 'Pakistan',
    title: 'Beetal', tag: 'Goat Breed',
    description: 'A large, strong breed popular for Qurbani, known for its size and long, drooping ears.',
    specs: [
      { label: 'Category', value: 'Qurbani Goat' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Build', value: 'Large & strong' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'goats', order: 2, icon: '🐐', origin: 'Pakistan',
    title: 'Teddy', tag: 'Goat Breed',
    description: 'A compact, hardy breed known for quick growth and good meat quality — a popular choice for smaller households.',
    specs: [
      { label: 'Category', value: 'Meat Goat' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Build', value: 'Compact & hardy' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'goats', order: 3, icon: '🐐', origin: 'Pakistan',
    title: 'Desi (Local)', tag: 'Goat Breed',
    description: 'Our everyday local breed — hardy, low-maintenance and well suited to the regional climate.',
    specs: [
      { label: 'Category', value: 'General Purpose' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Build', value: 'Hardy, low-maintenance' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'goats', order: 4, icon: '🐐', origin: 'Pakistan',
    title: 'Dera Din Panah', tag: 'Goat Breed',
    description: 'A distinctive large-eared breed valued for its size and strong build.',
    specs: [
      { label: 'Category', value: 'Qurbani Goat' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Build', value: 'Large-eared, strong' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'goats', order: 5, icon: '🐐', origin: 'Imported Line',
    title: 'Boer (Improved)', tag: 'Goat Breed',
    description: 'A meat breed developed from imported genetics, valued for fast weight gain and a heavy, muscular build.',
    specs: [
      { label: 'Category', value: 'Meat Goat' },
      { label: 'Origin', value: 'Imported Line' },
      { label: 'Build', value: 'Heavy & muscular' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'goats', order: 6, icon: '🐐', origin: 'Imported Line',
    title: 'Saanen Cross (Dairy)', tag: 'Goat Breed',
    description: 'A cross-bred dairy goat combining imported Saanen genetics with local hardiness for reliable daily milk.',
    specs: [
      { label: 'Category', value: 'Dairy Goat' },
      { label: 'Origin', value: 'Imported Line' },
      { label: 'Build', value: 'Medium, easy to keep' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },

  // ---------------- FEED & FODDER ----------------
  {
    category: 'feed', order: 1, icon: '🌱',
    title: 'Green Fodder (Chara)', tag: 'Feed & Fodder',
    description: 'Fresh seasonal green fodder such as berseem and maize chara, cut and delivered as needed.',
    specs: [
      { label: 'Type', value: 'Fresh fodder' },
      { label: 'Best for', value: 'Daily feeding' },
      { label: 'Availability', value: 'Seasonal — call to confirm' }
    ]
  },
  {
    category: 'feed', order: 2, icon: '🌾',
    title: 'Wheat Straw (Bhoosa)', tag: 'Feed & Fodder',
    description: 'Clean, dry wheat straw for daily roughage — a staple part of a balanced animal diet.',
    specs: [
      { label: 'Type', value: 'Dry roughage' },
      { label: 'Best for', value: 'Daily diet base' },
      { label: 'Availability', value: 'Year-round' }
    ]
  },
  {
    category: 'feed', order: 3, icon: '🥣',
    title: 'Concentrated Feed (Vanda)', tag: 'Feed & Fodder',
    description: 'Nutrient-dense mixed feed to support healthy weight gain and steady milk production.',
    specs: [
      { label: 'Type', value: 'Concentrate mix' },
      { label: 'Best for', value: 'Weight gain & milk yield' },
      { label: 'Availability', value: 'Year-round' }
    ]
  },
  {
    category: 'feed', order: 4, icon: '🧂',
    title: 'Mineral & Salt Blocks', tag: 'Feed & Fodder',
    description: "Essential mineral supplements to round out your animals' diet and support overall health.",
    specs: [
      { label: 'Type', value: 'Mineral supplement' },
      { label: 'Best for', value: 'General health' },
      { label: 'Availability', value: 'Year-round' }
    ]
  },

  // ---------------- FRESH MILK ----------------
  {
    category: 'milk', order: 1, icon: '🥛',
    title: 'Cow Milk', tag: 'Fresh Milk',
    description: 'Fresh, unadulterated cow milk from our own dairy animals — available daily.',
    specs: [
      { label: 'Type', value: 'Cow milk' },
      { label: 'Sourced', value: "Farm's own herd" },
      { label: 'Availability', value: 'Daily' }
    ]
  },
  {
    category: 'milk', order: 2, icon: '🥛',
    title: 'Buffalo Milk', tag: 'Fresh Milk',
    description: 'Rich, creamy buffalo milk from our Nili-Ravi herd — a household favourite.',
    specs: [
      { label: 'Type', value: 'Buffalo milk' },
      { label: 'Sourced', value: 'Nili-Ravi herd' },
      { label: 'Availability', value: 'Daily' }
    ]
  },
  {
    category: 'milk', order: 3, icon: '📦',
    title: 'Daily & Bulk Orders', tag: 'Fresh Milk',
    description: 'Order a small daily quantity for your home or a larger bulk order — just let us know your requirement.',
    specs: [
      { label: 'Type', value: 'Order option' },
      { label: 'Best for', value: 'Homes & bulk buyers' },
      { label: 'Availability', value: 'On request' }
    ]
  }
];
