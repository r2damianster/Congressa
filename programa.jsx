// Programa INEDUS 2026 — estructura de sesiones por día
// timeEHU: hora Bilbao (CET, UTC+1 en octubre)
// timeManta: hora Manta/Ecuador (ECT, UTC-5) — diferencia 6 horas
// speakers: array de IDs de window.PONENTES
// type: 'apertura' | 'plenaria' | 'mesa' | 'local' | 'pausa' | 'cierre'
// link: (opcional) URL para unirse a la sesión online; si existe, la agenda muestra un botón «Unirse». Mismo enlace en las 3 lenguas.
// venue: 'conjunta' | 'bilbao' | 'manta'

// Sesiones simultáneas de Bilbao (docx de la dirección, "INEDUS GAZ"): 6 sesiones por día, una por aula.
// kind: 'presencial' | 'online' | 'experiencias' | 'simposio'
const SESSION_KINDS = {
  presencial: {
    es: 'Comunicaciones presenciales',
    eu: 'Komunikazio presentzialak',
    en: 'In-person papers',
  },
  online: {
    es: 'Comunicaciones online',
    eu: 'Online komunikazioak',
    en: 'Online papers',
  },
  experiencias: {
    es: 'Experiencias e innovaciones didácticas (online)',
    eu: 'Esperientziak eta berrikuntza didaktikoak (online)',
    en: 'Didactic experiences and innovations (online)',
  },
  simposio: {
    es: 'Simposio presencial',
    eu: 'Sinposio presentziala',
    en: 'In-person symposium',
  },
};

const ROOMS = {
  s02: { es: 'Aula 1S02', eu: '1S02 gela', en: 'Room 1S02' },
  s03: { es: 'Aula 1S03', eu: '1S03 gela', en: 'Room 1S03' },
  s04: { es: 'Aula 1S04', eu: '1S04 gela', en: 'Room 1S04' },
  s05: { es: 'Aula 1S05', eu: '1S05 gela', en: 'Room 1S05' },
  txillardegi: { es: 'Aula Txillardegi (Hefa I)', eu: 'Txillardegi gela (Hefa I)', en: 'Txillardegi room (Hefa I)' },
  polivalente: { es: 'Aula polivalente (Hefa I)', eu: 'Gela polibalentea (Hefa I)', en: 'Multipurpose room (Hefa I)' },
  juliana: { es: 'Juliana aretoa (Sala Juliana)', eu: 'Juliana aretoa', en: 'Juliana hall' },
};

const THEME_DAY_28 = {
  es: 'Retos de la innovación educativa en el currículo universitario.',
  eu: 'Unibertsitate-curriculumeko hezkuntza-berrikuntzaren erronkak.',
  en: 'Challenges of educational innovation in the university curriculum.',
};

const THEME_DAY_29 = {
  es: 'Educación, inclusión y sostenibilidad en la Educación Superior.',
  eu: 'Hezkuntza, inklusioa eta jasangarritasuna Goi Mailako Hezkuntzan.',
  en: 'Education, inclusion and sustainability in Higher Education.',
};

const SYMPOSIUM_DAY_28 = {
  es: 'SUSIEE: sostenibilidad e interculturalidad en la educación y atención a la primera infancia de 0 a 3 años.',
  eu: 'SUSIEE: jasangarritasuna eta kulturartekotasuna 0-3 urteko lehen haurtzaroko hezkuntzan eta arretan.',
  en: 'SUSIEE: sustainability and interculturality in the education and care of early childhood (ages 0–3).',
};

const SYMPOSIUM_DAY_29 = {
  es: 'Educación para la paz, cultura para la paz y transformación territorial en contextos rurales: manifestaciones, impactos y desafíos.',
  eu: 'Bakerako hezkuntza, bakearen kultura eta lurralde-eraldaketa landa-testuinguruetan: adierazpenak, eraginak eta erronkak.',
  en: 'Education for peace, culture of peace and territorial transformation in rural contexts: manifestations, impacts and challenges.',
};

const SESSION_ROOMS_DAY_28 = [
  { kind: 'presencial', room: ROOMS.s02 },
  { kind: 'presencial', room: ROOMS.s03 },
  { kind: 'online', room: ROOMS.txillardegi },
  { kind: 'online', room: ROOMS.s05 },
  { kind: 'experiencias', room: ROOMS.s04 },
  { kind: 'simposio', room: ROOMS.juliana, symposium: SYMPOSIUM_DAY_28 },
];

const SESSION_ROOMS_DAY_29 = [
  { kind: 'presencial', room: ROOMS.s02 },
  { kind: 'presencial', room: ROOMS.s03 },
  { kind: 'online', room: ROOMS.txillardegi },
  { kind: 'online', room: ROOMS.polivalente },
  { kind: 'experiencias', room: ROOMS.s04 },
  { kind: 'simposio', room: ROOMS.juliana, symposium: SYMPOSIUM_DAY_29 },
];

function buildBilbaoLocalSessions(sessionRooms, theme, timeEHU) {
  return sessionRooms.map((sessionRoom, sessionIndex) => {
    const kindLabel = SESSION_KINDS[sessionRoom.kind];
    const sessionNumber = sessionIndex + 1;
    const focus = sessionRoom.symposium || theme;
    return {
      timeEHU,
      timeManta: null,
      type: 'local',
      venue: 'bilbao',
      title: {
        es: `Sesión ${sessionNumber} · ${sessionRoom.room.es}`,
        eu: `${sessionNumber}. saioa · ${sessionRoom.room.eu}`,
        en: `Session ${sessionNumber} · ${sessionRoom.room.en}`,
      },
      description: {
        es: `${kindLabel.es}. ${focus.es}`,
        eu: `${kindLabel.eu}. ${focus.eu}`,
        en: `${kindLabel.en}. ${focus.en}`,
      },
      speakers: [],
    };
  });
}

const PROGRAMA = [
  {
    day: '28',
    sessions: [
      {
        timeEHU: '15:00–15:30',
        timeManta: '09:00–09:30',
        type: 'apertura',
        venue: 'conjunta',
        title: {
          es: 'Apertura conjunta',
          eu: 'Irekiera bateratua',
          en: 'Joint opening ceremony',
        },
        description: {
          es: 'Inauguración institucional EHU-ULEAM. Participan: Joserra Díez (decano de la Facultad de Educación de Bilbao, EHU), Asier Blas (vicerrector de estudiantes y compromiso social, EHU) y Pedro Jacinto Quijije (decano de la Facultad de Educación y Turismo, ULEAM). Presentan: Asier Romero (EHU) y Jhonny Villafuerte (ULEAM).',
          eu: 'EHU-ULEAM inaugurazio instituzionala. Parte hartzen dute: Joserra Díez (Bilboko Hezkuntza Fakultateko dekanoa, EHU), Asier Blas (ikasleen eta konpromiso sozialaren errektoreordea, EHU) eta Pedro Jacinto Quijije (Hezkuntza eta Turismo Fakultateko dekanoa, ULEAM). Aurkezleak: Asier Romero (EHU) eta Jhonny Villafuerte (ULEAM).',
          en: 'Institutional opening EHU-ULEAM. Participants: Joserra Díez (Dean, Faculty of Education of Bilbao, EHU), Asier Blas (Vice-Rector for Students and Social Engagement, EHU) and Pedro Jacinto Quijije (Dean, Faculty of Education and Tourism, ULEAM). Hosts: Asier Romero (EHU) and Jhonny Villafuerte (ULEAM).',
        },
        speakers: [],
      },
      {
        timeEHU: '15:30–16:30',
        timeManta: '09:30–10:30',
        type: 'plenaria',
        venue: 'conjunta',
        title: {
          es: 'Ponencias plenarias',
          eu: 'Hitzaldi plenarioak',
          en: 'Plenary lectures',
        },
        description: {
          es: 'Retos de la innovación educativa en el currículo universitario.',
          eu: 'Unibertsitate-curriculumeko hezkuntza-berrikuntzaren erronkak.',
          en: 'Challenges of educational innovation in the university curriculum.',
        },
        speakers: ['jose-antonio-marin', 'jorge-ivan-pincay'],
      },
      {
        timeEHU: '16:30–17:30',
        timeManta: '10:30–11:30',
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
        speakers: ['jose-ignacio-rivas', 'karmele-artano', 'lewin-perez', 'rosa-sacoto'],
      },
      {
        timeEHU: null,
        timeManta: '11:30–12:00',
        type: 'pausa',
        venue: 'manta',
        title: { es: 'Pausa para café', eu: 'Kafea', en: 'Coffee break' },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
      {
        timeEHU: null,
        timeManta: '12:00–13:30 · 15:30–17:00',
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
        timeEHU: '17:30–18:00',
        timeManta: null,
        type: 'pausa',
        venue: 'bilbao',
        title: {
          es: 'Pausa para café',
          eu: 'Kafea',
          en: 'Coffee break',
        },
        description: {
          es: '',
          eu: '',
          en: '',
        },
        speakers: [],
      },
      ...buildBilbaoLocalSessions(SESSION_ROOMS_DAY_28, THEME_DAY_28, '18:00–19:45'),
    ],
  },
  {
    day: '29',
    sessions: [
      {
        timeEHU: '15:00–16:00',
        timeManta: '09:00–10:00',
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
        timeManta: '10:00–11:30',
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
        timeManta: '11:30–12:00',
        type: 'pausa',
        venue: 'manta',
        title: { es: 'Pausa para café', eu: 'Kafea', en: 'Coffee break' },
        description: { es: '', eu: '', en: '' },
        speakers: [],
      },
      {
        timeEHU: null,
        timeManta: '12:00–13:30 · 15:30–17:00',
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
        timeEHU: '17:30–18:00',
        timeManta: null,
        type: 'pausa',
        venue: 'bilbao',
        title: {
          es: 'Pausa para café',
          eu: 'Kafea',
          en: 'Coffee break',
        },
        description: {
          es: '',
          eu: '',
          en: '',
        },
        speakers: [],
      },
      ...buildBilbaoLocalSessions(SESSION_ROOMS_DAY_29, THEME_DAY_29, '18:00–19:30'),
    ],
  },
  {
    day: '30',
    sessions: [
      {
        timeEHU: '16:00–17:00',
        timeManta: '10:00–11:00',
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
        timeEHU: '17:00–18:30',
        timeManta: '11:00–12:30',
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
        timeManta: '12:00–13:30 · 15:30–17:00',
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
        timeManta: '17:00–17:30',
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
      {
        timeEHU: '18:30–19:00',
        timeManta: null,
        type: 'cierre',
        venue: 'conjunta',
        title: {
          es: 'Cierre del congreso',
          eu: 'Kongresua itxi',
          en: 'Closing of the congress',
        },
        description: {
          es: 'Clausura institucional.',
          eu: 'Itxiera instituzionala.',
          en: 'Institutional closing.',
        },
        speakers: [],
      },
    ],
  },
];

window.PROGRAMA = PROGRAMA;
