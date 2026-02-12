import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function CTAButton({ 
  text, 
  href = '/contact', 
  variant = 'primary',
  onClick 
}: CTAButtonProps) {
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {text}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}
