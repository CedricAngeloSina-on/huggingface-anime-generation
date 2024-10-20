import { SidebarTrigger } from "~/components/ui/sidebar";
import { ThemeSwitcher } from "~/components/theme-switcher";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="space-x-2 p-2">
        <SidebarTrigger variant="outline" className="h-9 w-9" />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
