import { ThemeSwitcher } from "~/components/theme-switcher";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="space-x-2 p-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
