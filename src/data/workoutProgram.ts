import { DayWorkout, Exercise, IntensityLevel, MuscleGroup, ExerciseIconType } from '../types';

// Banco de Exercícios para Treino em Casa Sem Equipamento
export const EXERCISES_LIBRARY: Record<string, Exercise> = {
  // --- CORPO INTEIRO & CARDIO ---
  polichinelo_iniciante: {
    id: 'polichinelo_iniciante',
    name: 'Polichinelo de Baixo Impacto',
    muscleGroup: 'Corpo Inteiro',
    durationSeconds: 30,
    sets: 3,
    restSeconds: 20,
    intensity: 'leve',
    iconType: 'jumping_jacks',
    instructions: [
      'Fique em pé com os pés juntos e os braços ao lado do corpo.',
      'Dê um passo lateral com a perna direita enquanto eleva os braços acima da cabeça.',
      'Retorne à posição inicial e repita para o lado esquerdo de forma contínua.',
      'Mantenha o abdômen firme e respire ritmicamente.'
    ],
    beginnerTip: 'Sem impactos nos joelhos! Toque a ponta do pé no chão com suavidade e mantenha o ritmo constante.'
  },
  polichinelo_tradicional: {
    id: 'polichinelo_tradicional',
    name: 'Polichinelo Dinâmico',
    muscleGroup: 'Corpo Inteiro',
    durationSeconds: 35,
    sets: 3,
    restSeconds: 15,
    intensity: 'moderado',
    iconType: 'jumping_jacks',
    instructions: [
      'Salte abrindo as pernas na largura dos ombros e batendo palmas acima da cabeça.',
      'Retorne fechando as pernas e abaixando os braços de forma coordenada.',
      'Aterrisse suavemente sobre a parte anterior dos pés amortecendo com os joelhos.'
    ],
    beginnerTip: 'Mantenha os calcanhares ligeiramente fora do chão para proteger a coluna.'
  },
  joelhos_altos_leve: {
    id: 'joelhos_altos_leve',
    name: 'Marcha Estacionária com Joelhos Elevados',
    muscleGroup: 'Corpo Inteiro',
    durationSeconds: 30,
    sets: 3,
    restSeconds: 20,
    intensity: 'leve',
    iconType: 'high_knees',
    instructions: [
      'Fique em pé e comece a marchar no mesmo lugar.',
      'Eleve os joelhos alternadamente até a altura do quadril.',
      'Mova os braços em sincronia com as pernas, mantendo postura ereta.',
      'Acelere o ritmo conforme for se sentindo aquecido.'
    ],
    beginnerTip: 'Excelente para queimar calorias e melhorar a coordenação sem impacto nas articulações.'
  },
  corrida_estacionaria_intensa: {
    id: 'corrida_estacionaria_intensa',
    name: 'Corrida no Lugar (High Knees Cardio)',
    muscleGroup: 'Corpo Inteiro',
    durationSeconds: 35,
    sets: 3,
    restSeconds: 15,
    intensity: 'intenso',
    iconType: 'high_knees',
    instructions: [
      'Corra no mesmo lugar elevando rapidamente os joelhos.',
      'Bombeie os braços vigorosamente ao lado do corpo.',
      'Mantenha o peito aberto e respiração ritmada.'
    ],
    beginnerTip: 'Acelere nos últimos 10 segundos para acionar a queima metabólica acelerada.'
  },
  patinador_lateral: {
    id: 'patinador_lateral',
    name: 'Passo Patinador Lateral (Skater)',
    muscleGroup: 'Corpo Inteiro',
    durationSeconds: 30,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'jumping_jacks',
    instructions: [
      'Dê um passo largo para a direita cruzando a perna esquerda por trás.',
      'Inverta o movimento saltando suavemente para a esquerda.',
      'Acompanhe o movimento com os braços como um patinador de velocidade.'
    ],
    beginnerTip: 'Excelente para queimar gordura e fortalecer o equilíbrio dos tornozelos.'
  },
  agachamento_com_salto_suave: {
    id: 'agachamento_com_salto_suave',
    name: 'Agachamento com Elevação Rápida',
    muscleGroup: 'Corpo Inteiro',
    reps: 12,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'squats',
    instructions: [
      'Faça um agachamento tradicional com quadril para trás.',
      'Ao subir, impulsione o corpo ficando na ponta dos pés com energia.',
      'Retorne amortecendo o movimento de forma suave.'
    ],
    beginnerTip: 'Se sentir conforto, dê um micro-salto descolando 2 cm do chão.'
  },

  // --- PERNAS & GLÚTEOS ---
  agachamento_livre: {
    id: 'agachamento_livre',
    name: 'Agachamento Livre com Apoio de Postura',
    muscleGroup: 'Pernas & Glúteos',
    reps: 12,
    sets: 3,
    restSeconds: 20,
    intensity: 'leve',
    iconType: 'squats',
    instructions: [
      'Posicione os pés na largura dos ombros, ligeiramente apontados para fora.',
      'Projete os quadris para trás como se fosse sentar em uma cadeira imaginária.',
      'Mantenha o peito aberto e a coluna alinhada.',
      'Desça até as coxas ficarem paralelas ao chão ou no limite do seu conforto, empurre pelos calcanhares para subir.'
    ],
    beginnerTip: 'Não deixe os joelhos fecharem para dentro ao subir. Se sentir insegurança, use uma cadeira atrás como guia.'
  },
  agachamento_sumo: {
    id: 'agachamento_sumo',
    name: 'Agachamento Sumô (Foco em Interno de Coxas)',
    muscleGroup: 'Pernas & Glúteos',
    reps: 15,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'squats',
    instructions: [
      'Afaste os pés além da largura dos ombros com as pontas viradas a 45 graus para fora.',
      'Mantenha a coluna ereta e desça flexionando os joelhos em direção às pontas dos pés.',
      'Empurre o chão apertando os glúteos e a parte interna das coxas.'
    ],
    beginnerTip: 'Perfeito para tonificar a face interna das coxas e diminuir a flacidez.'
  },
  agachamento_isometrico_parede: {
    id: 'agachamento_isometrico_parede',
    name: 'Cadeirinha na Parede (Isometria de Pernas)',
    muscleGroup: 'Pernas & Glúteos',
    durationSeconds: 30,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'squats',
    instructions: [
      'Encoste as costas completamente retas na parede.',
      'Deslize até formar um ângulo de 90 graus nos joelhos, como sentado.',
      'Segure firme na posição sentindo a queimação nas coxas sem mexer.'
    ],
    beginnerTip: 'Mantenha os braços estendidos ou cruzados sobre o peito. Não apoie as mãos nas coxas.'
  },
  afundo_estatico: {
    id: 'afundo_estatico',
    name: 'Passada Estática / Afundo Suave',
    muscleGroup: 'Pernas & Glúteos',
    reps: 10,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'lunges',
    instructions: [
      'Dê um passo longo para frente com uma das pernas.',
      'Mantenha o tronco reto e flexione ambos os joelhos em direção ao chão.',
      'O joelho de trás se aproxima do chão sem tocar com força.',
      'Empurre o chão com a perna da frente para retornar à posição inicial do afundo.'
    ],
    beginnerTip: 'Você pode segurar levemente na parede para manter a firmeza no início.'
  },
  afundo_reverso: {
    id: 'afundo_reverso',
    name: 'Afundo Reverso com Passada para Trás',
    muscleGroup: 'Pernas & Glúteos',
    reps: 12,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'lunges',
    instructions: [
      'Fique em pé e dê um passo para trás com a perna direita.',
      'Flexione os joelhos descendo o quadril de forma suave.',
      'Retorne à posição inicial e alterne a perna de apoio.'
    ],
    beginnerTip: 'O afundo reverso sobrecarrega muito menos os joelhos do que o afundo frontal.'
  },
  ponte_gluteos: {
    id: 'ponte_gluteos',
    name: 'Elevação Pélvica (Ponte de Glúteos)',
    muscleGroup: 'Pernas & Glúteos',
    reps: 15,
    sets: 3,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'glute_bridge',
    instructions: [
      'Deite de costas no colchonete ou tapete com os joelhos dobrados e pés firmes no chão.',
      'Braços estendidos ao lado do quadril com as palmas voltadas para baixo.',
      'Eleve o quadril em direção ao teto, contraindo forte os glúteos no ponto mais alto.',
      'Segure por 1 segundo no topo e desça controladamente sem despencar.'
    ],
    beginnerTip: 'Protege a lombar e fortalece a cadeia posterior. Sinta a força vindo das nádegas e coxas, não da coluna.'
  },
  ponte_gluteos_unilateral: {
    id: 'ponte_gluteos_unilateral',
    name: 'Ponte de Glúteos Unilateral',
    muscleGroup: 'Pernas & Glúteos',
    reps: 10,
    sets: 3,
    restSeconds: 20,
    intensity: 'intenso',
    iconType: 'glute_bridge',
    instructions: [
      'Deite de costas e eleve uma das pernas estendida para o teto.',
      'Empurre o chão apenas com o calcanhar da perna de apoio elevando o quadril.',
      'Contrai o glúteo no topo e desça com controle.',
      'Repita o mesmo número de repetições para o outro lado.'
    ],
    beginnerTip: 'Corrige desequilíbrios entre os dois lados do corpo e desenha os glúteos.'
  },
  panturrilha_em_pe: {
    id: 'panturrilha_em_pe',
    name: 'Elevação de Panturrilha em Pé',
    muscleGroup: 'Pernas & Glúteos',
    reps: 18,
    sets: 3,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'calf_raises',
    instructions: [
      'Fique em pé próximo a uma parede ou encosto para manter o equilíbrio.',
      'Eleve os calcanhares o mais alto possível, ficando na ponta dos pés.',
      'Aperte a panturrilha no topo por 1 segundo.',
      'Desça lentamente sentindo a musculatura trabalhar.'
    ],
    beginnerTip: 'Melhora a circulação sanguínea das pernas e reduz o inchaço após dias sentado.'
  },

  // --- BRAÇOS, PEITO & COSTAS (SUPERIORES & POSTURA) ---
  flexao_parede: {
    id: 'flexao_parede',
    name: 'Flexão Inclinada na Parede',
    muscleGroup: 'Braços & Peito',
    reps: 12,
    sets: 3,
    restSeconds: 20,
    intensity: 'leve',
    iconType: 'wall_pushup',
    instructions: [
      'Fique em pé de frente para a parede, a um passo de distância.',
      'Apoie as palmas das mãos na parede na altura e largura dos ombros.',
      'Flexione os cotovelos lentamente aproximando o peito da parede.',
      'Empurre firmemente com as mãos até esticar os braços sem travar as articulações.'
    ],
    beginnerTip: 'Excelente para quem nunca fez flexão. Quanto mais longe seus pés estiverem da parede, maior o esforço.'
  },
  flexao_joelhos: {
    id: 'flexao_joelhos',
    name: 'Flexão no Chão com Joelhos Apoiados',
    muscleGroup: 'Braços & Peito',
    reps: 10,
    sets: 3,
    restSeconds: 25,
    intensity: 'moderado',
    iconType: 'wall_pushup',
    instructions: [
      'Deite de bruços e posicione as mãos no chão na largura dos ombros.',
      'Mantenha os joelhos apoiados e cruze os pés atrás se preferir.',
      'Empurre o chão elevando o tronco em bloco unido.',
      'Desça controladamente até que o peito fique a quatro dedos do chão.'
    ],
    beginnerTip: 'O próximo passo de evolução da flexão na parede. Não deixe a lombar arquear.'
  },
  circulos_bracos: {
    id: 'circulos_bracos',
    name: 'Círculos com os Braços & Ativação de Ombros',
    muscleGroup: 'Braços & Peito',
    durationSeconds: 30,
    sets: 3,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'arm_circles',
    instructions: [
      'Fique em pé com postura ereta e abra os braços na horizontal, na altura dos ombros.',
      'Faça giros pequenos e controlados para frente por 15 segundos.',
      'Sem abaixar os braços, inverta o movimento girando para trás por mais 15 segundos.',
      'Mantenha os ombros relaxados, longe das orelhas.'
    ],
    beginnerTip: 'Apesar de simples, queima e fortalece os ombros sem precisar de halteres!'
  },
  triceps_banco: {
    id: 'triceps_banco',
    name: 'Mergulho de Tríceps na Cadeira Firme',
    muscleGroup: 'Braços & Peito',
    reps: 12,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'wall_pushup',
    instructions: [
      'Sente na ponta de uma cadeira firme e apoie as mãos na borda ao lado do quadril.',
      'Desloque o quadril para frente da cadeira com os pés firmes no chão.',
      'Flexione os cotovelos para trás descendo o corpo em linha reta.',
      'Empurre a cadeira para subir ativando a parte de trás dos braços (tríceps).'
    ],
    beginnerTip: 'O melhor exercício caseiro para combater o famoso "tchauzinho" sem peso.'
  },
  puxada_w_costas: {
    id: 'puxada_w_costas',
    name: 'Puxada em W Isométrica para Costas',
    muscleGroup: 'Braços & Peito',
    durationSeconds: 30,
    sets: 3,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'arm_circles',
    instructions: [
      'Deite de bruços ou fique em pé levemente inclinado.',
      'Estenda os braços acima em Y e puxe os cotovelos para trás formando a letra W.',
      'Aperte as escápulas uma contra a outra por 2 segundos e retorne com calma.'
    ],
    beginnerTip: 'Desperta a musculatura das costas e corrige os ombros caídos para frente.'
  },
  toque_ombros_prancha: {
    id: 'toque_ombros_prancha',
    name: 'Prancha com Toque Alternado no Ombro',
    muscleGroup: 'Braços & Peito',
    reps: 14,
    sets: 3,
    restSeconds: 20,
    intensity: 'intenso',
    iconType: 'knee_plank',
    instructions: [
      'Em posição de flexão (mãos no chão), afaste um pouco os pés para dar estabilidade.',
      'Retire a mão direita do chão e toque suavemente o ombro esquerdo.',
      'Retorne e toque o ombro direito com a mão esquerda.',
      'Tente não rebolar o quadril durante os toques.'
    ],
    beginnerTip: 'Fortalece ombros, peitoral e força anti-rotacional do abdômen ao mesmo tempo.'
  },

  // --- ABDÔMEN & CORE ---
  prancha_joelhos: {
    id: 'prancha_joelhos',
    name: 'Prancha Frontal com Joelhos Apoiados',
    muscleGroup: 'Abdômen & Core',
    durationSeconds: 30,
    sets: 3,
    restSeconds: 20,
    intensity: 'leve',
    iconType: 'knee_plank',
    instructions: [
      'Apoie os antebraços e os joelhos no chão.',
      'Mantenha os cotovelos alinhados exatamente abaixo dos ombros.',
      'Forme uma linha reta dos ombros até os joelhos, ativando o abdômen como se fosse levar o umbigo até as costas.',
      'Mantenha a respiração fluida sem prender o ar.'
    ],
    beginnerTip: 'Não deixe o quadril cair nem subir demais. Se tremer é normal, o abdômen está sendo ativado!'
  },
  prancha_frontal_completa: {
    id: 'prancha_frontal_completa',
    name: 'Prancha Frontal Tradicional',
    muscleGroup: 'Abdômen & Core',
    durationSeconds: 35,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'knee_plank',
    instructions: [
      'Apoie os antebraços no chão e apoie as pontas dos pés.',
      'Mantenha o corpo em uma linha reta da cabeça aos calcanhares.',
      'Contrai glúteos e abdômen continuamente.',
      'Respire de forma controlada durante todo o tempo.'
    ],
    beginnerTip: 'Mantenha o pescoço neutro olhando para o chão entre as mãos.'
  },
  perdigueiro: {
    id: 'perdigueiro',
    name: 'Perdigueiro (Bird-Dog para Lombar & Core)',
    muscleGroup: 'Abdômen & Core',
    reps: 12,
    sets: 3,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'bird_dog',
    instructions: [
      'Posicione-se em 4 apoios no chão (mãos abaixo dos ombros e joelhos abaixo do quadril).',
      'Estenda o braço direito para frente e a perna esquerda para trás simultaneamente.',
      'Mantenha o corpo paralelo ao chão por 2 segundos.',
      'Retorne suavemente e alterne para o braço esquerdo e perna direita.'
    ],
    beginnerTip: 'Exercício de ouro para a postura e saúde da coluna vertebral. Concentre-se no equilíbrio e estabilidade.'
  },
  toque_calcanhar: {
    id: 'toque_calcanhar',
    name: 'Toque no Calcanhar (Abdômen Oblíquo)',
    muscleGroup: 'Abdômen & Core',
    reps: 16,
    sets: 3,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'glute_bridge',
    instructions: [
      'Deite de costas com joelhos dobrados e pés no chão.',
      'Eleve levemente a cabeça e ombros do chão mantendo o queixo longe do peito.',
      'Mova o tronco lateralmente tocando a mão direita no calcanhar direito, depois esquerdo.',
      'Sinta a contração lateral da cintura em cada repetição.'
    ],
    beginnerTip: 'Excelente para afinar a linha de cintura sem forçar a cervical.'
  },
  abdominal_infra_iniciante: {
    id: 'abdominal_infra_iniciante',
    name: 'Elevação de Joelhos (Abdominal Infra)',
    muscleGroup: 'Abdômen & Core',
    reps: 12,
    sets: 3,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'knee_plank',
    instructions: [
      'Deite de costas e apoie as palmas das mãos embaixo do quadril para proteger a lombar.',
      'Flexione os joelhos puxando-os em direção ao peito.',
      'Estenda as pernas controladamente em direção ao chão sem deixar a lombar descolar.'
    ],
    beginnerTip: 'Não precisa encostar os pés no chão no final. Mantenha a tensão no baixo ventre.'
  },
  prancha_lateral_joelhos: {
    id: 'prancha_lateral_joelhos',
    name: 'Prancha Lateral Adaptada',
    muscleGroup: 'Abdômen & Core',
    durationSeconds: 25,
    sets: 2,
    restSeconds: 20,
    intensity: 'moderado',
    iconType: 'knee_plank',
    instructions: [
      'Deite de lado apoiado no antebraço com os joelhos dobrados a 90 graus.',
      'Eleve o quadril do chão até formar uma linha reta do ombro aos joelhos.',
      'Segure a posição firme ativando os oblíquos e repita do outro lado.'
    ],
    beginnerTip: 'Desenvolve estabilidade na coluna e reduz dores lombares.'
  },

  // --- MOBILIDADE, ALONGAMENTO & RECUPERAÇÃO ATIVA ---
  alongamento_gato_vaca: {
    id: 'alongamento_gato_vaca',
    name: 'Mobilidade da Coluna (Gato e Vaca)',
    muscleGroup: 'Alongamento & Mobilidade',
    durationSeconds: 40,
    sets: 2,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'cat_cow',
    instructions: [
      'Fique em 4 apoios com as mãos sob os ombros e joelhos sob os quadris.',
      'Inspire, curve a coluna para baixo, empine o quadril e olhe suavemente para frente (Vaca).',
      'Expire, arqueie as costas para cima em direção ao teto, soltando o pescoço e olhando para o umbigo (Gato).',
      'Repita alternando as duas posturas de forma fluida e consciente.'
    ],
    beginnerTip: 'Alivia dores e tensões acumuladas nas costas causadas por passar muito tempo sentado.'
  },
  alongamento_completo: {
    id: 'alongamento_completo',
    name: 'Alongamento Global & Relaxamento',
    muscleGroup: 'Alongamento & Mobilidade',
    durationSeconds: 45,
    sets: 2,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'stretching',
    instructions: [
      'Sente-se confortavelmente no chão com as pernas cruzadas.',
      'Entrelace os dedos e estique os braços lá em cima, crescendo a coluna em direção ao teto.',
      'Incline suavemente o tronco para a direita e para a esquerda.',
      'Respire fundo 5 vezes pelo nariz e solte pela boca.'
    ],
    beginnerTip: 'Perfeito para relaxar a mente e avisar aos músculos que a missão do dia foi cumprida com sucesso!'
  },
  postura_crianca: {
    id: 'postura_crianca',
    name: 'Postura da Criança (Descompressão Lombar)',
    muscleGroup: 'Alongamento & Mobilidade',
    durationSeconds: 40,
    sets: 2,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'stretching',
    instructions: [
      'Ajoelhe-se no chão e sente sobre os calcanhares.',
      'Incline o tronco para frente até a testa tocar o chão.',
      'Estenda os braços à frente no tapete e respire profundamente, sentindo as costas se expandirem.'
    ],
    beginnerTip: 'Excelente finalizador para acalmar os batimentos e relaxar a musculatura lombar.'
  },
  rotacao_toracica_solo: {
    id: 'rotacao_toracica_solo',
    name: 'Abertura Torácica & Mobilidade Escapular',
    muscleGroup: 'Alongamento & Mobilidade',
    reps: 10,
    sets: 2,
    restSeconds: 15,
    intensity: 'leve',
    iconType: 'cat_cow',
    instructions: [
      'Em 4 apoios, coloque a mão direita atrás da nuca.',
      'Gire o cotovelo apontando para o teto, abrindo o peitoral.',
      'Retorne apontando o cotovelo para o chão e repita.'
    ],
    beginnerTip: 'Elimina a rigidez no meio das costas provocada pelo uso de celular e computador.'
  }
};

// 5 TIPOS DE TREINO ROTATIVOS
export interface WorkoutTypeDefinition {
  typeIndex: number;
  code: string;
  name: string;
  focus: string;
  tag: string;
  badgeColor: string;
  description: string;
  exercisePool: string[];
}

export const WORKOUT_TYPES: WorkoutTypeDefinition[] = [
  {
    typeIndex: 0,
    code: 'Treino A',
    name: 'Corpo Inteiro & Queima Cardio',
    focus: 'Full Body & Queima Calórica',
    tag: 'Full Body',
    badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    description: 'Ativação metabólica integral com movimentos dinâmicos calistênicos para acelerar a frequência cardíaca e queimar gordura de forma contínua.',
    exercisePool: [
      'polichinelo_iniciante',
      'joelhos_altos_leve',
      'agachamento_livre',
      'flexao_parede',
      'ponte_gluteos',
      'prancha_joelhos',
      'patinador_lateral',
      'polichinelo_tradicional',
      'agachamento_com_salto_suave',
      'circulos_bracos',
      'corrida_estacionaria_intensa',
      'perdigueiro',
      'toque_ombros_prancha',
      'panturrilha_em_pe',
      'alongamento_completo'
    ]
  },
  {
    typeIndex: 1,
    code: 'Treino B',
    name: 'Pernas Firmes & Glúteos',
    focus: 'Membros Inferiores & Tônus',
    tag: 'Pernas & Glúteos',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    description: 'Fortalecimento completo da base muscular do corpo: coxas torneadas, panturrilhas ativas e glúteos firmes sem sobrecarregar os joelhos.',
    exercisePool: [
      'agachamento_livre',
      'ponte_gluteos',
      'afundo_estatico',
      'panturrilha_em_pe',
      'agachamento_sumo',
      'agachamento_isometrico_parede',
      'afundo_reverso',
      'ponte_gluteos_unilateral',
      'polichinelo_iniciante',
      'patinador_lateral',
      'agachamento_com_salto_suave',
      'perdigueiro',
      'joelhos_altos_leve',
      'postura_crianca',
      'alongamento_completo'
    ]
  },
  {
    typeIndex: 2,
    code: 'Treino C',
    name: 'Braços, Peito & Costas',
    focus: 'Membros Superiores & Postura',
    tag: 'Superiores & Costas',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    description: 'Tonificação de braços, peitoral e musculatura postural das costas com o peso corporal, aliviando dores de má postura e fortalecendo o tronco.',
    exercisePool: [
      'flexao_parede',
      'circulos_bracos',
      'puxada_w_costas',
      'flexao_joelhos',
      'triceps_banco',
      'toque_ombros_prancha',
      'perdigueiro',
      'prancha_joelhos',
      'polichinelo_iniciante',
      'rotacao_toracica_solo',
      'alongamento_gato_vaca',
      'circulos_bracos',
      'flexao_parede',
      'postura_crianca',
      'alongamento_completo'
    ]
  },
  {
    typeIndex: 3,
    code: 'Treino D',
    name: 'Abdômen Blindado & Core',
    focus: 'Força Central & Cintura',
    tag: 'Abdômen & Core',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    description: 'Construção da estabilidade central (core): cintura afinada, sustentação da coluna lombar e abdômen firme sem flexões dolorosas de pescoço.',
    exercisePool: [
      'prancha_joelhos',
      'perdigueiro',
      'toque_calcanhar',
      'abdominal_infra_iniciante',
      'prancha_lateral_joelhos',
      'prancha_frontal_completa',
      'ponte_gluteos',
      'toque_ombros_prancha',
      'alongamento_gato_vaca',
      'joelhos_altos_leve',
      'polichinelo_iniciante',
      'abdominal_infra_iniciante',
      'toque_calcanhar',
      'postura_crianca',
      'alongamento_completo'
    ]
  },
  {
    typeIndex: 4,
    code: 'Treino E',
    name: 'Mobilidade, HIIT & Recuperação Ativa',
    focus: 'Mobilidade & Condicionamento',
    tag: 'Mobilidade & HIIT',
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    description: 'Sequência fluida combinando soltura articular, respiração consciente, queima controlada e recuperação dos músculos para o próximo ciclo.',
    exercisePool: [
      'alongamento_gato_vaca',
      'rotacao_toracica_solo',
      'polichinelo_iniciante',
      'joelhos_altos_leve',
      'patinador_lateral',
      'perdigueiro',
      'agachamento_livre',
      'circulos_bracos',
      'postura_crianca',
      'alongamento_completo',
      'panturrilha_em_pe',
      'ponte_gluteos',
      'polichinelo_tradicional',
      'alongamento_gato_vaca',
      'alongamento_completo'
    ]
  }
];

// Fases do Programa de 30 Semanas
export const PROGRAM_PHASES = [
  { startWeek: 1, endWeek: 5, name: 'Fase 1: Adaptação, Postura & Despertar', desc: 'Aprender os movimentos corretos, ativar a musculatura e criar o hábito diário.' },
  { startWeek: 6, endWeek: 10, name: 'Fase 2: Resistência & Ritmo Cardiorrespiratório', desc: 'Aumento gradual de repetições e ganho de fôlego com menor intervalo de descanso.' },
  { startWeek: 11, endWeek: 15, name: 'Fase 3: Força Corporal & Tônus Muscular', desc: 'Isometria avançada, sustentação e queima muscular com foco em definição corporal.' },
  { startWeek: 16, endWeek: 20, name: 'Fase 4: Queima Metabólica & Aceleração', desc: 'Exercícios combinados de alta eficiência calórica e maior tempo sob tensão.' },
  { startWeek: 21, endWeek: 25, name: 'Fase 5: Domínio Funcional & Potência', desc: 'Controle motor refinado, estabilidade inabalável do core e resistência ampliada.' },
  { startWeek: 26, endWeek: 30, name: 'Fase 6: Transformação Definitiva & Consolidação', desc: 'Ápice físico dos 210 dias: corpo tonificado, postura alinhada e saúde transformada.' }
];

// GERADOR DO PROGRAMA COMPLETO DE 30 SEMANAS (210 DIAS)
export function generate30DaysProgram(): DayWorkout[] {
  return generate30WeeksProgram();
}

export function generate30WeeksProgram(): DayWorkout[] {
  const lib = EXERCISES_LIBRARY;
  const totalWeeks = 30;
  const daysPerWeek = 7;
  const totalDays = totalWeeks * daysPerWeek; // 210 dias
  const program: DayWorkout[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const week = Math.ceil(day / 7);
    const dayOfWeek = ((day - 1) % 7) + 1; // 1 (Seg) a 7 (Dom)

    // Quantidade de exercícios aumenta dia após dia: de 15 no Dia 1 até 30 exercícios!
    // Dia 1 = 15, Dia 2 = 16, Dia 3 = 17 ... Dia 16 = 30, mantendo 30 a partir daí
    const exerciseCount = Math.min(30, 15 + (day - 1));

    // Determina a intensidade crescente dia após dia e semana após semana
    let baseIntensity: IntensityLevel = 'leve';
    let durationMultiplier = 1.0;
    let restTime = 20;

    if (day <= 21) { // Semanas 1 a 3
      baseIntensity = day % 2 === 0 ? 'moderado' : 'leve';
      durationMultiplier = 1.0;
      restTime = 20;
    } else if (day <= 70) { // Semanas 4 a 10
      baseIntensity = day % 3 === 0 ? 'intenso' : 'moderado';
      durationMultiplier = 1.15;
      restTime = 18;
    } else if (day <= 140) { // Semanas 11 a 20
      baseIntensity = day % 2 === 0 ? 'intenso' : 'moderado';
      durationMultiplier = 1.25;
      restTime = 16;
    } else { // Semanas 21 a 30
      baseIntensity = 'intenso';
      durationMultiplier = 1.35;
      restTime = 15;
    }

    // 5 Tipos de treino se revezando dia após dia!
    // No dia 7 de cada semana, é dia de mobilidade / recuperação ativa estruturada (Treino E variado)
    const isRestDay = dayOfWeek === 7;
    const typeIndex = isRestDay ? 4 : ((day - 1) % 5);
    const workoutTypeDef = WORKOUT_TYPES[typeIndex];

    // Construção dos exercícios do dia (de 15 até 30 exercícios)
    const exercisesForDay: Exercise[] = [];
    const pool = workoutTypeDef.exercisePool;

    for (let i = 0; i < exerciseCount; i++) {
      // Pega o exercício correspondente do pool rotacionando
      const exerciseKey = pool[i % pool.length];
      const baseEx = lib[exerciseKey] || lib.polichinelo_iniciante;

      // Cria uma instância progressiva com intensidade e volume ajustados para o dia
      const exInstance: Exercise = {
        ...baseEx,
        id: `${baseEx.id}-d${day}-ex${i + 1}`,
        name: i >= pool.length 
          ? `${baseEx.name} (Série ${Math.floor(i / pool.length) + 1})`
          : baseEx.name,
        durationSeconds: baseEx.durationSeconds 
          ? Math.round(baseEx.durationSeconds * durationMultiplier) 
          : undefined,
        reps: baseEx.reps 
          ? Math.round(baseEx.reps * durationMultiplier) 
          : undefined,
        restSeconds: restTime,
        intensity: i > exerciseCount * 0.7 ? baseIntensity : (baseEx.intensity || 'leve')
      };

      exercisesForDay.push(exInstance);
    }

    // Cálculos de tempo e calorias proporcionais à quantidade de exercícios
    const estimatedMinutes = Math.round(exercisesForDay.length * 1.3 + (isRestDay ? 5 : 8));
    const estimatedCalories = Math.round(exercisesForDay.length * 9.5 + (week * 2.5));

    const dayTitles: Record<number, string> = {
      1: 'Ativação & Ritmo Inicial',
      2: 'Pernas & Estabilidade',
      3: 'Força & Postura Superior',
      4: 'Core & Cintura Fina',
      5: 'Queima Acelerada & Suor',
      6: 'Resistência & Desafio Total',
      7: 'Mobilidade, Respiração & Recuperação'
    };

    program.push({
      day,
      week,
      title: `Dia ${day}: ${workoutTypeDef.code} - ${dayTitles[dayOfWeek]}`,
      focus: `${workoutTypeDef.name} (${exerciseCount} exercícios)`,
      description: isRestDay 
        ? `Sessão restauradora de domingo: ${exerciseCount} exercícios focados em soltura miofascial, coluna e recarga energética para iniciar a próxima semana com força.`
        : `${workoutTypeDef.description} Treino progressivo do Dia ${day} estruturado com ${exerciseCount} exercícios.`,
      estimatedMinutes,
      estimatedCalories,
      isRestDay,
      restAdvice: isRestDay ? 'Beba bastante água, alongue com suavidade e aproveite para repousar os músculos.' : undefined,
      exercises: exercisesForDay
    });
  }

  return program;
}
