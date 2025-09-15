import React from 'react'
import { z } from 'zod'

const layoutId = "header-description-slide"
const layoutName = "HeaderDescriptionSlide"
const layoutDescription = "A slide with a header, description, and footers for date and slide number."

const Schema = z.object({
    header: z.string().min(1).max(100).default("遗留问题与风险").meta({
        description: "Title of the slide. Max 10 words"
    }),
    description: z.string().min(1).max(200).default("此页描述 SE 澄清 AI 是否已闭环、此次澄清是否有新的 AI 及风险").meta({
        description: "Main description text of the slide. Max 20 words"
    }),
    date: z.string().min(1).max(20).default("09/12/2025").meta({
        description: "Date in the format MM/DD/YYYY"
    }),
    slideNumber: z.string().min(1).max(10).default("16").meta({
        description: "Slide number"
    })
})

type HeaderDescriptionSlideData = z.infer<typeof Schema>

interface HeaderDescriptionSlideLayoutProps {
    data?: Partial<HeaderDescriptionSlideData>
}

export const dynamicSlideLayout: React.FC<HeaderDescriptionSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="text-5xl font-semibold text-white bg-blue-800 p-4">
                {slideData?.header || "遗留问题与风险"}
            </div>
            <div className="bg-blue-100 p-4 mt-4 rounded">
                {slideData?.description || "此页描述 SE 澄清 AI 是否已闭环、此次澄清是否有新的 AI 及风险"}
            </div>
            <div className="absolute bottom-0 left-0 p-4 text-gray-600">
                {slideData?.date || "09/12/2025"}
            </div>
            <div className="absolute bottom-0 right-0 p-4 text-gray-600">
                {slideData?.slideNumber || "16"}
            </div>
        </div>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
