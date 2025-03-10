"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AddressInputProps {
  value: string
  onChange: (address: string) => void
  placeholder?: string
  className?: string
}

export function AddressInput({ value, onChange, placeholder, className }: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (!window.google || !inputRef.current) return

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["formatted_address", "address_components", "geometry"],
      types: ["address"]
    })

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      if (place.formatted_address) {
        onChange(place.formatted_address)
      }
    })

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [onChange])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter address"}
        className={`pl-10 ${className}`}
      />
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-600" />
    </div>
  )
} 