'use client';

import { LightweightCodeHighlighter } from '@/app/(app)/components/lightweightCodeHighlighter';
import { SourceRange } from '@/features/search';

export default function TestHighlightPage() {
    const sampleCode = `const handleOrder = async (
    userId: string,
    items: CartItem[]
);`;

    // Multiline match: Starts on Line 1 at col 15, ends on Line 3 at col 10
    const multilineRange: SourceRange = {
        start: { lineNumber: 1, column: 15, byteOffset: 14 },
        end:   { lineNumber: 3, column: 10, byteOffset: 50 },
    };

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-6 bg-background text-foreground min-h-screen">
            <h1 className="text-2xl font-bold text-red-500">
                🚨 Live Reproduction: Multiline Highlight Bug
            </h1>
            <p className="text-sm text-muted-foreground">
                Notice: The match is supposed to highlight from Line 1 (&quot;async (&quot;) through Line 2 (entire line) to Line 3 (&quot;items&quot;).
            </p>

            <div className="border border-border rounded-lg p-4 bg-muted/30">
                <h2 className="text-sm font-semibold mb-2 text-foreground">
                    Code Viewer Output (LightweightCodeHighlighter):
                </h2>
                <div className="border rounded bg-background p-3 font-mono text-sm">
                    <LightweightCodeHighlighter
                        language="typescript"
                        highlightRanges={[multilineRange]}
                        lineNumbers={true}
                        lineNumbersOffset={1}
                    >
                        {sampleCode}
                    </LightweightCodeHighlighter>
                </div>
            </div>

            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded text-sm space-y-2">
                <p className="font-semibold text-destructive">
                    👀 Look at the code box above with your own eyes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Line 1: Highlighting is broken / cut off.</li>
                    <li>Line 2: <b>ZERO HIGHLIGHT!</b> It was completely skipped because of <code>range.start === 2 || range.end === 2</code>!</li>
                    <li>Line 3: Highlighting is broken / cut off.</li>
                </ul>
            </div>
        </div>
    );
}
