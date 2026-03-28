import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

const CodeBlock = ({ code, language, filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/(".*?"|'.*?')/g, '<span class="code-string">$1</span>')
      .replace(/\b(const|let|var|function|return|import|export|from|async|await|if|else|for|while|class|interface|type|extends|implements)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/\b(console|log|map|filter|reduce|push|pop|shift|unshift|slice|splice)\b/g, '<span class="code-function">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
      .replace(/([=+\-*/<>!&|]+)/g, '<span class="code-operator">$1</span>');
  };

  const languageColors: Record<string, string> = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    react: '#61dafb',
    python: '#3776ab',
    rust: '#dea584',
    go: '#00add8',
    html: '#e34c26',
    css: '#264de4',
    sql: '#f29111',
    bash: '#4eaa25',
  };

  const dotColor = languageColors[language.toLowerCase()] || '#00f5ff';

  return (
    <div className="code-block my-6">
      {/* Header */}
      <div className="code-header">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
          <span className="code-language">{language}</span>
          {filename && (
            <span className="text-xs text-gray-500 font-mono">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-tech-surface rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-tech-green" />
              <span className="text-tech-green">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="code-content">
        <pre>
          <code 
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
            className="text-gray-300"
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
