// Contenido compartido entre las 3 variaciones del landing.
// Texto en ES/EN para el toggle de idioma.

const CONTENT = {
  es: {
    eventShort: "CIPP 2026",
    eventFull: "I Congreso Internacional de Pedagogía y Psicodidáctica",
    tagline: "Repensar la enseñanza desde la evidencia cognitiva",
    dates: "14–17 Octubre 2026",
    location: "Universidad de Salamanca · España",
    hybrid: "Presencial y online",
    nav: {
      programa: "Programa",
      ponentes: "Ponentes",
      papers: "Call for Papers",
      inscripcion: "Inscripción",
      comite: "Comité",
    },
    heroLead:
      "Cuatro días de ponencias, talleres y revisión por pares sobre los nuevos paradigmas del aprendizaje, neuroeducación y diseño instruccional.",
    ctas: {
      register: "Inscribirme",
      submit: "Enviar ponencia",
      program: "Ver programa",
    },
    stats: [
      { n: "+120", l: "Ponencias aceptadas" },
      { n: "37", l: "Países participantes" },
      { n: "18", l: "Universidades organizadoras" },
      { n: "4", l: "Ejes temáticos" },
    ],
    axes: {
      title: "Ejes temáticos",
      lead: "La investigación presentada debe inscribirse en uno de los cuatro ejes del congreso.",
      items: [
        {
          id: "01",
          title: "Neuroeducación y cognición",
          desc: "Procesos atencionales, memoria de trabajo y transferencia del aprendizaje.",
        },
        {
          id: "02",
          title: "Diseño instruccional basado en evidencia",
          desc: "Modelos pedagógicos, práctica deliberada y evaluación formativa.",
        },
        {
          id: "03",
          title: "Tecnología educativa e IA",
          desc: "Tutoría adaptativa, analítica del aprendizaje y ética de los LLM en el aula.",
        },
        {
          id: "04",
          title: "Psicodidáctica y bienestar docente",
          desc: "Autoeficacia, regulación emocional y formación inicial del profesorado.",
        },
      ],
    },
    agenda: {
      title: "Programa",
      lead: "Cronograma provisional. Las sesiones plenarias se transmitirán en directo.",
      days: [
        {
          label: "Miércoles 14 Oct",
          short: "Día 1",
          theme: "Apertura",
          sessions: [
            { t: "09:00", title: "Acreditación y bienvenida", type: "Institucional", room: "Aula Magna" },
            { t: "10:30", title: "Plenaria · Aprendizaje y cerebro en 2026", speaker: "Dra. Elena Moreau", type: "Keynote", room: "Aula Magna" },
            { t: "12:00", title: "Simposio: Evaluación auténtica", speaker: "6 ponencias", type: "Simposio", room: "Sala A" },
            { t: "16:00", title: "Taller: Diseño de rúbricas analíticas", speaker: "Dr. Iván Prieto", type: "Taller", room: "Sala 3" },
          ],
        },
        {
          label: "Jueves 15 Oct",
          short: "Día 2",
          theme: "Cognición",
          sessions: [
            { t: "09:30", title: "Plenaria · Memoria y práctica recuperativa", speaker: "Dr. Jeffrey Karpicke", type: "Keynote", room: "Aula Magna" },
            { t: "11:30", title: "Panel: IA generativa en el aula", speaker: "Mesa de 5 expertos", type: "Panel", room: "Sala A" },
            { t: "15:00", title: "Sesión de pósters", speaker: "42 investigaciones", type: "Pósters", room: "Claustro" },
            { t: "17:00", title: "Taller: Carga cognitiva en materiales", speaker: "Dra. Nora Valente", type: "Taller", room: "Sala 2" },
          ],
        },
        {
          label: "Viernes 16 Oct",
          short: "Día 3",
          theme: "Aula",
          sessions: [
            { t: "09:30", title: "Plenaria · Psicodidáctica emocional", speaker: "Dra. Marta Salas", type: "Keynote", room: "Aula Magna" },
            { t: "11:30", title: "Simposio: Formación del profesorado", speaker: "7 ponencias", type: "Simposio", room: "Sala A" },
            { t: "15:00", title: "Ponencias libres · 3 salas paralelas", speaker: "24 ponencias", type: "Ponencias", room: "Salas 1–3" },
            { t: "19:00", title: "Cena del congreso", type: "Social", room: "Colegio Fonseca" },
          ],
        },
        {
          label: "Sábado 17 Oct",
          short: "Día 4",
          theme: "Cierre",
          sessions: [
            { t: "10:00", title: "Asamblea del comité editorial", type: "Editorial", room: "Sala Comité" },
            { t: "12:00", title: "Plenaria de clausura", speaker: "Dr. Ángel Riviere", type: "Keynote", room: "Aula Magna" },
            { t: "13:30", title: "Entrega de reconocimientos", type: "Institucional", room: "Aula Magna" },
          ],
        },
      ],
    },
    speakers: {
      title: "Ponentes confirmados",
      lead: "Selección de invitados plenarios. El cartel completo se anunciará el 1 de junio.",
      items: [
        { name: "Dra. Elena Moreau", role: "Université de Genève", topic: "Neurociencia cognitiva" },
        { name: "Dr. Jeffrey Karpicke", role: "Purdue University", topic: "Práctica recuperativa" },
        { name: "Dra. Marta Salas", role: "Universidad del País Vasco", topic: "Psicodidáctica" },
        { name: "Dr. Ángel Riviere", role: "Universidad Autónoma de Madrid", topic: "Teoría de la mente" },
        { name: "Dra. Nora Valente", role: "Stanford GSE", topic: "Diseño instruccional" },
        { name: "Dr. Iván Prieto", role: "Universidad de Salamanca", topic: "Evaluación" },
      ],
    },
    cfp: {
      title: "Call for Papers",
      lead: "Envía tu investigación original para su revisión por pares doble ciego. Las ponencias aceptadas se publicarán en el libro de memorias con ISBN.",
      timeline: [
        { date: "1 Mar 2026", label: "Apertura de envíos", status: "done" },
        { date: "15 Jun 2026", label: "Cierre de envíos", status: "open" },
        { date: "30 Jul 2026", label: "Notificación de aceptación", status: "soon" },
        { date: "1 Sep 2026", label: "Entrega de versión final", status: "future" },
        { date: "14 Oct 2026", label: "Presentación en el congreso", status: "future" },
      ],
      formats: [
        { f: "Comunicación oral", len: "20 min · 4 000 palabras" },
        { f: "Póster", len: "3 min · 1 500 palabras" },
        { f: "Simposio invitado", len: "90 min · 5 ponencias" },
      ],
      norms: "APA 7 · PDF o DOCX · hasta 6 000 palabras incluyendo referencias · resumen 250 palabras · 4 keywords.",
      statusLabels: {
        done: "Completado",
        open: "En curso",
        soon: "Próximo",
        future: "Pendiente",
      },
    },
    registration: {
      title: "Inscripción",
      lead: "Tarifas reducidas hasta el 31 de julio.",
      tiers: [
        { name: "Estudiante", price: "€95", features: ["Acceso a todas las sesiones", "Certificado digital", "Libro de memorias"] },
        { name: "Profesional", price: "€180", featured: true, features: ["Todo lo anterior", "Cena del congreso", "Talleres prácticos"] },
        { name: "Institucional", price: "€420", features: ["Hasta 5 asistentes", "Stand en el claustro", "Mención en el libro"] },
      ],
    },
    comite: {
      title: "Comité organizador",
      universities: [
        "Universidad de Salamanca",
        "Universidad del País Vasco",
        "UNAM · México",
        "Pontificia Universidad Católica de Chile",
        "Université de Genève",
        "Stanford GSE",
      ],
    },
    footer: {
      contact: "prensa@cipp2026.org",
      copy: "© 2026 CIPP · Organizado con Congressa",
    },
  },
  en: {
    eventShort: "CIPP 2026",
    eventFull: "1st International Congress on Pedagogy & Psychodidactics",
    tagline: "Rethinking teaching from cognitive evidence",
    dates: "Oct 14–17, 2026",
    location: "University of Salamanca · Spain",
    hybrid: "In-person and online",
    nav: {
      programa: "Program",
      ponentes: "Speakers",
      papers: "Call for Papers",
      inscripcion: "Registration",
      comite: "Committee",
    },
    heroLead:
      "Four days of talks, workshops and peer-reviewed research on new paradigms of learning, neuroeducation and instructional design.",
    ctas: {
      register: "Register",
      submit: "Submit paper",
      program: "See program",
    },
    stats: [
      { n: "+120", l: "Accepted papers" },
      { n: "37", l: "Countries" },
      { n: "18", l: "Host universities" },
      { n: "4", l: "Thematic tracks" },
    ],
    axes: {
      title: "Thematic tracks",
      lead: "Submitted research must align with one of the four tracks.",
      items: [
        { id: "01", title: "Neuroeducation & cognition", desc: "Attention, working memory and transfer of learning." },
        { id: "02", title: "Evidence-based instructional design", desc: "Pedagogical models, deliberate practice and formative assessment." },
        { id: "03", title: "EdTech & AI", desc: "Adaptive tutoring, learning analytics and the ethics of LLMs in the classroom." },
        { id: "04", title: "Psychodidactics & teacher wellbeing", desc: "Self-efficacy, emotion regulation and initial teacher training." },
      ],
    },
    agenda: {
      title: "Program",
      lead: "Provisional schedule. Plenary sessions will be streamed live.",
      days: [
        {
          label: "Wed Oct 14",
          short: "Day 1",
          theme: "Opening",
          sessions: [
            { t: "09:00", title: "Check-in & welcome", type: "Institutional", room: "Aula Magna" },
            { t: "10:30", title: "Plenary · Learning & the brain in 2026", speaker: "Dr. Elena Moreau", type: "Keynote", room: "Aula Magna" },
            { t: "12:00", title: "Symposium: Authentic assessment", speaker: "6 papers", type: "Symposium", room: "Room A" },
            { t: "16:00", title: "Workshop: Analytic rubrics", speaker: "Dr. Iván Prieto", type: "Workshop", room: "Room 3" },
          ],
        },
        {
          label: "Thu Oct 15",
          short: "Day 2",
          theme: "Cognition",
          sessions: [
            { t: "09:30", title: "Plenary · Memory & retrieval practice", speaker: "Dr. Jeffrey Karpicke", type: "Keynote", room: "Aula Magna" },
            { t: "11:30", title: "Panel: Generative AI in the classroom", speaker: "5-expert panel", type: "Panel", room: "Room A" },
            { t: "15:00", title: "Poster session", speaker: "42 studies", type: "Posters", room: "Cloister" },
            { t: "17:00", title: "Workshop: Cognitive load in materials", speaker: "Dr. Nora Valente", type: "Workshop", room: "Room 2" },
          ],
        },
        {
          label: "Fri Oct 16",
          short: "Day 3",
          theme: "Classroom",
          sessions: [
            { t: "09:30", title: "Plenary · Emotional psychodidactics", speaker: "Dr. Marta Salas", type: "Keynote", room: "Aula Magna" },
            { t: "11:30", title: "Symposium: Teacher training", speaker: "7 papers", type: "Symposium", room: "Room A" },
            { t: "15:00", title: "Parallel sessions · 3 rooms", speaker: "24 papers", type: "Papers", room: "Rooms 1–3" },
            { t: "19:00", title: "Congress dinner", type: "Social", room: "Colegio Fonseca" },
          ],
        },
        {
          label: "Sat Oct 17",
          short: "Day 4",
          theme: "Closing",
          sessions: [
            { t: "10:00", title: "Editorial board assembly", type: "Editorial", room: "Board Room" },
            { t: "12:00", title: "Closing plenary", speaker: "Dr. Ángel Riviere", type: "Keynote", room: "Aula Magna" },
            { t: "13:30", title: "Awards ceremony", type: "Institutional", room: "Aula Magna" },
          ],
        },
      ],
    },
    speakers: {
      title: "Confirmed speakers",
      lead: "Selection of plenary guests. Full lineup announced June 1.",
      items: [
        { name: "Dr. Elena Moreau", role: "Université de Genève", topic: "Cognitive neuroscience" },
        { name: "Dr. Jeffrey Karpicke", role: "Purdue University", topic: "Retrieval practice" },
        { name: "Dr. Marta Salas", role: "University of the Basque Country", topic: "Psychodidactics" },
        { name: "Dr. Ángel Riviere", role: "Autonomous University of Madrid", topic: "Theory of mind" },
        { name: "Dr. Nora Valente", role: "Stanford GSE", topic: "Instructional design" },
        { name: "Dr. Iván Prieto", role: "University of Salamanca", topic: "Assessment" },
      ],
    },
    cfp: {
      title: "Call for Papers",
      lead: "Submit original research for double-blind peer review. Accepted papers will appear in the proceedings book with ISBN.",
      timeline: [
        { date: "Mar 1, 2026", label: "Submissions open", status: "done" },
        { date: "Jun 15, 2026", label: "Submissions close", status: "open" },
        { date: "Jul 30, 2026", label: "Acceptance notification", status: "soon" },
        { date: "Sep 1, 2026", label: "Camera-ready version", status: "future" },
        { date: "Oct 14, 2026", label: "Presentation at congress", status: "future" },
      ],
      formats: [
        { f: "Oral talk", len: "20 min · 4,000 words" },
        { f: "Poster", len: "3 min · 1,500 words" },
        { f: "Invited symposium", len: "90 min · 5 papers" },
      ],
      norms: "APA 7 · PDF or DOCX · up to 6,000 words incl. references · 250-word abstract · 4 keywords.",
      statusLabels: {
        done: "Completed",
        open: "Open",
        soon: "Upcoming",
        future: "Pending",
      },
    },
    registration: {
      title: "Registration",
      lead: "Early-bird rates until July 31.",
      tiers: [
        { name: "Student", price: "€95", features: ["Access to all sessions", "Digital certificate", "Proceedings book"] },
        { name: "Professional", price: "€180", featured: true, features: ["Everything above", "Congress dinner", "Hands-on workshops"] },
        { name: "Institutional", price: "€420", features: ["Up to 5 attendees", "Booth at the cloister", "Mention in the book"] },
      ],
    },
    comite: {
      title: "Organizing committee",
      universities: [
        "University of Salamanca",
        "University of the Basque Country",
        "UNAM · Mexico",
        "PUC Chile",
        "Université de Genève",
        "Stanford GSE",
      ],
    },
    footer: {
      contact: "press@cipp2026.org",
      copy: "© 2026 CIPP · Powered by Congressa",
    },
  },
};

window.CONTENT = CONTENT;
