// Ponentes INEDUS 2026 — fuente única de verdad
// Para reemplazar una foto: sustituir el archivo en ponentes/fotos/<id>.png
// Para editar una bio: modificar el campo `bio` aquí

const PONENTES = {

  // ── DÍA 28 · PLENARIA ─────────────────────────────────────────────────────

  'jose-antonio-marin': {
    name: 'José Antonio Marín',
    institution: 'Universidad de Granada',
    bio: 'Doctor en Pedagogía, Profesor Titular en la Universidad de Granada y CEO de la spin-off ESCENTIA. Acumula 18 años de experiencia como orientador educativo y actualmente coordina el grupo de investigación EducaTech XXI. Sus estudios principales se centran en la tecnología educativa, la formación del profesorado y el impacto de Internet en los jóvenes.',
    photo: 'ponentes/fotos/jose-antonio-marin.png',
  },

  'jorge-ivan-pincay': {
    name: 'Jorge Iván Pincay Ponce',
    institution: 'ULEAM',
    bio: 'Investigador y profesor en la Facultad de Ciencias Informáticas en la ULEAM. Cuenta con un Doctorado en Ciencias Informáticas y maestrías internacionales enfocadas en el desarrollo de software y gestión de TICs. Su producción científica destaca por publicaciones y libros sobre inteligencia artificial, minería de datos y accesibilidad web.',
    photo: 'ponentes/fotos/jorge-ivan-pincay.png',
  },

  // ── DÍA 28 · MESA REDONDA ─────────────────────────────────────────────────

  'urtza-garay': {
    name: 'Urtza Garay',
    institution: 'UPV/EHU',
    bio: 'Vicerrectora de Grado y Transformación Digital en la UPV/EHU y exdecana de la Facultad de Educación de Bilbao de la EHU. Es doctora en Psicodidáctica, profesora y líder del grupo de investigación WebLearner. Su actividad investigadora se centra en la tecno-pedagogía, la educación maker y la integración de las tecnologías digitales en las aulas, campos en los que cuenta con dos sexenios de investigación reconocidos.',
    photo: 'ponentes/fotos/urtza-garay.png',
  },

  'jose-ignacio-rivas': {
    name: 'José Ignacio Rivas-Flores',
    institution: 'Universidad de Málaga',
    bio: 'Doctor en Ciencias de la Educación. Catedrático de Didáctica y Organización Escolar de la Universidad de Málaga. Director del Instituto Universitario de Investigación en Formación de Profesionales de la Educación. Miembro del grupo de investigación ProCIE (Profesorado, comunicación e investigación educativa) y de las redes REUNI+D, REDIPD y EDUCORURAL.',
    photo: 'ponentes/fotos/jose-ignacio-rivas.png',
  },

  'lewin-perez': {
    name: 'Lewin José Pérez Plata',
    institution: 'ULEAM',
    bio: 'Profesor, investigador y especialista en Educación Física con una sólida trayectoria en el ámbito de las ciencias de la motricidad humana, la pedagogía deportiva y el bienestar social. Actualmente ejerce su labor académica y científica en la Universidad Laica Eloy Alfaro de Manabí (ULEAM) en Manta, Ecuador.',
    photo: 'ponentes/fotos/lewin-perez.png',
  },

  'rosa-sacoto': {
    name: 'Rosa Jhessenia Sacoto',
    institution: 'ULEAM',
    bio: 'Académica, investigadora y activista. Actualmente se desempeña como docente a tiempo completo en la Universidad Laica Eloy Alfaro de Manabí (ULEAM). Su trabajo se enfoca en la transformación social a través de la educación superior, la equidad de género y la inclusión.',
    photo: 'ponentes/fotos/rosa-sacoto.png',
  },

  // ── DÍA 29 · PLENARIA ─────────────────────────────────────────────────────

  'marta-sandoval': {
    name: 'Marta Sandoval',
    institution: 'Universidad Autónoma de Madrid',
    bio: 'Profesora Titular del Departamento Interfacultativo de Psicología Evolutiva y de la Educación de la Facultad de Formación del Profesorado y Educación de la UAM. En los últimos años se ha centrado en la formación del profesorado en inclusión y en el análisis de exclusiones invisibles desde las voces de estudiantes marginalizados.',
    photo: 'ponentes/fotos/marta-sandoval.png',
  },

  'jeovanny-benacidez': {
    name: 'Jeovanny Moisés Benacidez Bailón',
    institution: 'Universidad Técnica de Manabí',
    bio: 'Vicedecano y profesor titular a tiempo completo en la Universidad Técnica de Manabí. Ejerce la docencia y la investigación científica en la carrera de Pedagogía de la Lengua y la Literatura. Además, desarrolla una activa carrera profesional como escritor de novelas y cuentos galardonados internacionalmente.',
    photo: 'ponentes/fotos/jeovanny-benacidez.png',
  },

  // ── DÍA 29 · MESA REDONDA ─────────────────────────────────────────────────

  'nahia-idoiaga': {
    name: 'Nahia Idoiaga',
    institution: 'UPV/EHU',
    bio: 'Investigadora y profesora de Psicología Evolutiva y de la Educación en la EHU, donde ejerce también como vicedecana de grados, posgrados y trabajos fin de grado. Su trabajo científico destaca por proyectos sobre inclusión socioeducativa, salud mental infanto-juvenil y representaciones sociales ante crisis sanitarias. Además, lidera iniciativas de innovación docente orientadas a la igualdad de género y la mejora de la formación del profesorado.',
    photo: 'ponentes/fotos/nahia-idoiaga.png',
  },

  'denisse-quijada': {
    name: 'Denisse Quijada Sánchez',
    institution: 'Universidad de Chile',
    bio: 'Socióloga de la Universidad de Chile, Profesora Asistente del Departamento de Enfermería y exSubdirectora de la Dirección de Igualdad de Género. Su línea de trabajo se vincula a Género, Salud y Trabajo. Diplomada en Gestión Universitaria con Perspectiva de Género y Máster Europeo en Trabajo y Política Social (Universidad Autónoma de Barcelona).',
    photo: 'ponentes/fotos/denisse-quijada.png',
  },

  'joserra-diez': {
    name: 'Joserra Díez',
    institution: 'UPV/EHU',
    bio: 'Doctor en Biología y actual decano de la Facultad de Educación de Bilbao (EHU). Cuenta con más de 20 años de experiencia como docente e investigador especializado en ecología fluvial y didáctica de las ciencias. Ha liderado múltiples proyectos de innovación educativa orientados a la sostenibilidad ecosocial y la formación del profesorado.',
    photo: 'ponentes/fotos/joserra-diez.png',
  },

  'paola-diaz': {
    name: 'Paola Natasha Díaz Rodríguez',
    institution: 'ULEAM',
    bio: 'Docente titular principal en la carrera de Hospitalidad y Hotelería de la ULEAM. Cuenta con cerca de 30 años de trayectoria académica y está acreditada como investigadora por la SENESCYT, con múltiples publicaciones científicas y un libro sobre Gestión Documental. Lidera proyectos institucionales de vinculación con la sociedad enfocados en el desarrollo del turismo local, el emprendimiento y la inclusión social en la provincia de Manabí.',
    photo: 'ponentes/fotos/paola-diaz.png',
  },

  'gloria-alcivar': {
    name: 'Gloria Anabel Alcívar Pincay',
    institution: 'ULEAM',
    bio: 'Profesora e investigadora en la Universidad Laica Eloy Alfaro de Manabí (ULEAM). Su labor profesional se concentra principalmente en la Facultad de Ciencias de la Educación, donde su línea de investigación y producción científica está fuertemente orientada hacia la educación inclusiva, la discapacidad y la atención a las necesidades educativas especiales.',
    photo: 'ponentes/fotos/gloria-alcivar.png',
  },

  // ── DÍA 30 · PLENARIA ─────────────────────────────────────────────────────

  'estibaliz-saez': {
    name: 'Estibaliz Sáez de Cámara',
    institution: 'UPV/EHU',
    bio: 'Ingeniera, docente, investigadora y gestora institucional, exdirectora de Sostenibilidad y Compromiso Social de la EHU. Ampliamente reconocida por su liderazgo en la integración de la sostenibilidad en la educación superior y su experiencia en ciencias ambientales. Actualmente presidenta de la Red Española para el Desarrollo Sostenible (REDS-SDSN Spain).',
    photo: 'ponentes/fotos/estibaliz-saez.png',
  },

  'mirian-gallegos': {
    name: 'Mirian Gallegos',
    institution: 'Universidad Politécnica Salesiana',
    bio: 'Doctora e investigadora ecuatoriana vinculada a la Universidad Politécnica Salesiana (UPS). Su línea de trabajo principal se centra en la educación inclusiva, la pedagogía y la atención a la discapacidad en el ámbito de la educación superior.',
    photo: 'ponentes/fotos/mirian-gallegos.png',
  },

  // ── DÍA 30 · MESA REDONDA DE CIERRE ──────────────────────────────────────

  'alejandro-rodriguez': {
    name: 'Alejandro R. Rodríguez Martín',
    institution: 'Universidad de Oviedo',
    bio: 'Catedrático de Universidad y Director del Departamento de Ciencias de la Educación de la Universidad de Oviedo. Su trayectoria académica destaca por más de 170 publicaciones y proyectos internacionales enfocados en la educación inclusiva, las TIC y la formación docente.',
    photo: 'ponentes/fotos/alejandro-rodriguez.png',
  },

  'monique-leivas': {
    name: 'Monique Leivas Vargas',
    institution: 'Universitat de València',
    bio: 'Doctora en Desarrollo Local y Cooperación Internacional por la Universitat Politècnica de València. Ayudante doctora en el Departamento de Sociología y Antropología Social de la Universitat de València (UV), investigadora en el Instituto Universitario de Creatividad e Innovaciones Educativas y colaboradora del Instituto INGENIO (CSIC-UPV) desde 2015.',
    photo: 'ponentes/fotos/monique-leivas.png',
  },

  'xavier-cobena': {
    name: 'Xavier Alfredo Cobeña Andrade',
    institution: 'GOPA Infra / GOPA Tech',
    bio: 'Ingeniero, consultor de desarrollo internacional y académico ecuatoriano con destacada trayectoria en la intersección de la gestión de proyectos, las políticas públicas y la sostenibilidad. Colabora con la firma global GOPA Infra / GOPA Tech como especialista internacional en acceso a financiamiento y estructuración de proyectos de infraestructura y transición energética.',
    photo: 'ponentes/fotos/xavier-cobena.png',
  },

  'juan-figueroa': {
    name: 'Juan Alberto Figueroa Pico',
    institution: 'ULEAM',
    bio: 'Docente, investigador científico y biólogo marino ecuatoriano vinculado a la Universidad Laica Eloy Alfaro de Manabí (ULEAM) en Manta, Ecuador.',
    photo: 'ponentes/fotos/juan-figueroa.png',
  },

};

window.PONENTES = PONENTES;
