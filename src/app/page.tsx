import { SidebarTrigger } from "~/components/ui/sidebar";
import { ThemeSwitcher } from "~/components/theme-switcher";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="space-x-2 p-2">
        <SidebarTrigger variant="outline" className="h-9 w-9" />
        <ThemeSwitcher />
      </div>
      <div className="flex justify-center gap-4 p-4">
        <div className="size-[36rem] rounded-xl bg-muted/50 md:size-[36rem] lg:size-[40rem]"></div>
      </div>
    </div>
  );
}
