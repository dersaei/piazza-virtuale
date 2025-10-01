// app/birre/page.tsx
import CategoryHeader from '@/components/category/CategoryHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birre - Birrifici Artigianali Italiani | Piazza Virtuale',
  description:
    'Scopri i birrifici artigianali italiani che vendono online. Birre craft, birre tradizionali e specialità regionali direttamente dai produttori.',
};

export default function BirrePage() {
  return (
    <div>
      <CategoryHeader categoryName='Caffe' />
      {/* Shop content will go here later */}
    </div>
  );
}
