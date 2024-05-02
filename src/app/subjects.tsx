'use client';

import { Grid } from '@radix-ui/themes';
import { useLocalStorage } from 'usehooks-ts';
import SubjectCard from '@/components/SubjectCard';
export default function Subjects() {
  const [subjects, _s, _r] = useLocalStorage<Avdelingskode[]>('subjects', []);
  return (
    <Grid className="w-full" columns={{ initial: '1', xs: '2', sm: '2', md: '3' }} gap="3">
      {subjects.map(subject => (
        <SubjectCard key={subject.Emnekode} subject={subject} />
      ))}
    </Grid>
  );
}
