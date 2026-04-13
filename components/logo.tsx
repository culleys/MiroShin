import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="bg-primary text-primary-foreground w-8 h-8 shadow-md flex items-center justify-center -rotate-12 -translate-y-1 transition-transform hover:-translate-y-1.5 hover:-rotate-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M4 19V5h4l4 7 4-7h4v14h-3V9.5l-5 8.5h-2L6 9.5V19H4z" />
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight text-primary">
        Miroshin
      </span>
    </div>
  );
}
