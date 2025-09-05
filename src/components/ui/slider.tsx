import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#323738]">
      <SliderPrimitive.Range className="absolute h-full bg-[#323738] bg-gradient-to-r from-[rgba(25,255,121,1)] via-[rgba(25,255,121,1)] to-[rgba(179,226,93,1)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-6 w-4 rounded-lg border-2 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:white disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
