export const statusConfig = {
  SCHEDULED: {
    label: 'Scheduled',
    variant: 'default' as const,
    color: 'bg-blue-500',
  },
  COMPLETED: {
    label: 'Completed',
    variant: 'secondary' as const,
    color: 'bg-green-500',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    variant: 'destructive' as const,
    color: 'bg-amber-500',
  },
  DRAFT: { label: 'Draft', variant: 'outline' as const, color: 'bg-gray-400' },
};

export const difficultyConfig = {
  ENTRY_LEVEL: {
    color: 'bg-green-100 text-green-800 border-green-200',
    label: 'Entry Level',
  },
  MID_LEVEL: {
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    label: 'Mid Level',
  },
  SENIOR: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Senior' },
  PRINCIPAL: {
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    label: 'Principal',
  },
};

export const interviewTypeConfig = {
  TECHNICAL: {
    label: 'Technical',
  },
  BEHAVIORAL: {
    label: 'Behavioral',
  },
  SYSTEM_DESIGN: { label: 'System Design' },
  CULTURAL_FIT: {
    label: 'Cultural Fit',
  },
};
