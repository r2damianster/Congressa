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
    bio: 'Investigador y profesor en el área de Informática, vinculado principalmente a la Universidad Laica Eloy Alfaro de Manabí (ULEAM). Su línea de investigación principal se enfoca en la inteligencia artificial, la ingeniería de software y la minería de datos. Cuenta con una producción científica de 50 publicaciones, un índice h de 8 (Google Scholar) y trabajos destacados en revistas y congresos internacionales sobre analítica de datos educativos y socioeconómicos, aprendizaje automático (machine learning) y accesibilidad web.',
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
    bio: 'Profesor de Educación Física con Maestría en Enseñanza de la Educación Física y Doctorado en Ciencias de la Motricidad Humana. Docente de nacionalidad venezolana en ejercicio en la Universidad Laica Eloy Alfaro de Manabí (ULEAM), con más de 15 años de experiencia en distintos niveles educativos. Investigador y conferencista internacional, miembro de la Red LEA. Sus líneas de investigación son la educación y el currículo, las innovaciones pedagógicas y el entrenamiento deportivo. Cuenta con más de 15 publicaciones académicas.',
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
    bio: 'Escritor y profesor universitario ecuatoriano. Ganador del Premio Nacional de Literatura Miguel Riofrío 2019 por su novela «Pilares de la noche vana» y del Premio Nacional de Literatura Bienal de Narrativa Eliécer Cárdenas 2023 por «Las palabras del aire vacío. La novela de Kafka». Es Doctor en Comunicación por la Universidad Nacional de La Plata (UNLP, Argentina) y realizó un posdoctorado en Historia en el Instituto de Estudios Latinoamericanos de la Freie Universität Berlin (Alemania). Vicedecano de la Carrera de Pedagogía de la Lengua y Literatura de la Universidad Técnica de Manabí, posee además un Máster en Edición por la Universidad Complutense de Madrid, un Máster en Escritura Creativa por la Universidad Internacional de La Rioja y un Máster en Docencia e Investigación Educativa.',
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
    bio: 'Doctora en Ciencias Económicas con mención en Turismo por la Universidad de La Habana (Cuba) y Magíster en Gestión Turística. Con cerca de 30 años de trayectoria en educación inicial, media y superior, es docente titular principal de la Facultad de Hotelería y Turismo de la Universidad Laica Eloy Alfaro de Manabí (ULEAM). Especialista en Diseño Curricular por Competencias e investigadora acreditada por la SENESCYT, es autora de publicaciones científicas en turismo, educación e inclusión y de un libro sobre Gestión Documental. Lidera programas institucionales de inclusión, entre ellos el Centro de Observación y Apoyo Inclusivo (COAI), y se desempeña como conferencista nacional e internacional.',
    photo: 'ponentes/fotos/paola-diaz.png',
  },

  'gloria-alcivar': {
    name: 'Gloria Anabel Alcívar Pincay',
    institution: 'ULEAM',
    bio: 'Ingeniera en Sistemas, Magíster en Educación Especial con mención en Educación de las Personas con Discapacidad Visual por la Universidad Politécnica Salesiana, Magíster en Psicopedagogía por la Universidad de La Rioja y Doctora en Ciencias Sociales y Jurídicas por la Universidad de Córdoba (España). Cuenta con diplomados en TIC para la atención a la diversidad, trastorno del espectro autista, discapacidad intelectual y dificultades del aprendizaje. Lidera el grupo de investigación INADDE (Inclusión y Atención a la Diversidad para el Desarrollo) y el Grupo de Investigación para la Educación Inclusiva de Niños con TEA (IETEA).',
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
    bio: 'Ingeniero en Administración por la PUCE, Doctor en Estudios Internacionales por FLACSO Ecuador, Máster en Planificación Territorial y Gestión Ambiental por la Universidad de Barcelona y Administrador de Proyectos certificado por el Tec de Monterrey. Combina la investigación con la consultoría internacional para GOPA Tech y organismos como GIZ y ONU-Hábitat, liderando estudios sobre desarrollo territorial, cambio climático, energía y financiamiento en América Latina. En el servicio público ecuatoriano se ha desempeñado como Coordinador Zonal del Ministerio de Inclusión Económica y Social, Director Zonal de SENPLADES, Asesor del Ministerio de Coordinación de Política Económica, Viceministro de Vivienda y miembro del Directorio del Banco de Desarrollo del Ecuador. Cuenta con más de 10 publicaciones académicas y ha sido docente e investigador invitado en FLACSO Ecuador, la PUCE, la ULEAM y la Universidad Técnica de Manabí.',
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
