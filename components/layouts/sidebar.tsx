import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav-link";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GraduationCap, 
  Home, 
  Edit3, 
  Book, 
  History, 
  Settings, 
  HelpCircle
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

// Static category item component - non-clickable
function CategoryItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground">
      <span>{children}</span>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("w-64 border-r bg-card flex-shrink-0", className)}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="font-medium">Thesis Prompt Builder</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1" type="hover">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <NavLink href="/" Icon={Home}>
                Home
              </NavLink>
              <NavLink href="/editor" Icon={Edit3}>
                Editor
              </NavLink>
              <NavLink href="/templates" Icon={Book}>
                Templates
              </NavLink>
              <NavLink href="/history" Icon={History}>
                History
              </NavLink>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1">
              <h3 className="text-xs font-medium pl-3 text-muted-foreground mb-2">
                Categories
              </h3>
              {/* Non-clickable category items */}
              <CategoryItem>Computer Science</CategoryItem>
              <CategoryItem>Law</CategoryItem>
              <CategoryItem>Economics</CategoryItem>
              <CategoryItem>Psychology</CategoryItem>
              <CategoryItem>Literature</CategoryItem>
              <CategoryItem>Geography</CategoryItem>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1">
              <NavLink href="/settings" Icon={Settings}>
                Settings
              </NavLink>
              <NavLink href="/help" Icon={HelpCircle}>
                Help
              </NavLink>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}