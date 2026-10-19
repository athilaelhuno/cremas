// Datos transcritos de cremas.pdf (Escuela Internacional de Cosmetología Eva Berndt Fontboté).
// Las edades NO vienen en el PDF: son rangos sugeridos según la acción principal
// de cada producto. Corregir aquí `edad` si hace falta ([mínima, máxima | null]).

export type Tipo = 'Crema de día' | 'Crema de noche' | 'Serum ionizable' | 'Serum tópico' | 'Limpieza';

export type Accion =
  | 'Hidratante'
  | 'Regeneradora'
  | 'Antirradical libre (ARL)'
  | 'Reafirmante'
  | 'Elasticidad'
  | 'Regula el sebo'
  | 'Antiséptica'
  | 'Antiinflamatoria / descongestiva'
  | 'Reactiva la célula'
  | 'Energizante'
  | 'Exfoliante'
  | 'Dermorrelajante'
  | 'Lubricante (masaje)'
  | 'Limpieza';

export interface Producto {
  id: string;
  nombre: string;
  tipos: Tipo[];
  principios: string[]; // nombres normalizados, usados para filtrar
  principiosTexto: string; // tal como aparece en el PDF
  accionTexto: string; // tal como aparece en el PDF
  acciones: Accion[];
  edad: [number, number | null];
}

const PROVITAGEN = 'Complejo Provitagen (Vitaminas A, C y E, Trigo, Soja, Silimarinas), Sirhamnose';
const CITOQUINAS = 'Citoquinas (Phytocodyne), vitamina E, tocoferoles y fitoesteroles';

export const PRODUCTOS: Producto[] = [
  // ---- Cremas de día (pág. 8) ----
  {
    id: 'crema-humectante',
    nombre: 'Crema Humectante',
    tipos: ['Crema de día'],
    principios: ['FHN', 'Urea'],
    principiosTexto: 'FHN, Urea',
    accionTexto: 'Hidratar',
    acciones: ['Hidratante'],
    edad: [15, null],
  },
  {
    id: 'vitagen-dia',
    nombre: 'Crema Vitagen día',
    tipos: ['Crema de día'],
    principios: ['Complejo Provitagen', 'Vitamina A', 'Vitamina C', 'Vitamina E', 'Trigo', 'Soja', 'Silimarinas', 'Sirhamnose'],
    principiosTexto: PROVITAGEN,
    accionTexto: 'ARL y regenera',
    acciones: ['Antirradical libre (ARL)', 'Regeneradora'],
    edad: [30, null],
  },
  {
    id: 'crema-dinamicell',
    nombre: 'Crema Dinamicell',
    tipos: ['Crema de día'],
    principios: ['Sirhamnose', 'Miristemo', 'SOD', 'Catalasa', 'Levadura de cerveza', 'Centella asiática', 'Ginkgo biloba', 'Ginseng'],
    principiosTexto: 'Sirhamnose, Miristemo, SOD, catalasa, Levadura de cerveza, centella asiática, ginkgo biloba y ginseng',
    accionTexto: 'Regenera y es ARL',
    acciones: ['Regeneradora', 'Antirradical libre (ARL)'],
    edad: [35, null],
  },
  {
    id: 'fluido-hidratante-citoquinas',
    nombre: 'Fluido Hidratante de Citoquinas',
    tipos: ['Crema de día'],
    principios: ['Citoquinas', 'Vitamina E', 'Tocoferoles', 'Fitoesteroles'],
    principiosTexto: CITOQUINAS,
    accionTexto: 'Detecta lo que falta y reactiva su producción, hidratante',
    acciones: ['Reactiva la célula', 'Hidratante'],
    edad: [25, null],
  },
  {
    id: 'fluido-nutritivo-citoquinas',
    nombre: 'Fluido Nutritivo de Citoquinas',
    tipos: ['Crema de día'],
    principios: ['Citoquinas', 'Vitamina E', 'Tocoferoles', 'Fitoesteroles'],
    principiosTexto: CITOQUINAS,
    accionTexto: 'Detecta lo que falta y reactiva su producción, hidratante',
    acciones: ['Reactiva la célula', 'Hidratante'],
    edad: [35, null],
  },
  {
    id: 'crema-bio-q10',
    nombre: 'Crema Bio Q10',
    tipos: ['Crema de día'],
    principios: ['Coenzima Q10', 'Lipomoist', 'Vitamina E'],
    principiosTexto: 'Coenzima BioQ10 liposomada, lipomoist y Vitamina E',
    accionTexto: 'ARL, da energía, hidrata',
    acciones: ['Antirradical libre (ARL)', 'Energizante', 'Hidratante'],
    edad: [25, null],
  },

  // ---- Día y noche (págs. 9 y 12) ----
  {
    id: 'hydragel-oil-free',
    nombre: 'Gel crema Hydragel Oil Free',
    tipos: ['Crema de día', 'Crema de noche'],
    principios: ['Tea tree', 'Polisacáridos'],
    principiosTexto: 'Tea tree y polisacáridos',
    accionTexto: 'Sebostático y antiséptico',
    acciones: ['Regula el sebo', 'Antiséptica'],
    edad: [15, 35],
  },
  {
    id: 'emulsion-normal-pure',
    nombre: 'Emulsión Normalizante Normal Pure (Dermik)',
    tipos: ['Crema de día', 'Crema de noche'],
    principios: ['Zincidone', 'Zinc', 'PCA', 'Fucogel', 'FHN'],
    principiosTexto: 'Zincidone (Zinc + PCA), Fucogel y FHN',
    accionTexto: 'Regulariza el sebo e hidrata',
    acciones: ['Regula el sebo', 'Hidratante'],
    edad: [15, 35],
  },
  {
    id: 'emulsion-piel-sensible',
    nombre: 'Emulsión Equilibrante Piel Sensible',
    tipos: ['Crema de día', 'Crema de noche'],
    principios: ['Siegesbeckia orientalis', 'Centaurium erythraea', 'Bisabolol', 'Nuez de kola'],
    principiosTexto: 'Siegesbeckia Orientalis, Centaurium Erythraea, Bisabolol y Nuez de Kola',
    accionTexto: 'Antiinflamatoria y descongestiva',
    acciones: ['Antiinflamatoria / descongestiva'],
    edad: [15, null],
  },
  {
    id: 'crema-h2',
    nombre: 'Crema facial H.2',
    tipos: ['Crema de día', 'Crema de noche'],
    principios: ['Ácido hialurónico', 'Silicio orgánico'],
    principiosTexto: 'Ácido Hialurónico y Silicio Orgánico',
    accionTexto: 'Hidratante',
    acciones: ['Hidratante'],
    edad: [15, null],
  },
  {
    id: 'ageless',
    nombre: 'Crema facial Reestructurante Ageless (Células madre)',
    tipos: ['Crema de día', 'Crema de noche'],
    principios: ['Células madre de naranja'],
    principiosTexto: 'Células madre de la naranja',
    accionTexto: 'Reafirmante',
    acciones: ['Reafirmante'],
    edad: [35, null],
  },
  {
    id: 'cellmater',
    nombre: 'Crema Global Cream CellMater (Dermik)',
    tipos: ['Crema de día', 'Crema de noche'],
    principios: ['Células madre de cardo marino'],
    principiosTexto: 'Células madre del cardo de mar o cardo marino',
    accionTexto: 'Regeneradora',
    acciones: ['Regeneradora'],
    edad: [35, null],
  },

  // ---- Cremas de noche (págs. 10 y 11) ----
  {
    id: 'vitacil',
    nombre: 'Vitacil',
    tipos: ['Crema de noche'],
    principios: ['Vitamina E', 'Vitamina F'],
    principiosTexto: 'Vitaminas E y F',
    accionTexto: 'Lubricante (masaje)',
    acciones: ['Lubricante (masaje)'],
    edad: [15, null],
  },
  {
    id: 'aceite-jojoba',
    nombre: 'Aceite de Jojoba',
    tipos: ['Crema de noche'],
    principios: ['Ceramidas', 'Aceite de jojoba'],
    principiosTexto: 'Ceramidas',
    accionTexto: 'Hidrata',
    acciones: ['Hidratante'],
    edad: [15, null],
  },
  {
    id: 'vitagen-noche',
    nombre: 'Vitagen noche',
    tipos: ['Crema de noche'],
    principios: ['Complejo Provitagen', 'Vitamina A', 'Vitamina C', 'Vitamina E', 'Trigo', 'Soja', 'Silimarinas', 'Sirhamnose'],
    principiosTexto: PROVITAGEN,
    accionTexto: 'Regenera, ARL',
    acciones: ['Regeneradora', 'Antirradical libre (ARL)'],
    edad: [30, null],
  },
  {
    id: 'elastina-plus',
    nombre: 'Elastina Plus',
    tipos: ['Crema de noche'],
    principios: ['Elastina'],
    principiosTexto: 'Elastina',
    accionTexto: 'Elasticidad',
    acciones: ['Elasticidad'],
    edad: [35, null],
  },
  {
    id: 'biohidrat',
    nombre: 'Biohidrat',
    tipos: ['Crema de noche'],
    principios: ['Elastina', 'Hamamelis'],
    principiosTexto: 'Elastina y Hamamelis',
    accionTexto: 'Elasticidad y reafirmación',
    acciones: ['Elasticidad', 'Reafirmante'],
    edad: [35, null],
  },
  {
    id: 'bionutritif',
    nombre: 'Bionutritif',
    tipos: ['Crema de noche'],
    principios: ['Colágeno', 'Elastina', 'Placenta'],
    principiosTexto: 'Colágeno, elastina, placenta',
    accionTexto: 'Reafirma y regenera',
    acciones: ['Reafirmante', 'Regeneradora'],
    edad: [40, null],
  },
  {
    id: 'crema-parpados',
    nombre: 'Crema para párpados',
    tipos: ['Crema de noche'],
    principios: ['Colágeno', 'Placenta', 'Alantoína', 'Hamamelis'],
    principiosTexto: 'Colágeno, placenta, alantoína y hamamelis',
    accionTexto: 'Reafirma y regenera',
    acciones: ['Reafirmante', 'Regeneradora'],
    edad: [35, null],
  },
  {
    id: 'gel-contorno-ojos',
    nombre: 'Gel contorno de ojos',
    tipos: ['Crema de noche'],
    principios: ['Citoquinas', 'Vitamina E'],
    principiosTexto: 'Citoquinas liposomadas y vitamina E',
    accionTexto: 'Detecta lo que falta y reactiva su producción, hidratante',
    acciones: ['Reactiva la célula', 'Hidratante'],
    edad: [25, null],
  },
  {
    id: 'gel-sebo-complex',
    nombre: 'Gel sebo complex',
    tipos: ['Crema de noche'],
    principios: ['Polisacáridos', 'Laminaria saccharina', 'SOD', 'Extractos vegetales'],
    principiosTexto: 'Polisacáridos, Laminaria Saccharina, SOD y Extractos vegetales',
    accionTexto: 'Regularizante del sebo, regenerador y ARL',
    acciones: ['Regula el sebo', 'Regeneradora', 'Antirradical libre (ARL)'],
    edad: [15, 40],
  },

  // ---- Serum ionizables (págs. 13 y 14) ----
  {
    id: 'serum-hidratante-plus',
    nombre: 'Hidratante plus',
    tipos: ['Serum ionizable'],
    principios: ['FHN', 'Urea', 'PCA', 'Ácido láctico', 'Alantoína', 'Sacáridos', 'Mucopolisacáridos', 'Ácido hialurónico'],
    principiosTexto: 'FHN, Urea, PCA, ácido láctico, alantoína, sacáridos, mucopolisacáridos, ácido hialurónico',
    accionTexto: 'Hidratar',
    acciones: ['Hidratante'],
    edad: [15, null],
  },
  {
    id: 'serum-bio-regenerador',
    nombre: 'Bio regenerador',
    tipos: ['Serum ionizable'],
    principios: ['Soja', 'Germen de trigo', 'Centella asiática'],
    principiosTexto: 'Soja, germen de trigo y centella asiática',
    accionTexto: 'Regenera',
    acciones: ['Regeneradora'],
    edad: [35, null],
  },
  {
    id: 'serum-dinamicell',
    nombre: 'Dinamicell (serum)',
    tipos: ['Serum ionizable'],
    principios: ['SOD', 'Miristemo', 'Centella asiática', 'Ginkgo biloba', 'Ginseng', 'Levadura de cerveza', 'Trigo'],
    principiosTexto: 'SOD, Miristemo, centella asiática, gingko biloba, ginseng, levadura de cerveza y trigo',
    accionTexto: 'Regenera - ARL',
    acciones: ['Regeneradora', 'Antirradical libre (ARL)'],
    edad: [35, null],
  },
  {
    id: 'serum-placenta',
    nombre: 'Placenta',
    tipos: ['Serum ionizable'],
    principios: ['Placenta'],
    principiosTexto: 'Extracto de Placenta (vitamina B, aminoácidos, enzimas y oligoelementos)',
    accionTexto: 'Regenera',
    acciones: ['Regeneradora'],
    edad: [40, null],
  },
  {
    id: 'serum-reafirmante',
    nombre: 'Reafirmante',
    tipos: ['Serum ionizable'],
    principios: ['Cardo mariano', 'Alquemila', 'Equiseto', 'Soja', 'Trigo', 'Alfalfa', 'Rábano'],
    principiosTexto: 'Cardo mariano, alquemila, equiseto, soja, trigo, alfalfa y rábano',
    accionTexto: 'Reafirmante',
    acciones: ['Reafirmante'],
    edad: [35, null],
  },
  {
    id: 'serum-colageno-elastina',
    nombre: 'Colágeno-elastina',
    tipos: ['Serum ionizable'],
    principios: ['Colágeno', 'Elastina'],
    principiosTexto: 'Aminoácidos de Colágeno y elastina',
    accionTexto: 'Hidrata y reafirma',
    acciones: ['Hidratante', 'Reafirmante'],
    edad: [30, null],
  },
  {
    id: 'serum-oil-free',
    nombre: 'Oil free',
    tipos: ['Serum ionizable'],
    principios: ['Tea tree', 'Hamamelis', 'Glicina de soja', 'Germen de trigo', 'Bisabolol'],
    principiosTexto: 'Tea tree, Extracto de Hamamelis, Glicina de Soja, Germen de Trigo y Bisabolol',
    accionTexto: 'Regularizante del sebo y antiséptico',
    acciones: ['Regula el sebo', 'Antiséptica'],
    edad: [15, 35],
  },

  // ---- Serum tópicos (pág. 15) ----
  {
    id: 'serum-q10',
    nombre: 'Q10',
    tipos: ['Serum tópico'],
    principios: ['Coenzima Q10', 'Polisacáridos'],
    principiosTexto: 'Q10 liposomado y polisacáridos',
    accionTexto: 'Da energía y ARL',
    acciones: ['Energizante', 'Antirradical libre (ARL)'],
    edad: [25, null],
  },
  {
    id: 'serum-skin-box',
    nombre: 'Skin box',
    tipos: ['Serum tópico'],
    principios: ['Argireline', 'Aldeline', 'Ceramidas', 'Aosaine', 'Extracto de café'],
    principiosTexto: 'Argireline-aldeline, ceramidas, aosaine y extracto de café',
    accionTexto: 'Dermorrelajante',
    acciones: ['Dermorrelajante'],
    edad: [35, null],
  },
  {
    id: 'serum-aha',
    nombre: 'AHA (20%)',
    tipos: ['Serum tópico'],
    principios: ['AHA', 'Ácido glicólico', 'Ácido láctico', 'Ácido cítrico', 'Ácido málico', 'Ácido tartárico'],
    principiosTexto: 'Glicólico, láctico, cítrico, málico y tartárico',
    accionTexto: 'Exfoliante',
    acciones: ['Exfoliante'],
    edad: [25, null],
  },
  {
    id: 'serum-purificante',
    nombre: 'Purificante Normal Pure (Dermik)',
    tipos: ['Serum tópico'],
    principios: ['Zincidone', 'Zinc', 'PCA', 'Ácido glicólico', 'AHA'],
    principiosTexto: 'Zincidone (Zinc + PCA), ácido glicólico y AHA',
    accionTexto: 'Regulariza el sebo e hidrata',
    acciones: ['Regula el sebo', 'Hidratante'],
    edad: [15, 35],
  },

  // ---- Productos de limpieza (pág. 7, manuscrita) ----
  {
    id: 'leche-limpieza',
    nombre: 'Leche de limpieza + loción hidratante o descongestiva',
    tipos: ['Limpieza'],
    principios: [],
    principiosTexto: '—',
    accionTexto: 'Limpieza; loción hidratante o descongestiva',
    acciones: ['Limpieza', 'Hidratante', 'Antiinflamatoria / descongestiva'],
    edad: [15, null],
  },
  {
    id: 'gel-limpieza-sensible',
    nombre: 'Gel de limpieza + loción tónica piel sensible',
    tipos: ['Limpieza'],
    principios: [],
    principiosTexto: '—',
    accionTexto: 'Limpieza para piel sensible',
    acciones: ['Limpieza', 'Antiinflamatoria / descongestiva'],
    edad: [15, null],
  },
  {
    id: 'gel-espuma-aha',
    nombre: 'Gel espuma limpiadora con AHA + loción hidratante y refinadora Refinesse',
    tipos: ['Limpieza'],
    principios: ['AHA'],
    principiosTexto: 'AHA',
    accionTexto: 'Limpieza, exfolia, hidrata y refina',
    acciones: ['Limpieza', 'Exfoliante', 'Hidratante'],
    edad: [25, null],
  },
  {
    id: 'gel-crema-limpieza-oil-free',
    nombre: 'Gel crema de limpieza + loción sebotónica Oil Free',
    tipos: ['Limpieza'],
    principios: [],
    principiosTexto: '—',
    accionTexto: 'Limpieza para piel grasa (sebotónica)',
    acciones: ['Limpieza', 'Regula el sebo'],
    edad: [15, 35],
  },
];

export const TIPOS: Tipo[] = ['Crema de día', 'Crema de noche', 'Serum ionizable', 'Serum tópico', 'Limpieza'];

export const RANGOS_EDAD: { label: string; min: number; max: number }[] = [
  { label: '15–24', min: 15, max: 24 },
  { label: '25–34', min: 25, max: 34 },
  { label: '35–44', min: 35, max: 44 },
  { label: '45+', min: 45, max: 200 },
];

export function textoEdad([min, max]: Producto['edad']): string {
  return max == null ? `${min}+ años` : `${min}–${max} años`;
}

// ---- Tablas de principios activos (págs. 1–6) ----

export interface GrupoPA {
  grupo: string;
  filas: { accion: string[]; nombres: string[] }[];
}

export const GRUPOS_PA: GrupoPA[] = [
  {
    grupo: 'Hidratantes y humectantes',
    filas: [
      {
        accion: [
          'Retener el agua cutánea (higroscópico)',
          'Aportar una capa lipídica oclusiva (barrera de permeabilidad). Oclusiva: cierre',
        ],
        nombres: [
          'FHN o NMF (factor de humectación natural)',
          'Ceramidas',
          'Colágeno',
          'Polisacáridos',
          'Mucopolisacáridos',
          'Ácido hialurónico',
          'Aceite de jojoba',
          "Alfahidroxiácidos (AHA's hasta 8%)",
          'Urea',
          'Ácido láctico',
          'Aloe vera',
          'Silicio orgánico',
          'Algas',
          'Glicoproteínas',
          'Aceite de argán',
          'Manteca de karité',
          'Carbohidratos',
        ],
      },
    ],
  },
  {
    grupo: 'Regularizantes del sebo',
    filas: [
      {
        accion: ['Frenan la fabricación de sebo en exceso'],
        nombres: ['Laminaria saccharina', 'Azufre coloidal', 'Levadura de cerveza', 'Zinc'],
      },
      {
        accion: ['Además de frenar la fabricación de sebo, es bactericida y antiséptico'],
        nombres: ['Tea tree (árbol del té australiano o melaleuca alternifolia)'],
      },
    ],
  },
  {
    grupo: 'Proteínas',
    filas: [{ accion: ['Formar estructuras'], nombres: ['Colágeno', 'Elastina', 'Reticulina', 'Queratina'] }],
  },
  {
    grupo: 'Reafirmantes',
    filas: [
      {
        accion: [
          'Aumentar el tono y mejorar la estructura dermo-epidérmica',
          'Aumenta la firmeza y flexibilidad de la piel',
          'Estimula a los fibroblastos de la dermis',
        ],
        nombres: [
          'Colágeno',
          'Elastina',
          'Reticulina',
          'Silanoles (silicio orgánico)',
          'Caviar',
          'Extractos herbáceos reafirmantes (cardo mariano, alquemila, equiseto, soja, trigo, alfalfa y rábano)',
          'Cola de caballo',
          'Castaño de indias',
          'Células madre reafirmantes',
          'Sirhamnose',
          'Coenzima Q10 o Ubiquinona',
          'Vitamina C',
        ],
      },
    ],
  },
  {
    grupo: 'Regeneradores o nutritivos',
    filas: [
      {
        accion: [
          'Restituye lo que la piel produce y va perdiendo con el paso de los años',
          'Aporta sustancias que alimentan o nutren a la piel y le permiten mejorar todas sus funciones (mitosis, metabolismo, etc.)',
        ],
        nombres: [
          'Placenta (obtenida por biotecnología)',
          'Sirhamnose',
          'Glucógeno',
          'Ginseng',
          'Ginkgo biloba',
          'Miristemo (Dinamicell)',
          'Centella asiática',
          'Células madre regeneradoras',
          'Caviar',
          'Aceites vegetales (rosa mosqueta, germen de trigo, soya, palta, caléndula, argán, etc.)',
        ],
      },
    ],
  },
  {
    grupo: 'Desinflamatorios y descongestivos',
    filas: [
      {
        accion: ['Subir el umbral de sensibilidad (disminuir inflamación)', 'Disminuir rojez, congestión, vasodilatación'],
        nombres: ['Centaurium erythraea', 'Siegesbeckia orientalis', 'Manzanilla', 'Azuleno', 'Bisabolol'],
      },
    ],
  },
  {
    grupo: 'Vitaminas',
    filas: [
      { accion: ['Epidermizante y ARL'], nombres: ['A (Retinol)'] },
      { accion: ['Despigmenta, regula el sebo y fortalece la barrera cutánea'], nombres: ['B3 (Niacinamida)'] },
      { accion: ['Mejora el efecto de proteínas y lípidos, humectante y emoliente'], nombres: ['B5 (Pantenol)'] },
      {
        accion: ['ARL, estimula la formación de colágeno, aclarante, mejora las defensas de la piel'],
        nombres: ['C (Ácido ascórbico)'],
      },
      { accion: ['Refuerza la función barrera, mejora la hidratación y elasticidad'], nombres: ['D3 (Colecalciferol)'] },
      { accion: ['ARL y refuerza la función barrera'], nombres: ['E (Alfa tocoferol)'] },
      {
        accion: ['Refuerza la barrera cutánea, hidrata y previene el envejecimiento prematuro de la piel'],
        nombres: ['F (ácidos grasos esenciales: linoleico, linolénico y araquidónico)'],
      },
    ],
  },
  {
    grupo: 'Reguladores de la actividad celular (citocinético o citoestimulante)',
    filas: [
      { accion: ['Detecta lo que le hace falta a la célula y reactiva su producción'], nombres: ['Citoquinas'] },
      {
        accion: ['Aporta el 95% de la energía a las células', 'Antirradical libre (ARL)'],
        nombres: ['Coenzima reparadora Q10 o Ubiquinona'],
      },
      {
        accion: ['Antirradical libre', 'Regenerador'],
        nombres: [
          'Complejo Dinamicell (PA que actúan en conjunto): Miristemo, levadura de cerveza, centella asiática, ginseng, ginkgo biloba, SOD, catalasa',
        ],
      },
    ],
  },
];
