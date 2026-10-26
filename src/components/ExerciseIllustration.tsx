import React from 'react';
import { ExerciseIconType } from '../types';

interface ExerciseIllustrationProps {
  type: ExerciseIconType;
  className?: string;
  isRest?: boolean;
}

export const ExerciseIllustration: React.FC<ExerciseIllustrationProps> = ({
  type,
  className = 'w-24 h-24',
  isRest = false
}) => {
  if (isRest) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 p-3 ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" className="animate-spin" style={{ animationDuration: '24s' }} />
          <path d="M42 38C42 38 46 48 50 48C54 48 58 38 58 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="54" r="14" stroke="currentColor" strokeWidth="3" />
          <path d="M38 72H62" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Realistic athletic human palette
  const SKIN = '#f6c49c';
  const SKIN_FAR = '#c7845d';
  const SHIRT = '#10b981';
  const SHIRT_DARK = '#059669';
  const PANTS = '#1e293b';
  const PANTS_FAR = '#0f172a';
  const STRIPE = '#34d399';
  const HAIR = '#1e1b18';
  const SNEAKER = '#f8fafc';
  const SNEAKER_UPPER = '#10b981';
  const FLOOR = '#27272a';

  // Realistic human preview representations for cards and program lists
  const renderSvg = () => {
    switch (type) {
      /* 1. Jumping Jacks */
      case 'jumping_jacks':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M12 90H88" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Legs spread */}
            <path d="M 45 52 L 32 72 L 24 86" stroke={PANTS} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 55 52 L 68 72 L 76 86" stroke={PANTS} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 45 52 L 32 72" stroke={STRIPE} strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 55 52 L 68 72" stroke={STRIPE} strokeWidth="1.2" strokeLinecap="round" />
            <rect x="20" y="85" width="7" height="3" rx="1" fill={SNEAKER} />
            <rect x="73" y="85" width="7" height="3" rx="1" fill={SNEAKER} />
            {/* Torso */}
            <path d="M 42 32 C 44 34 56 34 58 32 L 56 52 H 44 Z" fill={SHIRT} />
            {/* Head */}
            <ellipse cx="50" cy="20" rx="5" ry="6" fill={SKIN} />
            <path d="M 45 15 Q 50 11 55 15 Z" fill={HAIR} />
            <path d="M 45 18 H 55" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            {/* Arms overhead */}
            <path d="M 42 32 L 28 18 L 44 14" stroke={SKIN} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 58 32 L 72 18 L 56 14" stroke={SKIN} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      /* 2. Squats */
      case 'squats':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M12 90H88" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Far leg */}
            <path d="M 34 66 L 56 68 L 52 86" stroke={PANTS_FAR} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="50" y="85" width="8" height="3" rx="1" fill="#64748b" />
            {/* Torso tilted */}
            <path d="M 40 40 L 48 38 L 38 64 L 32 64 Z" fill={SHIRT} />
            {/* Head facing right */}
            <ellipse cx="45" cy="28" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 41 23 Q 45 20 48 24 Z" fill={HAIR} />
            <path d="M 48 27 L 51 28" stroke={SKIN} strokeWidth="1.5" strokeLinecap="round" />
            {/* Arms reaching forward */}
            <path d="M 44 38 L 74 40" stroke={SKIN} strokeWidth="3.6" strokeLinecap="round" />
            {/* Near Thigh (90°) & Calf */}
            <path d="M 33 64 L 58 66 L 58 86" stroke={PANTS} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 33 64 L 58 66" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            {/* Sneaker */}
            <rect x="56" y="85" width="9" height="3" rx="1" fill={SNEAKER} />
          </svg>
        );

      /* 3. Wall Pushup */
      case 'wall_pushup':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="82" y="14" width="7" height="74" rx="1" fill="#475569" />
            <path d="M10 90H90" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Rigid Plank Leg */}
            <path d="M 46 54 L 34 70 L 26 86" stroke={PANTS} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 46 54 L 34 70 L 26 86" stroke={STRIPE} strokeWidth="1.2" strokeLinecap="round" />
            <rect x="23" y="84" width="7" height="4" rx="1" fill={SNEAKER} />
            {/* Torso */}
            <path d="M 58 35 L 46 54 L 42 52 L 54 33 Z" fill={SHIRT} />
            {/* Head */}
            <ellipse cx="62" cy="26" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 58 21 Q 62 18 66 22 Z" fill={HAIR} />
            {/* Arm bending at 45° */}
            <path d="M 58 36 L 68 46 L 80 40" stroke={SKIN} strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="79" y="38" width="3" height="6" rx="1" fill={SKIN} />
          </svg>
        );

      /* 4. Glute Bridge */
      case 'glute_bridge':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="10" y="82" width="80" height="4" rx="2" fill="#064e3b" opacity="0.8" />
            <path d="M8 86H92" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Arms on floor */}
            <path d="M 32 76 L 56 80" stroke={SKIN_FAR} strokeWidth="3.6" strokeLinecap="round" />
            {/* Head on floor */}
            <ellipse cx="24" cy="74" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 18 73 Q 22 68 26 71 Z" fill={HAIR} />
            {/* Torso ascending */}
            <path d="M 30 76 L 52 54 L 55 58 L 33 78 Z" fill={SHIRT} />
            {/* Elevated glute & thighs */}
            <path d="M 52 54 L 70 56 L 74 80" stroke={PANTS} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 52 54 L 70 56" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="71" y="79" width="8" height="3" rx="1" fill={SNEAKER} />
          </svg>
        );

      /* 5. Knee Plank */
      case 'knee_plank':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="12" y="80" width="76" height="4" rx="2" fill="#064e3b" opacity="0.8" />
            <path d="M8 84H92" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Head */}
            <ellipse cx="74" cy="46" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 71 41 Q 75 38 78 43 Z" fill={HAIR} />
            {/* Forearm 90° on mat */}
            <path d="M 68 54 V 78 H 80" stroke={SKIN} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Straight Torso */}
            <path d="M 68 54 L 36 68 L 34 64 L 66 50 Z" fill={SHIRT} />
            {/* Thigh to Knees on mat */}
            <path d="M 36 68 L 30 78 L 20 72" stroke={PANTS} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 36 68 L 30 78" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="18" y="70" width="4" height="4" rx="1" fill={SNEAKER_UPPER} />
          </svg>
        );

      /* 6. High Knees */
      case 'high_knees':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M12 90H88" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Standing Leg */}
            <path d="M 48 52 L 44 70 L 44 86" stroke={PANTS_FAR} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="42" y="85" width="8" height="3" rx="1" fill="#64748b" />
            {/* Torso */}
            <path d="M 45 28 C 47 32 49 46 47 52 L 51 52 C 53 46 51 32 49 28 Z" fill={SHIRT} />
            {/* Head */}
            <ellipse cx="48" cy="18" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 44 14 Q 48 11 52 14 Z" fill={HAIR} />
            <path d="M 44 17 H 53" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            {/* Active high knee at 90° */}
            <path d="M 48 52 L 64 52 L 64 70" stroke={PANTS} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 48 52 L 64 52" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="61" y="69" width="8" height="3" rx="1" fill={SNEAKER} />
            {/* Running Arms */}
            <path d="M 48 30 L 60 40 L 68 46" stroke={SKIN} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      /* 7. Lunges */
      case 'lunges':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M12 90H88" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Rear Leg with dropped knee */}
            <path d="M 48 54 L 32 72 L 24 86" stroke={PANTS_FAR} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="22" y="84" width="7" height="3" rx="1" fill="#64748b" />
            {/* Torso */}
            <path d="M 46 30 C 48 34 49 48 47 54 L 51 54 C 53 48 51 34 49 30 Z" fill={SHIRT} />
            {/* Head */}
            <ellipse cx="48" cy="20" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 44 16 Q 48 13 52 16 Z" fill={HAIR} />
            {/* Front Leg at 90° */}
            <path d="M 48 54 L 66 56 L 66 86" stroke={PANTS} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 48 54 L 66 56" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="63" y="85" width="9" height="3" rx="1" fill={SNEAKER} />
          </svg>
        );

      /* 8. Bird-Dog */
      case 'bird_dog':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M10 86H90" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Support arm & knee */}
            <path d="M 64 52 V 80" stroke={SKIN_FAR} strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 38 54 V 80 H 30" stroke={PANTS_FAR} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Torso horizontal */}
            <path d="M 64 48 H 36 V 56 H 64 Z" fill={SHIRT} />
            {/* Head */}
            <ellipse cx="68" cy="44" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 66 39 Q 70 36 74 41 Z" fill={HAIR} />
            {/* Extended Arm */}
            <path d="M 64 50 L 86 48" stroke={SKIN} strokeWidth="4" strokeLinecap="round" />
            {/* Extended Leg */}
            <path d="M 36 52 L 14 50" stroke={PANTS} strokeWidth="6" strokeLinecap="round" />
            <path d="M 36 52 L 14 50" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      /* 9. Calf Raises */
      case 'calf_raises':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M12 90H88" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Torso */}
            <path d="M 46 22 C 48 26 50 46 48 52 L 52 52 C 54 46 52 26 50 22 Z" fill={SHIRT} />
            {/* Head */}
            <ellipse cx="50" cy="14" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 46 10 Q 50 7 54 10 Z" fill={HAIR} />
            {/* Hands on hips */}
            <path d="M 48 30 L 42 40 L 48 46" stroke={SKIN} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Legs on tiptoes */}
            <path d="M 50 52 L 50 68 L 50 78 L 54 86" stroke={PANTS} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 50 52 L 50 68" stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="49" y="78" width="7" height="3" rx="1" fill={SNEAKER} />
          </svg>
        );

      /* 10. Arm Circles */
      case 'arm_circles':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M12 90H88" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            {/* Legs */}
            <path d="M 45 54 L 42 86" stroke={PANTS} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 55 54 L 58 86" stroke={PANTS} strokeWidth="5.5" strokeLinecap="round" />
            <rect x="38" y="85" width="7" height="3" rx="1" fill={SNEAKER} />
            <rect x="55" y="85" width="7" height="3" rx="1" fill={SNEAKER} />
            {/* Torso */}
            <path d="M 43 32 C 45 34 55 34 57 32 L 55 54 H 45 Z" fill={SHIRT} />
            {/* Head */}
            <ellipse cx="50" cy="20" rx="5" ry="6" fill={SKIN} />
            <path d="M 45 15 Q 50 12 55 15 Z" fill={HAIR} />
            {/* T-Arms */}
            <path d="M 22 34 L 78 34" stroke={SKIN} strokeWidth="4" strokeLinecap="round" />
            <circle cx="20" cy="34" r="5" stroke={STRIPE} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="80" cy="34" r="5" stroke={STRIPE} strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );

      /* 11 & 12. Cat Cow / Stretching */
      case 'cat_cow':
      case 'stretching':
      default:
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="10" y="82" width="80" height="4" rx="2" fill="#064e3b" opacity="0.8" />
            <path d="M8 86H92" stroke={FLOOR} strokeWidth="2" strokeLinecap="round" />
            <path d="M 66 54 V 80" stroke={SKIN} strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 34 56 V 80 H 26" stroke={PANTS} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="72" cy="42" rx="5" ry="5.8" fill={SKIN} />
            <path d="M 68 37 Q 72 34 76 39 Z" fill={HAIR} />
            <path d="M 66 48 Q 50 40 34 54" stroke={SHIRT} strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center p-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-inner overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
      {renderSvg()}
    </div>
  );
};
