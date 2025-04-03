
import React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, language = 'yaml', className }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn("rounded-md border my-4", className)}>
      <div className="flex items-center justify-between border-b bg-muted px-3 py-2">
        <div className="font-mono text-sm">{title}</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      <div className="code-block overflow-x-auto p-4 text-sm">
        <pre className="text-foreground">
          {code.split('\n').map((line, index) => (
            <code key={index} className="code-line">
              {line}
            </code>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
