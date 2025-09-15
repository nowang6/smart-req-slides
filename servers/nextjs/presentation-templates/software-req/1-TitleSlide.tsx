import React from 'react'
import { z } from 'zod'

const layoutId = "1-TitleSlide"
const layoutName = "Title Slide"
const layoutDescription = "A simple slide with a centered title and footer showing date and page number."

const Schema = z.object({
    title: z.string().min(1).max(100).default("特性名称 时间").meta({
        description: "The title displayed in the center of the slide. Max 20 characters",
    }),
    footerText: z.string().min(1).max(100).default("FO：").meta({
        description: "The text displayed just below the title. Max 20 characters",
    }),
    date: z.string().min(1).max(20).default("09/12/2025").meta({
        description: "The date displayed in the bottom left corner. Max 11 characters",
    }),
    pageNumber: z.string().min(1).max(10).default("1").meta({
        description: "The page number displayed in the bottom right corner. Max 2 characters",
    })
})

type SimpleTitleAndFooterSlideData = z.infer<typeof Schema>

interface SimpleTitleAndFooterSlideLayoutProps {
    data?: Partial<SimpleTitleAndFooterSlideData>
}

const dynamicSlideLayout: React.FC<SimpleTitleAndFooterSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="px-8 py-4 bg-gray-200 rounded-lg text-center text-3xl font-bold font-[黑体]">
              {slideData?.title || "特性名称 时间"}
            </div>
          </div>
          <div className="mt-8 text-2xl font-bold font-[微软雅黑]">
            {slideData?.footerText || "FO："}
          </div>
          <div className="absolute bottom-0 left-0 p-8 text-lg font-[微软雅黑]">
            {slideData?.date || "09/12/2025"}
          </div>
          <div className="absolute bottom-0 right-0 p-8 text-lg font-[微软雅黑]">
            {slideData?.pageNumber || "1"}
          </div>
        </div>
    )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }
