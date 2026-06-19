// Programa INEDUS 2026 — estructura de sesiones por día
// timeEHU: hora Bilbao (CET, UTC+1 en octubre)
// timeManta: hora Manta/Ecuador (ECT, UTC-5) — diferencia 6 horas
// speakers: array de IDs de window.PONENTES
// type: 'apertura' | 'plenaria' | 'mesa' | 'local' | 'pausa' | 'cierre'
// venue: 'conjunta' | 'bilbao' | 'manta'

const PROGRAMA = [
  {
    day: '28',
    sessions: [
      {
        timeEHU: '15:00–15:30',
        timeManta: '08:00–08:30',
        type: 'apertura',
        venue: 'conjunta',
        title: {
          es: 'Apertura conjunta',
          eu: 'Irekiera bateratua',
          en: 'Joint opening ceremony',
        },
        description: {
          es: 'Inauguración institucional EHU-ULEAM (vicerrectores, decanos). Maestros de ceremonia: Jhonny Villafuerte · Asier Romero',
          eu: 'EHU-ULEAM inaugurazio instituzionala (errektoreordeak, dekanoak). Ekitaldi-gidariak: Jhonny Villafuerte · Asier Romero',
          en: 'Institutional opening EHU-ULEAM (vice-rectors, deans). Masters of ceremony: Jhonny Villafuerte · Asier Romero',
        },
        speakers: [],
      },
      {
        timeEHU: '15:30–16:30',
        timeManta: '08:30–09:30',
        type: 'plenaria',
        venue: 'conjunta',
        title: {
          es: 'Ponencias plenarias',
          eu: 'Hitzaldi plenarioak',
          en: 'Plenary lectures',
        },
        description: {
          es: 'Ponencias internacionales a cargo de expertos en tecnología educativa e innovación digital.',
          eu: 'Hezkuntza teknologia eta berrikuntza digitaleko adituek emandako nazioarteko hitzaldiak.',
          en: 'International lectures by experts in educational technology and digital innovation.',
        },
        speakers: ['jose-antonio-marin', 'jorge-ivan-pincay'],
      },
      {
        timeEHU: '16:30–17:30',
        timeManta: '09:30–10:30',
        type: 'mesa',
        venue: 'conjunta',
        title: {
          es: 'Mesa redonda conjunta',
          eu: 'Mahai-inguru bateratua',
          en: 'Joint roundtable',
        },
        description: {
          es: 'Retos de la innovación educativa en el currículo universitario. Cuatro ponentes (dos EHU · dos ULEAM).',
          eu: 'Unibertsitate-curriculumeko hezkuntza-berrikuntzaren erronkak. Lau hizlari (bi EHU · bi ULEAM).',
          en: 'Challenges of educational innovation in the university curriculum. Four speakers (two EHU · two ULEAM).',
        },
        speakers: ['urtza-garay', 'jose-ignacio-rivas', 'lewin-perez', 'rosa-sacoto'],
      },
      {
        timeEHU: null,
        timeManta: '10:30–11:00',
        type: 'pausa',
        venue: 'manta',
        title: { es: 'Pausa para café', eu: 'Kafea', en: 'Coffee break' },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
      {
        timeEHU: null,
        timeManta: '11:00–12:30 · 14:30–16:30',
        type: 'local',
        venue: 'manta',
        title: {
          es: 'Sesiones locales (Manta)',
          eu: 'Tokiko saioak (Manta)',
          en: 'Local sessions (Manta)',
        },
        description: {
          es: 'Actividades organizadas por cada carrera.',
          eu: 'Karrerak antolatutako jarduerak.',
          en: 'Activities organised by each programme.',
        },
        speakers: [],
      },
    ],
  },
  {
    day: '29',
    sessions: [
      {
        timeEHU: '09:00–10:30',
        timeManta: null,
        type: 'local',
        venue: 'bilbao',
        title: {
          es: 'Sesiones locales (Bilbao)',
          eu: 'Tokiko saioak (Bilbao)',
          en: 'Local sessions (Bilbao)',
        },
        description: {
          es: 'Experiencias e innovaciones didácticas.',
          eu: 'Esperientziak eta berrikuntza didaktikoak.',
          en: 'Experiences and didactic innovations.',
        },
        speakers: [],
      },
      {
        timeEHU: '10:30–11:00',
        timeManta: null,
        type: 'pausa',
        venue: 'bilbao',
        title: { es: 'Pausa para café', eu: 'Kafea', en: 'Coffee break' },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
      {
        timeEHU: '11:00–12:30',
        timeManta: null,
        type: 'local',
        venue: 'bilbao',
        title: {
          es: 'Sesiones locales (Bilbao)',
          eu: 'Tokiko saioak (Bilbao)',
          en: 'Local sessions (Bilbao)',
        },
        description: { es: 'Comunicaciones.', eu: 'Komunikazioak.', en: 'Communications.' },
        speakers: [],
      },
      {
        timeEHU: '12:30–13:30',
        timeManta: null,
        type: 'local',
        venue: 'bilbao',
        title: {
          es: 'Simposio (Bilbao)',
          eu: 'Sinposioa (Bilbao)',
          en: 'Symposium (Bilbao)',
        },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
      {
        timeEHU: '15:00–16:00',
        timeManta: '08:00–09:00',
        type: 'plenaria',
        venue: 'conjunta',
        title: {
          es: 'Ponencias plenarias',
          eu: 'Hitzaldi plenarioak',
          en: 'Plenary lectures',
        },
        description: {
          es: 'Educación, inclusión y sostenibilidad en la Educación Superior.',
          eu: 'Hezkuntza, inklusioa eta jasangarritasuna Goi Mailako Hezkuntzan.',
          en: 'Education, inclusion and sustainability in Higher Education.',
        },
        speakers: ['marta-sandoval', 'jeovanny-benacidez'],
      },
      {
        timeEHU: '16:00–17:30',
        timeManta: '09:00–10:30',
        type: 'mesa',
        venue: 'conjunta',
        title: {
          es: 'Mesa redonda conjunta',
          eu: 'Mahai-inguru bateratua',
          en: 'Joint roundtable',
        },
        description: {
          es: 'Educación, inclusión y sostenibilidad en la Educación Superior. Cinco ponentes (dos EHU · tres ULEAM).',
          eu: 'Hezkuntza, inklusioa eta jasangarritasuna Goi Mailako Hezkuntzan. Bost hizlari (bi EHU · hiru ULEAM).',
          en: 'Education, inclusion and sustainability in Higher Education. Five speakers (two EHU · three ULEAM).',
        },
        speakers: ['nahia-idoiaga', 'denisse-quijada', 'joserra-diez', 'paola-diaz', 'gloria-alcivar'],
      },
      {
        timeEHU: null,
        timeManta: '10:30–11:00',
        type: 'pausa',
        venue: 'manta',
        title: { es: 'Pausa para café', eu: 'Kafea', en: 'Coffee break' },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
      {
        timeEHU: null,
        timeManta: '11:00–12:30 · 14:30–16:30',
        type: 'local',
        venue: 'manta',
        title: {
          es: 'Sesiones locales (Manta)',
          eu: 'Tokiko saioak (Manta)',
          en: 'Local sessions (Manta)',
        },
        description: {
          es: 'Actividades organizadas por cada carrera.',
          eu: 'Karrerak antolatutako jarduerak.',
          en: 'Activities organised by each programme.',
        },
        speakers: [],
      },
    ],
  },
  {
    day: '30',
    sessions: [
      {
        timeEHU: '09:30–11:00',
        timeManta: null,
        type: 'local',
        venue: 'bilbao',
        title: {
          es: 'Sesiones locales (Bilbao)',
          eu: 'Tokiko saioak (Bilbao)',
          en: 'Local sessions (Bilbao)',
        },
        description: { es: 'Comunicaciones.', eu: 'Komunikazioak.', en: 'Communications.' },
        speakers: [],
      },
      {
        timeEHU: '11:00–11:30',
        timeManta: null,
        type: 'pausa',
        venue: 'bilbao',
        title: { es: 'Pausa para café', eu: 'Kafea', en: 'Coffee break' },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
      {
        timeEHU: '11:30–13:00',
        timeManta: null,
        type: 'local',
        venue: 'bilbao',
        title: {
          es: 'Sesiones locales (Bilbao)',
          eu: 'Tokiko saioak (Bilbao)',
          en: 'Local sessions (Bilbao)',
        },
        description: { es: 'Comunicaciones.', eu: 'Komunikazioak.', en: 'Communications.' },
        speakers: [],
      },
      {
        timeEHU: '15:00–16:00',
        timeManta: '08:00–09:00',
        type: 'plenaria',
        venue: 'conjunta',
        title: {
          es: 'Ponencias plenarias',
          eu: 'Hitzaldi plenarioak',
          en: 'Plenary lectures',
        },
        description: {
          es: 'La investigación conectada con los ODS y el entorno.',
          eu: 'GJHekin eta inguruarekin lotutako ikerketa.',
          en: 'Research connected with the SDGs and the environment.',
        },
        speakers: ['estibaliz-saez', 'mirian-gallegos'],
      },
      {
        timeEHU: '16:00–17:30',
        timeManta: '09:00–10:30',
        type: 'mesa',
        venue: 'conjunta',
        title: {
          es: 'Mesa redonda de cierre',
          eu: 'Itxiera mahai-ingurua',
          en: 'Closing roundtable',
        },
        description: {
          es: 'La investigación conectada con los ODS y el entorno. Cuatro ponentes (dos EHU · dos ULEAM).',
          eu: 'GJHekin eta inguruarekin lotutako ikerketa. Lau hizlari (bi EHU · bi ULEAM).',
          en: 'Research connected with the SDGs and the environment. Four speakers (two EHU · two ULEAM).',
        },
        speakers: ['alejandro-rodriguez', 'monique-leivas', 'xavier-cobena', 'juan-figueroa'],
      },
      {
        timeEHU: null,
        timeManta: '11:00–12:30 · 14:30–16:00',
        type: 'local',
        venue: 'manta',
        title: {
          es: 'Sesiones locales (Manta)',
          eu: 'Tokiko saioak (Manta)',
          en: 'Local sessions (Manta)',
        },
        description: {
          es: 'Actividades organizadas por cada carrera.',
          eu: 'Karrerak antolatutako jarduerak.',
          en: 'Activities organised by each programme.',
        },
        speakers: [],
      },
      {
        timeEHU: null,
        timeManta: '16:00–16:30',
        type: 'cierre',
        venue: 'manta',
        title: {
          es: 'Cierre del congreso',
          eu: 'Kongresua itxi',
          en: 'Closing of the congress',
        },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
    ],
  },
];

window.PROGRAMA = PROGRAMA;
