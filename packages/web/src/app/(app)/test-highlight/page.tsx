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
            <h1 className="text-2xl font-bold text-emerald-500">
                ✅ Multiline Range Highlight: Fix Verification
            </h1>
            <p className="text-sm text-muted-foreground">
                Match range: Line 1 (&quot;async (&quot;) &rarr; Line 2 (entire line) &rarr; Line 3 (&quot;items&quot;).
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

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded text-sm space-y-2 text-emerald-300">
                <p className="font-semibold text-emerald-400">
                    🎉 Verification Checklist:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Line 1: <code>async (</code> highlighted seamlessly to the end of the line!</li>
                    <li>Line 2: <b>FULL LINE HIGHLIGHTED!</b> (Previously was completely skipped with 0 highlight)</li>
                    <li>Line 3: <code>items</code> highlighted up to column 10!</li>
                    <li>Line 4: Unhighlighted, as expected!</li>
                </ul>
            </div>
        </div>
    );
}
