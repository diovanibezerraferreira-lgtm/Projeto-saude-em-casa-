export interface MealItem {
  name: string;
  portion: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fats: number; // in grams
  tip?: string;
}

export interface Meal {
  id: string;
  type: 'cafe_manha' | 'almoco' | 'lanche' | 'jantar' | 'ceia';
  title: string;
  timeSuggestion: string;
  iconType: string;
  items: MealItem[];
  tips: string;
}

export interface DayDietPlan {
  dayNumber: number;
  dayName: string;
  focusTitle: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  waterGoalMl: number;
  meals: Meal[];
}

export interface GoalDietStructure {
  goalId: 'perder_peso' | 'ganhar_massa' | 'disposicao' | 'saude_postura';
  goalTitle: string;
  summary: string;
  calorieTarget: string;
  macroRatio: { protein: string; carbs: string; fats: string };
  preWorkoutAdvice: string;
  postWorkoutAdvice: string;
  weeklyPlan: DayDietPlan[];
}

export interface HealthyRecipe {
  id: string;
  title: string;
  category: 'cafe' | 'almoco_jantar' | 'lanche' | 'sobremesa_fit';
  prepTimeMinutes: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  chefTip: string;
}

export interface FoodSubstitution {
  original: string;
  alternative: string;
  reason: string;
  category: 'carboidrato' | 'proteina' | 'gordura' | 'temperos';
}

export const FOOD_SUBSTITUTIONS: FoodSubstitution[] = [
  {
    original: 'Pão francês com margarina',
    alternative: 'Pão 100% integral ou tapioca com ovos mexidos',
    reason: 'Mais proteínas e fibras, maior saciedade e digestão gradual sem picos de glicose.',
    category: 'carboidrato'
  },
  {
    original: 'Arroz branco refinado frito',
    alternative: 'Arroz com legumes ralados (cenoura/abobrinha) ou batata-doce cozida',
    reason: 'Mais vitaminas, minerais e fibras com menos densidade calórica.',
    category: 'carboidrato'
  },
  {
    original: 'Refrigerante ou suco de caixinha',
    alternative: 'Água saborizada com rodelas de limão, hortelã e gengibre',
    reason: 'Zero açúcar adicionado, refrescante e hidrata de verdade.',
    category: 'carboidrato'
  },
  {
    original: 'Embutidos (salsicha, presunto, mortadela)',
    alternative: 'Frango desfiado, ovos cozidos ou atum ralado ao natural',
    reason: 'Proteína pura de alto valor biológico com muito menos sódio e conservantes.',
    category: 'proteina'
  },
  {
    original: 'Maionese tradicional e molhos prontos',
    alternative: 'Molho de iogurte natural desnatado com azeite, limão e orégano',
    reason: 'Redução drástica de gordura saturada mantendo a cremosidade e o sabor.',
    category: 'gordura'
  },
  {
    original: 'Óleo de soja em excesso nas panelas',
    alternative: 'Azeite de oliva extravirgem dosado com fio ou spray',
    reason: 'Gordura monoinsaturada anti-inflamatória e protetora cardiovascular.',
    category: 'gordura'
  },
  {
    original: 'Caldo de tempero industrializado em tablete',
    alternative: 'Alho, cebola, cúrcuma (açafrão), páprica doce e ervas frescas',
    reason: 'Zero excesso de sódio e compostos químicos, com propriedades antioxidantes.',
    category: 'temperos'
  }
];

export const HEALTHY_RECIPES: HealthyRecipe[] = [
  {
    id: 'rec-1',
    title: 'Panqueca Rápida de Aveia & Banana',
    category: 'cafe',
    prepTimeMinutes: 8,
    calories: 220,
    protein: 13,
    carbs: 28,
    fats: 6,
    tags: ['Econômica', 'Sem Açúcar', 'Pré-Treino'],
    ingredients: [
      '1 banana madura amassada',
      '1 ovo inteiro',
      '2 colheres de sopa de farelo de aveia',
      '1 pitada de canela em pó'
    ],
    instructions: [
      'Em um prato fundo, amasse a banana e misture bem com o ovo batido.',
      'Adicione a aveia e a canela até formar uma massa homogênea.',
      'Despeje em uma frigideira antiaderente levemente untada em fogo baixo.',
      'Vire quando a borda firmar (cerca de 2 minutos) e doure o outro lado.'
    ],
    chefTip: 'Fica ótima com uma colher de chá de mel puro ou rodelas finas de morango por cima.'
  },
  {
    id: 'rec-2',
    title: 'Omelete Cremoso com Espinafre & Tomate',
    category: 'cafe',
    prepTimeMinutes: 7,
    calories: 195,
    protein: 16,
    carbs: 4,
    fats: 12,
    tags: ['Alta Proteína', 'Low Carb', 'Rápido'],
    ingredients: [
      '2 ovos inteiros',
      '1 punhado de folhas de espinafre picadas',
      '1/2 tomate picado em cubinhos',
      '1 colher de sobremesa de azeite',
      'Sal, orégano e pimenta-do-reino a gosto'
    ],
    instructions: [
      'Bata os ovos vigorosamente com garfo e tempere a gosto.',
      'Refogue o espinafre e o tomate rapidamente na frigideira com o azeite.',
      'Despeje os ovos batidos por cima e tampe a frigideira por 3 minutos.',
      'Dobre ao meio e sirva quentinho.'
    ],
    chefTip: 'O espinafre fornece ferro e magnésio, auxiliando na recuperação muscular após os treinos.'
  },
  {
    id: 'rec-3',
    title: 'Frango com Cúrcuma & Batata-Doce Dourada',
    category: 'almoco_jantar',
    prepTimeMinutes: 18,
    calories: 390,
    protein: 38,
    carbs: 36,
    fats: 7,
    tags: ['Almoço Campeão', 'Hipertrofia & Emagrecimento', 'Anti-inflamatório'],
    ingredients: [
      '150g de peito de frango cortado em cubos',
      '1 batata-doce média cozida e fatiada',
      '1 dente de alho picado',
      '1 colher de chá de cúrcuma (açafrão da terra)',
      '1 fio de azeite e cheiro-verde'
    ],
    instructions: [
      'Tempere o peito de frango com alho, sal, limão e cúrcuma.',
      'Em frigideira bem quente, sele os cubos de frango até dourarem por fora e cozinharem por dentro.',
      'No mesmo fundo da panela, passe as fatias de batata-doce cozidas para pegar o tempero e dourar.',
      'Finalize com salsinha fresca picada e sirva com salada verde crocante.'
    ],
    chefTip: 'Cozinhe a batata-doce com antecedência para preparar essa refeição em menos de 10 minutos.'
  },
  {
    id: 'rec-4',
    title: 'Cumbuca de Iogurte com Chia & Frutas',
    category: 'lanche',
    prepTimeMinutes: 4,
    calories: 180,
    protein: 12,
    carbs: 22,
    fats: 4,
    tags: ['Lanche Prático', 'Rico em Fibras', 'Refrescante'],
    ingredients: [
      '1 pote (160g) de iogurte natural desnatado ou grego zero',
      '1 colher de sobremesa de sementes de chia',
      '1/2 maçã picada ou 4 morangos',
      '1 colher de sopa de aveia em flocos finos'
    ],
    instructions: [
      'Coloque o iogurte em uma tigela pequena.',
      'Adicione a chia e misture para começar a hidratar.',
      'Disponha as frutas frescas por cima e salpique a aveia.',
      'Sirva imediatamente ou deixe 10 minutos na geladeira para consistência de mousse.'
    ],
    chefTip: 'A chia expande no estômago promovendo saciedade prolongada por mais de 3 horas.'
  }
];

export const DIET_PLANS_BY_GOAL: Record<string, GoalDietStructure> = {
  perder_peso: {
    goalId: 'perder_peso',
    goalTitle: 'Definição & Emagrecimento Saudável',
    summary: 'Cardápio focado em déficit calórico leve com alta saciedade, fibras abundantes e proteínas magras para preservar seus músculos enquanto queima gordura.',
    calorieTarget: '1.500 - 1.700 kcal / dia',
    macroRatio: { protein: '30%', carbs: '45%', fats: '25%' },
    preWorkoutAdvice: 'Consuma 30 a 45 min antes: 1 banana com 1 colher de aveia ou 1 xícara de café preto sem açúcar. Energia rápida sem pesar no estômago.',
    postWorkoutAdvice: 'Consuma até 1h após: 2 ovos mexidos com pão integral ou 1 copo de iogurte natural com frutas. Ajuda na reparação muscular.',
    weeklyPlan: [
      {
        dayNumber: 1,
        dayName: 'Segunda-feira',
        focusTitle: 'Reinício Leve & Saciedade Natural',
        totalCalories: 1580,
        totalProtein: 105,
        totalCarbs: 165,
        totalFats: 42,
        waterGoalMl: 2500,
        meals: [
          {
            id: 'm1-1',
            type: 'cafe_manha',
            title: 'Café da Manhã Energético',
            timeSuggestion: '07:30',
            iconType: 'coffee',
            items: [
              { name: 'Ovos mexidos com orégano', portion: '2 unidades', calories: 140, protein: 12, carbs: 1, fats: 10 },
              { name: 'Pão 100% integral', portion: '1 fatia média', calories: 70, protein: 3, carbs: 13, fats: 1 },
              { name: 'Mamão papaia picado', portion: '1/2 unidade', calories: 55, protein: 1, carbs: 14, fats: 0 },
              { name: 'Café preto ou chá verde', portion: '1 xícara (sem açúcar)', calories: 4, protein: 0, carbs: 1, fats: 0 }
            ],
            tips: 'Comece o dia hidratando-se com 400ml de água antes do café.'
          },
          {
            id: 'm1-2',
            type: 'almoco',
            title: 'Almoço Prato Equilibrado',
            timeSuggestion: '12:30',
            iconType: 'utensils',
            items: [
              { name: 'Peito de frango grelhado', portion: '1 filé médio (130g)', calories: 210, protein: 34, carbs: 0, fats: 4 },
              { name: 'Arroz integral cozido', portion: '3 colheres de sopa cheias', calories: 110, protein: 3, carbs: 23, fats: 1 },
              { name: 'Feijão carioca com caldo', portion: '1 concha pequena', calories: 95, protein: 6, carbs: 15, fats: 1 },
              { name: 'Salada crua (alface, tomate e pepino)', portion: 'Prato fundo à vontade', calories: 35, protein: 2, carbs: 6, fats: 0 },
              { name: 'Azeite de oliva extravirgem', portion: '1 colher de sobremesa', calories: 80, protein: 0, carbs: 0, fats: 9 }
            ],
            tips: 'Coma primeiro a salada colorida para estimular hormônios da saciedade.'
          },
          {
            id: 'm1-3',
            type: 'lanche',
            title: 'Lanche da Tarde Pré-Treino',
            timeSuggestion: '16:30',
            iconType: 'apple',
            items: [
              { name: 'Iogurte natural desnatado', portion: '1 pote (160g)', calories: 85, protein: 8, carbs: 10, fats: 1 },
              { name: 'Maçã com casca fatiada', portion: '1 unidade pequena', calories: 72, protein: 0, carbs: 19, fats: 0 },
              { name: 'Farelo de aveia', portion: '1 colher de sopa', calories: 45, protein: 2, carbs: 7, fats: 1 }
            ],
            tips: 'Fornece combustível ideal para treinar sem queda de pressão.'
          },
          {
            id: 'm1-4',
            type: 'jantar',
            title: 'Jantar Confortável & Leve',
            timeSuggestion: '20:00',
            iconType: 'soup',
            items: [
              { name: 'Omelete de forno com legumes (cenoura, abobrinha)', portion: '2 ovos + legumes', calories: 180, protein: 14, carbs: 6, fats: 11 },
              { name: 'Batata inglesa cozida ou purê simples', portion: '1 unidade média (100g)', calories: 90, protein: 2, carbs: 20, fats: 0 },
              { name: 'Salada de folhas verdes com limão', portion: '1 prato médio', calories: 25, protein: 1, carbs: 4, fats: 0 }
            ],
            tips: 'Evite frituras e refeições muito pesadas após as 21h para melhorar a qualidade do sono e a queima noturna.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayName: 'Terça-feira',
        focusTitle: 'Fibras & Redução da Retenção de Líquidos',
        totalCalories: 1540,
        totalProtein: 108,
        totalCarbs: 158,
        totalFats: 39,
        waterGoalMl: 2600,
        meals: [
          {
            id: 'm2-1',
            type: 'cafe_manha',
            title: 'Café da Manhã Nutritivo',
            timeSuggestion: '07:30',
            iconType: 'coffee',
            items: [
              { name: 'Panqueca de banana e aveia', portion: '1 unidade média', calories: 210, protein: 12, carbs: 26, fats: 6 },
              { name: 'Café preto coado com canela', portion: '1 xícara sem açúcar', calories: 5, protein: 0, carbs: 1, fats: 0 }
            ],
            tips: 'A canela ajuda a controlar os níveis de açúcar no sangue.'
          },
          {
            id: 'm2-2',
            type: 'almoco',
            title: 'Almoço com Peixe ou Frango',
            timeSuggestion: '12:30',
            iconType: 'utensils',
            items: [
              { name: 'Filé de tilápia ou atum ao forno', portion: '1 filé médio (140g)', calories: 190, protein: 32, carbs: 0, fats: 5 },
              { name: 'Mandioca cozida ou batata-doce', portion: '2 pedaços médios (100g)', calories: 125, protein: 1, carbs: 28, fats: 0 },
              { name: 'Brócolis e cenoura no vapor', portion: '1 xícara cheia', calories: 45, protein: 3, carbs: 8, fats: 0 },
              { name: 'Feijão preto cozido', portion: '1 concha rasa', calories: 90, protein: 5, carbs: 14, fats: 1 }
            ],
            tips: 'O brócolis fornece cálcio vegetal e antioxidantes essenciais.'
          },
          {
            id: 'm2-3',
            type: 'lanche',
            title: 'Lanche Prático',
            timeSuggestion: '16:30',
            iconType: 'apple',
            items: [
              { name: 'Castanha-do-pará', portion: '2 unidades', calories: 65, protein: 1, carbs: 1, fats: 6 },
              { name: 'Pera ou tangerina fresca', portion: '1 unidade', calories: 60, protein: 1, carbs: 15, fats: 0 }
            ],
            tips: 'A castanha-do-pará é fonte de selênio para a tireoide e imunidade.'
          },
          {
            id: 'm2-4',
            type: 'jantar',
            title: 'Sopa Funcional de Frango & Abóbora',
            timeSuggestion: '20:00',
            iconType: 'soup',
            items: [
              { name: 'Sopa caseira de abóbora cabotiá com frango desfiado', portion: '1 tigela grande (350ml)', calories: 240, protein: 26, carbs: 22, fats: 4 },
              { name: 'Torrada integral crocante', portion: '1 unidade', calories: 40, protein: 1, carbs: 8, fats: 0 }
            ],
            tips: 'Aquece, sacia e é extremamente fácil de digerir antes de deitar.'
          }
        ]
      },
      {
        dayNumber: 3,
        dayName: 'Quarta-feira',
        focusTitle: 'Energia Constante sem Sensação de Inchaço',
        totalCalories: 1590,
        totalProtein: 104,
        totalCarbs: 168,
        totalFats: 41,
        waterGoalMl: 2500,
        meals: [
          {
            id: 'm3-1',
            type: 'cafe_manha',
            title: 'Ovos & Tapioca Leve',
            timeSuggestion: '07:30',
            iconType: 'coffee',
            items: [
              { name: 'Tapioca fina com semente de chia', portion: '2 colheres de goma (40g)', calories: 120, protein: 1, carbs: 28, fats: 1 },
              { name: 'Ovos mexidos', portion: '2 unidades', calories: 140, protein: 12, carbs: 1, fats: 10 },
              { name: 'Café com gotas de leite desnatado', portion: '1 xícara', calories: 15, protein: 1, carbs: 2, fats: 0 }
            ],
            tips: 'Misturar chia na goma de tapioca reduz o índice glicêmico da refeição.'
          },
          {
            id: 'm3-2',
            type: 'almoco',
            title: 'Carne Magra & Salada Refrescante',
            timeSuggestion: '12:30',
            iconType: 'utensils',
            items: [
              { name: 'Carne moída magra (patinho) com cenoura', portion: '4 colheres de sopa cheias (120g)', calories: 215, protein: 30, carbs: 3, fats: 8 },
              { name: 'Arroz branco ou integral', portion: '3 colheres de sopa', calories: 110, protein: 2, carbs: 24, fats: 0 },
              { name: 'Lentilha ou feijão cozido', portion: '1 concha pequena', calories: 90, protein: 6, carbs: 14, fats: 0 },
              { name: 'Repolho roxo e tomate cereja temperados', portion: 'Prato cheio', calories: 35, protein: 1, carbs: 7, fats: 0 }
            ],
            tips: 'O patinho é rico em ferro e zinco para disposição física.'
          },
          {
            id: 'm3-3',
            type: 'lanche',
            title: 'Smoothie Proteico de Banana',
            timeSuggestion: '16:30',
            iconType: 'apple',
            items: [
              { name: 'Leite desnatado batido com 1 banana e canela', portion: '250ml', calories: 160, protein: 9, carbs: 28, fats: 1 }
            ],
            tips: 'Lanche rápido e refrescante para manter a energia ativa no fim da tarde.'
          },
          {
            id: 'm3-4',
            type: 'jantar',
            title: 'Frango com Salada Quente',
            timeSuggestion: '20:00',
            iconType: 'soup',
            items: [
              { name: 'Tiras de frango grelhadas', portion: '1 filé (120g)', calories: 195, protein: 32, carbs: 0, fats: 4 },
              { name: 'Mix de legumes salteados (abobrinha, berinjela, tomate)', portion: '1 prato fundo', calories: 80, protein: 3, carbs: 12, fats: 2 }
            ],
            tips: 'Jantar leve com quase nada de carboidrato denso para maximizar queima noturna.'
          }
        ]
      }
    ]
  },
  ganhar_massa: {
    goalId: 'ganhar_massa',
    goalTitle: 'Ganho de Força & Hipertrofia Funcional',
    summary: 'Aporte estratégico de calorias de boa qualidade e alta densidade proteica para estimular construção e recuperação muscular com os treinos calistênicos.',
    calorieTarget: '2.100 - 2.400 kcal / dia',
    macroRatio: { protein: '25%', carbs: '50%', fats: '25%' },
    preWorkoutAdvice: 'Consuma 40 min antes: Pão integral com ovos ou mingau de aveia com banana e mel. Garante estoque alto de glicogênio muscular para treinar com força.',
    postWorkoutAdvice: 'Consuma até 45 min após: Refeição com 30g a 40g de proteína pura (frango, ovos, iogurte, atum) acompanhada de carboidrato para recuperar fibras musculares.',
    weeklyPlan: [
      {
        dayNumber: 1,
        dayName: 'Segunda-feira',
        focusTitle: 'Combustível de Construção Muscular',
        totalCalories: 2240,
        totalProtein: 145,
        totalCarbs: 270,
        totalFats: 58,
        waterGoalMl: 3000,
        meals: [
          {
            id: 'gm1-1',
            type: 'cafe_manha',
            title: 'Super Café da Manhã Anabólico',
            timeSuggestion: '07:30',
            iconType: 'coffee',
            items: [
              { name: 'Ovos mexidos com queijo branco', portion: '3 ovos + 30g queijo', calories: 260, protein: 22, carbs: 2, fats: 18 },
              { name: 'Pão integral fatiado', portion: '2 fatias', calories: 140, protein: 6, carbs: 26, fats: 2 },
              { name: 'Banana prata com 2 colheres de aveia e mel', portion: '1 unidade', calories: 180, protein: 4, carbs: 38, fats: 2 }
            ],
            tips: 'Excelente densidade nutricional para iniciar o dia construindo tecido magro.'
          },
          {
            id: 'gm1-2',
            type: 'almoco',
            title: 'Almoço Potência',
            timeSuggestion: '12:30',
            iconType: 'utensils',
            items: [
              { name: 'Peito de frango grelhado ou carne magra', portion: '1 filé grande (160g)', calories: 260, protein: 42, carbs: 0, fats: 5 },
              { name: 'Arroz (integral ou branco)', portion: '5 colheres de sopa cheias', calories: 180, protein: 4, carbs: 40, fats: 1 },
              { name: 'Feijão preto com caldo espesso', portion: '1 concha caprichada', calories: 120, protein: 7, carbs: 19, fats: 1 },
              { name: 'Batata-doce ou mandioca assada', portion: '1 pedaço médio (80g)', calories: 90, protein: 1, carbs: 21, fats: 0 },
              { name: 'Salada de folhas verdes e azeite', portion: '1 prato médio', calories: 85, protein: 1, carbs: 3, fats: 8 }
            ],
            tips: 'Mastigue devagar para garantir ótima absorção de todos os nutrientes.'
          },
          {
            id: 'gm1-3',
            type: 'lanche',
            title: 'Lanche Pré-Treino de Força',
            timeSuggestion: '16:30',
            iconType: 'apple',
            items: [
              { name: 'Tapioca com frango desfiado temperado', portion: '1 unidade média (60g frango)', calories: 230, protein: 18, carbs: 32, fats: 3 },
              { name: 'Suco de laranja natural ou água de coco', portion: '1 copo (200ml)', calories: 90, protein: 1, carbs: 21, fats: 0 }
            ],
            tips: 'Carboidratos de fácil digestão para manter a intensidade nos exercícios.'
          },
          {
            id: 'gm1-4',
            type: 'jantar',
            title: 'Jantar Recuperador de Fibras',
            timeSuggestion: '20:30',
            iconType: 'soup',
            items: [
              { name: 'Carne moída com legumes e milho', portion: '150g', calories: 270, protein: 34, carbs: 10, fats: 10 },
              { name: 'Arroz e feijão simples', portion: '4 colheres arroz + 1 concha feijão', calories: 210, protein: 6, carbs: 40, fats: 1 },
              { name: 'Legumes refogados (cenoura e abobrinha)', portion: '1 prato fundo', calories: 60, protein: 2, carbs: 12, fats: 1 }
            ],
            tips: 'O jantar fornece o substrato para a reparação celular durante a noite.'
          }
        ]
      }
    ]
  },
  disposicao: {
    goalId: 'disposicao',
    goalTitle: 'Mais Disposição, Saúde & Postura',
    summary: 'Nutrição equilibrada focada em micronutrientes, digestão leve e anti-inflamatórios naturais para você acordar com energia e manter o corpo flexível e disposto.',
    calorieTarget: '1.700 - 1.950 kcal / dia',
    macroRatio: { protein: '25%', carbs: '50%', fats: '25%' },
    preWorkoutAdvice: 'Uma fruta fresca (maçã, banana ou mamão) com um copo de água 20 minutos antes do treino é suficiente para evitar tontura.',
    postWorkoutAdvice: 'Uma refeição normal completa com fontes de proteína e vegetais coloridos para manter a imunidade e o bem-estar em alta.',
    weeklyPlan: [
      {
        dayNumber: 1,
        dayName: 'Segunda-feira',
        focusTitle: 'Vitalidade & Energia Sustentada',
        totalCalories: 1780,
        totalProtein: 98,
        totalCarbs: 210,
        totalFats: 48,
        waterGoalMl: 2500,
        meals: [
          {
            id: 'dp1-1',
            type: 'cafe_manha',
            title: 'Café da Manhã Fresco & Vitalizante',
            timeSuggestion: '07:30',
            iconType: 'coffee',
            items: [
              { name: 'Ovos pochê ou cozidos', portion: '2 unidades', calories: 140, protein: 12, carbs: 1, fats: 10 },
              { name: 'Pão integral com azeite e orégano', portion: '1 fatia', calories: 95, protein: 3, carbs: 13, fats: 3 },
              { name: 'Salada de frutas da época com chia', portion: '1 xícara', calories: 110, protein: 2, carbs: 24, fats: 2 }
            ],
            tips: 'Adicionar chia ou linhaça melhora a digestão e o funcionamento intestinal.'
          },
          {
            id: 'dp1-2',
            type: 'almoco',
            title: 'Prato do Bem-Estar Brasileiro',
            timeSuggestion: '12:30',
            iconType: 'utensils',
            items: [
              { name: 'Filé de frango grelhado com alecrim e limão', portion: '1 filé médio (130g)', calories: 200, protein: 32, carbs: 0, fats: 4 },
              { name: 'Arroz integral com ervilhas frescas', portion: '4 colheres de sopa', calories: 140, protein: 4, carbs: 28, fats: 1 },
              { name: 'Feijão carioca bem temperado', portion: '1 concha média', calories: 100, protein: 6, carbs: 16, fats: 1 },
              { name: 'Salada multicolorida com azeite extravirgem', portion: 'Prato à vontade', calories: 80, protein: 1, carbs: 6, fats: 6 }
            ],
            tips: 'Quanto mais colorido o seu prato, maior a variedade de vitaminas absorvidas.'
          },
          {
            id: 'dp1-3',
            type: 'lanche',
            title: 'Lanche Conforto',
            timeSuggestion: '16:30',
            iconType: 'apple',
            items: [
              { name: 'Iogurte natural batido com frutas vermelhas ou morangos', portion: '1 copo', calories: 120, protein: 7, carbs: 16, fats: 2 },
              { name: 'Castanhas ou nozes', portion: '1 punhado pequeno (15g)', calories: 95, protein: 2, carbs: 2, fats: 9 }
            ],
            tips: 'As castanhas fornecem gorduras boas que preservam as articulações.'
          },
          {
            id: 'dp1-4',
            type: 'jantar',
            title: 'Jantar Restaurador',
            timeSuggestion: '20:00',
            iconType: 'soup',
            items: [
              { name: 'Omelete de espinafre com queijo branco', portion: '2 ovos + 30g queijo', calories: 210, protein: 17, carbs: 3, fats: 14 },
              { name: 'Cenoura e abobrinha refogadas no azeite', portion: '1 prato fundo', calories: 75, protein: 2, carbs: 10, fats: 3 },
              { name: 'Chá de camomila ou melissa após a refeição', portion: '1 xícara morna', calories: 0, protein: 0, carbs: 0, fats: 0 }
            ],
            tips: 'O chá de ervas acalma o sistema nervoso e prepara o corpo para um sono reparador.'
          }
        ]
      }
    ]
  }
};
