import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8 px-4 mt-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <Logo className="scale-90" />
        <p className="text-xs text-muted-foreground text-center max-w-[250px] leading-relaxed">
          Baca komik, manhwa, manhua, dan manga bahasa Indonesia terlengkap dan terupdate.
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground mt-2">
          <Link href="#" className="hover:text-primary transition-colors">Tentang Kami</Link>
          <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
          <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          &copy; {new Date().getFullYear()} Miroshin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
