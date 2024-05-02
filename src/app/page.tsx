import { IconButton } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import DropdownSelect from '@/components/DropdownSelect';
import InfoCard from '@/components/InfoCard';
import Link from 'next/link';
import Subjects from '@/app/subjects';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center gap-4">
      <IconButton className="absolute right-4 top-4" asChild>
        <Link href="/about">
          <InfoCircledIcon height="15" width="15" />
        </Link>
      </IconButton>
      <InfoCard />
      <DropdownSelect />
      <Subjects />
    </main>
  );
}
