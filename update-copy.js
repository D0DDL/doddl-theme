const fs = require('fs');
const d = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
const s = d.sections.stage_journey_tabs.settings || {};

// Read stage-journey-tabs schema to confirm body/sign field names
const liquid = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');
const hasField = id => liquid.includes('"' + id + '"');

// Helper — only set if field exists in schema
const set = (key, val) => { if (hasField(key)) s[key] = val; else console.log('MISSING FIELD:', key); };

// --- STAGE INTRO (in stage_intro section settings) ---
const si = d.sections.stage_intro ? (d.sections.stage_intro.settings || {}) : null;
if (si) {
  si.body = "Every child finds their own pace — but most move through four key stages between 6 months and 5 years, each shaped by what their little hands can do. doddl products are designed around exactly those stages, so the products your child is using always works with their developing grip, not against it.";
  d.sections.stage_intro.settings = si;
}

// --- STAGE TABS instruction text ---
set('instruction_text', "Click a stage below to check the signs to look for, the right products, and when to know it’s time to move on");

// --- STAGE 0 ---
set('s0_heading', "Your journey starts soon");
set('s0_body', "At doddl we’ve spent over 10 years studying how children’s fine motor-skills develop so when you think your baby is ready to start eating, explore Stage 1. In the meantime, you can help your baby get ready to self-feed right now.");
set('s0_sign_1', "Offer different objects to grasp");
set('s0_sign_2', "Let them explore touching different textures");
set('s0_sign_3', "Allow your baby to experience cooking smells");
set('s0_sign_4', "Let your baby watch you eat");
set('s0_email_heading', "Weaning is recommended from 6 months");
set('s0_email_body', "Not quite ready for weaning yet? Sign up for our free development series — built around exactly where your baby is right now.");
set('s0_email_cta', "Sign me up");
set('s0_expert_quote', "Grasping skills are vital for future participation in every day tasks such as self-feeding, self-care, writing, colouring and manipulating classroom tools");
set('s0_expert_attr', "Christine Pollack— Paediatric OT");
set('s0_next_title', "Stage 1 — First Foods (6–12 months)");
set('s0_next_body', "Think your baby is ready for baby-led weaning cutlery? Explore stage 1 products");

// --- STAGE 1 ---
set('s1_heading', "Explore, taste, try");
set('s1_body', "This stage is all about exploring. Embrace the food on your baby’s face and the floor; doddl stage 1 products are designed for tiny hands that are just discovering what mealtimes are all about. You’ll know when to introduce cutlery when your baby is showing these signs:");
set('s1_sign_1', "Sitting in a highchair with gentle support");
set('s1_sign_2', "Reaching and grasping objects consistently");
set('s1_sign_3', "Using their hands to explore foods");
set('s1_sign_4', "Growing appetite");
set('s1_expert_quote', "As a pediatric feeding therapist, I frequently have parents ask me for recommendations on feeding tools like forks and spoons. The handles are also ergonomically designed to encourage a proper grip. These are perfect for helping to develop independent feeding skills.");
set('s1_expert_attr', "Colleen Sarrazin, Paediatric Feeding Therapist and Speech-Language Pathologist");
set('s1_next_body', "When your baby has developed some hand-eye co-ordination, they’re able to consistently move food from the bowl to their mouth and are eating more substantial meals, you’ll need the best cutlery for toddlers. Time for stage 2.");

// --- STAGE 2 ---
set('s2_pill', "Stage 2 · 12–24 months");
set('s2_heading', "Watch ME Go!");
set('s2_body', "Your toddlers desire for independence is growing and their hands are making their biggest development leap. The right tools will make that transition happen faster — and with a lot less mess and stress. doddl stage 2 products are designed for when your toddler is showing these signs");
set('s2_sign_1', "Eating more substantial meals");
set('s2_sign_2', "Desire to scoop effectively");
set('s2_sign_3', "Eager to stab food");
set('s2_sign_4', "Getting frustrated if you try to help");
set('s2_expert_quote', "I love the unique design of doddl cutlery. The short, moulded handles fit perfectly in little hands and have a soft middle for a comfortable grip. I also love how they support motor skill development like dexterity and coordination, making self-feeding easier.");
set('s2_expert_attr', "Penelope Henderson - Registered Children’s Nutritionist & SOS Trained Feeding Therapist");
set('s2_next_body', "When your toddler is successfully self-feeding with a spoon and fork, is less inclined to throw their plate on the floor and would love to chop up their own food - they’re ready for stage 3");

// --- STAGE 3 ---
set('s3_heading', "Independence: unlocked");
set('s3_body', "You’ll know that your toddlers desire for independence is powerful. The right tools will turn that determination into genuine skill. doddl stage 3 products develop your toddlers fine motor-skills at mealtimes and beyond. When your toddler shows these signs, they’re ready for stage 3.");
set('s3_sign_1', "Using a fork and spoon successfully");
set('s3_sign_2', "Growing confidence at mealtimes");
set('s3_sign_3', "Interest in chopping their own food");
set('s3_sign_4', "Eager to get involved in the kitchen");
set('s3_expert_quote', "As practitioners we have seen amazing results in independence at lunchtime and snack time, as well as with fine motorskill development.");
set('s3_expert_attr', "The Coigne Nursery, UK");
set('s3_next_body', "Once your child is confident with doddl stage 3 products they will be ready to transition to adult tableware - but there’s no rush. The ergonomic design supports the correct grip, so your child can easily move on whenever they are ready.");

// --- TRUST BAR ---
const tb = d.sections.trust_bar;
if (tb && tb.blocks) {
  tb.blocks.metric_1 = { type: 'trust_metric', settings: { icon: '', stat: '25,000', stat_suffix: '+', label: '5-star reviews' } };
  tb.blocks.metric_2 = { type: 'trust_metric', settings: { icon: '', stat: '4 stages', stat_suffix: '', label: '0 months – 5+ years' } };
  tb.blocks.metric_3 = { type: 'trust_metric', settings: { icon: '', stat: '1,000,000', stat_suffix: '', label: 'parents trust doddl' } };
  tb.blocks.metric_4 = { type: 'trust_metric', settings: { icon: '', stat: 'OT', stat_suffix: '✓', label: 'NHS Paediatric Occupational Therapist' } };
  tb.block_order = ['metric_1', 'metric_2', 'metric_3', 'metric_4'];
}

// --- HERO ---
const hero = d.sections.hero_split;
if (hero) {
  if (!hero.settings) hero.settings = {};
  hero.settings.eyebrow = "Development tableware trusted by 1 million+ parents";
  hero.settings.heading_1 = "The right tool at the right age changes everything";
  hero.settings.heading_2 = "";
  hero.settings.heading_3 = "";
  hero.settings.body_text = "Tableware designed to enhance development and make mealtimes easier — from first tastes at 6 months to confident independence at 5 years. Trusted by 1 million+ parents and recommended by paediatric OTs.";
}

d.sections.stage_journey_tabs.settings = s;
fs.writeFileSync('templates/index.json', JSON.stringify(d, null, 2));
console.log('Done. Fields set:', Object.keys(s).length);
