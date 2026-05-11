export type LogoKind =
  | 'amazon'
  | 'idf-hatal'
  | 'ub-v1'
  | 'ub-v2'
  | 'generic';

export const LOGO_LABEL: Record<LogoKind, string> = {
  amazon: 'Amazon',
  'idf-hatal': 'IDF — Hatal',
  'ub-v1': 'University at Buffalo',
  'ub-v2': 'University at Buffalo',
  generic: 'Company',
};
