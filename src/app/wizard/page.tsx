import React from 'react';
import { WizardForm } from '@/components/WizardForm';

export const metadata = {
  title: 'Eligibility Assessment Wizard | SchemeSaathi',
  description:
    'Evaluate your welfare scheme eligibility using deterministic civic rules. Zero-knowledge privacy guaranteed.',
};

export default function WizardPage() {
  return <WizardForm />;
}
