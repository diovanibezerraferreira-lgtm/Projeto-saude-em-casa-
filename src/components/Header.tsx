import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Volume2, VolumeX, Crown, Flame } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    selectedTab, 
    setSelectedTab, 
    userProfile, 
    soundMuted, 
    toggleSound, 
    openSubscriptionModal,
    currentDay,
    startWorkout
  } = useWorkout();

  return (
    <header className="sticky top-0 z-30 bg-[#080c0a]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setSelectedTab('home')}
          className="flex items-center gap-2.5 text-left text-white whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
            <Flame className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white block">
              Treino em Casa meu suor!
            </span>
            <span className="text-[10px] text-zinc-400 hidden sm:block">
              Sem Equipamentos · Iniciantes
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <button
            onClick={() => setSelectedTab('home')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 ${
              selectedTab === 'home' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Início
          </button>
          <button
            onClick={() => setSelectedTab('workouts')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 ${
              selectedTab === 'workouts' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Treinos 60 Semanas
          </button>
          <button
            onClick={() => setSelectedTab('diet')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 flex items-center gap-1.5 ${
              selectedTab === 'diet' ? 'text-amber-400 font-semibold border-b-2 border-amber-400' : ''
            }`}
          >
            <span>Dieta & Nutrição</span>
            {userProfile.subscriptionTier === 'vip_diet' ? (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">VIP</span>
            ) : (
              <span className="text-[9px] bg-zinc-800 text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/30">Novo</span>
            )}
          </button>
          <button
            onClick={() => setSelectedTab('gifs')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 flex items-center gap-1.5 ${
              selectedTab === 'gifs' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            <span>Exercícios (GIFs)</span>
          </button>
          <button
            onClick={() => setSelectedTab('progress')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 ${
              selectedTab === 'progress' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Progresso & Peso
          </button>
          <button
            onClick={() => setSelectedTab('profile')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 ${
              selectedTab === 'profile' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Meu Perfil
          </button>
          <button
            onClick={() => setSelectedTab('plans')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 flex items-center gap-1.5 ${
              selectedTab === 'plans' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Planos</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title={soundMuted ? 'Ativar som' : 'Silenciar som'}
            aria-label={soundMuted ? 'Ativar som' : 'Silenciar som'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Plan Status or Upgrade Button */}
          {userProfile.subscriptionTier === 'vip_diet' ? (
            <button
              onClick={() => setSelectedTab('plans')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/25 transition-colors"
              title="Clique para ver detalhes do plano"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>VIP + Dieta</span>
            </button>
          ) : userProfile.subscriptionTier === 'pro' ? (
            <button
              onClick={() => setSelectedTab('plans')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/25 transition-colors"
              title="Clique para ver planos ou fazer upgrade para Dieta"
            >
              <span>Pro (Treinos)</span>
            </button>
          ) : (
            <button
              onClick={() => openSubscriptionModal()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Ver Planos</span>
              <span className="sm:hidden">Planos</span>
            </button>
          )}

          {/* Quick CTA to start current day */}
          <button
            onClick={() => startWorkout(currentDay)}
            className="h-10 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/10 active:scale-95 transition-all whitespace-nowrap"
          >
            <span>Treinar Dia {currentDay}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
