import Link from 'next/link';
import { ReactNode } from 'react';
import { LinkAction } from '../types/domain';

interface ActionLinkProps {
  action: LinkAction;
  children: ReactNode;
  className?: string;
  unavailableClassName?: string;
}

export default function ActionLink({
  action,
  children,
  className = '',
  unavailableClassName,
}: ActionLinkProps) {
  if (action.type === 'internal') {
    return (
      <Link href={action.href} className={className}>
        {children}
      </Link>
    );
  }

  if (action.type === 'external') {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      aria-disabled="true"
      title={action.reason}
      className={unavailableClassName || className}
    >
      {children}
    </span>
  );
}
