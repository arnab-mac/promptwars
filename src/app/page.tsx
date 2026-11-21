import React from 'react';
import { getSerializableSchemes } from '@/services/scheme-service';
import { CivicPortalView } from '@/components/CivicPortalView';

export const metadata = {
  title: 'Find Schemes - Universal Citizen Benefit Registry | SchemeSaathi',
  description:
    'Discover 2,800+ Central and State Government schemes with verified eligibility, direct cash benefits (DBT), educational grants, and welfare subsidies.',
};

export default async function FindSchemesCivicPortal() {
  const schemes = await getSerializableSchemes();

  return <CivicPortalView initialSchemes={schemes} />;
}
