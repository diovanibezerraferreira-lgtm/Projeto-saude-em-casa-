import React, { createContext, useContext, useState, useEffect } from 'react';
import { DayWorkout, UserProfile, WeightRecord, CompletedWorkout, SubscriptionTier, WeekAssessment } from '../types';
import { generate60WeeksProgram } from '../data/workoutProgram';
import { soundEffects } from '../utils/sound';

export type AppTab = 'home' | 'workouts' | 'diet' | 'gifs' | 'progress' | 'profile' | 'plans';

interface WorkoutContextType {
  program: DayWorkout[];
  currentDay: number;
  userProfile: UserProfile;
  completedDays: number[];
  completedWorkouts: CompletedWorkout[];
  weightRecords: WeightRecord[];
  activeWorkoutDay: DayWorkout | null;
  soundMuted: boolean;
  selectedTab: AppTab;
  isSubscriptionModalOpen: boolean;
  modalSuggestedTier: 'pro' | 'vip_diet';
  waterIntakeMl: number;
  checkedMeals: string[];
  weekAssessments: WeekAssessment[];
  isAssessmentModalOpen: boolean;
  assessmentWeekNumber: number;
  unlockedStage: number;
  setSelectedTab: (tab: AppTab) => void;
  openSubscriptionModal: (suggestedTier?: 'pro' | 'vip_diet') => void;
  closeSubscriptionModal: () => void;
  openAssessmentModal: (week?: number) => void;
  closeAssessmentModal: () => void;
  submitWeekAssessment: (assessment: WeekAssessment) => void;
  unlockStage2: () => void;
  startWorkout: (dayNumber: number) => void;
  exitWorkout: () => void;
  finishWorkout: (dayNumber: number, durationSeconds: number, caloriesBurned: number) => void;
  toggleDayManualCompletion: (dayNumber: number) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addWeightRecord: (weight: number, date?: string, note?: string) => void;
  deleteWeightRecord: (id: string) => void;
  toggleSound: () => void;
  upgradeToPremium: (active: boolean, tier?: 'pro' | 'vip_diet') => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  addWater: (amountMl: number) => void;
  resetWater: () => void;
  toggleMealCheck: (mealKey: string) => void;
  resetProgress: () => void;
}

const STORAGE_KEYS = {
  PROFILE: 'treino_em_casa_profile_v1',
  COMPLETED_DAYS: 'treino_em_casa_completed_days_v1',
  WORKOUTS: 'treino_em_casa_completed_workouts_v1',
  WEIGHT_RECORDS: 'treino_em_casa_weights_v1',
  SOUND_MUTED: 'treino_em_casa_sound_muted_v1',
  WATER_INTAKE: 'treino_em_casa_water_intake_v1',
  CHECKED_MEALS: 'treino_em_casa_checked_meals_v1',
  ASSESSMENTS: 'treino_em_casa_assessments_v1',
  UNLOCKED_STAGE: 'treino_em_casa_unlocked_stage_v1',
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Você',
  goal: 'perder_peso',
  initialWeight: 78.5,
  currentWeight: 76.8,
  targetWeight: 72.0,
  heightCm: 172,
  experienceLevel: 'iniciante',
  subscriptionTier: 'free',
  isPremium: false,
  streakDays: 3,
};

const DEFAULT_COMPLETED_DAYS = [1, 2];

const DEFAULT_WEIGHT_RECORDS: WeightRecord[] = [
  { id: 'w1', date: '2026-10-12', weight: 78.5, note: 'Início do desafio' },
  { id: 'w2', date: '2026-10-18', weight: 77.9, note: 'Final da 1ª semana' },
  { id: 'w3', date: '2026-10-24', weight: 76.8, note: 'Sentindo mais disposição!' },
];

const DEFAULT_COMPLETED_WORKOUTS: CompletedWorkout[] = [
  {
    id: 'cw-1',
    day: 1,
    title: 'Dia 1: Ativação & Primeira Conquista',
    completedAt: '2026-10-24T18:30:00.000Z',
    durationSeconds: 720,
    caloriesBurned: 78,
    totalExercises: 5
  },
  {
    id: 'cw-2',
    day: 2,
    title: 'Dia 2: Pernas Firmes & Postura',
    completedAt: '2026-10-25T19:15:00.000Z',
    durationSeconds: 840,
    caloriesBurned: 92,
    totalExercises: 5
  }
];

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [program] = useState<DayWorkout[]>(() => generate60WeeksProgram());
  const [selectedTab, setSelectedTab] = useState<AppTab>('home');
  const [activeWorkoutDay, setActiveWorkoutDay] = useState<DayWorkout | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [modalSuggestedTier, setModalSuggestedTier] = useState<'pro' | 'vip_diet'>('vip_diet');

  // Load from local storage or fallback to defaults
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        const tier = parsed.subscriptionTier || (parsed.isPremium ? 'pro' : 'free');
        return {
          ...parsed,
          subscriptionTier: tier,
          isPremium: tier !== 'free',
        };
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [waterIntakeMl, setWaterIntakeMl] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WATER_INTAKE);
      return saved ? parseInt(saved, 10) || 0 : 750;
    } catch {
      return 750;
    }
  });

  const [checkedMeals, setCheckedMeals] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHECKED_MEALS);
      return saved ? JSON.parse(saved) : ['m1-1'];
    } catch {
      return ['m1-1'];
    }
  });

  const [weekAssessments, setWeekAssessments] = useState<WeekAssessment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [unlockedStage, setUnlockedStage] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNLOCKED_STAGE);
      return saved ? parseInt(saved, 10) || 1 : 1;
    } catch {
      return 1;
    }
  });

  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [assessmentWeekNumber, setAssessmentWeekNumber] = useState<number>(1);

  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
      return saved ? JSON.parse(saved) : DEFAULT_COMPLETED_DAYS;
    } catch {
      return DEFAULT_COMPLETED_DAYS;
    }
  });

  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
      return saved ? JSON.parse(saved) : DEFAULT_COMPLETED_WORKOUTS;
    } catch {
      return DEFAULT_COMPLETED_WORKOUTS;
    }
  });

  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WEIGHT_RECORDS);
      return saved ? JSON.parse(saved) : DEFAULT_WEIGHT_RECORDS;
    } catch {
      return DEFAULT_WEIGHT_RECORDS;
    }
  });

  const [soundMuted, setSoundMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SOUND_MUTED) === 'true';
    } catch {
      return false;
    }
  });

  // Calculate current active day (first uncompleted day or day 1)
  const currentDay = Math.min(program.length || 210, (completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1));

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    } catch {
      // storage unavailable
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(completedDays));
    } catch {
      // storage unavailable
    }
  }, [completedDays]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(completedWorkouts));
    } catch {
      // storage unavailable
    }
  }, [completedWorkouts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WEIGHT_RECORDS, JSON.stringify(weightRecords));
    } catch {
      // storage unavailable
    }
  }, [weightRecords]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WATER_INTAKE, waterIntakeMl.toString());
    } catch {
      // storage unavailable
    }
  }, [waterIntakeMl]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHECKED_MEALS, JSON.stringify(checkedMeals));
    } catch {
      // storage unavailable
    }
  }, [checkedMeals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(weekAssessments));
    } catch {
      // storage unavailable
    }
  }, [weekAssessments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_STAGE, unlockedStage.toString());
    } catch {
      // storage unavailable
    }
  }, [unlockedStage]);

  useEffect(() => {
    soundEffects.isMuted = soundMuted;
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND_MUTED, soundMuted ? 'true' : 'false');
    } catch {
      // storage unavailable
    }
  }, [soundMuted]);

  const toggleSound = () => {
    setSoundMuted((prev) => !prev);
  };

  const startWorkout = (dayNumber: number) => {
    if (dayNumber > 7 && !userProfile.isPremium) {
      openSubscriptionModal('pro');
      return;
    }
    const workout = program.find((w) => w.day === dayNumber);
    if (workout) {
      setActiveWorkoutDay(workout);
      soundEffects.playStartWorkout();
    }
  };

  const exitWorkout = () => {
    setActiveWorkoutDay(null);
  };

  const finishWorkout = (dayNumber: number, durationSeconds: number, caloriesBurned: number) => {
    const workout = program.find((w) => w.day === dayNumber);
    if (!workout) return;

    // Add to completed days if not already there
    setCompletedDays((prev) => (prev.includes(dayNumber) ? prev : [...prev, dayNumber].sort((a, b) => a - b)));

    // Add workout log
    const newRecord: CompletedWorkout = {
      id: `cw-${Date.now()}`,
      day: dayNumber,
      title: workout.title,
      completedAt: new Date().toISOString(),
      durationSeconds,
      caloriesBurned,
      totalExercises: workout.exercises.length
    };

    setCompletedWorkouts((prev) => [newRecord, ...prev]);

    // Update streak
    setUserProfile((prev) => ({
      ...prev,
      streakDays: prev.streakDays + 1
    }));

    soundEffects.playCelebration();
  };

  const toggleDayManualCompletion = (dayNumber: number) => {
    setCompletedDays((prev) => {
      if (prev.includes(dayNumber)) {
        return prev.filter((d) => d !== dayNumber);
      } else {
        const updated = [...prev, dayNumber].sort((a, b) => a - b);
        soundEffects.playCelebration();
        return updated;
      }
    });
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...partial }));
  };

  const addWeightRecord = (weight: number, date?: string, note?: string) => {
    const todayStr = date || new Date().toISOString().split('T')[0];
    const newEntry: WeightRecord = {
      id: `w-${Date.now()}`,
      date: todayStr,
      weight,
      note: note?.trim() || undefined
    };

    setWeightRecords((prev) => {
      // Replace existing for same date if present, or add and sort by date descending
      const filtered = prev.filter((item) => item.date !== todayStr);
      const updated = [...filtered, newEntry].sort((a, b) => a.date.localeCompare(b.date));
      return updated;
    });

    // Also update current weight on profile
    setUserProfile((prev) => ({
      ...prev,
      currentWeight: weight
    }));
  };

  const deleteWeightRecord = (id: string) => {
    setWeightRecords((prev) => prev.filter((item) => item.id !== id));
  };

  const setSubscriptionTier = (tier: SubscriptionTier) => {
    setUserProfile((prev) => ({
      ...prev,
      subscriptionTier: tier,
      isPremium: tier !== 'free',
    }));
  };

  const upgradeToPremium = (active: boolean, tier: 'pro' | 'vip_diet' = 'vip_diet') => {
    setSubscriptionTier(active ? tier : 'free');
  };

  const addWater = (amountMl: number) => {
    setWaterIntakeMl((prev) => Math.max(0, prev + amountMl));
  };

  const resetWater = () => {
    setWaterIntakeMl(0);
  };

  const toggleMealCheck = (mealKey: string) => {
    setCheckedMeals((prev) => {
      if (prev.includes(mealKey)) {
        return prev.filter((k) => k !== mealKey);
      } else {
        soundEffects.playCelebration();
        return [...prev, mealKey];
      }
    });
  };

  const openAssessmentModal = (week?: number) => {
    const currentWeekNum = Math.ceil(currentDay / 7);
    setAssessmentWeekNumber(week || currentWeekNum || 1);
    setIsAssessmentModalOpen(true);
  };

  const closeAssessmentModal = () => {
    setIsAssessmentModalOpen(false);
  };

  const unlockStage2 = () => {
    setUnlockedStage(2);
    soundEffects.playCelebration();
  };

  const submitWeekAssessment = (assessment: WeekAssessment) => {
    setWeekAssessments((prev) => {
      const filtered = prev.filter((a) => a.week !== assessment.week);
      return [assessment, ...filtered];
    });

    if (assessment.week >= 30 && assessment.actionChoice === 'avancar') {
      setUnlockedStage(2);
    }

    soundEffects.playCelebration();
  };

  const resetProgress = () => {
    setCompletedDays([]);
    setCompletedWorkouts([]);
    setWeightRecords(DEFAULT_WEIGHT_RECORDS);
    setUserProfile(DEFAULT_PROFILE);
    setWaterIntakeMl(750);
    setCheckedMeals(['m1-1']);
    setWeekAssessments([]);
    setUnlockedStage(1);
  };

  const openSubscriptionModal = (suggestedTier: 'pro' | 'vip_diet' = 'vip_diet') => {
    setModalSuggestedTier(suggestedTier);
    setIsSubscriptionModalOpen(true);
  };
  const closeSubscriptionModal = () => setIsSubscriptionModalOpen(false);

  return (
    <WorkoutContext.Provider
      value={{
        program,
        currentDay,
        userProfile,
        completedDays,
        completedWorkouts,
        weightRecords,
        activeWorkoutDay,
        soundMuted,
        selectedTab,
        isSubscriptionModalOpen,
        modalSuggestedTier,
        waterIntakeMl,
        checkedMeals,
        weekAssessments,
        isAssessmentModalOpen,
        assessmentWeekNumber,
        unlockedStage,
        setSelectedTab,
        openSubscriptionModal,
        closeSubscriptionModal,
        openAssessmentModal,
        closeAssessmentModal,
        submitWeekAssessment,
        unlockStage2,
        startWorkout,
        exitWorkout,
        finishWorkout,
        toggleDayManualCompletion,
        updateProfile,
        addWeightRecord,
        deleteWeightRecord,
        toggleSound,
        upgradeToPremium,
        setSubscriptionTier,
        addWater,
        resetWater,
        toggleMealCheck,
        resetProgress
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
