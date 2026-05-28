import { redirect } from 'next/navigation';

// Root "/" → redirect to default locale "/en"
export default function RootPage() {
  redirect('/en');
}
