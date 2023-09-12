const mapping: Record<string, string> = {
  answers: 'answer',
  organizations: 'organization',
  questions: 'question',
  surveys: 'survey',
  users: 'user',
  'vendor-interactions': 'vendor_interaction',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
