import { Callout, IconButton } from '@radix-ui/themes';
import { fetchVal } from '@/val/val.rsc';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import DropdownSelect from '@/components/DropdownSelect';
import IndexVal from '@/content/pages/index.val';
import InfoCard from '@/components/InfoCard';
import Link from 'next/link';
import Subjects from '@/app/subjects';
export default async function Home() {
  const { title, description } = await fetchVal(IndexVal);
  return (
    <main className="flex w-full flex-col items-center gap-4">
      <IconButton className="absolute right-4 top-4" asChild>
        <Link href="/about">
          <InfoCircledIcon height="15" width="15" />
        </Link>
      </IconButton>
      <Callout.Root className="w-full">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>{title}</Callout.Text>
        <Callout.Text>{description}</Callout.Text>
      </Callout.Root>
      <InfoCard />
      <DropdownSelect />
      <Subjects />
    </main>
  );
}
