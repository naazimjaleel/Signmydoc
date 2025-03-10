"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { suggestInvoiceItems } from '@/lib/ai-suggestions'
import type { InvoiceData } from './invoice-form'

interface AISuggestionsProps {
  projectDescription: string;
  userPersona: any; // We'll get this from user context/state
  onAddItem: (item: { name: string; rate: number; quantity: number }) => void;
}

export function AISuggestions({ projectDescription, userPersona, onAddItem }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSuggestions = async () => {
      if (!projectDescription || !userPersona) return;
      
      setLoading(true);
      try {
        const items = await suggestInvoiceItems(projectDescription, userPersona);
        setSuggestions(items);
      } catch (error) {
        console.error('Error getting suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    getSuggestions();
  }, [projectDescription, userPersona]);

  if (!projectDescription) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-purple-600" />
        <h3 className="font-medium">AI Suggestions</h3>
      </div>
      
      {loading ? (
        <p className="text-sm text-gray-500">Analyzing project details...</p>
      ) : suggestions.length > 0 ? (
        <div className="grid gap-2">
          {suggestions.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">${item.rate}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAddItem({
                  name: item.name,
                  rate: item.rate,
                  quantity: 1
                })}
              >
                Add to Invoice
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No suggestions available for this project</p>
      )}
    </div>
  );
} 