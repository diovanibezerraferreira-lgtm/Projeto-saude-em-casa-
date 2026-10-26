import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { 
  DIET_PLANS_BY_GOAL, 
  HEALTHY_RECIPES, 
  FOOD_SUBSTITUTIONS, 
  HealthyRecipe,
  Meal,
  DayDietPlan
} from '../data/dietPlans';
import { 
  Utensils, 
  Crown, 
  Sparkles, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  Circle, 
  Coffee, 
  Clock, 
  Apple, 
  Soup, 
  ArrowRight, 
  Lock, 
  ChefHat, 
  RefreshCw, 
  Zap, 
  ChevronRight,
  Info,
  Check
} from 'lucide-react';

export const DietScreen: React.FC = () => {
  const { 
    userProfile, 
    waterIntakeMl, 
    addWater, 
    resetWater, 
    checkedMeals, 
    toggleMealCheck,
    openSubscriptionModal,
    setSubscriptionTier
  } = useWorkout();

  const [activeSubTab, setActiveSubTab] = useState<'cardapio' | 'receitas' | 'pre_pos' | 'trocas'>('cardapio');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState<string>('all');
  const [activeRecipeModal, setActiveRecipeModal] = useState<HealthyRecipe | null>(null);

  const hasDietAccess = userProfile.subscriptionTier === 'vip_diet';

  // Diet plan based on user's goal
  const goalPlan = DIET_PLANS_BY_GOAL[userProfile.goal] || DIET_PLANS_BY_GOAL.perder_peso;
  const currentDayPlan = goalPlan.weeklyPlan.find(d => d.dayNumber === selectedDayNumber) || goalPlan.weeklyPlan[0];

  // Water calculations (35ml per kg of current weight)
  const targetWaterMl = Math.round((userProfile.currentWeight || 70) * 35);
  const waterPercentage = Math.min(100, Math.round((waterIntakeMl / targetWaterMl) * 100));

  // Count checked meals for this day
  const dayMealIds = currentDayPlan.meals.map(m => m.id);
  const completedCount = dayMealIds.filter(id => checkedMeals.includes(id)).length;
  const mealsProgressPct = Math.round((completedCount / currentDayPlan.meals.length) * 100);

  const filteredRecipes = selectedRecipeCategory === 'all'
    ? HEALTHY_RECIPES
    : HEALTHY_RECIPES.filter(r => r.category === selectedRecipeCategory);

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Utensils className="w-3.5 h-3.5" />
            <span>Nutrição & Hábitos Alimentares</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Plano de Dieta para {goalPlan.goalTitle}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            {goalPlan.summary}
          </p>
        </div>

        {/* Current Tier Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {hasDietAccess ? (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg shadow-amber-500/10">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Plano VIP Dieta Ativo</span>
            </div>
          ) : (
            <button
              onClick={() => openSubscriptionModal('vip_diet')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Crown className="w-4 h-4 text-zinc-950" />
              <span>Desbloquear Dieta VIP</span>
            </button>
          )}
        </div>
      </div>

      {/* VIP Upgrade Callout Banner if NOT VIP */}
      {!hasDietAccess && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-amber-950/20 to-zinc-900 border-2 border-amber-500/50 p-5 sm:p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Exclusivo do Plano VIP</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {userProfile.subscriptionTier === 'pro' 
                  ? 'Você já tem acesso a todos os treinos! Adicione a Dieta por uma diferença mínima.' 
                  : '70% do resultado do seu treino depende do que você come.'}
              </h2>
              <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                Cardápios detalhados por refeição, cálculo de calorias e proteínas, rastreador diário de água, 
                substituições práticas e receitas fit de até 15 minutos sem ingredientes caros.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => openSubscriptionModal('vip_diet')}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Assinar Plano VIP com Dieta</span>
              </button>
              <button
                onClick={() => setSubscriptionTier('vip_diet')}
                className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs border border-zinc-700 transition-colors text-center"
              >
                Simular Ativação Grátis
              </button>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Navegue abaixo na <strong>Segunda-feira demonstrativa</strong> para conhecer o cardápio real.</span>
          </div>
        </div>
      )}

      {/* Daily Water Tracker Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Droplets className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Meta Diária de Hidratação</h3>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                  {targetWaterMl} ml / dia
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculado com base no seu peso atual de {userProfile.currentWeight} kg (35 ml/kg).
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-2xl font-extrabold text-cyan-400 tabular-nums">
              {waterIntakeMl} <span className="text-sm font-medium text-zinc-400">/ {targetWaterMl} ml</span>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              {waterPercentage}% da meta alcançada hoje
            </div>
          </div>
        </div>

        {/* Progress Fill Bar */}
        <div className="w-full bg-zinc-800/80 rounded-full h-3 overflow-hidden mt-4 p-0.5 border border-zinc-700/60">
          <div
            className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${waterPercentage}%` }}
          />
        </div>

        {/* Quick Add Water Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs font-semibold text-zinc-400 mr-1">Registrar copos:</span>
          <button
            onClick={() => addWater(250)}
            className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>+ 1 Copo (250 ml)</span>
          </button>
          <button
            onClick={() => addWater(500)}
            className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>+ 1 Garrafinha (500 ml)</span>
          </button>
          <button
            onClick={resetWater}
            className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors ml-auto flex items-center gap-1"
            title="Zerar registro"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Zerar</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Cardápio | Receitas | Pré/Pós Treino | Substituições */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-zinc-800">
        <button
          onClick={() => setActiveSubTab('cardapio')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'cardapio'
              ? 'bg-zinc-800 text-white border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Utensils className="w-4 h-4 text-emerald-400" />
          <span>Cardápio Diário</span>
        </button>

        <button
          onClick={() => setActiveSubTab('receitas')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'receitas'
              ? 'bg-zinc-800 text-white border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ChefHat className="w-4 h-4 text-amber-400" />
          <span>Receitas Rápidas ({HEALTHY_RECIPES.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pre_pos')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'pre_pos'
              ? 'bg-zinc-800 text-white border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Guia Pré & Pós-Treino</span>
        </button>

        <button
          onClick={() => setActiveSubTab('trocas')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'trocas'
              ? 'bg-zinc-800 text-white border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-purple-400" />
          <span>Trocas Inteligentes</span>
        </button>
      </div>

      {/* TAB 1: CARDÁPIO DIÁRIO */}
      {activeSubTab === 'cardapio' && (
        <div className="space-y-6">
          {/* Day of Week Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-semibold uppercase tracking-wider">Dias da Semana:</span>
              <span>{completedCount} de {currentDayPlan.meals.length} refeições cumpridas hoje</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {goalPlan.weeklyPlan.map((d) => {
                const isSelected = selectedDayNumber === d.dayNumber;
                const isLocked = !hasDietAccess && d.dayNumber > 1;

                return (
                  <button
                    key={d.dayNumber}
                    onClick={() => {
                      if (isLocked) {
                        openSubscriptionModal('vip_diet');
                      } else {
                        setSelectedDayNumber(d.dayNumber);
                      }
                    }}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 relative ${
                      isSelected
                        ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                        : isLocked
                          ? 'bg-zinc-900/60 text-zinc-500 border border-zinc-800/80 cursor-pointer'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
                    }`}
                  >
                    <span>{d.dayName}</span>
                    {isLocked && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Day Macro & Energy Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold mb-1">
                <Flame className="w-4 h-4" />
                <span>Calorias Totais</span>
              </div>
              <div className="text-xl font-extrabold text-white tabular-nums">
                ~{currentDayPlan.totalCalories} <span className="text-xs font-normal text-zinc-400">kcal</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Meta: {goalPlan.calorieTarget}</div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                <Apple className="w-4 h-4" />
                <span>Proteínas</span>
              </div>
              <div className="text-xl font-extrabold text-white tabular-nums">
                {currentDayPlan.totalProtein}g <span className="text-xs font-normal text-zinc-400">({goalPlan.macroRatio.protein})</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Reparação e tônus</div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                <Zap className="w-4 h-4" />
                <span>Carboidratos</span>
              </div>
              <div className="text-xl font-extrabold text-white tabular-nums">
                {currentDayPlan.totalCarbs}g <span className="text-xs font-normal text-zinc-400">({goalPlan.macroRatio.carbs})</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Energia para o treino</div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Gorduras Boas</span>
              </div>
              <div className="text-xl font-extrabold text-white tabular-nums">
                {currentDayPlan.totalFats}g <span className="text-xs font-normal text-zinc-400">({goalPlan.macroRatio.fats})</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Hormônios saudáveis</div>
            </div>
          </div>

          {/* Meals List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Refeições Programadas ({currentDayPlan.dayName})
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">
                {mealsProgressPct}% concluído
              </span>
            </div>

            {currentDayPlan.meals.map((meal: Meal) => {
              const isChecked = checkedMeals.includes(meal.id);
              const totalMealCals = meal.items.reduce((acc, curr) => acc + curr.calories, 0);
              const totalMealProtein = meal.items.reduce((acc, curr) => acc + curr.protein, 0);

              return (
                <div
                  key={meal.id}
                  className={`rounded-2xl border transition-all p-5 ${
                    isChecked
                      ? 'bg-zinc-900/60 border-emerald-500/40 shadow-sm'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {/* Meal Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleMealCheck(meal.id)}
                        className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-emerald-500 text-zinc-950 shadow-md'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
                        }`}
                        title={isChecked ? 'Desmarcar' : 'Marcar como consumido'}
                      >
                        {isChecked ? <Check className="w-4 h-4 stroke-[3]" /> : <Circle className="w-4 h-4" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-zinc-500" />
                            {meal.timeSuggestion}
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-xs text-emerald-400 font-semibold tabular-nums">
                            ~{totalMealCals} kcal
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-xs text-zinc-300 font-semibold tabular-nums">
                            {totalMealProtein}g proteína
                          </span>
                        </div>
                        <h4 className={`text-base font-bold transition-colors ${isChecked ? 'line-through text-zinc-400' : 'text-white'}`}>
                          {meal.title}
                        </h4>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-lg">
                      {meal.type.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Meal Items Table */}
                  <div className="mt-4 space-y-2 border-t border-zinc-800/80 pt-3">
                    {meal.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="font-semibold text-zinc-200">{item.name}</span>
                          <span className="text-zinc-400 text-[11px]">({item.portion})</span>
                        </div>

                        <div className="flex items-center gap-3 text-right tabular-nums text-[11px]">
                          <span className="text-emerald-400 font-semibold">{item.protein}g prot</span>
                          <span className="text-zinc-400">{item.calories} kcal</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Nutritionist Tip */}
                  {meal.tips && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-zinc-300 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Dica Prática:</strong> {meal.tips}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: RECEITAS RÁPIDAS */}
      {activeSubTab === 'receitas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Receitas Fitness Econômicas</h3>
              <p className="text-xs text-zinc-400">Preparos fáceis de até 18 minutos com ingredientes simples que você tem na despensa.</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'Todas as Receitas' },
              { id: 'cafe', label: 'Café & Pré-Treino' },
              { id: 'almoco_jantar', label: 'Almoço & Jantar' },
              { id: 'lanche', label: 'Lanches Práticos' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedRecipeCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRecipeCategory === cat.id
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setActiveRecipeModal(recipe)}
                className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-3xl p-5 cursor-pointer transition-all space-y-4 group shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <ChefHat className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {recipe.prepTimeMinutes} min
                      </span>
                      <span>·</span>
                      <span className="text-emerald-400 font-semibold">{recipe.protein}g proteína</span>
                      <span>·</span>
                      <span>{recipe.calories} kcal</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {recipe.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
                  <span className="font-semibold text-zinc-300">Ingredientes:</span> {recipe.ingredients.slice(0, 3).join(', ')}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRÉ & PÓS TREINO */}
      {activeSubTab === 'pre_pos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pré-Treino */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Combustível Imediato</span>
                  <h3 className="text-lg font-bold text-white">Guia Pré-Treino</h3>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {goalPlan.preWorkoutAdvice}
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                <div className="font-bold text-zinc-200">Melhores opções rápidas (30 min antes):</div>
                <div className="p-2.5 rounded-xl bg-zinc-800/50 flex items-center justify-between">
                  <span>🍌 1 Banana média amassada com canela</span>
                  <span className="text-zinc-400">~90 kcal</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-800/50 flex items-center justify-between">
                  <span>☕ 1 Xícara de café puro + 1 torrada integral</span>
                  <span className="text-zinc-400">~45 kcal</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-800/50 flex items-center justify-between">
                  <span>🥣 2 Colheres de aveia com 1 colher de mel</span>
                  <span className="text-zinc-400">~120 kcal</span>
                </div>
              </div>
            </div>

            {/* Pós-Treino */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Reparação Celular</span>
                  <h3 className="text-lg font-bold text-white">Guia Pós-Treino</h3>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {goalPlan.postWorkoutAdvice}
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                <div className="font-bold text-zinc-200">Melhores opções rápidas (até 60 min após):</div>
                <div className="p-2.5 rounded-xl bg-zinc-800/50 flex items-center justify-between">
                  <span>🍳 2 Ovos mexidos ou cozidos com orégano</span>
                  <span className="text-emerald-400 font-bold">12g proteína</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-800/50 flex items-center justify-between">
                  <span>🥛 1 Pote de iogurte natural com morangos</span>
                  <span className="text-emerald-400 font-bold">9g proteína</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-800/50 flex items-center justify-between">
                  <span>🥪 Sanduíche natural com atum ou frango desfiado</span>
                  <span className="text-emerald-400 font-bold">22g proteína</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TROCAS INTELIGENTES */}
      {activeSubTab === 'trocas' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Guia de Substituições no Supermercado</h3>
              <p className="text-xs text-zinc-400">
                Trocas fáceis e econômicas para cortar calorias vazias sem perder o sabor e o prazer de comer.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {FOOD_SUBSTITUTIONS.map((sub, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="line-through text-red-400 font-medium">{sub.original}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      <strong className="text-emerald-400 font-bold">{sub.alternative}</strong>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {sub.reason}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-md shrink-0">
                    {sub.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recipe Detail Modal */}
      {activeRecipeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                  Receita Prática de {activeRecipeModal.prepTimeMinutes} min
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeRecipeModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveRecipeModal(null)}
                className="w-8 h-8 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-sm font-bold shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Macros Strip */}
            <div className="grid grid-cols-4 gap-2 bg-zinc-800/60 p-3 rounded-2xl text-center">
              <div>
                <div className="text-[10px] text-zinc-400">Calorias</div>
                <div className="text-sm font-bold text-white tabular-nums">{activeRecipeModal.calories}</div>
              </div>
              <div>
                <div className="text-[10px] text-emerald-400">Proteínas</div>
                <div className="text-sm font-bold text-emerald-400 tabular-nums">{activeRecipeModal.protein}g</div>
              </div>
              <div>
                <div className="text-[10px] text-amber-400">Carbos</div>
                <div className="text-sm font-bold text-amber-400 tabular-nums">{activeRecipeModal.carbs}g</div>
              </div>
              <div>
                <div className="text-[10px] text-cyan-400">Gorduras</div>
                <div className="text-sm font-bold text-cyan-400 tabular-nums">{activeRecipeModal.fats}g</div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Ingredientes Necessários:
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {activeRecipeModal.ingredients.map((ing, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Modo de Preparo:
              </div>
              <div className="space-y-2 text-xs text-zinc-300">
                {activeRecipeModal.instructions.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      {sIdx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef Tip */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-3 text-xs text-zinc-300">
              <strong className="text-amber-400 block mb-0.5">Segredo do Chef:</strong>
              {activeRecipeModal.chefTip}
            </div>

            <button
              onClick={() => setActiveRecipeModal(null)}
              className="w-full h-11 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Fechar Receita
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
