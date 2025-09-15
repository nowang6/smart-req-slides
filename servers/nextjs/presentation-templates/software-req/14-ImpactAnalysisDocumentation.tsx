import React from 'react'
import { z } from 'zod'

export const layoutId = "header-description-slide"
export const layoutName = "HeaderDescriptionSlide"
export const layoutDescription = "A slide with a header, description, and footer details."

export const Schema = z.object({
    header: z.string().min(1).max(100).default("周边影响分析 - 资料").meta({
        description: "Main header of the slide. Max 20 characters",
    }),
    description: z.string().min(1).max(200).default("是否需要更新相关资料、指导书、手册等，是否需要资料组配合参与？").meta({
        description: "Main description text explaining the slide content. Max 40 characters",
    }),
    date: z.string().min(1).max(20).default("09/12/2025").meta({
        description: "Date displayed in the bottom left corner. Max 10 characters",
    }),
    number: z.string().min(1).max(10).default("14").meta({
        description: "Number displayed in the bottom right corner. Max 5 characters",
    })
})

type HeaderDescriptionSlideData = z.infer<typeof Schema>

interface HeaderDescriptionSlideLayoutProps {
    data?: Partial<HeaderDescriptionSlideData>
}

export const dynamicSlideLayout: React.FC<HeaderDescriptionSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-blue-800 text-white text-4xl font-bold py-2 px-4 rounded-t">
                    {slideData?.header || "周边影响分析 - 资料"}
                </div>
                <div className="bg-blue-100 text-blue-800 text-lg py-2 px-4 mt-2 rounded-b">
                    {slideData?.description || "是否需要更新相关资料、指导书、手册等，是否需要资料组配合参与？"}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 text-gray-600 text-sm pl-4 pb-4">
                {slideData?.date || "09/12/2025"}
            </div>
            <div className="absolute bottom-0 right-0 text-gray-600 text-sm pr-4 pb-4">
                {slideData?.number || "14"}
            </div>
        </div>
    )
}
