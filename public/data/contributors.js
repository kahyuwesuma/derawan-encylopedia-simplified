/**
 * DERAWAN ENCYCLOPEDIA — CONTRIBUTORS DATA
 * Data-driven architecture for all people behind the encyclopedia.
 *
 * status values:
 *   "confirmed"    — information has been verified
 *   "tbc"          — to be confirmed
 *   "coming-soon"  — placeholder, details pending
 *
 * photo: path relative to /assets/img/people/
 *        set to null to show placeholder
 */

const CONTRIBUTORS = {

  /* ─── FOUNDER ─────────────────────────────────────────── */
  founder: [
    {
      id: "dadang-mujiono",
      name: "Dr. Dadang Mujiono",
      role: "GC Director of Indonesia · Chairman of YLBKD",
      organization: "Global Conservation / YLBKD",
      category: "founder",
      location: "Indonesia",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 1,
      featured: true
    }
  ],

  /* ─── ADVISORY BOARD ──────────────────────────────────── */
  advisoryBoard: [
    {
      id: "jeff-morgan",
      name: "Jeff Morgan",
      role: "GC Executive Director",
      organization: "Global Conservation",
      category: "advisory-board",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 1,
      featured: false
    },
    {
      id: "mike-sutton",
      name: "Prof. Mike Sutton",
      role: "GC Advisor · Goldman Environmental Prize Award Executive Director",
      organization: "Global Conservation",
      category: "advisory-board",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 2,
      featured: false
    },
    {
      id: "lida-teneva",
      name: "Dr. Lida Teneva",
      role: "GC Advisor · One Reef Chief Executive Officer · Mary G. Jamieson Foundation Board of Trustees",
      organization: "Global Conservation / One Reef",
      category: "advisory-board",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 3,
      featured: false
    },
    {
      id: "jos-pet",
      name: "Dr. Jos Pet",
      role: "People & Nature Consulting International",
      organization: "People & Nature Consulting International",
      category: "advisory-board",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 4,
      featured: false
    },
    {
      id: "tri-murti",
      name: "Mdm. Tri Murti",
      role: "Former Deputy of East Kalimantan – Seychelles Cooperation Acceleration Team",
      organization: null,
      category: "advisory-board",
      location: "East Kalimantan",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 5,
      featured: false
    },
    {
      id: "indra-mahardika",
      name: "Indra Mahardika, S.E.",
      role: "Chief of Derawan Island",
      organization: null,
      category: "advisory-board",
      location: "Derawan Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 6,
      featured: false
    },
    {
      id: "rico",
      name: "Rico, S.IP.",
      role: "Chief of Payung-Payung Island Village, Maratua",
      organization: null,
      category: "advisory-board",
      location: "Maratua",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 7,
      featured: false
    }
  ],

  /* ─── EDITORIAL BOARD & WEB DEVELOPER ────────────────── */
  editorialBoard: [
    {
      id: "wahyu-bakti",
      name: "Wahyu K. Bakti, S.Kom.",
      role: "YLBKD IT Specialist and Web Developer",
      organization: "YLBKD",
      category: "editorial-board",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 1,
      featured: false
    },
    {
      id: "zenobia-helza",
      name: "Zenobia Z. Helza, M.M.",
      role: "GC Protection Coordinator of Derawan Island",
      organization: "Global Conservation",
      category: "editorial-board",
      location: "Derawan Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 2,
      featured: false
    },
    {
      id: "entersten-sitepu",
      name: "Entersten Sitepu, S.H.",
      role: "GC Protection Coordinator of Maratua Island",
      organization: "Global Conservation",
      category: "editorial-board",
      location: "Maratua Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 3,
      featured: false
    }
  ],

  /* ─── UNDERWATER CONTRIBUTORS ─────────────────────────── */
  underwaterContributors: [
    {
      id: "andi-uw",
      name: "Andi",
      role: "Underwater Contributor",
      organization: null,
      category: "underwater",
      location: null,
      description: null,
      photo: null,
      status: "tbc",
      sortOrder: 1,
      featured: false
    },
    {
      id: "azman-uw",
      name: "Azman",
      role: "Underwater Contributor",
      organization: null,
      category: "underwater",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 2,
      featured: false
    },
    {
      id: "yovi-uw",
      name: "Yovi",
      role: "Underwater Contributor",
      organization: null,
      category: "underwater",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 3,
      featured: false
    },
    {
      id: "willy-uw",
      name: "Willy",
      role: "Underwater Contributor",
      organization: null,
      category: "underwater",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 4,
      featured: false
    },
    {
      id: "kelvin-uw",
      name: "Kelvin",
      role: "Coral Planter of Derawan Island",
      organization: null,
      category: "underwater",
      location: "Derawan Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 5,
      featured: false
    }
  ],

  /* ─── LANDSCAPE CONTRIBUTORS ─────────────────────────── */
  landscapeContributors: [
    {
      id: "landscape-tbd-1",
      name: "Contributor TBD",
      role: "Landscape / Aerial Photographer",
      organization: null,
      category: "landscape",
      location: null,
      description: null,
      photo: null,
      status: "coming-soon",
      sortOrder: 1,
      featured: false
    },
    {
      id: "landscape-tbd-2",
      name: "Contributor TBD",
      role: "Landscape / Aerial Photographer",
      organization: null,
      category: "landscape",
      location: null,
      description: null,
      photo: null,
      status: "coming-soon",
      sortOrder: 2,
      featured: false
    }
  ],

  /* ─── SCIENTIFIC CONTRIBUTORS ────────────────────────── */
  scientificContributors: [
    {
      id: "dadang-mujiono-sci",
      name: "Dr. Dadang Mujiono",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 1,
      featured: false
    },
    {
      id: "muhclis-effendi",
      name: "Dr. Muhclis Effendi",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "tbc",
      sortOrder: 2,
      featured: false
    },
    {
      id: "adnan-kariming",
      name: "Dr. Adnan Kariming",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "tbc",
      sortOrder: 3,
      featured: false
    },
    {
      id: "yayuk-anggraini",
      name: "Dr. Yayuk Anggraini",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 4,
      featured: false
    },
    {
      id: "muhammad-arifin",
      name: "Dr. Muhammad Arifin",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 5,
      featured: false
    },
    {
      id: "tendy",
      name: "Tendy, M.Si.",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 6,
      featured: false
    },
    {
      id: "ziya-ibrizah",
      name: "Ziya Ibrizah, M.I.Kom.",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 7,
      featured: false
    },
    {
      id: "rahmah-daniah",
      name: "Rahmah Daniah, M.Si.",
      role: "Scientific Contributor",
      organization: null,
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 8,
      featured: false
    },
    {
      id: "zenobia-helza-sci",
      name: "Zenobia Z. Helza, M.M.",
      role: "Scientific Contributor",
      organization: "Global Conservation",
      category: "scientific",
      location: null,
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 9,
      featured: false
    }
  ],

  /* ─── COMMUNITY CUSTODIANS ───────────────────────────── */
  communityCustodians: [
    {
      id: "miharta",
      name: "Miharta",
      role: "Son of the late Mr. Umrah of Derawan Island",
      organization: null,
      category: "community",
      location: "Derawan Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 1,
      featured: false
    },
    {
      id: "haji-jubair",
      name: "Haji Jubair",
      role: "Community Custodian",
      organization: null,
      category: "community",
      location: "Derawan Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 2,
      featured: false
    },
    {
      id: "abdul-gaffar",
      name: "Abdul Gaffar / Gappang",
      role: "Community Custodian",
      organization: null,
      category: "community",
      location: "Derawan Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 3,
      featured: false
    },
    {
      id: "samsul",
      name: "Samsul",
      role: "Community Custodian",
      organization: null,
      category: "community",
      location: "Derawan Island",
      description: null,
      photo: null,
      status: "tbc",
      sortOrder: 4,
      featured: false
    },
    {
      id: "pak-nawir",
      name: "Pak Nawir / Bolo",
      role: "Community Custodian",
      organization: null,
      category: "community",
      location: "Maratua Island",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 5,
      featured: false
    },
    {
      id: "adji-suhaidi",
      name: "Adji Suhaidi",
      role: "Nephew of the late H.M. Sultan of Gunung Tabur",
      organization: null,
      category: "community",
      location: "Gunung Tabur",
      description: null,
      photo: null,
      status: "confirmed",
      sortOrder: 6,
      featured: false
    }
  ]
};

/* ─── Utility: get photo src with fallback ───────────────── */
function getPhotoSrc(contributor) {
  if (contributor.photo) {
    return `/assets/img/people/${contributor.photo}`;
  }
  return null;
}

/* ─── Utility: get status label ─────────────────────────── */
function getStatusLabel(status) {
  switch (status) {
    case 'confirmed': return null;
    case 'tbc': return 'TBC';
    case 'coming-soon': return 'Coming Soon';
    default: return null;
  }
}
