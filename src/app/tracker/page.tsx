import React from 'react';
import { ApplicationTrackerView } from '@/components/ApplicationTrackerView';

export const metadata = {
  title: 'Citizen Application Tracker & DBT Ledger | SchemeSaathi',
  description:
    'Track live welfare application statuses, review departmental actions, and inspect Direct Benefit Transfer (DBT) disbursement ledgers.',
};

export default function ApplicationTrackerPage() {
  return <ApplicationTrackerView />;
}
