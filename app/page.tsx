"use client";

import { useState, useEffect, useRef } from "react";

// ── Translations ──────────────────────────────────────────────────────────────
const LANGS = {
  English: {
    nav: ["Home","Explorer","Rights","Duties","Amendments","Quiz","Leaderboard","AI Assistant","About","Leaders","About Us","Languages","Profile"],
    hero1: "WE ARE INDIANS",
    hero2: "Learn, Understand, and Protect the Constitution of India",
    cta: ["Explore Constitution","Know Your Rights","Start Quiz","Talk to AI"],
    factTitle: "Daily Constitution Fact",
    fact: "India's Constitution is the world's longest written constitution with 448 articles, 12 schedules, and 25 parts.",
    artTitle: "Article of the Day",
    art: "Article 21 — Protection of Life and Personal Liberty: No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    rightsTitle: "Fundamental Rights",
    rights: [
      { icon: "⚖️", title: "Right to Equality", desc: "Articles 14–18: Equal protection under law, no discrimination." },
      { icon: "🗣️", title: "Right to Freedom", desc: "Articles 19–22: Speech, movement, profession, and personal liberty." },
      { icon: "🚫", title: "Right Against Exploitation", desc: "Articles 23–24: Prohibition of trafficking and child labour." },
      { icon: "🕌", title: "Right to Religion", desc: "Articles 25–28: Freedom of conscience and free practice of religion." },
      { icon: "📚", title: "Cultural & Educational Rights", desc: "Articles 29–30: Rights of minorities to conserve culture." },
      { icon: "🔨", title: "Constitutional Remedies", desc: "Article 32: Right to move Supreme Court to enforce rights." },
    ],
    dutiesTitle: "Fundamental Duties",
    duties: [
      "Abide by the Constitution and respect national symbols",
      "Cherish and follow the noble ideals of freedom struggle",
      "Uphold and protect the sovereignty and integrity of India",
      "Defend the country and render national service when called upon",
      "Promote harmony and brotherhood among all people of India",
      "Value and preserve the rich heritage of Indian culture",
      "Protect and improve the natural environment",
      "Develop the scientific temper and spirit of inquiry",
      "Safeguard public property and abjure violence",
      "Strive towards excellence in all spheres of individual activity",
      "Provide opportunities for education to children aged 6–14",
    ],
    leadersTitle: "Makers of the Constitution",
    quizTitle: "Quiz Zone",
    quizSub: "Test your Constitutional knowledge",
    aiTitle: "AI Constitution Assistant",
    aiPlaceholder: "Ask anything about the Constitution…",
    aiSend: "Send",
    timelineTitle: "Constitutional Timeline",
    aboutTitle: "About SAMVIDHAN",
    aboutDesc: "SAMVIDHAN is India's premier AI-powered platform dedicated to spreading constitutional awareness among citizens. We believe every Indian deserves to understand their rights, duties, and the democratic framework that protects them.",
    footerQuote: "The Constitution belongs to every Indian citizen.",
    login: "Login",
    signup: "Sign Up",
    welcome: "Welcome Back, Indian Citizen",
    email: "Email", password: "Password",
    google: "Continue with Google",
    createAcc: "Create Account",
    preamble: "Preamble",
    preambleText: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.",
    darkMode: "Dark Mode", lightMode: "Light Mode",
    leaderboard: "National Leaderboard",
    rank: "Rank", user: "Citizen", points: "Points", badge: "Badge",
    profileTitle: "Citizen Profile",
    xp: "XP", level: "Level", streak: "Day Streak", badges: "Badges",
    quizModes: ["Beginner","Student","UPSC","Advanced","Daily Challenge"],
  },
  Hindi: {
    nav: ["होम","अन्वेषक","अधिकार","कर्तव्य","संशोधन","प्रश्नोत्तरी","लीडरबोर्ड","AI सहायक","संविधान","नेता","हमारे बारे में","भाषाएं","प्रोफ़ाइल"],
    hero1: "हम भारतीय हैं",
    hero2: "भारत के संविधान को जानें, समझें और संरक्षित करें",
    cta: ["संविधान अन्वेषण","अपने अधिकार जानें","प्रश्नोत्तरी शुरू करें","AI से बात करें"],
    factTitle: "दैनिक संविधान तथ्य",
    fact: "भारत का संविधान विश्व का सबसे लंबा लिखित संविधान है जिसमें 448 अनुच्छेद, 12 अनुसूचियां और 25 भाग हैं।",
    artTitle: "आज का अनुच्छेद",
    art: "अनुच्छेद 21 — प्राण और दैहिक स्वतंत्रता का संरक्षण: किसी व्यक्ति को उसके प्राण या दैहिक स्वतंत्रता से विधि द्वारा स्थापित प्रक्रिया के अनुसार ही वंचित किया जाएगा।",
    rightsTitle: "मूल अधिकार",
    rights: [
      { icon: "⚖️", title: "समानता का अधिकार", desc: "अनुच्छेद 14–18: कानून के समक्ष समान संरक्षण।" },
      { icon: "🗣️", title: "स्वतंत्रता का अधिकार", desc: "अनुच्छेद 19–22: वाक्, आवाजाही, व्यवसाय की स्वतंत्रता।" },
      { icon: "🚫", title: "शोषण के विरुद्ध अधिकार", desc: "अनुच्छेद 23–24: मानव तस्करी और बाल श्रम का निषेध।" },
      { icon: "🕌", title: "धर्म का अधिकार", desc: "अनुच्छेद 25–28: अंतःकरण और धर्म की स्वतंत्रता।" },
      { icon: "📚", title: "सांस्कृतिक एवं शैक्षिक अधिकार", desc: "अनुच्छेद 29–30: अल्पसंख्यकों के संस्कृति संरक्षण के अधिकार।" },
      { icon: "🔨", title: "संवैधानिक उपचारों का अधिकार", desc: "अनुच्छेद 32: मौलिक अधिकारों के प्रवर्तन हेतु उच्चतम न्यायालय में जाने का अधिकार।" },
    ],
    dutiesTitle: "मूल कर्तव्य",
    duties: [
      "संविधान का पालन करें और राष्ट्रीय प्रतीकों का सम्मान करें",
      "स्वतंत्रता संग्राम के आदर्शों का पालन करें",
      "भारत की संप्रभुता और अखंडता की रक्षा करें",
      "देश की रक्षा करें और राष्ट्रीय सेवा प्रदान करें",
      "सभी भारतीयों में सद्भाव और भाईचारा बढ़ाएं",
      "भारतीय संस्कृति की समृद्ध विरासत को संरक्षित करें",
      "प्राकृतिक पर्यावरण की रक्षा और सुधार करें",
      "वैज्ञानिक दृष्टिकोण विकसित करें",
      "सार्वजनिक संपत्ति की सुरक्षा करें",
      "व्यक्तिगत और सामूहिक गतिविधियों में उत्कृष्टता की ओर बढ़ें",
      "6-14 वर्ष के बच्चों को शिक्षा के अवसर प्रदान करें",
    ],
    leadersTitle: "संविधान निर्माता",
    quizTitle: "प्रश्नोत्तरी क्षेत्र",
    quizSub: "अपने संवैधानिक ज्ञान की परीक्षा करें",
    aiTitle: "AI संविधान सहायक",
    aiPlaceholder: "संविधान के बारे में कुछ भी पूछें…",
    aiSend: "भेजें",
    timelineTitle: "संवैधानिक समयरेखा",
    aboutTitle: "SAMVIDHAN के बारे में",
    aboutDesc: "SAMVIDHAN भारत का प्रमुख AI-संचालित प्लेटफॉर्म है जो नागरिकों में संवैधानिक जागरूकता फैलाने के लिए समर्पित है।",
    footerQuote: "संविधान हर भारतीय नागरिक का है।",
    login: "लॉगिन", signup: "साइन अप",
    welcome: "स्वागत है, भारतीय नागरिक",
    email: "ईमेल", password: "पासवर्ड",
    google: "Google से जारी रखें",
    createAcc: "खाता बनाएं",
    preamble: "प्रस्तावना",
    preambleText: "हम, भारत के लोग, भारत को एक सम्पूर्ण प्रभुत्व-सम्पन्न समाजवादी पंथनिरपेक्ष लोकतंत्रात्मक गणराज्य बनाने के लिए तथा उसके समस्त नागरिकों को: सामाजिक, आर्थिक और राजनीतिक न्याय; विचार, अभिव्यक्ति, विश्वास, धर्म और उपासना की स्वतंत्रता; प्रतिष्ठा और अवसर की समता प्राप्त कराने के लिए तथा उन सब में व्यक्ति की गरिमा और राष्ट्र की एकता और अखंडता सुनिश्चित करने वाली बंधुता बढ़ाने के लिए दृढ़संकल्प होकर अपनी इस संविधान सभा में आज तारीख 26 नवम्बर 1949 ई. (मिती मार्गशीर्ष शुक्ल सप्तमी, संवत् दो हजार छह विक्रमी) को एतद् द्वारा इस संविधान को अंगीकृत, अधिनियमित और आत्मसमर्पित करते हैं।",
    darkMode: "डार्क मोड", lightMode: "लाइट मोड",
    leaderboard: "राष्ट्रीय लीडरबोर्ड",
    rank: "रैंक", user: "नागरिक", points: "अंक", badge: "बैज",
    profileTitle: "नागरिक प्रोफ़ाइल",
    xp: "XP", level: "स्तर", streak: "दिन स्ट्रीक", badges: "बैज",
    quizModes: ["शुरुआती","विद्यार्थी","UPSC","उन्नत","दैनिक चुनौती"],
  },
};
const LANG_NAMES = ["English","Hindi","Kannada","Tamil","Telugu","Marathi","Bengali","Malayalam","Gujarati","Punjabi"];

// ── Quiz Data ─────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { q: "In which year was the Constitution of India adopted?", opts: ["1947","1949","1950","1952"], ans: 1, exp: "The Constitution was adopted by the Constituent Assembly on November 26, 1949." },
  { q: "Who is known as the 'Father of the Indian Constitution'?", opts: ["Jawaharlal Nehru","Sardar Patel","Dr. B.R. Ambedkar","Rajendra Prasad"], ans: 2, exp: "Dr. B.R. Ambedkar was the chairman of the Drafting Committee and is widely regarded as the father of the Indian Constitution." },
  { q: "How many Fundamental Rights are currently guaranteed by the Constitution?", opts: ["5","6","7","8"], ans: 1, exp: "There are 6 Fundamental Rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies." },
  { q: "Which Article of the Constitution guarantees the Right to Life?", opts: ["Article 14","Article 19","Article 21","Article 32"], ans: 2, exp: "Article 21 states that no person shall be deprived of his life or personal liberty except according to procedure established by law." },
  { q: "The Preamble of the Indian Constitution begins with:", opts: ["We the Citizens","We the People of India","We the Indians","We the Republic"], ans: 1, exp: "The Preamble begins with 'WE, THE PEOPLE OF INDIA' signifying that the Constitution is created by and for the people." },
  { q: "Which Schedule of the Constitution deals with the distribution of powers between the Centre and States?", opts: ["Fifth Schedule","Sixth Schedule","Seventh Schedule","Eighth Schedule"], ans: 2, exp: "The Seventh Schedule contains three lists — Union List, State List, and Concurrent List — that define the legislative jurisdiction of the Centre and States." },
  { q: "Emergency provisions are contained in which Part of the Constitution?", opts: ["Part XVII","Part XVIII","Part XIX","Part XX"], ans: 1, exp: "Part XVIII (Articles 352-360) deals with Emergency Provisions including National Emergency, State Emergency, and Financial Emergency." },
  { q: "Which Article provides for the Right to Constitutional Remedies?", opts: ["Article 29","Article 30","Article 32","Article 44"], ans: 2, exp: "Article 32, called the 'heart and soul' of the Constitution by Dr. Ambedkar, gives citizens the right to approach the Supreme Court for enforcement of Fundamental Rights." },
];

// ── Leaders ───────────────────────────────────────────────────────────────────
const LEADERS = [
  { name: "Dr. B.R. Ambedkar", role: "Chairman, Drafting Committee", emoji: "🎓", quote: "I measure the progress of a community by the degree of progress which women have achieved.", bio: "Chief architect of the Indian Constitution, social reformer, and first Law Minister of India.", color: "#FF6B35" },
  { name: "Dr. Rajendra Prasad", role: "President, Constituent Assembly", emoji: "👨‍⚖️", quote: "Our Constitution is a workable, flexible and strong constitution with fundamental principles clearly established.", bio: "First President of India and presided over the Constituent Assembly.", color: "#138808" },
  { name: "Jawaharlal Nehru", role: "Prime Minister & Key Architect", emoji: "🌹", quote: "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.", bio: "First Prime Minister of India who moved the Objectives Resolution in the Constituent Assembly.", color: "#FF9933" },
  { name: "Sardar Vallabhbhai Patel", role: "Integration Champion", emoji: "🦁", quote: "India has now set out on her career and there is no going back.", bio: "Iron Man of India who integrated 565 princely states into the Indian Union.", color: "#000080" },
  { name: "Sarojini Naidu", role: "Constituent Assembly Member", emoji: "🌸", quote: "We are the voices of the women of India.", bio: "Nightingale of India, poet, and first woman Governor of an Indian state.", color: "#9B59B6" },
  { name: "B.N. Rau", role: "Constitutional Advisor", emoji: "📜", quote: "A constitution must be a living document, adaptable to the needs of time.", bio: "Sir Benegal Narsing Rau drafted the initial constitution document that the Drafting Committee refined.", color: "#E67E22" },
];

// ── AI Responses ──────────────────────────────────────────────────────────────
const AI_CANNED = {
  "article 21": "**Article 21** protects the *Right to Life and Personal Liberty*. It states: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' This is one of the most expansive articles — courts have interpreted 'life' to include right to livelihood, education, health, and a dignified life.",
  "rights": "The Indian Constitution guarantees **6 Fundamental Rights** (Articles 12–35):\n1. **Right to Equality** (Art. 14–18)\n2. **Right to Freedom** (Art. 19–22)\n3. **Right Against Exploitation** (Art. 23–24)\n4. **Right to Religion** (Art. 25–28)\n5. **Cultural & Educational Rights** (Art. 29–30)\n6. **Right to Constitutional Remedies** (Art. 32)\n\nThese rights are justiciable — you can approach a court if they are violated.",
  "preamble": "The **Preamble** is the soul of the Constitution. It declares India to be a Sovereign, Socialist, Secular, Democratic Republic and promises Justice, Liberty, Equality, and Fraternity to all citizens. The words 'Socialist' and 'Secular' were added by the 42nd Amendment in 1976.",
  "ambedkar": "**Dr. B.R. Ambedkar** was the Chairman of the Drafting Committee and is widely regarded as the Father of the Indian Constitution. He worked tirelessly for social justice and the rights of marginalized communities. He called Article 32 the 'heart and soul' of the Constitution.",
  "default": "I'm your **SAMVIDHAN AI Assistant**! I can explain any Article of the Constitution, Fundamental Rights, constitutional history, and more. Try asking:\n- 'Explain Article 21'\n- 'What are Fundamental Duties?'\n- 'Tell me about the Preamble'\n- 'Who is Dr. Ambedkar?'"
};

function getAIResponse(msg: string) {
  const lower = msg.toLowerCase();
  if (lower.includes("article 21") || lower.includes("life") || lower.includes("liberty")) return AI_CANNED["article 21"];
  if (lower.includes("right") || lower.includes("fundamental")) return AI_CANNED["rights"];
  if (lower.includes("preamble")) return AI_CANNED["preamble"];
  if (lower.includes("ambedkar") || lower.includes("father")) return AI_CANNED["ambedkar"];
  return AI_CANNED["default"];
}

// ── Ashoka Chakra SVG ─────────────────────────────────────────────────────────
function AshokaChakra({ size = 120, opacity = 0.15, spin = true, color = "#138808" }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ opacity, animation: spin ? "spinChakra 20s linear infinite" : "none" }}>
      <circle cx="60" cy="60" r="55" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="60" cy="60" r="8" fill={color} />
      {spokes.map(i => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 60 + 10 * Math.cos(angle); const y1 = 60 + 10 * Math.sin(angle);
        const x2 = 60 + 52 * Math.cos(angle); const y2 = 60 + 52 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />;
      })}
      <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function Samvidhan() {
  const [dark, setDark] = useState(true);
const [lang, setLang] = useState<keyof typeof LANGS>("English");
  const [section, setSection] = useState("home");
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup"
  const [user, setUser] = useState(null);
  const [quizState, setQuizState] = useState({ mode: null, idx: 0, score: 0, answered: null, done: false });
  const [aiMessages, setAiMessages] = useState([{ role: "ai", text: AI_CANNED["default"] }]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [explorerQuery, setExplorerQuery] = useState("");
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", username: "", email: "", password: "", confirm: "" });
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const T = LANGS[lang];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [aiMessages]);

  const d = dark;
  const bg = d ? "#0a0a0f" : "#f8f5f0";
  const cardBg = d ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)";
  const border = d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const text = d ? "#f0ede8" : "#1a1512";
  const muted = d ? "rgba(240,237,232,0.55)" : "rgba(26,21,18,0.5)";
  const saffron = "#FF9933"; const green = "#138808"; const navy = "#000080";
  const accent = saffron;

  const glass = { background: cardBg, border: `1px solid ${border}`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setUser({ name: loginForm.email.split("@")[0] || "Indian Citizen", email: loginForm.email, xp: 1240, level: 5, streak: 12, badges: ["🏅","🎖️","🥇"], rank: 42 });
    setAuthMode(null); setSection("home");
  }
  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setUser({ name: signupForm.name || signupForm.username || "Indian Citizen", email: signupForm.email, xp: 0, level: 1, streak: 1, badges: ["🌟"], rank: 999 });
    setAuthMode(null); setSection("home");
  }
  function sendAI() {
    if (!aiInput.trim()) return;
    const userMsg = aiInput; setAiInput("");
    setAiMessages(m => [...m, { role: "user", text: userMsg }]);
    setAiLoading(true);
    setTimeout(() => {
      setAiMessages(m => [...m, { role: "ai", text: getAIResponse(userMsg) }]);
      setAiLoading(false);
    }, 900);
  }

  const ARTICLES = [
    { num: "Preamble", title: "Preamble of India", simple: "The soul of the Constitution — declares India sovereign, socialist, secular, democratic republic.", text: T.preambleText },
    { num: "Art. 14", title: "Right to Equality", simple: "Every person is equal before the law. No one gets special treatment.", text: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India." },
    { num: "Art. 19", title: "Right to Freedom", simple: "You have freedoms of speech, movement, profession, and more.", text: "All citizens shall have the right to freedom of speech and expression, to assemble peaceably, to form associations, to move freely, to reside and settle, and to practise any profession." },
    { num: "Art. 21", title: "Right to Life & Liberty", simple: "No one can take away your life or freedom without following proper law.", text: "No person shall be deprived of his life or personal liberty except according to procedure established by law." },
    { num: "Art. 32", title: "Constitutional Remedies", simple: "If your rights are violated, you can go directly to the Supreme Court.", text: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed." },
    { num: "Art. 44", title: "Uniform Civil Code", simple: "A directive for a common civil law for all citizens regardless of religion.", text: "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India." },
    { num: "Art. 51A", title: "Fundamental Duties", simple: "Citizens have duties towards the nation, including respecting the Constitution.", text: "It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem." },
    { num: "Art. 368", title: "Power to Amend", simple: "Parliament can amend the Constitution through a special procedure.", text: "Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article." },
  ];

  const filtered = ARTICLES.filter(a =>
    explorerQuery === "" || a.title.toLowerCase().includes(explorerQuery.toLowerCase()) || a.num.toLowerCase().includes(explorerQuery.toLowerCase())
  );

  const LEADERBOARD = [
    { rank: 1, name: "Priya Sharma", city: "Delhi", points: 9840, badge: "🏆" },
    { rank: 2, name: "Arjun Menon", city: "Kochi", points: 9210, badge: "🥈" },
    { rank: 3, name: "Kavya Reddy", city: "Hyderabad", points: 8950, badge: "🥉" },
    { rank: 4, name: "Rohit Singh", city: "Mumbai", points: 8420, badge: "🎖️" },
    { rank: 5, name: "Ananya Das", city: "Kolkata", points: 7980, badge: "🎖️" },
    { rank: 6, name: "Vikram Patel", city: "Ahmedabad", points: 7650, badge: "⭐" },
    { rank: 7, name: "Meera Nair", city: "Bangalore", points: 7200, badge: "⭐" },
    { rank: 8, name: "Aditya Kumar", city: "Patna", points: 6890, badge: "⭐" },
  ];

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: bg, color: text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Noto+Sans+Devanagari:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spinChakra { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px #FF993340} 50%{box-shadow:0 0 40px #FF993380} }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#FF993360;border-radius:3px}
        .nav-link { cursor:pointer; transition:color 0.2s; }
        .nav-link:hover { color:#FF9933; }
        .card-hover { transition:transform 0.3s, box-shadow 0.3s; cursor:pointer; }
        .card-hover:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(255,153,51,0.2); }
        .btn { cursor:pointer; border:none; font-family:inherit; transition:all 0.2s; }
        .btn:hover { transform:translateY(-2px); filter:brightness(1.1); }
        .btn:active { transform:translateY(0); }
        .hero-text { font-family:'Cinzel',serif; }
        .shimmer-text { background:linear-gradient(90deg,#FF9933,#fff,#138808,#FF9933); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite; }
        .typing-dot { display:inline-block; animation:pulse 1s infinite; }
        .typing-dot:nth-child(2){animation-delay:0.2s} .typing-dot:nth-child(3){animation-delay:0.4s}
        input,textarea { outline:none; font-family:inherit; }
        .particle { position:absolute; border-radius:50%; animation:float 4s ease-in-out infinite; pointer-events:none; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, ...glass, borderBottom: `1px solid ${border}`, padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setSection("home")}>
          <AshokaChakra size={36} opacity={1} color={navy} spin />
          <span style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 900, background: `linear-gradient(135deg,${saffron},${green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SAMVIDHAN</span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 18, fontSize: 13, fontWeight: 500 }}>
          {[["home","Home"],["explorer","Explorer"],["rights","Rights"],["duties","Duties"],["quiz","Quiz"],["leaderboard","Leaderboard"],["ai","AI"],["leaders","Leaders"],["about","About"],["languages","🌐 Languages"]].map(([s, label]) => (
            <span key={s} className="nav-link" style={{ color: section === s ? saffron : muted }} onClick={() => setSection(s)}>{label}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Language */}
          <select value={lang} onChange={e => setLang(e.target.value)} style={{ background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 8, padding: "4px 8px", fontSize: 12, cursor: "pointer" }}>
            {LANG_NAMES.map(l => <option key={l} value={l} style={{ background: d ? "#1a1a2e" : "#fff" }}>{l}</option>)}
          </select>
          {/* Dark/Light */}
          <button className="btn" onClick={() => setDark(!d)} style={{ background: glass.background, border: `1px solid ${border}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: text }}>
            {d ? "☀️" : "🌙"}
          </button>
          {/* Auth */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setSection("profile")}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                {user.name[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <button className="btn" onClick={() => setAuthMode("login")} style={{ background: `linear-gradient(135deg,${saffron},${green})`, color: "#fff", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>
              {T.login}
            </button>
          )}
        </div>
      </nav>

      {/* ── AUTH MODAL ── */}
      {authMode && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }} onClick={() => setAuthMode(null)}>
          <div style={{ ...glass, borderRadius: 24, padding: 40, width: 400, maxWidth: "90vw", animation: "fadeUp 0.3s ease", position: "relative" }} onClick={e => e.stopPropagation()}>
            {/* Chakra bg */}
            <div style={{ position: "absolute", top: -30, right: -30, opacity: 0.08 }}><AshokaChakra size={160} opacity={1} color={saffron} /></div>
            <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 22, marginBottom: 6, color: saffron }}>{authMode === "login" ? T.welcome : "Join SAMVIDHAN"}</h2>
            <p style={{ fontSize: 13, color: muted, marginBottom: 28 }}>{authMode === "login" ? "India's constitutional learning platform" : "Start your constitutional journey"}</p>

            {authMode === "login" ? (
              <form onSubmit={handleLogin}>
                {[["email", T.email, "text"], ["password", T.password, "password"]].map(([key, label, type]) => (
                  <div key={key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>{label}</label>
                    <input type={type} value={loginForm[key]} onChange={e => setLoginForm(f => ({ ...f, [key]: e.target.value }))} required
                      style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${border}`, background: d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", color: text, fontSize: 14 }} />
                  </div>
                ))}
                <button type="submit" className="btn" style={{ width: "100%", padding: "14px", borderRadius: 14, background: `linear-gradient(135deg,${saffron},${green})`, color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{T.login}</button>
                <button type="button" className="btn" style={{ width: "100%", padding: "12px", borderRadius: 14, border: `1px solid ${border}`, background: "transparent", color: text, fontSize: 14, marginBottom: 16 }}>🔵 {T.google}</button>
                <p style={{ textAlign: "center", fontSize: 13, color: muted }}>New here? <span style={{ color: saffron, cursor: "pointer" }} onClick={() => setAuthMode("signup")}>{T.createAcc}</span></p>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                {[["name", "Full Name", "text"], ["username", "Username", "text"], ["email", T.email, "email"], ["password", T.password, "password"], ["confirm", "Confirm Password", "password"]].map(([key, label, type]) => (
                  <div key={key} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 4 }}>{label}</label>
                    <input type={type} value={signupForm[key]} onChange={e => setSignupForm(f => ({ ...f, [key]: e.target.value }))} required
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${border}`, background: d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", color: text, fontSize: 14 }} />
                  </div>
                ))}
                <button type="submit" className="btn" style={{ width: "100%", padding: "14px", borderRadius: 14, background: `linear-gradient(135deg,${saffron},${green})`, color: "#fff", fontWeight: 700, fontSize: 15, marginTop: 8, marginBottom: 12 }}>{T.signup}</button>
                <p style={{ textAlign: "center", fontSize: 13, color: muted }}>Have an account? <span style={{ color: saffron, cursor: "pointer" }} onClick={() => setAuthMode("login")}>{T.login}</span></p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── SECTIONS ── */}
      <div style={{ paddingTop: 64 }}>

        {/* ═══════════════ HOME ═══════════════ */}
        {section === "home" && (
          <>
            {/* HERO */}
            <section style={{ minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
              background: d ? `radial-gradient(ellipse at 20% 50%,rgba(255,153,51,0.15) 0%,transparent 60%), radial-gradient(ellipse at 80% 50%,rgba(19,136,8,0.12) 0%,transparent 60%), #0a0a0f`
                           : `radial-gradient(ellipse at 20% 50%,rgba(255,153,51,0.2) 0%,transparent 60%), radial-gradient(ellipse at 80% 50%,rgba(19,136,8,0.15) 0%,transparent 60%), #f8f5f0` }}>
              {/* Floating particles */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="particle" style={{ width: 6+i%4*3, height: 6+i%4*3, background: [saffron,green,navy,"#fff"][i%4], opacity: 0.15+i%3*0.05, top: `${10+i*7}%`, left: `${5+i*8}%`, animationDelay: `${i*0.4}s`, animationDuration: `${3+i%3}s` }} />
              ))}
              {/* Big Chakra */}
              <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", opacity: 0.06 }}><AshokaChakra size={480} opacity={1} color={saffron} spin /></div>
              <div style={{ position: "absolute", left: "3%", top: "50%", transform: "translateY(-50%)", opacity: 0.04 }}><AshokaChakra size={300} opacity={1} color={green} spin /></div>

              {/* Indian Flag stripe accents */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg,${saffron},${saffron} 33%,white 33%,white 66%,${green} 66%)` }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg,${green},${green} 33%,white 33%,white 66%,${saffron} 66%)` }} />

              <div style={{ textAlign: "center", animation: "fadeUp 0.8s ease", zIndex: 1, padding: "0 24px", maxWidth: 900 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <AshokaChakra size={90} opacity={0.7} color={navy} spin />
                </div>
                <h1 className="hero-text shimmer-text" style={{ fontSize: "clamp(3rem,9vw,7rem)", fontWeight: 900, letterSpacing: "0.05em", lineHeight: 1, marginBottom: 16 }}>
                  {T.hero1}
                </h1>
                <p style={{ fontSize: "clamp(1rem,2.5vw,1.4rem)", color: muted, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>{T.hero2}</p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                  {T.cta.map((label, i) => {
                    const targets = ["explorer","rights","quiz","ai"];
                    const colors = [`linear-gradient(135deg,${saffron},#e67e22)`,`linear-gradient(135deg,${green},#0d6b05)`,`linear-gradient(135deg,${navy},#1a1aff)`,`linear-gradient(135deg,#9b59b6,#6c3483)`];
                    return (
                      <button key={i} className="btn" onClick={() => setSection(targets[i])}
                        style={{ padding: "14px 28px", borderRadius: 14, background: colors[i], color: "#fff", fontWeight: 700, fontSize: "clamp(13px,1.5vw,15px)", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* DAILY FACT + ARTICLE OF DAY */}
            <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
                {[{ icon: "📜", title: T.factTitle, body: T.fact, color: saffron }, { icon: "⚖️", title: T.artTitle, body: T.art, color: green }].map((card, i) => (
                  <div key={i} className="card-hover" style={{ ...glass, borderRadius: 20, padding: 32, borderLeft: `4px solid ${card.color}`, animation: `glow 3s ease-in-out infinite ${i}s` }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</div>
                    <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 16, color: card.color, marginBottom: 10 }}>{card.title}</h3>
                    <p style={{ fontSize: 15, color: muted, lineHeight: 1.7 }}>{card.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FUNDAMENTAL RIGHTS */}
            <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", textAlign: "center", marginBottom: 8 }}>
                <span style={{ color: saffron }}>{T.rightsTitle}</span>
              </h2>
              <p style={{ textAlign: "center", color: muted, marginBottom: 50, fontSize: 15 }}>Guaranteed to every Indian citizen</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
                {T.rights.map((r, i) => (
                  <div key={i} className="card-hover" style={{ ...glass, borderRadius: 20, padding: 28, background: d ? `linear-gradient(135deg,rgba(255,153,51,0.05),rgba(19,136,8,0.05))` : `rgba(255,255,255,0.9)` }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>{r.icon}</div>
                    <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 15, marginBottom: 8, color: saffron }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CONSTITUTION TIMELINE */}
            <section style={{ padding: "80px 24px", background: d ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
              <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", textAlign: "center", marginBottom: 60, color: saffron }}>{T.timelineTitle}</h2>
                {[
                  { year: "1946", event: "Constituent Assembly Formed", icon: "🏛️", detail: "The Constituent Assembly of India was formed with 299 members to draft a constitution for independent India." },
                  { year: "1948", event: "Dr. Ambedkar's Draft", icon: "📝", detail: "Dr. B.R. Ambedkar presented the draft constitution prepared by the Drafting Committee for public discussion." },
                  { year: "Nov 26, 1949", event: "Constitution Adopted", icon: "✅", detail: "The Constituent Assembly formally adopted the Constitution of India. This day is celebrated as Constitution Day." },
                  { year: "Jan 26, 1950", event: "Constitution Came Into Force", icon: "🇮🇳", detail: "The Constitution of India came into effect. India became a Republic. This day is celebrated as Republic Day." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: 40, animation: `fadeUp 0.6s ease ${i*0.15}s both` }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
                      <div style={{ width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                      {i < 3 && <div style={{ width: 2, flex: 1, background: `linear-gradient(${saffron},${green})`, marginTop: 8, minHeight: 40 }} />}
                    </div>
                    <div style={{ ...glass, borderRadius: 16, padding: 20, flex: 1 }}>
                      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 13, color: saffron, marginBottom: 4 }}>{item.year}</div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.event}</h3>
                      <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FUNDAMENTAL DUTIES */}
            <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", textAlign: "center", marginBottom: 50 }}><span style={{ color: green }}>{T.dutiesTitle}</span></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
                {T.duties.map((duty, i) => (
                  <div key={i} style={{ ...glass, borderRadius: 14, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.5 }}>{duty}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ═══════════════ EXPLORER ═══════════════ */}
        {section === "explorer" && (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: saffron, marginBottom: 8 }}>Constitution Explorer</h1>
              <p style={{ color: muted, fontSize: 15 }}>Search and explore the Constitution of India</p>
            </div>
            <div style={{ position: "relative", marginBottom: 36 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
              <input value={explorerQuery} onChange={e => setExplorerQuery(e.target.value)} placeholder="Search articles, rights, amendments…"
                style={{ width: "100%", padding: "16px 16px 16px 50px", borderRadius: 16, border: `1px solid ${border}`, background: cardBg, color: text, fontSize: 15 }} />
            </div>
            {/* Preamble callout */}
            <div style={{ ...glass, borderRadius: 20, padding: 28, marginBottom: 24, borderLeft: `5px solid ${saffron}` }}>
              <h3 style={{ fontFamily: "'Cinzel',serif", color: saffron, marginBottom: 12 }}>📜 {T.preamble}</h3>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.8, fontStyle: "italic" }}>{T.preambleText}</p>
            </div>
            {filtered.map((art, i) => (
              <div key={i} className="card-hover" style={{ ...glass, borderRadius: 16, marginBottom: 14, overflow: "hidden" }}>
                <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setExpandedArticle(expandedArticle === i ? null : i)}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <span style={{ fontFamily: "'Cinzel',serif", color: saffron, fontSize: 14, minWidth: 70 }}>{art.num}</span>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{art.title}</span>
                  </div>
                  <span style={{ color: muted, fontSize: 20, transform: expandedArticle === i ? "rotate(180deg)" : "none", transition: "0.3s" }}>⌄</span>
                </div>
                {expandedArticle === i && (
                  <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${border}` }}>
                    <p style={{ fontSize: 13, color: green, marginBottom: 10, marginTop: 16 }}>📖 Simple Explanation</p>
                    <p style={{ fontSize: 14, color: muted, marginBottom: 16, lineHeight: 1.6 }}>{art.simple}</p>
                    <p style={{ fontSize: 13, color: saffron, marginBottom: 10 }}>📜 Constitutional Text</p>
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.8, fontStyle: "italic", borderLeft: `3px solid ${saffron}`, paddingLeft: 16 }}>{art.text}</p>
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      <button className="btn" style={{ padding: "8px 16px", borderRadius: 10, background: `${saffron}20`, border: `1px solid ${saffron}40`, color: saffron, fontSize: 12 }}>🔖 Bookmark</button>
                      <button className="btn" style={{ padding: "8px 16px", borderRadius: 10, background: `${green}20`, border: `1px solid ${green}40`, color: green, fontSize: 12 }}>🔊 Listen</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════ RIGHTS ═══════════════ */}
        {section === "rights" && (
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: saffron, textAlign: "center", marginBottom: 8 }}>Fundamental Rights</h1>
            <p style={{ textAlign: "center", color: muted, marginBottom: 50, fontSize: 15 }}>Articles 12–35 of the Indian Constitution</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
              {[
                { icon: "⚖️", title: "Right to Equality", articles: "14–18", color: saffron, points: ["Equality before law","No discrimination on religion, race, caste, sex, place of birth","Equality of opportunity in public employment","Abolition of untouchability","Abolition of titles"] },
                { icon: "🗣️", title: "Right to Freedom", articles: "19–22", color: green, points: ["Freedom of speech and expression","Freedom of assembly","Freedom of association","Freedom of movement","Freedom of residence","Right to practice any profession","Protection against arbitrary arrest"] },
                { icon: "🚫", title: "Right Against Exploitation", articles: "23–24", color: navy, points: ["Prohibition of traffic in human beings","Prohibition of forced labour","No employment of children below 14 years in factories"] },
                { icon: "🕌", title: "Right to Religion", articles: "25–28", color: "#9b59b6", points: ["Freedom of conscience","Right to freely profess religion","Manage religious affairs","No taxes for religious promotion","No religious instruction in state schools"] },
                { icon: "📚", title: "Cultural & Educational Rights", articles: "29–30", color: "#e67e22", points: ["Right to conserve language, script or culture","Right of minorities to establish educational institutions","Protection against discrimination in admissions"] },
                { icon: "🔨", title: "Right to Constitutional Remedies", articles: "32", color: "#e74c3c", points: ["Right to move Supreme Court for enforcement","Supreme Court can issue writs","Called 'heart and soul' by Dr. Ambedkar","Suspension during emergency"] },
              ].map((r, i) => (
                <div key={i} className="card-hover" style={{ ...glass, borderRadius: 22, padding: 30, borderTop: `4px solid ${r.color}`, animation: `fadeUp 0.5s ease ${i*0.1}s both` }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>{r.icon}</div>
                  <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 16, color: r.color, marginBottom: 4 }}>{r.title}</h3>
                  <p style={{ fontSize: 12, color: muted, marginBottom: 16 }}>Articles {r.articles}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {r.points.map((p, j) => (
                      <li key={j} style={{ fontSize: 13, color: muted, display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: r.color, marginTop: 2 }}>›</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ DUTIES ═══════════════ */}
        {section === "duties" && (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: green, textAlign: "center", marginBottom: 8 }}>Fundamental Duties</h1>
            <p style={{ textAlign: "center", color: muted, marginBottom: 50, fontSize: 15 }}>Article 51A — Added by 42nd Amendment (1976)</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
              {T.duties.map((duty, i) => (
                <div key={i} className="card-hover" style={{ ...glass, borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 12, animation: `fadeUp 0.4s ease ${i*0.07}s both` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15 }}>{i + 1}</div>
                    <span style={{ fontSize: 13, color: text, fontWeight: 600, lineHeight: 1.4 }}>{duty}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...glass, borderRadius: 20, padding: 28, marginTop: 40, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🇮🇳</div>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 18, color: saffron, lineHeight: 1.7 }}>"With rights come responsibilities. A true Indian fulfills their duties to build a stronger nation."</p>
            </div>
          </div>
        )}

        {/* ═══════════════ QUIZ ═══════════════ */}
        {section === "quiz" && (
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: saffron, textAlign: "center", marginBottom: 8 }}>{T.quizTitle}</h1>
            <p style={{ textAlign: "center", color: muted, marginBottom: 40, fontSize: 15 }}>{T.quizSub}</p>

            {!quizState.mode && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
                {T.quizModes.map((mode, i) => {
                  const icons = ["🌱","📖","🎓","🏆","⚡"];
                  const colors = [green, saffron, navy, "#e74c3c", "#9b59b6"];
                  return (
                    <button key={i} className="btn card-hover" onClick={() => setQuizState({ mode, idx: 0, score: 0, answered: null, done: false })}
                      style={{ ...glass, borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, fontSize: 40, border: `2px solid ${colors[i]}40` }}>
                      <span>{icons[i]}</span>
                      <span style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: colors[i] }}>{mode}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {quizState.mode && !quizState.done && (
              <div style={{ ...glass, borderRadius: 24, padding: 36, animation: "fadeUp 0.4s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <span style={{ fontSize: 13, color: muted }}>Question {quizState.idx + 1}/{QUIZ_QUESTIONS.length}</span>
                  <span style={{ color: saffron, fontWeight: 700 }}>Score: {quizState.score}</span>
                </div>
                <div style={{ height: 4, background: border, borderRadius: 2, marginBottom: 28 }}>
                  <div style={{ height: "100%", width: `${((quizState.idx) / QUIZ_QUESTIONS.length) * 100}%`, background: `linear-gradient(90deg,${saffron},${green})`, borderRadius: 2, transition: "width 0.5s" }} />
                </div>
                <h2 style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 28 }}>{QUIZ_QUESTIONS[quizState.idx].q}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {QUIZ_QUESTIONS[quizState.idx].opts.map((opt, i) => {
                    let bg = cardBg; let bc = border;
                    if (quizState.answered !== null) {
                      if (i === QUIZ_QUESTIONS[quizState.idx].ans) { bg = `${green}20`; bc = green; }
                      else if (i === quizState.answered && i !== QUIZ_QUESTIONS[quizState.idx].ans) { bg = `rgba(231,76,60,0.15)`; bc = "#e74c3c"; }
                    }
                    return (
                      <button key={i} className="btn" onClick={() => {
                        if (quizState.answered !== null) return;
                        const correct = i === QUIZ_QUESTIONS[quizState.idx].ans;
                        setQuizState(s => ({ ...s, answered: i, score: correct ? s.score + 10 : s.score }));
                      }} style={{ padding: "14px 18px", borderRadius: 12, border: `1px solid ${bc}`, background: bg, color: text, textAlign: "left", fontSize: 14, transition: "all 0.3s" }}>
                        <span style={{ color: saffron, marginRight: 10 }}>{["A","B","C","D"][i]}.</span>{opt}
                      </button>
                    );
                  })}
                </div>
                {quizState.answered !== null && (
                  <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: `${green}15`, border: `1px solid ${green}30` }}>
                    <p style={{ fontSize: 13, color: green, fontWeight: 600, marginBottom: 4 }}>💡 Explanation</p>
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{QUIZ_QUESTIONS[quizState.idx].exp}</p>
                    <button className="btn" onClick={() => {
                      const next = quizState.idx + 1;
                      if (next >= QUIZ_QUESTIONS.length) setQuizState(s => ({ ...s, done: true }));
                      else setQuizState(s => ({ ...s, idx: next, answered: null }));
                    }} style={{ marginTop: 14, padding: "10px 24px", borderRadius: 12, background: `linear-gradient(135deg,${saffron},${green})`, color: "#fff", fontWeight: 700, fontSize: 14 }}>
                      {quizState.idx + 1 < QUIZ_QUESTIONS.length ? "Next Question →" : "See Results"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {quizState.done && (
              <div style={{ ...glass, borderRadius: 24, padding: 48, textAlign: "center", animation: "fadeUp 0.5s ease" }}>
                <div style={{ fontSize: 72, marginBottom: 16 }}>{quizState.score >= 60 ? "🏆" : quizState.score >= 30 ? "🥈" : "📚"}</div>
                <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 28, color: saffron, marginBottom: 8 }}>Quiz Complete!</h2>
                <p style={{ fontSize: 16, color: muted, marginBottom: 24 }}>You scored <strong style={{ color: green }}>{quizState.score}</strong> out of {QUIZ_QUESTIONS.length * 10}</p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="btn" onClick={() => setQuizState({ mode: null, idx: 0, score: 0, answered: null, done: false })} style={{ padding: "12px 28px", borderRadius: 14, background: `linear-gradient(135deg,${saffron},${green})`, color: "#fff", fontWeight: 700 }}>Play Again</button>
                  <button className="btn" onClick={() => setSection("leaderboard")} style={{ padding: "12px 28px", borderRadius: 14, border: `1px solid ${border}`, background: "transparent", color: text, fontWeight: 600 }}>View Leaderboard</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ LEADERBOARD ═══════════════ */}
        {section === "leaderboard" && (
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: saffron, textAlign: "center", marginBottom: 8 }}>{T.leaderboard}</h1>
            <p style={{ textAlign: "center", color: muted, marginBottom: 40 }}>Top constitutional knowledge champions</p>
            <div style={{ ...glass, borderRadius: 24, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "50px 1fr auto auto", gap: 0, padding: "14px 24px", background: `linear-gradient(135deg,${saffron}20,${green}20)`, borderBottom: `1px solid ${border}` }}>
                {[T.rank, T.user, T.points, T.badge].map((h, i) => (
                  <span key={i} style={{ fontSize: 12, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: i > 1 ? "center" : "left" }}>{h}</span>
                ))}
              </div>
              {LEADERBOARD.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "50px 1fr auto auto", gap: 0, padding: "18px 24px", borderBottom: i < LEADERBOARD.length - 1 ? `1px solid ${border}` : "none", background: i < 3 ? `linear-gradient(135deg,${saffron}05,${green}05)` : "transparent", transition: "background 0.2s" }}>
                  <span style={{ fontFamily: "'Cinzel',serif", color: [saffron, "#c0c0c0", "#cd7f32"][i] || muted, fontWeight: 700, fontSize: 16 }}>#{row.rank}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{row.name}</div>
                    <div style={{ fontSize: 12, color: muted }}>{row.city}</div>
                  </div>
                  <span style={{ color: green, fontWeight: 700, fontSize: 15, textAlign: "center", alignSelf: "center" }}>{row.points.toLocaleString()}</span>
                  <span style={{ fontSize: 22, textAlign: "center", alignSelf: "center" }}>{row.badge}</span>
                </div>
              ))}
              {user && (
                <div style={{ padding: "16px 24px", background: `${saffron}10`, borderTop: `1px solid ${saffron}30`, display: "grid", gridTemplateColumns: "50px 1fr auto auto", gap: 0 }}>
                  <span style={{ fontFamily: "'Cinzel',serif", color: saffron, fontWeight: 700 }}>#{user.rank}</span>
                  <div><div style={{ fontWeight: 600, fontSize: 14 }}>{user.name} (You)</div><div style={{ fontSize: 12, color: muted }}>Your Position</div></div>
                  <span style={{ color: green, fontWeight: 700, fontSize: 15, textAlign: "center", alignSelf: "center" }}>{user.xp}</span>
                  <span style={{ fontSize: 22, textAlign: "center", alignSelf: "center" }}>🎖️</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════ AI ASSISTANT ═══════════════ */}
        {section === "ai" && (
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px", display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
            <div style={{ textAlign: "center", marginBottom: 28, flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, animation: "glow 2s infinite" }}>🤖</div>
              </div>
              <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", color: saffron }}>{T.aiTitle}</h1>
              <p style={{ color: muted, fontSize: 13, marginTop: 4 }}>Powered by Anthropic's Claude AI</p>
            </div>

            {/* Chat */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, marginBottom: 16 }}>
              {aiMessages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", animation: "fadeUp 0.3s ease" }}>
                  {msg.role === "ai" && <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 10, flexShrink: 0, alignSelf: "flex-end" }}>🤖</div>}
                  <div style={{ maxWidth: "75%", padding: "14px 18px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role === "user" ? `linear-gradient(135deg,${saffron},${green})` : cardBg, border: msg.role === "ai" ? `1px solid ${border}` : "none", color: msg.role === "user" ? "#fff" : text, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {msg.text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
                  <div style={{ ...glass, borderRadius: 18, padding: "14px 18px", border: `1px solid ${border}` }}>
                    <span className="typing-dot" style={{ marginRight: 4 }}>●</span><span className="typing-dot" style={{ marginRight: 4 }}>●</span><span className="typing-dot">●</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12, flexShrink: 0 }}>
              {["Explain Article 21","What are my rights?","Tell me about the Preamble","Who is Dr. Ambedkar?"].map((prompt, i) => (
                <button key={i} className="btn" onClick={() => { setAiInput(prompt); }} style={{ padding: "6px 12px", borderRadius: 20, background: `${saffron}15`, border: `1px solid ${saffron}30`, color: saffron, fontSize: 12 }}>{prompt}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: 10, ...glass, borderRadius: 16, padding: 8, border: `1px solid ${border}`, flexShrink: 0 }}>
              <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAI()} placeholder={T.aiPlaceholder}
                style={{ flex: 1, background: "transparent", border: "none", color: text, fontSize: 14, padding: "8px 12px" }} />
              <button className="btn" onClick={sendAI} style={{ padding: "10px 20px", borderRadius: 12, background: `linear-gradient(135deg,${saffron},${green})`, color: "#fff", fontWeight: 700, fontSize: 14 }}>{T.aiSend}</button>
            </div>
          </div>
        )}

        {/* ═══════════════ LEADERS ═══════════════ */}
        {section === "leaders" && (
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: saffron, textAlign: "center", marginBottom: 8 }}>{T.leadersTitle}</h1>
            <p style={{ textAlign: "center", color: muted, marginBottom: 50, fontSize: 15 }}>Visionaries who gave India its Constitution</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
              {LEADERS.map((leader, i) => (
                <div key={i} className="card-hover" style={{ ...glass, borderRadius: 24, padding: 30, borderTop: `4px solid ${leader.color}`, animation: `fadeUp 0.5s ease ${i*0.1}s both`, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${leader.color}40,${leader.color}80)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: `2px solid ${leader.color}` }}>{leader.emoji}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 15, color: leader.color, marginBottom: 2 }}>{leader.name}</h3>
                      <p style={{ fontSize: 12, color: muted }}>{leader.role}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{leader.bio}</p>
                  <div style={{ borderLeft: `3px solid ${leader.color}`, paddingLeft: 12, fontSize: 13, color: text, fontStyle: "italic", lineHeight: 1.6 }}>"{leader.quote}"</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ ABOUT ═══════════════ */}
        {section === "about" && (
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: saffron, textAlign: "center", marginBottom: 8 }}>{T.aboutTitle}</h1>
            <p style={{ textAlign: "center", color: muted, marginBottom: 50, fontSize: 16, maxWidth: 600, margin: "0 auto 50px" }}>{T.aboutDesc}</p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 20, marginBottom: 60 }}>
              {[{ n: "1B+", label: "Citizens to Reach", icon: "🇮🇳" }, { n: "22", label: "Official Languages", icon: "🗣️" }, { n: "448", label: "Articles Covered", icon: "📜" }, { n: "100%", label: "Free Education", icon: "🎓" }].map((s, i) => (
                <div key={i} className="card-hover" style={{ ...glass, borderRadius: 18, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: 28, color: saffron, fontWeight: 900 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mission */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
              {[
                { icon: "🎯", title: "Our Mission", desc: "To make the Constitution of India accessible, understandable, and relatable to every citizen — from students to seniors, in every language.", color: saffron },
                { icon: "🚀", title: "Our Vision", desc: "A constitutionally literate India where every citizen knows their rights, fulfills their duties, and participates in democracy.", color: green },
                { icon: "💡", title: "AI-Powered Learning", desc: "Using cutting-edge AI to simplify complex legal language, generate personalized quizzes, and answer constitutional questions instantly.", color: navy },
                { icon: "🤝", title: "Youth Empowerment", desc: "Specially designed for students and young citizens who will shape India's democratic future.", color: "#9b59b6" },
              ].map((card, i) => (
                <div key={i} className="card-hover" style={{ ...glass, borderRadius: 20, padding: 28, borderLeft: `4px solid ${card.color}` }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 16, color: card.color, marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ PROFILE ═══════════════ */}
        {section === "profile" && (
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
            {!user ? (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontFamily: "'Cinzel',serif", color: saffron, marginBottom: 16 }}>{T.profileTitle}</h2>
                <p style={{ color: muted, marginBottom: 24 }}>Please login to view your profile</p>
                <button className="btn" onClick={() => setAuthMode("login")} style={{ padding: "14px 32px", borderRadius: 14, background: `linear-gradient(135deg,${saffron},${green})`, color: "#fff", fontWeight: 700, fontSize: 16 }}>{T.login}</button>
              </div>
            ) : (
              <>
                <div style={{ ...glass, borderRadius: 24, padding: 36, marginBottom: 24, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: "#fff", flexShrink: 0 }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 22, marginBottom: 4 }}>{user.name}</h2>
                    <p style={{ fontSize: 13, color: muted, marginBottom: 10 }}>{user.email}</p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      {[{ label: T.level, value: user.level, icon: "⭐" }, { label: T.streak, value: user.streak, icon: "🔥" }, { label: "Rank", value: `#${user.rank}`, icon: "🏆" }].map((stat, i) => (
                        <div key={i} style={{ ...glass, borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
                          <div style={{ fontSize: 18 }}>{stat.icon}</div>
                          <div style={{ fontWeight: 700, fontSize: 16, color: saffron }}>{stat.value}</div>
                          <div style={{ fontSize: 11, color: muted }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* XP Bar */}
                <div style={{ ...glass, borderRadius: 20, padding: 28, marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: saffron }}>Experience Points</span>
                    <span style={{ color: muted, fontSize: 13 }}>{user.xp} / 2000 XP</span>
                  </div>
                  <div style={{ height: 10, background: border, borderRadius: 5 }}>
                    <div style={{ height: "100%", width: `${(user.xp/2000)*100}%`, background: `linear-gradient(90deg,${saffron},${green})`, borderRadius: 5, transition: "width 1s" }} />
                  </div>
                </div>

                {/* Badges */}
                <div style={{ ...glass, borderRadius: 20, padding: 28, marginBottom: 20 }}>
                  <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 16, marginBottom: 20, color: saffron }}>{T.badges}</h3>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {[...user.badges, "🔒", "🔒", "🔒"].map((b, i) => (
                      <div key={i} style={{ width: 64, height: 64, borderRadius: 16, background: b !== "🔒" ? `linear-gradient(135deg,${saffron}30,${green}30)` : border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `1px solid ${b !== "🔒" ? saffron + "40" : border}`, opacity: b === "🔒" ? 0.4 : 1 }}>{b}</div>
                    ))}
                  </div>
                </div>

                <button className="btn" onClick={() => setUser(null)} style={{ padding: "12px 24px", borderRadius: 12, border: `1px solid rgba(231,76,60,0.3)`, background: "rgba(231,76,60,0.1)", color: "#e74c3c", fontSize: 14 }}>Sign Out</button>
              </>
            )}
          </div>
        )}

        {/* ═══════════════ LANGUAGES ═══════════════ */}
        {section === "languages" && (
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 56, marginBottom: 14 }}>🌐</div>
              <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,4vw,3rem)", marginBottom: 10 }}>
                <span style={{ background: `linear-gradient(135deg,${saffron},${green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Language Settings</span>
              </h1>
              <p style={{ color: muted, fontSize: 15, maxWidth: 520, margin: "0 auto" }}>
                Choose your preferred language. The entire website — articles, quiz, AI assistant, navigation — switches instantly.
              </p>
            </div>

            {/* Active language banner */}
            <div style={{ ...glass, borderRadius: 20, padding: "20px 28px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", borderLeft: `5px solid ${saffron}`, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${saffron},${green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✅</div>
                <div>
                  <div style={{ fontSize: 12, color: muted, marginBottom: 2 }}>Currently Active</div>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, color: saffron, fontWeight: 700 }}>{lang}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: muted }}>All content is shown in <strong style={{ color: text }}>{lang}</strong></div>
            </div>

            {/* Language grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
              {[
                { name: "English",   native: "English",   flag: "🇬🇧", script: "Latin",       status: "full" },
                { name: "Hindi",     native: "हिन्दी",      flag: "🇮🇳", script: "Devanagari",  status: "full" },
                { name: "Kannada",   native: "ಕನ್ನಡ",       flag: "🇮🇳", script: "Kannada",     status: "coming" },
                { name: "Tamil",     native: "தமிழ்",       flag: "🇮🇳", script: "Tamil",       status: "coming" },
                { name: "Telugu",    native: "తెలుగు",      flag: "🇮🇳", script: "Telugu",      status: "coming" },
                { name: "Marathi",   native: "मराठी",       flag: "🇮🇳", script: "Devanagari",  status: "coming" },
                { name: "Bengali",   native: "বাংলা",       flag: "🇮🇳", script: "Bengali",     status: "coming" },
                { name: "Malayalam", native: "മലയാളം",      flag: "🇮🇳", script: "Malayalam",   status: "coming" },
                { name: "Gujarati",  native: "ગુજરાતી",     flag: "🇮🇳", script: "Gujarati",    status: "coming" },
                { name: "Punjabi",   native: "ਪੰਜਾਬੀ",      flag: "🇮🇳", script: "Gurmukhi",    status: "coming" },
              ].map((l, i) => {
                const isActive = lang === l.name;
                const isAvailable = l.status === "full";
                return (
                  <button key={i} className="btn card-hover" onClick={() => isAvailable && setLang(l.name)}
                    style={{ ...glass, borderRadius: 18, padding: "22px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
                      border: isActive ? `2px solid ${saffron}` : `1px solid ${border}`,
                      background: isActive ? (d ? `linear-gradient(135deg,rgba(255,153,51,0.12),rgba(19,136,8,0.08))` : `rgba(255,153,51,0.08)`) : cardBg,
                      opacity: !isAvailable && !isActive ? 0.6 : 1,
                      cursor: isAvailable ? "pointer" : "default",
                      position: "relative", textAlign: "left" }}>
                    {isActive && (
                      <div style={{ position: "absolute", top: 12, right: 12, width: 22, height: 22, borderRadius: "50%", background: saffron, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>✓</div>
                    )}
                    {!isAvailable && (
                      <div style={{ position: "absolute", top: 10, right: 10, background: `${navy}30`, border: `1px solid ${navy}40`, borderRadius: 6, padding: "2px 7px", fontSize: 10, color: muted }}>Coming Soon</div>
                    )}
                    <div style={{ fontSize: 30 }}>{l.flag}</div>
                    <div>
                      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: isActive ? saffron : text, fontWeight: 700, marginBottom: 2 }}>{l.name}</div>
                      <div style={{ fontSize: 16, color: isActive ? green : muted, marginBottom: 4 }}>{l.native}</div>
                      <div style={{ fontSize: 11, color: muted, background: d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", padding: "2px 8px", borderRadius: 4, display: "inline-block" }}>{l.script}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* What changes info */}
            <div style={{ ...glass, borderRadius: 18, padding: 24, marginTop: 36, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
              <div>
                <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: saffron, marginBottom: 12 }}>What changes when you switch language?</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 }}>
                  {["Navbar & Buttons","Hero Section","Article Descriptions","Quiz Questions & Answers","AI Assistant Responses","Fundamental Rights & Duties","Footer & Notifications","Profile Dashboard"].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: muted }}>
                      <span style={{ color: green, fontWeight: 700 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick switch */}
            <div style={{ marginTop: 36, textAlign: "center" }}>
              <p style={{ color: muted, fontSize: 13, marginBottom: 14 }}>Quick switch — fully translated languages:</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {[{ key: "English", label: "🇬🇧 English" }, { key: "Hindi", label: "🇮🇳 हिन्दी" }].map(({ key, label }) => (
                  <button key={key} className="btn" onClick={() => setLang(key)}
                    style={{ padding: "12px 28px", borderRadius: 14, background: lang === key ? `linear-gradient(135deg,${saffron},${green})` : "transparent", border: `1px solid ${lang === key ? "transparent" : border}`, color: lang === key ? "#fff" : text, fontWeight: lang === key ? 700 : 400, fontSize: 15 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: d ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.04)", borderTop: `1px solid ${border}`, padding: "60px 24px 30px", marginTop: 80 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <AshokaChakra size={32} opacity={1} color={navy} spin />
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 900, background: `linear-gradient(135deg,${saffron},${green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SAMVIDHAN</span>
              </div>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>India's AI-powered constitutional awareness platform. Making the Constitution accessible to every Indian citizen.</p>
            </div>
            {[
              { title: "Quick Links", links: [["Home","home"],["Fundamental Rights","rights"],["Fundamental Duties","duties"],["Quiz Zone","quiz"],["Leaders","leaders"]] },
              { title: "Learn", links: [["Constitution Explorer","explorer"],["AI Assistant","ai"],["Leaderboard","leaderboard"],["About","about"]] },
              { title: "Connect", links: [["Twitter",""],["Instagram",""],["YouTube",""],["Contact",""]] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: 13, color: saffron, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>{col.title}</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map(([label, target], j) => (
                    <li key={j}><span className="nav-link" style={{ fontSize: 13, color: muted }} onClick={() => target && setSection(target)}>{label}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer quote */}
          <div style={{ borderTop: `1px solid ${border}`, paddingTop: 24, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", height: 4, width: 120 }}>
                <div style={{ flex: 1, background: saffron }} /><div style={{ flex: 1, background: "#fff", border: `1px solid ${border}` }} /><div style={{ flex: 1, background: green }} />
              </div>
            </div>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: muted, fontStyle: "italic" }}>"{T.footerQuote}"</p>
            <p style={{ fontSize: 12, color: muted, marginTop: 10 }}>© 2024 SAMVIDHAN. Educational platform for constitutional awareness.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}<input
  type="text"
  placeholder="Search Articles, Rights, Duties..."
/>const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;