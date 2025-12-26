import React, { useEffect, useRef } from 'react';

interface AdContainerProps {
  code: string | undefined;
  className?: string;
  label?: string;
}

const AdContainer: React.FC<AdContainerProps> = ({ code, className = "", label = "Advertisement" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Create a range to fragment the HTML string
    // This allows scripts to be found and executed if they are standard script tags
    const range = document.createRange();
    range.selectNode(containerRef.current);
    const documentFragment = range.createContextualFragment(code);

    // Append the fragment to the container
    containerRef.current.appendChild(documentFragment);

    // Manually handle <script> tags that might not execute via innerHTML or fragment in some React versions
    const scripts = containerRef.current.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      // Fix: Cast the attribute object to 'any' to resolve the 'unknown' type error when accessing properties like 'name' and 'value'
      Array.from(oldScript.attributes).forEach((attr: any) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

  }, [code]);

  if (!code) return null;

  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] text-gray-300 uppercase tracking-widest mb-1">{label}</span>
      {/* Removed bg-gray-100 to ensure transparency */}
      <div 
        ref={containerRef} 
        className="min-h-[50px] min-w-[50px] flex items-center justify-center overflow-hidden"
      />
    </div>
  );
};

export default AdContainer;