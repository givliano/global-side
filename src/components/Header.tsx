import { ClipboardCheck } from 'lucide-react';

import WeatherComponent from './WeatherComponent';

type HeaderProps = {
  name: string | undefined;
};

export default function Header({ name }: HeaderProps) {
  return (
    <header className="flex items-center rounded-lg p-4 h-24 md:h-32 w-full bg-blue-100 shadow-lg justify-between">
      <span className="flex items-center">
        <ClipboardCheck size={24} />
        <h1 className="text-lg md:text-xl lg:text-2xl ml-4 font-bold">
          {name || 'Task Management'}
        </h1>
      </span>
      <WeatherComponent />
    </header>
  );
}
