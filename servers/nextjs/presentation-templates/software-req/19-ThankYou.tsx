import React from 'react'
import { z } from 'zod'

export const layoutId = "thank-you-slide"
export const layoutName = "Thank You Slide"
export const layoutDescription = "A slide with a centered title and a footer with date and slide number."

export const Schema = z.object({
  title: z.string().min(1).max(100).default("Thank You !").meta({
    description: "The main title of the slide. Max 20 words",
  }),
  date: z.string().min(1).max(20).default("09/12/2025").meta({
    description: "The date to be shown in the footer. Max 10 words",
  }),
  slideNumber: z.string().min(1).max(10).default("19").meta({
    description: "The slide number to be shown in the footer. Max 5 words",
  })
})

type ThankYouSlideData = z.infer<typeof Schema>

interface ThankYouSlideLayoutProps {
  data?: Partial<ThankYouSlideData>
}

export const dynamicSlideLayout: React.FC<ThankYouSlideLayoutProps> = ({ data: slideData }) => {
  return (
    <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-[60px] font-bold text-indigo-300">{slideData?.title || "Thank You !"}</h1>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-10 py-5 text-gray-500">
          <span>{slideData?.date || "09/12/2025"}</span>
          <span>{slideData?.slideNumber || "19"}</span>
        </div>
      </div>
    </div>
  )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
