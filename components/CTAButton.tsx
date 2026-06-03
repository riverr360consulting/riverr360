import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
  href?: string;
}

export default function CTAButton({ text, variant, href = '/score' }: CTAButtonProps) {
  const base = 'inline-block font-bold px-8 py-3 rounded-xl transition-all text-center';
  const styles = {
    primary: `${base} bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl`,
    secondary: `${base} border-2 border-primary-600 text-primary-600 hover:bg-primary-50`,
  };

  if (href.startsWith('http')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={styles[variant]}>{text}</a>;
  }

  return <Link href={href} className={styles[variant]}>{text}</Link>;
}
