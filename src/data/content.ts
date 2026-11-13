import hero from '../assets/images/hero.png';
import retrato from '../assets/images/retrato.png';
import competencia from '../assets/images/competencia-digital.png';
import iaAula from '../assets/images/ia-aula.svg';
import metodologias from '../assets/images/metodologias.svg';
import evaluacion from '../assets/images/evaluacion.svg';
import taller from '../assets/images/taller.svg';
import libros from '../assets/images/libros.svg';
import conferencia from '../assets/images/conferencia.svg';
import oro from '../assets/images/oro-abstracto.svg';

export const images = { hero, retrato, competencia, iaAula, metodologias, evaluacion, taller, libros, conferencia, oro };

export const site = {
  name: 'Tu Nombre',
  role: 'Docente · Formador · Divulgador',
  email: 'hola@tunombre.es',
  location: 'València, España',
  description:
    'Formación docente en innovación educativa, inteligencia artificial y metodologías activas. Cursos, talleres y mentoría para profesorado que quiere transformar su aula.',
};

export const nav = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Método', href: '#metodo' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Contacto', href: '#contacto' },
];

export const marquee = ['Innovación', 'Pedagogía', 'Inteligencia artificial', 'Aprendizaje activo', 'Evaluación', 'Competencia digital', 'Creatividad'];

export const stats = [
  { value: 18, suffix: '+', label: 'años en el aula', decimals: 0 },
  { value: 12500, suffix: '', label: 'docentes formados', decimals: 0 },
  { value: 64, suffix: '', label: 'cursos y talleres', decimals: 0 },
  { value: 4.9, suffix: '/5', label: 'valoración media', decimals: 1 },
];

export const courses = [
  {
    title: 'IA en el aula',
    desc: 'Integra la inteligencia artificial generativa con criterio pedagógico: diseño de tareas, ética y evaluación.',
    tags: ['20 h', 'Online', 'Nivel inicial'],
    img: iaAula,
  },
  {
    title: 'Competencia digital docente',
    desc: 'Del marco DigCompEdu a la práctica: herramientas, flujos de trabajo y recursos que ahorran tiempo.',
    tags: ['30 h', 'Mixto', 'A2 → B2'],
    img: competencia,
  },
  {
    title: 'Metodologías activas',
    desc: 'ABP, aprendizaje cooperativo y gamificación con secuencias listas para llevar al aula el lunes.',
    tags: ['25 h', 'Presencial', 'Todos los niveles'],
    img: metodologias,
  },
  {
    title: 'Evaluar para aprender',
    desc: 'Rúbricas, feedback formativo y evaluación auténtica que motiva al alumnado en lugar de castigarlo.',
    tags: ['15 h', 'Online', 'Nivel medio'],
    img: evaluacion,
  },
];

export const method = [
  { n: '01', title: 'Diagnóstico', text: 'Partimos de tu contexto real: etapa, alumnado, recursos y objetivos de centro.' },
  { n: '02', title: 'Diseño', text: 'Co-diseñamos situaciones de aprendizaje concretas, alineadas con el currículo.' },
  { n: '03', title: 'Aplicación', text: 'Las llevas al aula con acompañamiento, plantillas y materiales editables.' },
  { n: '04', title: 'Reflexión', text: 'Analizamos evidencias, ajustamos y compartimos lo aprendido con el claustro.' },
];

export const gallery = [
  { img: retrato, alt: 'Docente en su escritorio con libros', tall: false },
  { img: taller, alt: 'Ilustración de un taller de formación docente', tall: true },
  { img: libros, alt: 'Ilustración de una pila de libros bajo una lámpara dorada', tall: false },
  { img: conferencia, alt: 'Ilustración de una conferencia sobre educación', tall: false },
  { img: competencia, alt: 'Escritorio con tableta sobre competencia digital docente', tall: true },
  { img: hero, alt: 'Docente en un aula iluminada con luz cálida', tall: false },
];

export const testimonials = [
  {
    quote: 'El curso de IA me cambió la forma de diseñar tareas. Por primera vez siento que uso la tecnología con sentido, no por moda.',
    name: 'Laura M.',
    role: 'Profesora de Secundaria · Lengua',
  },
  {
    quote: 'Práctico, cercano y con materiales que de verdad usas al día siguiente. Todo el claustro salió con ganas de probar cosas nuevas.',
    name: 'Jordi P.',
    role: 'Director · CEIP',
  },
  {
    quote: 'La parte de evaluación formativa fue un antes y un después. Mis alumnos ahora entienden qué y por qué aprenden.',
    name: 'Marta S.',
    role: 'Maestra de Primaria',
  },
];

export const resources = [
  { title: 'Guía rápida de prompts para docentes', type: 'PDF · 12 págs.', img: iaAula },
  { title: 'Plantilla de situación de aprendizaje', type: 'Plantilla editable', img: metodologias },
  { title: 'Banco de rúbricas por competencias', type: 'Recurso descargable', img: evaluacion },
  { title: 'Charla: educar en la era de la IA', type: 'Vídeo · 45 min', img: conferencia },
];
