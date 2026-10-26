import React, { useState, useEffect } from 'react';
import { ExerciseIconType } from '../types';
import { Play, Pause, Zap, Activity } from 'lucide-react';

interface AnimatedExerciseGifProps {
  type: ExerciseIconType;
  exerciseName?: string;
  className?: string;
  autoPlay?: boolean;
}

export const AnimatedExerciseGif: React.FC<AnimatedExerciseGifProps> = ({
  type,
  exerciseName,
  className = 'w-full h-64',
  autoPlay = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState<1 | 0.5>(1); // 1x or 0.5x
  const [phase, setPhase] = useState<number>(0); // 0 to 1 smooth progress
  const [showMuscles, setShowMuscles] = useState<boolean>(true); // Muscle activation highlight

  // Cycle progress smoothly
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 25; // 40 fps
    // Base loop cycle duration in seconds per repetition
    const durationSeconds = (type === 'cat_cow' ? 4.5 : type === 'knee_plank' ? 3.2 : 2.6) / speed;
    const step = intervalMs / (durationSeconds * 1000);

    const timer = setInterval(() => {
      setPhase((prev) => (prev + step) % 1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed, type]);

  // Sine ease for reciprocating up-down/in-out movements (0 -> 1 -> 0)
  const easeInOut = (Math.sin(phase * Math.PI * 2 - Math.PI / 2) + 1) / 2;
  // Alternating cycle for left-right (0 -> 1 -> 0 -> -1)
  const alternating = Math.sin(phase * Math.PI * 2);

  // Phase textual description for beginners
  const getPhaseDescription = () => {
    switch (type) {
      case 'squats':
        return easeInOut > 0.6 
          ? 'Fase Baixa: Quadril recuado a 90°, peito aberto e peso nos calcanhares' 
          : 'Fase Alta: Extensão completa com contração firme de glúteos e coxas';
      case 'jumping_jacks':
        return easeInOut > 0.5 
          ? 'Fase Aberta: Braços em arco no alto, pernas abertas e amortecimento suave' 
          : 'Fase Fechada: Retorno à base com pés juntos e braços alinhados';
      case 'wall_pushup':
        return easeInOut > 0.5 
          ? 'Descida Controlada: Cotovelos dobrando a 45°, peitoral aproxima da parede' 
          : 'Empurre Firme: Braços estendendo com peito e tríceps ativados';
      case 'glute_bridge':
        return easeInOut > 0.5 
          ? 'Pico de Contração: Quadril elevado no topo, glúteos e posterior ativados' 
          : 'Descida Suave: Retorno articulando a coluna sem encostar de vez no solo';
      case 'knee_plank':
        return 'Isometria Total: Abdômen firme, ombros alinhados aos cotovelos e respiração contínua';
      case 'lunges':
        return easeInOut > 0.5 
          ? 'Fase Baixa: Joelho dianteiro a 90° e joelho traseiro quase no chão' 
          : 'Fase Alta: Impulso com a perna da frente mantendo tronco ereto';
      case 'bird_dog':
        return easeInOut > 0.5 
          ? 'Extensão Completa: Braço e perna opostos nivelados na linha da coluna' 
          : 'Recuo Equilibrado: Transição suave mantendo o quadril paralelo ao chão';
      case 'cat_cow':
        return easeInOut > 0.5 
          ? 'Inspire (Postura da Vaca): Abdômen desce suave, coluna arqueia e peito abre' 
          : 'Expire (Postura do Gato): Costas arredondam para cima, queixo no peito';
      case 'calf_raises':
        return easeInOut > 0.5 
          ? 'Pico Máximo: Elevação máxima nas pontas dos pés, panturrilhas contraídas' 
          : 'Descida Lenta: Calcanhares descem sem relaxar a tensão muscular';
      case 'arm_circles':
        return 'Circunvolução Contínua: Círculos regulares na linha dos ombros (deltoides)';
      case 'high_knees':
        return 'Marcha Dinâmica: Joelhos elevados na altura do quadril e braços ritmados';
      default:
        return 'Movimento fluido e ritmado com postura anatômica alinhada';
    }
  };

  // Primary muscle targeted
  const getTargetMuscles = () => {
    switch (type) {
      case 'squats': return 'Quadríceps & Glúteos';
      case 'jumping_jacks': return 'Cardio & Pernas';
      case 'wall_pushup': return 'Peitoral & Tríceps';
      case 'glute_bridge': return 'Glúteos & Posterior de Coxa';
      case 'knee_plank': return 'Core & Abdômen';
      case 'lunges': return 'Quadríceps & Glúteos';
      case 'bird_dog': return 'Lombar & Glúteos';
      case 'cat_cow': return 'Mobilidade de Coluna';
      case 'calf_raises': return 'Panturrilhas (Gastrocnêmio)';
      case 'arm_circles': return 'Ombros (Deltoides)';
      case 'high_knees': return 'Flexores de Quadril & Cardio';
      default: return 'Corpo Inteiro';
    }
  };

  /* =========================================================================
     REALISTIC HUMAN ANATOMY RENDERING PALETTE & COMPONENTS
  ========================================================================= */
  // Realistic skin tones
  const SKIN_NEAR = '#f6c49c';       // Warm athletic skin tone (near)
  const SKIN_NEAR_SHADOW = '#e09f75';// Muscle shadow/definition tone
  const SKIN_FAR = '#c7845d';        // Far limb shadow tone (depth perspective)
  
  // High-performance sportswear palette
  const SHIRT_NEAR = '#10b981';      // Emerald green activewear top
  const SHIRT_NEAR_DARK = '#059669'; // Emerald fabric shadow
  const SHIRT_FAR = '#047857';       // Far sleeve shadow
  const PANTS_NEAR = '#1e293b';      // Slate compression shorts/leggings
  const PANTS_FAR = '#0f172a';       // Far leg dark compression fabric
  const STRIPE_COLOR = '#34d399';    // Emerald side neon stripe
  const HAIR_COLOR = '#1e1b18';      // Dark athletic hair
  
  // Sneakers
  const SNEAKER_SOLE = '#f8fafc';    // White cushioned midsole
  const SNEAKER_UPPER = '#10b981';   // Emerald shoe upper
  const SNEAKER_TRIM = '#090d16';    // Dark outsole / heel cap
  const SNEAKER_FAR = '#64748b';     // Far shoe shadow tone

  // Environment & Mat
  const MAT_COLOR = '#064e3b';       // Fitness yoga mat
  const BASELINE_COLOR = '#27272a';  // Floor line
  const GLOW_ACCENT = '#34d399';     // Biomechanical muscle glow

  // Render Realistic Human Model based on current exercise type
  const renderRealisticHuman = () => {
    switch (type) {
      /* =========================================================
         1. POLICHINELO (Jumping Jacks) - Frontal View
      ========================================================= */
      case 'jumping_jacks': {
        const spread = easeInOut * 24;
        const leftFootX = 46 - spread;
        const rightFootX = 54 + spread;
        const bounceY = easeInOut * 4;

        // Arms arc overhead
        const armAngle = easeInOut * 140; // 0 (down) to 140 deg (up)
        const handLeftX = 38 - Math.sin((armAngle * Math.PI) / 180) * 22;
        const handLeftY = 56 - Math.cos((armAngle * Math.PI) / 180) * 36 - bounceY;
        const handRightX = 62 + Math.sin((armAngle * Math.PI) / 180) * 22;
        const handRightY = 56 - Math.cos((armAngle * Math.PI) / 180) * 36 - bounceY;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="jjShirt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SHIRT_NEAR} />
                <stop offset="100%" stopColor={SHIRT_NEAR_DARK} />
              </linearGradient>
            </defs>

            {/* Mat and floor line */}
            <rect x="10" y="86" width="80" height="4" rx="2" fill={MAT_COLOR} opacity="0.6" />
            <path d="M6 90H94" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* Trajectory Guide Arcs */}
            <path d="M 28 58 Q 18 32 44 14" stroke={GLOW_ACCENT} strokeWidth="1" strokeDasharray="3 3" opacity={0.4} />
            <path d="M 72 58 Q 82 32 56 14" stroke={GLOW_ACCENT} strokeWidth="1" strokeDasharray="3 3" opacity={0.4} />

            {/* LEGS (LEFT & RIGHT) - Muscular anatomical calves & thighs */}
            {/* Left Leg */}
            <g>
              {/* Thigh (Quadriceps) */}
              <path
                d={`M 45 ${52 - bounceY} Q ${44 - spread * 0.4} ${65 - bounceY * 0.5} ${46 - spread * 0.5} ${68 - bounceY * 0.5} L ${41 - spread * 0.5} ${68 - bounceY * 0.5} Q ${40 - spread * 0.3} ${62 - bounceY * 0.5} 42 ${52 - bounceY} Z`}
                fill={PANTS_NEAR}
              />
              {/* Emerald neon stripe on shorts */}
              <path d={`M 42 ${53 - bounceY} L ${41 - spread * 0.5} ${67 - bounceY * 0.5}`} stroke={STRIPE_COLOR} strokeWidth="1.2" strokeLinecap="round" />
              {/* Calf (Gastrocnemius volume) & Ankle */}
              <path
                d={`M ${46 - spread * 0.5} ${68 - bounceY * 0.5} Q ${48 - spread * 0.7} 76 ${leftFootX + 3} 85 L ${leftFootX - 2} 85 Q ${40 - spread * 0.7} 76 ${41 - spread * 0.5} ${68 - bounceY * 0.5} Z`}
                fill={SKIN_NEAR}
              />
              {/* Left Sneaker */}
              <g transform={`translate(${leftFootX - 4}, 84)`}>
                <path d="M 0 3 Q 3 0 7 1 L 9 3 L 8 5 L 0 5 Z" fill={SNEAKER_UPPER} />
                <rect x="0" y="4.5" width="9" height="1.8" rx="0.8" fill={SNEAKER_SOLE} />
                <rect x="0" y="5.8" width="8" height="0.6" fill={SNEAKER_TRIM} />
              </g>
            </g>

            {/* Right Leg */}
            <g>
              {/* Thigh */}
              <path
                d={`M 55 ${52 - bounceY} Q ${56 + spread * 0.4} ${65 - bounceY * 0.5} ${54 + spread * 0.5} ${68 - bounceY * 0.5} L ${59 + spread * 0.5} ${68 - bounceY * 0.5} Q ${60 + spread * 0.3} ${62 - bounceY * 0.5} 58 ${52 - bounceY} Z`}
                fill={PANTS_NEAR}
              />
              <path d={`M 58 ${53 - bounceY} L ${59 + spread * 0.5} ${67 - bounceY * 0.5}`} stroke={STRIPE_COLOR} strokeWidth="1.2" strokeLinecap="round" />
              {/* Calf */}
              <path
                d={`M ${54 + spread * 0.5} ${68 - bounceY * 0.5} Q ${52 + spread * 0.7} 76 ${rightFootX - 3} 85 L ${rightFootX + 2} 85 Q ${60 + spread * 0.7} 76 ${59 + spread * 0.5} ${68 - bounceY * 0.5} Z`}
                fill={SKIN_NEAR}
              />
              {/* Right Sneaker */}
              <g transform={`translate(${rightFootX - 4}, 84)`}>
                <path d="M 9 3 Q 6 0 2 1 L 0 3 L 1 5 L 9 5 Z" fill={SNEAKER_UPPER} />
                <rect x="0" y="4.5" width="9" height="1.8" rx="0.8" fill={SNEAKER_SOLE} />
                <rect x="1" y="5.8" width="8" height="0.6" fill={SNEAKER_TRIM} />
              </g>
            </g>

            {/* TORSO & PELVIS */}
            {/* Pelvis / Waistband */}
            <path d={`M 42 ${48 - bounceY} H 58 L 56 ${54 - bounceY} H 44 Z`} fill={PANTS_NEAR} />
            {/* Athletic Tank Top / Torso with natural chest and waist taper */}
            <path
              d={`M 39 ${31 - bounceY} C 41 33 43 33 50 33 C 57 33 59 33 61 ${31 - bounceY} L 58 ${49 - bounceY} C 53 50 47 50 42 ${49 - bounceY} Z`}
              fill="url(#jjShirt)"
            />
            {/* Chest seam definition */}
            <path d={`M 44 ${38 - bounceY} Q 50 ${40 - bounceY} 56 ${38 - bounceY}`} stroke={SHIRT_NEAR_DARK} strokeWidth="0.8" opacity="0.6" />

            {/* HEAD & NECK */}
            {/* Muscular Neck */}
            <rect x="47.5" y={25 - bounceY} width="5" height="7" rx="1.5" fill={SKIN_NEAR} />
            {/* Face and Head with athletic haircut & emerald headband */}
            <ellipse cx="50" cy={20 - bounceY} rx="5.5" ry="6.8" fill={SKIN_NEAR} />
            {/* Hair */}
            <path d={`M 44.5 ${19 - bounceY} Q 50 ${12 - bounceY} 55.5 ${19 - bounceY} Q 50 ${16 - bounceY} 44.5 ${19 - bounceY} Z`} fill={HAIR_COLOR} />
            {/* Athletic Headband */}
            <path d={`M 44.8 ${18 - bounceY} H 55.2`} stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" />

            {/* ARMS (Realistic contoured shoulders, biceps, forearms, hands) */}
            {/* Left Arm */}
            <g>
              {/* Shoulder Cap (Deltoid) */}
              <circle cx="39" cy={32 - bounceY} r="3.2" fill={SKIN_NEAR} />
              {/* Arm segment path */}
              <path
                d={`M 38 ${32 - bounceY} Q ${handLeftX + 4} ${(32 - bounceY + handLeftY) / 2} ${handLeftX} ${handLeftY}`}
                stroke={SKIN_NEAR}
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Hand with wristband */}
              <circle cx={handLeftX} cy={handLeftY} r="2.2" fill={SKIN_NEAR} />
              <circle cx={handLeftX} cy={handLeftY} r="1.4" fill={GLOW_ACCENT} />
            </g>

            {/* Right Arm */}
            <g>
              <circle cx="61" cy={32 - bounceY} r="3.2" fill={SKIN_NEAR} />
              <path
                d={`M 62 ${32 - bounceY} Q ${handRightX - 4} ${(32 - bounceY + handRightY) / 2} ${handRightX} ${handRightY}`}
                stroke={SKIN_NEAR}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx={handRightX} cy={handRightY} r="2.2" fill={SKIN_NEAR} />
              <circle cx={handRightX} cy={handRightY} r="1.4" fill={GLOW_ACCENT} />
            </g>
          </svg>
        );
      }

      /* =========================================================
         2. AGACHAMENTO LIVRE (Squat) - Side Profile View
      ========================================================= */
      case 'squats': {
        // Hips shift back and down
        const hipX = 46 - easeInOut * 15;
        const hipY = 50 + easeInOut * 20;

        // Torso tilts with proud straight spine
        const shoulderX = 46 - easeInOut * 7;
        const shoulderY = 26 + easeInOut * 18;
        const headX = 49 - easeInOut * 6;
        const headY = 16 + easeInOut * 17;

        // Knee bends forward slightly and tracks over midfoot
        const kneeX = 58 + easeInOut * 2;
        const kneeY = 62 + easeInOut * 7;

        // Arms reach forward horizontally for counter-balance
        const handX = 76 + easeInOut * 6;
        const handY = 32 + easeInOut * 15;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="squatTorso" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={SHIRT_NEAR} />
                <stop offset="100%" stopColor={SHIRT_NEAR_DARK} />
              </linearGradient>
            </defs>

            {/* Mat and floor line */}
            <rect x="12" y="86" width="76" height="4" rx="2" fill={MAT_COLOR} opacity="0.6" />
            <path d="M8 90H92" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* 90° Knee Angle Guide Indicator on full squat */}
            {easeInOut > 0.65 && (
              <g className="animate-pulse">
                <path d="M 23 68 V 76 M 20 73 L 23 76 L 26 73" stroke={GLOW_ACCENT} strokeWidth="1.5" strokeLinecap="round" />
                <text x="23" y="64" fill={GLOW_ACCENT} fontSize="7" fontWeight="bold" textAnchor="middle">90°</text>
              </g>
            )}

            {/* FAR LIMBS (Background depth shadow) */}
            {/* Far Arm */}
            <path
              d={`M ${shoulderX} ${shoulderY} L ${shoulderX + 14} ${shoulderY + 5} L ${handX - 4} ${handY + 2}`}
              stroke={SKIN_FAR}
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Far Leg (Thigh & Calf in shadow) */}
            <path
              d={`M ${hipX - 1} ${hipY - 1} Q ${(hipX + kneeX) / 2 - 2} ${kneeY - 3} ${kneeX - 3} ${kneeY} L 54 86`}
              stroke={PANTS_FAR}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Far Sneaker */}
            <rect x="52" y="85" width="9" height="3" rx="1.2" fill={SNEAKER_FAR} />

            {/* NEAR LEG - Anatomical Glutes & Thigh (Quadriceps Volume) */}
            {/* Muscular Thigh with curvature */}
            <path
              d={`M ${hipX} ${hipY - 2} C ${hipX + 8} ${hipY - 4} ${kneeX - 4} ${kneeY - 6} ${kneeX} ${kneeY} C ${kneeX - 2} ${kneeY + 4} ${hipX + 5} ${hipY + 6} ${hipX - 2} ${hipY + 3} Z`}
              fill={PANTS_NEAR}
            />
            {/* Emerald athletic stripe along thigh */}
            <path
              d={`M ${hipX} ${hipY} Q ${(hipX + kneeX) / 2} ${(hipY + kneeY) / 2} ${kneeX} ${kneeY}`}
              stroke={STRIPE_COLOR}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Muscle Activation Glow on Quads & Glutes */}
            {showMuscles && easeInOut > 0.5 && (
              <path
                d={`M ${hipX - 2} ${hipY} Q ${(hipX + kneeX) / 2} ${(hipY + kneeY) / 2 - 4} ${kneeX - 2} ${kneeY}`}
                stroke={GLOW_ACCENT}
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={0.8}
                className="animate-pulse"
              />
            )}

            {/* Calf & Shin (Anatomical gastrocnemius curve) */}
            <path
              d={`M ${kneeX} ${kneeY} C ${kneeX + 2} 74 60 82 59 86 L 55 86 C 54 80 ${kneeX - 3} 72 ${kneeX - 3} ${kneeY} Z`}
              fill={SKIN_NEAR}
            />

            {/* Near Sneaker (Detailed running shoe) */}
            <g transform="translate(54, 84)">
              <path d="M 0 3 Q 4 0 10 1 L 11 3 L 10 5 L 0 5 Z" fill={SNEAKER_UPPER} />
              <rect x="0" y="4.5" width="11" height="1.8" rx="0.8" fill={SNEAKER_SOLE} />
              <rect x="0" y="5.8" width="10" height="0.6" fill={SNEAKER_TRIM} />
              {/* Laces */}
              <line x1="5" y1="2" x2="7" y2="2" stroke="#fff" strokeWidth="0.8" />
            </g>

            {/* TORSO & PELVIS (Volumetric athletic tank with proud chest) */}
            <path
              d={`M ${shoulderX} ${shoulderY} C ${shoulderX + 5} ${shoulderY + 6} ${hipX + 7} ${hipY - 4} ${hipX + 3} ${hipY + 2} L ${hipX - 3} ${hipY - 1} C ${hipX - 1} ${hipY - 7} ${shoulderX - 5} ${shoulderY + 4} ${shoulderX - 2} ${shoulderY - 2} Z`}
              fill="url(#squatTorso)"
            />

            {/* HEAD & NECK (Profile facing right) */}
            <path d={`M ${shoulderX + 2} ${shoulderY} L ${headX - 1} ${headY + 6}`} stroke={SKIN_NEAR} strokeWidth="4.5" strokeLinecap="round" />
            {/* Head profile */}
            <ellipse cx={headX} cy={headY} rx="5.5" ry="6.5" fill={SKIN_NEAR} />
            {/* Nose & Jaw profile */}
            <path d={`M ${headX + 4} ${headY} L ${headX + 7} ${headY + 1} L ${headX + 4} ${headY + 3}`} stroke={SKIN_NEAR_SHADOW} strokeWidth="1" fill={SKIN_NEAR} />
            {/* Hair with sporty ponytail */}
            <path d={`M ${headX - 4} ${headY - 5} Q ${headX} ${headY - 8} ${headX + 4} ${headY - 4} Q ${headX} ${headY - 2} ${headX - 5} ${headY + 2} Z`} fill={HAIR_COLOR} />
            <path d={`M ${headX - 5} ${headY - 1} Q ${headX - 12} ${headY - 2} ${headX - 14} ${headY + 4}`} stroke={HAIR_COLOR} strokeWidth="2.5" strokeLinecap="round" />
            {/* Headband */}
            <path d={`M ${headX - 3} ${headY - 3} L ${headX + 5} ${headY - 2}`} stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" />

            {/* NEAR ARM (Extended forward for counter-balance) */}
            <g>
              {/* Deltoid / Shoulder cap */}
              <circle cx={shoulderX} cy={shoulderY} r="3.2" fill={SKIN_NEAR} />
              {/* Upper arm & Forearm */}
              <path
                d={`M ${shoulderX} ${shoulderY} Q ${shoulderX + 16} ${shoulderY + 5} ${handX} ${handY}`}
                stroke={SKIN_NEAR}
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Hand with wristband */}
              <circle cx={handX} cy={handY} r="2.2" fill={SKIN_NEAR} />
              <circle cx={handX - 2} cy={handY} r="1.4" fill={GLOW_ACCENT} />
            </g>
          </svg>
        );
      }

      /* =========================================================
         3. FLEXÃO NA PAREDE (Wall Pushup) - Side Profile View
      ========================================================= */
      case 'wall_pushup': {
        const wallX = 84;
        const dip = easeInOut * 15;
        const shoulderX = 52 + dip;
        const headX = 56 + dip;
        const hipX = 42 + dip * 0.7;
        const footX = 26;

        const handX = wallX - 3;
        const handY = 38;
        const elbowX = shoulderX + (handX - shoulderX) * 0.45;
        const elbowY = 40 + easeInOut * 10;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            {/* Wall structure with textured panels */}
            <rect x={wallX} y="10" width="8" height="80" rx="1.5" fill="#334155" />
            <line x1={wallX} y1="10" x2={wallX} y2="90" stroke="#475569" strokeWidth="1.5" />
            <path d="M8 90H94" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* Motion Arrows */}
            <path d="M 60 48 L 72 48 M 69 45 L 72 48 L 69 51" stroke={GLOW_ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />

            {/* FAR ARM & LEG in shadow */}
            <path d={`M ${shoulderX} 35 L ${elbowX + 2} ${elbowY - 2} L ${handX} ${handY - 2}`} stroke={SKIN_FAR} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d={`M ${hipX} 54 L 36 70 L ${footX + 4} 87`} stroke={PANTS_FAR} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* NEAR LEG - Rigid Plank Line */}
            {/* Thigh & Leg */}
            <path
              d={`M ${hipX} 54 L 35 70 L ${footX} 87`}
              stroke={PANTS_NEAR}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Neon stripe down leg */}
            <path d={`M ${hipX} 54 L 35 70 L ${footX} 87`} stroke={STRIPE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* Sneaker elevated on metatarsals */}
            <g transform={`translate(${footX - 3}, 84)`}>
              <path d="M 0 4 L 4 0 L 8 2 L 6 5 Z" fill={SNEAKER_UPPER} />
              <rect x="0" y="4" width="7" height="1.8" rx="0.6" fill={SNEAKER_SOLE} />
            </g>

            {/* TORSO (Plank straight line from shoulders to hips) */}
            <path
              d={`M ${shoulderX} 34 C ${shoulderX - 3} 40 ${hipX + 3} 48 ${hipX} 55 L ${hipX - 5} 53 C ${hipX - 3} 46 ${shoulderX - 8} 38 ${shoulderX - 4} 32 Z`}
              fill={SHIRT_NEAR}
            />

            {/* HEAD (facing wall) */}
            <path d={`M ${shoulderX} 34 L ${headX - 2} 29`} stroke={SKIN_NEAR} strokeWidth="4" strokeLinecap="round" />
            <ellipse cx={headX} cy="26" rx="5.2" ry="6.2" fill={SKIN_NEAR} />
            {/* Hair */}
            <path d={`M ${headX - 4} 21 Q ${headX} 18 ${headX + 4} 22 Q ${headX} 24 ${headX - 5} 27 Z`} fill={HAIR_COLOR} />
            {/* Profile nose pointing right */}
            <path d={`M ${headX + 4} 25 L ${headX + 7} 26 L ${headX + 4} 28`} stroke={SKIN_NEAR_SHADOW} strokeWidth="0.9" fill={SKIN_NEAR} />

            {/* NEAR ARM (45° elbow tuck showing chest activation) */}
            <g>
              <circle cx={shoulderX} cy="35" r="3.2" fill={SKIN_NEAR} />
              <path
                d={`M ${shoulderX} 35 L ${elbowX} ${elbowY} L ${handX} ${handY}`}
                stroke={SKIN_NEAR}
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Hand flat on wall */}
              <rect x={handX - 1} y={handY - 3} width="3" height="7" rx="1.2" fill={SKIN_NEAR} />
              <rect x={handX - 2} y={handY - 1} width="1.5" height="3" rx="0.5" fill={GLOW_ACCENT} />
            </g>

            {/* Chest & Triceps Activation Indicator */}
            {showMuscles && easeInOut > 0.5 && (
              <circle cx={shoulderX + 4} cy="38" r="4.5" stroke={GLOW_ACCENT} strokeWidth="1.5" strokeDasharray="2 2" className="animate-pulse" />
            )}
          </svg>
        );
      }

      /* =========================================================
         4. ELEVAÇÃO PÉLVICA (Glute Bridge) - Supine View
      ========================================================= */
      case 'glute_bridge': {
        const liftY = easeInOut * 24;
        const hipY = 74 - liftY;
        const kneeY = 56 - liftY * 0.35;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            {/* Thick Exercise Mat */}
            <rect x="10" y="80" width="80" height="5" rx="2.5" fill={MAT_COLOR} opacity="0.8" />
            <path d="M6 85H94" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* Glute Activation Glow at peak */}
            {showMuscles && easeInOut > 0.6 && (
              <g className="animate-pulse">
                <path d={`M 52 ${hipY - 7} V ${hipY - 16} M 49 ${hipY - 12} L 52 ${hipY - 16} L 55 ${hipY - 12}`} stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="52" cy={hipY} r="7" stroke={GLOW_ACCENT} strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            )}

            {/* ARMS resting along sides on floor */}
            <path d="M 36 76 L 58 80" stroke={SKIN_FAR} strokeWidth="4" strokeLinecap="round" />

            {/* HEAD resting on mat */}
            <ellipse cx="24" cy="74" rx="5.5" ry="6.2" fill={SKIN_NEAR} />
            {/* Hair spread on mat */}
            <path d="M 18 73 Q 22 68 26 71 Q 20 76 18 78 Z" fill={HAIR_COLOR} />

            {/* UPPER BACK & TORSO (rising to elevated pelvis) */}
            <path
              d={`M 30 76 C 36 76 46 ${hipY + 4} 52 ${hipY} L 54 ${hipY - 4} C 46 ${hipY - 2} 36 72 30 72 Z`}
              fill={SHIRT_NEAR}
            />

            {/* GLUTES & THIGHS (Volumetric muscle contour) */}
            {/* Pelvis/Glutes */}
            <circle cx="52" cy={hipY} r="4.5" fill={PANTS_NEAR} />
            {/* Thigh (Glute to Knee) */}
            <path
              d={`M 52 ${hipY} Q 60 ${(hipY + kneeY) / 2} 70 ${kneeY}`}
              stroke={PANTS_NEAR}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d={`M 52 ${hipY} Q 60 ${(hipY + kneeY) / 2} 70 ${kneeY}`}
              stroke={STRIPE_COLOR}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* SHIN (Knee to Foot firmly planted) */}
            <path
              d={`M 70 ${kneeY} L 74 80`}
              stroke={SKIN_NEAR}
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* SNEAKER flat on floor */}
            <g transform="translate(71, 78)">
              <path d="M 0 3 Q 4 0 9 1 L 10 3 L 9 5 L 0 5 Z" fill={SNEAKER_UPPER} />
              <rect x="0" y="4.5" width="10" height="1.8" rx="0.8" fill={SNEAKER_SOLE} />
            </g>
          </svg>
        );
      }

      /* =========================================================
         5. PRANCHA NOS JOELHOS (Knee Plank) - Isometric
      ========================================================= */
      case 'knee_plank': {
        const breathY = Math.sin(phase * Math.PI * 4) * 1.5;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            {/* Mat */}
            <rect x="12" y="78" width="76" height="5" rx="2.5" fill={MAT_COLOR} opacity="0.8" />
            <path d="M8 83H92" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* Core Activation Aura */}
            {showMuscles && (
              <g className="animate-pulse">
                <ellipse cx="50" cy={58 + breathY} rx="8" ry="4.5" stroke={GLOW_ACCENT} strokeWidth="1.5" strokeDasharray="3 3" opacity={0.8} />
                <text x="50" y="44" fill={GLOW_ACCENT} fontSize="6" fontWeight="bold" textAnchor="middle">CORE ATIVADO</text>
              </g>
            )}

            {/* FOREARMS flat on mat (elbows directly under shoulders) */}
            <path d="M 68 56 V 78 H 80" stroke={SKIN_NEAR} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="68" cy="78" r="2.5" fill={GLOW_ACCENT} />

            {/* HEAD looking down neutrally */}
            <ellipse cx="75" cy="46" rx="5.2" ry="6" fill={SKIN_NEAR} />
            <path d="M 72 41 Q 76 38 80 43 Q 76 46 72 48 Z" fill={HAIR_COLOR} />

            {/* RIGID TORSO & ABDOMINAL WALL */}
            <path
              d={`M 68 54 Q 50 ${56 + breathY} 36 68 L 34 64 Q 50 ${52 + breathY} 66 50 Z`}
              fill={SHIRT_NEAR}
            />

            {/* PELVIS & THIGHS TO KNEES */}
            <path
              d={`M 36 68 L 30 78`}
              stroke={PANTS_NEAR}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path d="M 36 68 L 30 78" stroke={STRIPE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* LOWER LEGS lifted behind with relaxed ankles */}
            <path d="M 30 78 L 20 72" stroke={SKIN_NEAR} strokeWidth="4.5" strokeLinecap="round" />
            {/* Small athletic sneaker */}
            <rect x="17" y="69" width="5" height="4" rx="1" fill={SNEAKER_UPPER} />
          </svg>
        );
      }

      /* =========================================================
         6. MARCHAS COM JOELHOS ALTOS (High Knees) - Side View
      ========================================================= */
      case 'high_knees': {
        const liftMagnitude = Math.abs(alternating);
        const activeKneeY = 48 - liftMagnitude * 16;
        const armSwing = alternating * 18;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <rect x="18" y="86" width="64" height="4" rx="2" fill={MAT_COLOR} opacity="0.6" />
            <path d="M10 90H90" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* FAR ARM & LEG in shadow */}
            <path
              d={`M 48 32 L ${40 - armSwing * 0.4} 42 L ${32 - armSwing * 0.6} 50`}
              stroke={SKIN_FAR}
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Standing Leg */}
            <path
              d="M 48 52 L 44 70 L 44 86"
              stroke={PANTS_FAR}
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <rect x="42" y="85" width="8" height="3" rx="1.2" fill={SNEAKER_FAR} />

            {/* UPRIGHT ATHLETIC TORSO */}
            <path
              d="M 45 28 C 47 32 49 46 47 53 L 51 53 C 53 46 51 32 49 28 Z"
              fill={SHIRT_NEAR}
            />

            {/* HEAD with headband */}
            <ellipse cx="48" cy="18" rx="5.2" ry="6.2" fill={SKIN_NEAR} />
            <path d="M 44 14 Q 48 11 52 14 Q 48 16 44 18 Z" fill={HAIR_COLOR} />
            <path d="M 44 17 H 53" stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" />

            {/* ACTIVE NEAR LEG (Knee driven high to 90°) */}
            <path
              d={`M 48 52 L 62 ${activeKneeY} L 62 ${activeKneeY + 18}`}
              stroke={PANTS_NEAR}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M 48 52 L 62 ${activeKneeY}`}
              stroke={STRIPE_COLOR}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Elevated Sneaker */}
            <g transform={`translate(59, ${activeKneeY + 16})`}>
              <path d="M 0 3 Q 3 0 7 1 L 8 3 L 7 5 L 0 5 Z" fill={SNEAKER_UPPER} />
              <rect x="0" y="4.5" width="8" height="1.5" rx="0.6" fill={SNEAKER_SOLE} />
            </g>

            {/* NEAR RUNNER ARM (Bent 90° swinging forward) */}
            <path
              d={`M 48 32 L ${58 + armSwing * 0.4} 42 L ${66 + armSwing * 0.6} 48`}
              stroke={SKIN_NEAR}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      }

      /* =========================================================
         7. AFUNDO / PASSADA (Lunges) - Side Profile View
      ========================================================= */
      case 'lunges': {
        const drop = easeInOut * 18;
        const hipY = 52 + drop;
        const rearKneeY = 70 + drop;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <rect x="12" y="86" width="76" height="4" rx="2" fill={MAT_COLOR} opacity="0.6" />
            <path d="M8 90H92" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* REAR LEG (Dropped knee at 90°) */}
            <path
              d={`M 48 ${hipY} L 32 ${rearKneeY} L 22 86`}
              stroke={PANTS_FAR}
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Rear Sneaker on toes */}
            <rect x="20" y="84" width="7" height="3" rx="1" fill={SNEAKER_FAR} />

            {/* UPRIGHT TORSO */}
            <path
              d={`M 46 ${28 + drop} C 48 32 49 46 47 ${hipY} L 51 ${hipY} C 53 46 51 32 49 ${28 + drop} Z`}
              fill={SHIRT_NEAR}
            />

            {/* HEAD */}
            <ellipse cx="48" cy={18 + drop} rx="5.2" ry="6.2" fill={SKIN_NEAR} />
            <path d={`M 44 ${14 + drop} Q 48 ${11 + drop} 52 ${14 + drop} Z`} fill={HAIR_COLOR} />
            <path d={`M 44 ${17 + drop} H 53`} stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" />

            {/* ARMS (Hands on hips for perfect posture) */}
            <path
              d={`M 48 ${34 + drop} L 40 ${42 + drop} L 47 ${48 + drop}`}
              stroke={SKIN_NEAR}
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* FRONT LEG (Knee stacked at 90° over ankle) */}
            <path
              d={`M 48 ${hipY} L 66 ${hipY + 4} L 66 86`}
              stroke={PANTS_NEAR}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d={`M 48 ${hipY} L 66 ${hipY + 4}`} stroke={STRIPE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* Front Sneaker flat */}
            <g transform="translate(63, 84)">
              <path d="M 0 3 Q 4 0 9 1 L 10 3 L 9 5 L 0 5 Z" fill={SNEAKER_UPPER} />
              <rect x="0" y="4.5" width="10" height="1.8" rx="0.8" fill={SNEAKER_SOLE} />
            </g>
          </svg>
        );
      }

      /* =========================================================
         8. PERDIGUEIRO (Bird-Dog) - Quadruped Core View
      ========================================================= */
      case 'bird_dog': {
        const reach = easeInOut * 22;
        const handReachX = 64 + reach;
        const legReachX = 36 - reach;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <rect x="10" y="80" width="80" height="5" rx="2.5" fill={MAT_COLOR} opacity="0.8" />
            <path d="M6 85H94" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* SUPPORT HAND & KNEE ON MAT */}
            <path d="M 62 52 V 80" stroke={SKIN_FAR} strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 40 54 V 80 H 32" stroke={PANTS_FAR} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* NEUTRAL HORIZONTAL SPINE & TORSO */}
            <path
              d="M 64 48 C 56 46 44 46 36 50 L 36 56 C 44 54 56 54 64 54 Z"
              fill={SHIRT_NEAR}
            />

            {/* HEAD aligned with spine */}
            <ellipse cx="68" cy="44" rx="5" ry="5.8" fill={SKIN_NEAR} />
            <path d="M 66 39 Q 70 36 74 41 Z" fill={HAIR_COLOR} />

            {/* EXTENDING ARM (Forward at shoulder height) */}
            <path
              d={`M 64 50 L ${handReachX} 48`}
              stroke={SKIN_NEAR}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx={handReachX} cy="48" r="2.2" fill={GLOW_ACCENT} />

            {/* EXTENDING LEG (Backward in straight line with glute squeeze) */}
            <path
              d={`M 36 52 L ${legReachX} 50`}
              stroke={PANTS_NEAR}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path d={`M 36 52 L ${legReachX} 50`} stroke={STRIPE_COLOR} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx={legReachX} cy="50" r="2.5" fill={GLOW_ACCENT} />
          </svg>
        );
      }

      /* =========================================================
         9. ELEVAÇÃO DE PANTURRILHA (Calf Raises) - Standing Profile
      ========================================================= */
      case 'calf_raises': {
        const rise = easeInOut * 10;
        const heelY = 86 - rise;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <rect x="18" y="86" width="64" height="4" rx="2" fill={MAT_COLOR} opacity="0.6" />
            <path d="M10 90H90" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* Calf Activation Highlight Arrow */}
            {showMuscles && easeInOut > 0.5 && (
              <g className="animate-pulse">
                <path d="M 64 74 V 62 M 61 66 L 64 62 L 67 66" stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy={72 - rise} r="5" stroke={GLOW_ACCENT} strokeWidth="1.5" strokeDasharray="2 2" />
              </g>
            )}

            {/* TALL UPRIGHT ATHLETIC TORSO */}
            <path
              d={`M 46 ${26 - rise} C 48 30 50 48 48 ${54 - rise} L 52 ${54 - rise} C 54 48 52 30 50 ${26 - rise} Z`}
              fill={SHIRT_NEAR}
            />

            {/* HEAD */}
            <ellipse cx="50" cy={16 - rise} rx="5.2" ry="6.2" fill={SKIN_NEAR} />
            <path d={`M 46 ${12 - rise} Q 50 ${9 - rise} 54 ${12 - rise} Z`} fill={HAIR_COLOR} />
            <path d={`M 46 ${15 - rise} H 55`} stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" />

            {/* ARMS relaxed at sides or on hips */}
            <path d={`M 48 ${32 - rise} L 42 ${42 - rise} L 48 ${48 - rise}`} stroke={SKIN_NEAR} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />

            {/* THIGHS & MUSCULAR CALVES */}
            <path
              d={`M 50 ${54 - rise} L 50 ${70 - rise} Q 52 ${75 - rise} 50 ${heelY} L 54 86`}
              stroke={PANTS_NEAR}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d={`M 50 ${54 - rise} L 50 ${70 - rise}`} stroke={STRIPE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* SNEAKER rising onto toes */}
            <g transform={`translate(48, ${heelY - 2})`}>
              <path d="M 0 3 L 5 0 L 8 4 L 4 6 Z" fill={SNEAKER_UPPER} />
              <rect x="0" y="4.5" width="8" height="1.8" rx="0.8" fill={SNEAKER_SOLE} />
            </g>
          </svg>
        );
      }

      /* =========================================================
         10. CÍRCULOS COM BRAÇOS (Arm Circles) - Frontal T-Pose
      ========================================================= */
      case 'arm_circles': {
        const circleAngle = phase * Math.PI * 4;
        const handOffsetY = Math.sin(circleAngle) * 5;
        const handOffsetX = Math.cos(circleAngle) * 4;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <rect x="16" y="86" width="68" height="4" rx="2" fill={MAT_COLOR} opacity="0.6" />
            <path d="M10 90H90" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* LEGS planted shoulder-width */}
            <path d="M 45 54 L 42 86" stroke={PANTS_NEAR} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 55 54 L 58 86" stroke={PANTS_NEAR} strokeWidth="5.5" strokeLinecap="round" />
            <rect x="38" y="85" width="7" height="3" rx="1" fill={SNEAKER_SOLE} />
            <rect x="55" y="85" width="7" height="3" rx="1" fill={SNEAKER_SOLE} />

            {/* TORSO */}
            <path d="M 43 32 C 45 34 55 34 57 32 L 55 54 H 45 Z" fill={SHIRT_NEAR} />

            {/* HEAD */}
            <ellipse cx="50" cy="20" rx="5.5" ry="6.5" fill={SKIN_NEAR} />
            <path d="M 45 15 Q 50 12 55 15 Z" fill={HAIR_COLOR} />
            <path d="M 45 18 H 55" stroke={GLOW_ACCENT} strokeWidth="1.8" strokeLinecap="round" />

            {/* DELTOID ACTIVATION GLOW */}
            {showMuscles && (
              <>
                <circle cx="38" cy="32" r="4.5" stroke={GLOW_ACCENT} strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx="62" cy="32" r="4.5" stroke={GLOW_ACCENT} strokeWidth="1.2" strokeDasharray="2 2" />
              </>
            )}

            {/* T-ARMS with smooth rotation trajectories */}
            {/* Left Arm */}
            <path d={`M 40 32 L ${20 + handOffsetX} ${32 + handOffsetY}`} stroke={SKIN_NEAR} strokeWidth="4" strokeLinecap="round" />
            <circle cx="20" cy="32" r="5" stroke={GLOW_ACCENT} strokeWidth="1" strokeDasharray="2 2" opacity={0.6} />

            {/* Right Arm */}
            <path d={`M 60 32 L ${80 - handOffsetX} ${32 + handOffsetY}`} stroke={SKIN_NEAR} strokeWidth="4" strokeLinecap="round" />
            <circle cx="80" cy="32" r="5" stroke={GLOW_ACCENT} strokeWidth="1" strokeDasharray="2 2" opacity={0.6} />
          </svg>
        );
      }

      /* =========================================================
         11. MOBILIDADE GATO E VACA (Cat-Cow) - Spinal Mobilization
      ========================================================= */
      case 'cat_cow': {
        // Curve value: positive = Cow (swayback), negative = Cat (arched back)
        const curve = (easeInOut - 0.5) * 22;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <rect x="10" y="80" width="80" height="5" rx="2.5" fill={MAT_COLOR} opacity="0.8" />
            <path d="M6 85H94" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* ARMS & KNEES vertical in quadruped base */}
            <path d="M 64 54 V 80" stroke={SKIN_NEAR} strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 34 56 V 80 H 26" stroke={PANTS_NEAR} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

            {/* HEAD articulates with spine (Lifts up on Cow, tucks on Cat) */}
            <ellipse cx="70" cy={44 - curve * 0.3} rx="5" ry="5.8" fill={SKIN_NEAR} />
            <path d={`M 68 ${39 - curve * 0.3} Q 72 ${36 - curve * 0.3} 76 ${41 - curve * 0.3} Z`} fill={HAIR_COLOR} />

            {/* ARTICULATING SPINE (Smooth curved back) */}
            <path
              d={`M 64 50 Q 50 ${52 + curve} 34 54`}
              stroke={SHIRT_NEAR}
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Spinal vertebra trajectory line */}
            <path
              d={`M 64 48 Q 50 ${50 + curve} 34 52`}
              stroke={GLOW_ACCENT}
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity={0.8}
            />
          </svg>
        );
      }

      /* =========================================================
         12. ALONGAMENTO & RELAXAMENTO (Stretching) - Restorative
      ========================================================= */
      case 'stretching':
      default: {
        const stretchBend = easeInOut * 12;

        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
            <rect x="18" y="86" width="64" height="4" rx="2" fill={MAT_COLOR} opacity="0.6" />
            <path d="M10 90H90" stroke={BASELINE_COLOR} strokeWidth="1.5" strokeLinecap="round" />

            {/* LEGS */}
            <path d="M 46 54 L 44 86" stroke={PANTS_NEAR} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 54 54 L 56 86" stroke={PANTS_NEAR} strokeWidth="5.5" strokeLinecap="round" />
            <rect x="40" y="85" width="7" height="3" rx="1" fill={SNEAKER_SOLE} />
            <rect x="54" y="85" width="7" height="3" rx="1" fill={SNEAKER_SOLE} />

            {/* TORSO with gentle lateral bend */}
            <path
              d={`M 46 32 C 48 34 52 ${34 + stretchBend * 0.2} 54 32 L 53 54 H 47 Z`}
              fill={SHIRT_NEAR}
            />

            {/* HEAD */}
            <ellipse cx={50 - stretchBend * 0.3} cy="18" rx="5.2" ry="6.2" fill={SKIN_NEAR} />
            <path d={`M ${46 - stretchBend * 0.3} 13 Q ${50 - stretchBend * 0.3} 10 ${54 - stretchBend * 0.3} 13 Z`} fill={HAIR_COLOR} />

            {/* ARM REACHING OVERHEAD in soothing side stretch */}
            <path
              d={`M 54 32 C 58 26 58 14 ${46 - stretchBend} 10`}
              stroke={SKIN_NEAR}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M 44 34 L 40 48" stroke={SKIN_NEAR} strokeWidth="3.6" strokeLinecap="round" />
          </svg>
        );
      }
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-between p-3.5 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 shadow-2xl overflow-hidden group select-none ${className}`}>
      {/* Background Ambience Gradient */}
      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Bar: Exercise Tag, Speed & Muscle Highlight */}
      <div className="w-full flex items-center justify-between z-10 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px] flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Modelo Humano Real</span>
          </span>
          <span className="hidden sm:inline text-zinc-400 text-[11px]">
            {getTargetMuscles()}
          </span>
        </div>

        {/* Speed & Activation Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowMuscles(!showMuscles)}
            title="Destacar ativação muscular"
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
              showMuscles 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
            }`}
          >
            <Zap className="w-2.5 h-2.5" />
            <span>Músculos</span>
          </button>

          <button
            onClick={() => setSpeed(speed === 1 ? 0.5 : 1)}
            className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white font-mono text-[10px] transition-colors"
            title="Alternar velocidade da animação"
          >
            {speed === 1 ? '1.0x' : '0.5x'}
          </button>
        </div>
      </div>

      {/* Animated Character Stage */}
      <div className="relative w-full flex-1 flex items-center justify-center my-1 max-h-[190px]">
        {renderRealisticHuman()}
      </div>

      {/* Bottom Bar: Educational Phase Indicator & Play/Pause */}
      <div className="w-full flex items-center justify-between gap-2 pt-2 border-t border-zinc-900/80 z-10">
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-[11px] font-medium text-emerald-300/95 truncate">
            {getPhaseDescription()}
          </p>
        </div>

        {/* Play / Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 transition-all shrink-0"
          title={isPlaying ? 'Pausar animação' : 'Reproduzir animação'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
