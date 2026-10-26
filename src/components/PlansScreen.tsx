import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { SubscriptionTier } from '../types';
import { 
  Check, 
  Crown, 
  Sparkles, 
  Zap, 
  Utensils, 
  ShieldCheck, 
  Droplets,
  Flame, 
  Star,
  CheckCircle2,
  X
} from 'lucide-react';

export const PlansScreen: React.FC = () => {
  const { userProfile, setSubscriptionTier, modalSuggestedTier, closeSubscriptionModal } = useWorkout();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [actionToast, setActionToast] = useState<{ message: string; tier: string } | null>(null);

  const handleSelectTier = (tier: SubscriptionTier) => {
    setSubscriptionTier(tier);
    const names = {
      free: 'Plano Gratuito',
      pro: 'Plano Pro (Acesso Total)',
      vip_diet: 'Plano VIP (Treinos + Dieta)'
    };
    setActionToast({
      message: `Você agora está no ${names[tier]}!`,
      tier
    });
    setTimeout(() => setActionToast(null), 4500);
  };

  const currentTier = userProfile.subscriptionTier || (userProfile.isPremium ? 'pro' : 'free');

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Crown className="w-3.5 h-3.5" />
          <span>Escolha a Melhor Versão Para Você</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Treinos Eficazes e Nutrição Sob Medida
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Escolha entre o plano mais acessível de treinos totais ou o plano completo com acompanhamento de dieta.
        </p>
      </div>

      {/* Toast Notification */}
      {actionToast && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl p-4 text-xs flex items-center justify-between gap-3 max-w-md mx-auto animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>Plano Atualizado com Sucesso!</strong> {actionToast.message}
            </span>
          </div>
        </div>
      )}

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Cobrança Mensal
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Cobrança Anual</span>
            <span className="bg-zinc-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-extrabold">
              Economize até 35%
            </span>
          </button>
        </div>
      </div>

      {/* The 3 Plans Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">
        
        {/* CARD 1: ESSENCIAL GRATUITO */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Básico</span>
                <h3 className="text-xl font-bold text-white">Plano Gratuito</h3>
              </div>
              <span className="text-[11px] bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg">
                Para Sempre
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Ideal para testar o ritmo dos treinos e iniciar a rotina física em casa.
            </p>

            <div className="pt-2">
              <span className="text-3xl font-extrabold text-white">R$ 0</span>
              <span className="text-xs text-zinc-400 ml-1">/mês</span>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-zinc-800 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Primeiros 7 dias do desafio 30 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instruções em texto dos exercícios</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cronômetro simples de descanso</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <X className="w-4 h-4 shrink-0 text-zinc-600" />
                <span>Sem acesso às 30 semanas (dias 8 a 210)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <X className="w-4 h-4 shrink-0 text-zinc-600" />
                <span>Sem módulo de Dieta & Cardápios</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <X className="w-4 h-4 shrink-0 text-zinc-600" />
                <span>Sem rastreador de hidratação</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            {currentTier === 'free' ? (
              <div className="w-full h-12 bg-zinc-800 text-zinc-400 font-bold rounded-xl flex items-center justify-center text-xs">
                Seu Plano Atual
              </div>
            ) : (
              <button
                onClick={() => handleSelectTier('free')}
                className="w-full h-12 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-xl text-xs transition-colors"
              >
                Voltar para Versão Grátis
              </button>
            )}
          </div>
        </div>

        {/* CARD 2: PLANO PRO (MAIS BARATO - ACESSO TOTAL AOS TREINOS) */}
        <div className="bg-zinc-900 border-2 border-emerald-500/50 hover:border-emerald-500 rounded-3xl p-6 flex flex-col justify-between space-y-6 relative shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Mais Econômico</span>
                </span>
                <h3 className="text-xl font-bold text-white">Plano Pro (Acesso Total)</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                Treinos 100%
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Acesso irrestrito a todas as 30 semanas, de 15 a 30 exercícios por dia com 5 tipos de treino rotativos.
            </p>

            <div className="pt-2">
              {billingCycle === 'yearly' ? (
                <div>
                  <span className="text-3xl font-extrabold text-white tabular-nums">R$ 9,90</span>
                  <span className="text-xs text-zinc-400 ml-1">/mês</span>
                  <div className="text-[11px] text-emerald-400 mt-0.5">Cobrado R$ 118,80 anualmente</div>
                </div>
              ) : (
                <div>
                  <span className="text-3xl font-extrabold text-white tabular-nums">R$ 14,90</span>
                  <span className="text-xs text-zinc-400 ml-1">/mês</span>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Sem fidelidade, cancele quando quiser</div>
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-3 border-t border-zinc-800 text-xs text-zinc-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Todas as 30 semanas</strong> (210 dias de 15 a 30 exercícios)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5 tipos de treino em rotação contínua (A, B, C, D e E)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cronômetro guiado com avisos sonoros e bips</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Biblioteca completa de GIFs animados em loop</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gráficos de evolução de peso e metas corporais</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <X className="w-4 h-4 shrink-0 text-zinc-600" />
                <span>Sem módulo de Dietas e Cardápios</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            {currentTier === 'pro' ? (
              <div className="w-full h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold rounded-xl flex items-center justify-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Plano Pro Ativo</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelectTier('pro')}
                className="w-full h-12 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-zinc-200 border border-emerald-500/30 font-bold rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>Escolher Plano Pro</span>
              </button>
            )}
          </div>
        </div>

        {/* CARD 3: PLANO VIP + DIETA (MAIS CARO & MAIS COMPLETO) */}
        <div className="bg-gradient-to-b from-zinc-900 via-amber-950/20 to-zinc-900 border-2 border-amber-500 rounded-3xl p-6 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-amber-500/10">
          <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
            ⭐ Mais Recomendado · Tudo Incluso
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Treino + Nutrição</span>
                </span>
                <h3 className="text-xl font-bold text-white">Plano VIP + Dieta</h3>
              </div>
              <span className="text-[10px] bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                Completo
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              A fórmula completa: todas as 30 semanas de treinos somadas ao cardápio de dieta personalizado.
            </p>

            <div className="pt-2">
              {billingCycle === 'yearly' ? (
                <div>
                  <span className="text-3xl font-extrabold text-white tabular-nums">R$ 17,90</span>
                  <span className="text-xs text-zinc-400 ml-1">/mês</span>
                  <div className="text-[11px] text-amber-400 font-medium mt-0.5">Cobrado R$ 214,80 anualmente</div>
                </div>
              ) : (
                <div>
                  <span className="text-3xl font-extrabold text-white tabular-nums">R$ 24,90</span>
                  <span className="text-xs text-zinc-400 ml-1">/mês</span>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Sem fidelidade, cancele a qualquer hora</div>
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-3 border-t border-zinc-800 text-xs text-zinc-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Tudo do Plano Pro</strong> (todos os 30 dias de treinos)</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Módulo Dieta Completo:</strong> cardápios diários por objetivo</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cálculo automático de calorias e macros (proteínas, carbos, gorduras)</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Rastreador de hidratação e checklist diário de refeições</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Guia prático de Pré-Treino e Pós-Treino sem suplementos caros</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Livro de Receitas Rápidas e Guia de Trocas no Supermercado</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            {currentTier === 'vip_diet' ? (
              <div className="w-full h-12 bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold rounded-xl flex items-center justify-center gap-2 text-xs">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Plano VIP + Dieta Ativo</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelectTier('vip_diet')}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Assinar VIP com Dieta</span>
              </button>
            )}
            <p className="text-[10px] text-zinc-400 text-center mt-2">
              Ativação imediata sem burocracia para testar na plataforma.
            </p>
          </div>
        </div>

      </div>

      {/* Comparison Feature Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-4xl mx-auto space-y-4">
        <h3 className="text-base font-bold text-white text-center">
          Comparativo Rápido dos Planos
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="py-3 px-3">Funcionalidade</th>
                <th className="py-3 px-3 text-center">Gratuito</th>
                <th className="py-3 px-3 text-center text-emerald-400 font-bold">Pro (Treinos)</th>
                <th className="py-3 px-3 text-center text-amber-400 font-bold">VIP (+ Dieta)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              <tr>
                <td className="py-3 px-3">Programa de Treino</td>
                <td className="py-3 px-3 text-center text-zinc-400">7 dias iniciais</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">30 semanas (210 dias)</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">30 semanas (210 dias)</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Exercícios por Treino</td>
                <td className="py-3 px-3 text-center text-zinc-400">15 a 21 iniciais</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">15 até 30 por dia</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">15 até 30 por dia</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Divisão de Treinos</td>
                <td className="py-3 px-3 text-center text-zinc-400">5 tipos</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">5 tipos rotativos (A, B, C, D, E)</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">5 tipos rotativos (A, B, C, D, E)</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Cronômetro com Bips e Sons</td>
                <td className="py-3 px-3 text-center text-zinc-500">Básico</td>
                <td className="py-3 px-3 text-center text-emerald-400">✓ Ilimitado</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">✓ Ilimitado</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Demonstrações em GIF</td>
                <td className="py-3 px-3 text-center text-zinc-400">Limitado</td>
                <td className="py-3 px-3 text-center text-emerald-400">✓ Todos</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">✓ Todos</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Cardápios & Refeições Diárias</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">✓ Incluso</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Rastreador de Água & Macros</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">✓ Incluso</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Guia Pré & Pós-Treino</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">✓ Incluso</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Receitas Fit de 15 Minutos</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-zinc-500">✕</td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">✓ Incluso</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-4xl mx-auto space-y-4">
        <h3 className="text-sm font-bold text-white text-center">
          Depoimentos de Alunos dos Planos Pagos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">Assinante Plano Pro</span>
              <span className="text-amber-400 text-xs">★★★★★</span>
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "Pagar só R$ 9,90 por mês e ter todos os 30 dias de treino organizados foi a melhor coisa. Já fiz 18 dias sem falhar um!"
            </p>
            <div className="text-[11px] font-semibold text-zinc-400">— Renan Souza, Rio de Janeiro</div>
          </div>

          <div className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">Assinante VIP + Dieta</span>
              <span className="text-amber-400 text-xs">★★★★★</span>
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "A opção de dieta fez toda a diferença. O guia de pré/pós-treino e as substituições me fizeram perder 4,5 kg no primeiro mês com comida de verdade."
            </p>
            <div className="text-[11px] font-semibold text-zinc-400">— Camila Viana, Porto Alegre</div>
          </div>
        </div>
      </div>
    </div>
  );
};
