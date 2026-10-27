import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { WeekAssessment } from '../types';
import { 
  CheckCircle2, 
  RotateCcw, 
  ChevronRight, 
  Sparkles, 
  Award, 
  Flame, 
  Dumbbell, 
  X,
  ThumbsUp,
  Activity,
  ArrowRight,
  ShieldCheck,
  Crown
} from 'lucide-react';

interface WeeklyAssessmentModalProps {
  weekNumber: number;
  onClose: () => void;
}

export const WeeklyAssessmentModal: React.FC<WeeklyAssessmentModalProps> = ({ weekNumber, onClose }) => {
  const { 
    submitWeekAssessment, 
    completedDays, 
    program, 
    startWorkout,
    setSelectedTab
  } = useWorkout();

  // Questions state
  const [completedMost, setCompletedMost] = useState<'sim' | 'metade' | 'pouco'>('sim');
  const [difficulty, setDifficulty] = useState<'facil' | 'ideal' | 'dificil'>('ideal');
  const [canAdvance, setCanAdvance] = useState<'sim' | 'medio' | 'nao'>('sim');
  const [actionChoice, setActionChoice] = useState<'avancar' | 'repetir'>('avancar');
  const [notes, setNotes] = useState<string>('');
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState<boolean>(false);

  const stage: 1 | 2 = weekNumber <= 30 ? 1 : 2;
  const isFinalWeekOfStage1 = weekNumber === 30;
  const isFinalWeekOfStage2 = weekNumber === 60;

  // Calculate stats for this specific week
  const weekStartDay = (weekNumber - 1) * 7 + 1;
  const weekEndDay = weekNumber * 7;
  const weekDays = program.filter(w => w.week === weekNumber);
  const doneDaysThisWeek = weekDays.filter(w => completedDays.includes(w.day)).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assessment: WeekAssessment = {
      id: `assess-w${weekNumber}-${Date.now()}`,
      week: weekNumber,
      date: new Date().toISOString(),
      completedMost,
      difficulty,
      canAdvance,
      actionChoice,
      stage,
      feedbackNote: notes.trim() || undefined
    };

    submitWeekAssessment(assessment);
    setIsSuccessSubmitted(true);
  };

  const handleNextStepAfterSuccess = () => {
    setIsSuccessSubmitted(false);
    onClose();

    if (actionChoice === 'avancar') {
      const nextDay = Math.min(program.length, weekNumber * 7 + 1);
      // If user wants, can jump to next day
      setSelectedTab('workouts');
    } else {
      // Repeat week: open first day of this week
      startWorkout(weekStartDay);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0b100d] border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccessSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Avaliação de Passagem · Semana {weekNumber} de 60</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1.5">
                {isFinalWeekOfStage1 
                  ? '🏆 Avaliação Final da Etapa 1 · Rumo à Etapa 2 Elite!' 
                  : `Como foi a sua Semana ${weekNumber} (${stage === 1 ? 'Etapa 1' : 'Etapa 2 Elite'})?`}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Responda às 4 perguntas rápidas para calibrar o seu ritmo antes de prosseguir no programa.
              </p>
            </div>

            {/* Quick Week Performance Summary Strip */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-zinc-300 font-medium">Treinos feitos na semana:</span>
              </div>
              <span className="font-bold text-white tabular-nums bg-zinc-800 px-2.5 py-1 rounded-lg">
                {doneDaysThisWeek} de 7 dias
              </span>
            </div>

            {/* QUESTION 1: Você conseguiu concluir a maioria dos treinos? */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px]">1</span>
                <span>Você conseguiu concluir a maioria dos treinos?</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCompletedMost('sim')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    completedMost === 'sim'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-500/10'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Sim, quase todos</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Concluí de 5 a 7 treinos com boa consistência.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCompletedMost('metade')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    completedMost === 'metade'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Cerca de metade</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Consegui realizar entre 3 e 4 treinos.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCompletedMost('pouco')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    completedMost === 'pouco'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold shadow-md shadow-orange-500/10'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Fiz poucos</span>
                  <span className="text-[11px] text-zinc-400 mt-1">A semana foi corrida, fiz 1 ou 2 treinos.</span>
                </button>
              </div>
            </div>

            {/* QUESTION 2: Como foi a dificuldade dos exercícios? */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px]">2</span>
                <span>Como foi a dificuldade dos exercícios?</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDifficulty('facil')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    difficulty === 'facil'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Fácil / Tranquilo</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Terminei sem cansaço excessivo, quero mais.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDifficulty('ideal')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    difficulty === 'ideal'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Ideal / No ponto</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Suor na medida certa com recuperação boa.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDifficulty('dificil')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    difficulty === 'dificil'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Muito difícil</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Fiquei sem fôlego ou senti dores musculares.</span>
                </button>
              </div>
            </div>

            {/* QUESTION 3: Você sentiu que consegue avançar? */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px]">3</span>
                <span>Você sentiu que consegue avançar?</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCanAdvance('sim')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    canAdvance === 'sim'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Sim, pronto(a)!</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Me sinto com firmeza e energia para progredir.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCanAdvance('medio')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    canAdvance === 'medio'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Consigo com cautela</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Vou seguir, mas dosando meu próprio ritmo.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCanAdvance('nao')}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                    canAdvance === 'nao'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-semibold text-white">Preciso de mais tempo</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Prefiro treinar mais um pouco este nível.</span>
                </button>
              </div>
            </div>

            {/* QUESTION 4: Deseja continuar ou repetir esta etapa? */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px]">4</span>
                <span>Deseja continuar ou repetir esta etapa?</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActionChoice('avancar')}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3 ${
                    actionChoice === 'avancar'
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/15'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${actionChoice === 'avancar' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                    🚀
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">
                      {isFinalWeekOfStage1 ? 'Desbloquear a Etapa 2 (Semanas 31 a 60)' : `Avançar para a Semana ${weekNumber + 1}`}
                    </span>
                    <span className="text-xs text-zinc-400 mt-0.5 block">
                      Subir de nível, receber novos estímulos e continuar a progressão física.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActionChoice('repetir')}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3 ${
                    actionChoice === 'repetir'
                      ? 'bg-gradient-to-r from-amber-500/20 to-zinc-900 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/15'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${actionChoice === 'repetir' ? 'bg-amber-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">
                      Repetir a Semana {weekNumber}
                    </span>
                    <span className="text-xs text-zinc-400 mt-0.5 block">
                      Consolidar o condicionamento e refazer os treinos sem pressa.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Optional Personal Note */}
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1">
                Anotação pessoal (opcional):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Senti menos cansaço no agachamento, postura melhorou..."
                className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full min-h-[50px] bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-98 transition-transform"
              >
                <span>Concluir Avaliação de Passagem</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS CELEBRATION SCREEN */
          <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl shadow-emerald-500/20">
              <Award className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Avaliação Registrada com Sucesso!
              </span>
              <h3 className="text-2xl font-black text-white">
                {actionChoice === 'avancar'
                  ? isFinalWeekOfStage1 
                    ? '🎉 Parabéns! Você concluiu a Etapa 1 e Desbloqueou a Etapa 2 Elite!'
                    : `🚀 Rumo à Semana ${weekNumber + 1}!`
                  : `🔁 Semana ${weekNumber} Pronta para ser Repetida!`}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {actionChoice === 'avancar'
                  ? isFinalWeekOfStage1
                    ? 'Incrível! Foram 30 semanas de disciplina inabalável. Agora você tem acesso a mais 30 semanas (Semanas 31 a 60) no nível Elite Funcional com 30 exercícios diários!'
                    : `Sua dedicação está dando resultados reais. A Semana ${weekNumber + 1} trará a rotação dos 5 tipos de treino com o volume calibrado para o seu progresso.`
                  : 'Saber a hora de consolidar a base é sinal de maturidade física e sabedoria. Repita os treinos com calma e fortaleça cada movimento!'}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <button
                onClick={handleNextStepAfterSuccess}
                className="flex-1 min-h-[48px] bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
              >
                <span>{actionChoice === 'avancar' ? 'Continuar Treinando' : 'Iniciar Semana Novamente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
