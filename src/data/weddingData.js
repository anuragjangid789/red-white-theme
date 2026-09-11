/**
 * MASTER WEDDING DATA CONFIGURATION
 * Conforms strictly to PRD #140, #148, #208.
 * Supports standard placeholders ([COUPLE_NAMES], [WEDDING_DATE], [VENUE_NAME], etc.)
 * with luxury curated defaults that can be swapped instantly without breaking layout.
 */

export const weddingData = {
  identity: {
    coupleNames: "Arusha & Akshit",
    brideName: "Arusha",
    groomName: "Akshit",
    weddingDate: "2026-11-28T10:30:00",
    displayDate: "28 · 11 · 2026",
    dateFormatted: "Saturday, November 28, 2026",
    city: "Udaipur, Rajasthan",
    venueName: "The Oberoi Udaivilas, Lake Pichola",
    monogram: "A & A",
    tagline: "A celebration of love, heritage, and timeless grace",
    hostsGrandparents: "SMT. PUSHPA & SHRI CHANDRABAN JI RELAN",
    invitationHeadline: "REQUEST THE HONOUR OF YOUR PRESENCE",
    invitationSubheadline: "TO CELEBRATE THE WEDDING OF THEIR GRANDDAUGHTER",
    brideParents: "D/O SMT. MANISHA & SHRI RAKESH RELAN",
    groomGrandparentsLine1: "GRAND S/O SMT. SHAKUNTALA RANI",
    groomGrandparentsLine2: "& LATE SHRI VISHANDAS KHATRI",
    groomParents: "S/O SMT. MONICA & SHRI MANOJ KHATRI",
  },

  theme: {
    colors: {
      ivory: "#FDFBF7",
      beige: "#F5EFEB",
      sage: "#8A9A86",
      peacock: "#1A3636",
      dustyPink: "#D4A39D",
      antiqueGold: "#C5A059",
      ink: "#222222",
      muted: "#7A7672",
    },
    fonts: {
      displaySerif: "'Cormorant Garamond', Georgia, serif",
      royalSerif: "'Cinzel', 'Times New Roman', serif",
      minimalSans: "'Plus Jakarta Sans', -apple-system, sans-serif",
    },
  },

  intro: {
    envelopeColor: "#801B26", // Deep Royal Crimson / Velvet Burgundy
    linerColor: "#C5A059", // Antique Royal Gold Foil
    sealColor: "#801B26", // Royal Burgundy / Crimson Wax
    sealMonogram: "A & A",
    ctaText: "CLICK WAX SEAL TO OPEN",
    instruction: "Tap the royal wax seal to unveil your personal invitation",
    cardHeading: "WELCOME TO THE WEDDING CELEBRATIONS OF",
  },

  home: {
    label: "INVITATION INDEX",
    title: "Radhika & Veer",
    citySubtitle: "A CELEBRATION IN UDAIPUR",
    leadCopy: "You are cordially invited to enter our palace world and partake in three days of joyous festivity along the serene waters of Lake Pichola.",
    cards: [
      {
        id: "family",
        number: "01",
        title: "Family Details",
        subtitle: "Relan & Khatri Families",
        category: "LINEAGE",
        href: "#family",
        badge: "FAMILY & PARENTS",
        description: "The heritage, lineage, and parents of the Relan & Khatri families.",
      },
      {
        id: "save-the-date",
        number: "02",
        title: "Save The Date",
        subtitle: "28 November 2026",
        category: "CALENDAR",
        href: "#save-the-date",
        badge: "COUNTDOWN",
        description: "Mark your calendar for an unforgettable royal soiree.",
      },
      {
        id: "story",
        number: "03",
        title: "Our Story",
        subtitle: "A Tapestry of Moments",
        category: "MEMOIR",
        href: "#story",
        badge: "THE JOURNEY",
        description: "From a chance library meeting to a shared lifetime promise.",
      },
      {
        id: "events",
        number: "04",
        title: "The Celebrations",
        subtitle: "Three Days of Festivities",
        category: "FESTIVITIES",
        href: "#events",
        badge: "5 EVENTS",
        description: "Mehendi by the courtyard to the grand royal wedding pheras.",
      },
      {
        id: "venue",
        number: "05",
        title: "The Venue",
        subtitle: "The Oberoi Udaivilas",
        category: "DESTINATION",
        href: "#venue",
        badge: "PALACE GROUNDS",
        description: "Domes, fountains, and jharokhas on the banks of Lake Pichola.",
      },
      {
        id: "gallery",
        number: "06",
        title: "The Gallery",
        subtitle: "Moments in Stillness",
        category: "EDITORIAL",
        href: "#gallery",
        badge: "MEMORIES",
        description: "A curated coffee-table chronicle of intimate memories.",
      },
    ],
  },

  welcome: {
    sectionLabel: "01 — DESTINATION REVEAL",
    destination: "UDAIPUR, RAJASTHAN",
    palaceName: "The Oberoi Udaivilas",
    welcomeCopy:
      "Where centuries-old Mewar architecture meets the tranquil ripples of Lake Pichola. We welcome you to step beyond the carved sandstone arches into a sacred celebration crafted in devotion and Pichwai artistry.",
    scrollHint: "SCROLL TO DISCOVER",
  },

  couple: {
    sectionLabel: "02 — THE TWO OF US",
    title: "Radhika & Veer",
    subtitle: "A meeting of minds, hearts, and kindred spirits.",
    bride: {
      name: "Radhika Sharma",
      role: "The Bride",
      bio: "An architect of spaces and dreams, Radhika brings gentle grace, poetic vision, and an eye for the delicate Pichwai traditions of her ancestral homeland.",
      quote: "“In your stillness, I found my greatest adventure.”",
    },
    groom: {
      name: "Veer Singhania",
      role: "The Groom",
      bio: "A thinker, strategist, and lover of timeless classical melodies, Veer carries steady warmth, generous laughter, and an unwavering devotion to those he cherishes.",
      quote: "“With you, every destination feels like coming home.”",
    },
    familyIntro: {
      heading: "TOGETHER WITH OUR FAMILIES",
      subheading: "With the love, blessings, and lifelong guidance of",
      brideFamily: "Smt. Sunita & Shri Rajendra Sharma",
      groomFamily: "Smt. Meenakshi & Shri Vikramaditya Singhania",
      message:
        "Request the honour of your esteemed presence and blessings as our beloved children embark on their sacred journey of union.",
    },
  },

  saveTheDate: {
    sectionLabel: "03 — SAVE THE DATE",
    heading: "Save The Date",
    dateText: "28 · 11 · 2026",
    fullDateText: "Saturday, Twenty-Eighth of November, Two Thousand Twenty-Six",
    venueText: "The Oberoi Udaivilas · Udaipur, Rajasthan",
    postWeddingMessage: "THE CELEBRATION HAS BEGUN",
    addToCalendarTitle: "Wedding Celebrations of Radhika & Veer",
    calendarDescription: "Join us in Udaipur for the destination wedding celebrations of Radhika and Veer at The Oberoi Udaivilas.",
    calendarLocation: "The Oberoi Udaivilas, Lake Pichola, Udaipur, Rajasthan 313001",
  },

  story: [
    {
      id: "story-1",
      year: "2020",
      eyebrow: "CHAPTER I",
      title: "A Serendipitous Beginning",
      description:
        "Amidst the quiet corridors of a heritage bookstore in New Delhi, two seekers of rare art manuscripts happened upon the exact same volume of Mewar miniature paintings. What began as a polite exchange over gold leaf pigments turned into an evening of unbroken conversation.",
      alignment: "left",
      quote: "“A shared silence that spoke louder than any words.”",
    },
    {
      id: "story-2",
      year: "2022",
      eyebrow: "CHAPTER II",
      title: "The First Journey",
      description:
        "A spontaneous winter expedition across Rajasthan's desert outposts led them to the ghats of Udaipur. Under a twilight sky reflected on Lake Pichola, they realized their rhythms moved to the same timeless tempo.",
      alignment: "right",
      quote: "“Under the stars of Mewar, promises needed no spoken vow.”",
    },
    {
      id: "story-3",
      year: "2024",
      eyebrow: "CHAPTER III",
      title: "The Quiet Promise",
      description:
        "On a sunlit morning in an ancient temple courtyard scented with night-blooming jasmine and marigolds, Veer asked Radhika to build a lifetime of shared dreams together. She said yes before the chime of the courtyard bell had even faded.",
      alignment: "left",
      quote: "“The easiest yes two hearts could ever whisper.”",
    },
    {
      id: "story-4",
      year: "2026",
      eyebrow: "CHAPTER IV",
      title: "The Sacred Union",
      description:
        "Surrounded by family, lifelong companions, and the sacred sacred fire, we gather where our story first blossomed to begin our greatest chapter yet.",
      alignment: "right",
      quote: "“Two lives, one shared tapestry of love.”",
    },
  ],

  events: [
    {
      id: "mayra",
      number: "01",
      title: "Mayra",
      subtitle: "Sacred Maternal Blessings & Shagun",
      date: "15 August 2026",
      time: "12:30 Pm onword",
      subtext: "(Followed by Lunch)",
      venue: "Orchid Banquet,",
      subVenue: "Avadh Utopia, Vapi",
      dressCode: "Festive Elegance",
      dressCodeColors: ["#F58220", "#1E381E", "#C70D48"],
      motif: "/assets/mayra_clean.png",
      motifWebp: "/assets/mayra png.webp",
      motifAlt: "Traditional Mayra Bajot & Shagun Thali",
      layoutType: "left-motif-right-text",
      flowers: {
        bottomLeft: true,
        topRight: true,
      },
      pearls: "top-left-curve",
    },
    {
      id: "haldi",
      number: "02",
      title: "Haldi",
      subtitle: "Auspicious Turmeric & Morning Joy",
      date: "16 August 2026",
      time: "9:00 Am onword",
      subtext: "(Followed by Lunch)",
      venue: "Marigold Lawn",
      subVenue: "",
      dressCode: "Yellows & Vibrant Hues",
      dressCodeColors: ["#F58220", "#1E381E", "#C70D48"],
      motif: "/assets/haldi_clean.png",
      motifWebp: "/assets/haldi png.webp",
      motifAlt: "Traditional Haldi Okhli Pestle & Decorated Toran",
      layoutType: "right-motif-left-text",
      flowers: {
        bottomRight: true,
        topLeft: true,
      },
      pearls: "top-left-curve",
    },
    {
      id: "sangeet",
      number: "03",
      title: "Sangeet",
      subtitle: "Melodies, Dance & Royal Glamour",
      date: "17 August 2026",
      time: "6:00 Pm onword",
      subtext: "(Followed by Lunch)",
      venue: "Marigold Lawn",
      subVenue: "",
      dressCode: "Regal Velvet & Festive Sparkle",
      dressCodeColors: ["#F58220", "#1E381E", "#C70D48"],
      motif: "/assets/sangeet_clean.png",
      motifWebp: "/assets/sangeet png.webp",
      motifAlt: "Royal Gramophone with Golden Musical Notes",
      layoutType: "left-motif-right-text",
      flowers: {
        bottomLeft: true,
        topRight: true,
      },
      pearls: "across-curve",
    },
    {
      id: "wedding",
      number: "04",
      title: "Wedding",
      subtitle: "The Auspicious Royal Vows",
      date: "17 August 2026",
      time: "6:00 Pm onword",
      subtext: "(Followed by Lunch)",
      venue: "Marigold Lawn",
      subVenue: "",
      dressCode: "Royal Heritage & Traditional Couture",
      dressCodeColors: ["#F58220", "#1E381E", "#C70D48"],
      motif: "/assets/wedding_clean.png",
      motifWebp: "/assets/wedding png.webp",
      secondaryMotif: "/assets/wedding 2_clean.png",
      secondaryMotifWebp: "/assets/wedding png 2.webp",
      motifAlt: "Royal Kalgi Jewelry & Traditional Bridal Nath",
      layoutType: "dual-jewelry-motif",
      flowers: {
        bottomLeft: true,
        topRight: true,
      },
      pearls: "pearl-strands",
    },
  ],


  venue: {
    sectionLabel: "05 — THE VENUE",
    title: "The Oberoi Udaivilas",
    city: "Udaipur, Rajasthan",
    tagline: "A Royal Sanctuary on the Waters of Lake Pichola",
    description:
      "Spread over fifty acres on the banks of Lake Pichola, The Oberoi Udaivilas stands on the two-hundred-year-old hunting grounds of the Maharana of Mewar. Conceived as a traditional Mewari palace with interlocking courtyards, hand-painted gold leaf domes, rippling fountains, and serene pavilions, it provides the ultimate setting for a celebration steeped in poetic Indian heritage.",
    address: "Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001",
    mapUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
    highlights: [
      {
        number: "50",
        label: "Acres of Heritage Gardens",
        desc: "Lush bougainvillea groves, peacocks, and reflecting ponds",
      },
      {
        number: "200",
        label: "Years of Royal Lineage",
        desc: "Constructed on historic Mewari heritage grounds",
      },
      {
        number: "360°",
        label: "Views of Lake Pichola",
        desc: "Panoramic vistas of City Palace and Jag Mandir",
      },
    ],
  },


  gallery: [
    {
      id: "gal-1",
      title: "Twilight on Lake Pichola",
      caption: "Gold-leaf pavilions silhouetted against the tranquil waters of Mewar.",
      category: "Destination",
      aspect: "landscape",
      accent: "#C5A059",
    },
    {
      id: "gal-2",
      title: "The Carved Jharokha",
      caption: "Hand-chiseled yellow sandstone arches framing the morning light.",
      category: "Architecture",
      aspect: "portrait",
      accent: "#8A9A86",
    },
    {
      id: "gal-3",
      title: "Hand-Crafted Pichwai Florals",
      caption: "Sacred lotus blooms and dancing peacocks painted in natural mineral pigments.",
      category: "Heritage Art",
      aspect: "portrait",
      accent: "#D4A39D",
    },
    {
      id: "gal-4",
      title: "The Courtyard of Fountains",
      caption: "Fountain ripples reflecting starry palace chandeliers at twilight.",
      category: "Palace",
      aspect: "landscape",
      accent: "#1A3636",
    },
    {
      id: "gal-5",
      title: "Whispers in the Garden",
      caption: "Strolling through fragrant bougainvillea paths under the winter sun.",
      category: "Intimate Moments",
      aspect: "portrait",
      accent: "#C5A059",
    },
    {
      id: "gal-6",
      title: "The Mandap by Twilight",
      caption: "Where sacred mantras echo across the calm lakes of Rajasthan.",
      category: "Sacred Union",
      aspect: "landscape",
      accent: "#8A9A86",
    },
  ],

  parents: {
    sectionLabel: "07 — BLESSINGS",
    heading: "With The Love & Blessings Of Our Families",
    subheading:
      "As we step into this sacred chapter, we hold in our hearts the boundless devotion, sacrifice, and timeless values bestowed upon us by our parents and grandparents.",
    brideSide: {
      familyTitle: "THE SHARMA FAMILY",
      parents: "Smt. Sunita & Shri Rajendra Sharma",
      elders: "Blessings of Late Smt. Kamala Devi & Late Shri Ramnarayan Sharma",
    },
    groomSide: {
      familyTitle: "THE SINGHANIA FAMILY",
      parents: "Smt. Meenakshi & Shri Vikramaditya Singhania",
      elders: "Blessings of Smt. Gayatri Devi & Late Shri Devendra Singhania",
    },
    blessingQuote: "“May their union be as enduring as the mountains, as gentle as the river, and as radiant as the golden sun of Mewar.”",
  },


  closing: {
    monogram: "A & A",
    coupleNames: "Arusha & Akshit",
    date: "28 November 2026",
    city: "Udaipur, Rajasthan",
    farewellMessage: "WE CANNOT WAIT TO WELCOME YOU IN THE CITY OF LAKES",
    replayButton: "REPLAY INVITATION EXPERIENCE",
    backToTop: "RETURN TO TOP",
  },
};
