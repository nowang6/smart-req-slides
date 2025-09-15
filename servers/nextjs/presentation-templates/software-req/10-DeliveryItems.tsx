import React from 'react'
import { z } from 'zod'

const layoutId = "delivery-items-slide"
const layoutName = "DynamicSlideLayout"
const layoutDescription = "A slide with a title, description, and footer details."

const Schema = z.object({
    title: z.string().min(1).max(100).default("交付物列表").meta({
        description: "Title of the slide. Max 100 characters",
    }),
    note: z.string().max(100).default("本页由 FO 填写").meta({
        description: "Note on the slide. Max 100 characters",
    }),
    description: z.string().min(5).max(200).default("描述该 Story 的交付物列表及交付模式").meta({
        description: "Main description of the slide. Max 200 characters",
    }),
    date: z.string().max(11).default("09/12/2025").meta({
        description: "Date on the slide. Max 11 characters",
    }),
    organization: z.string().max(50).default("TD Tech").meta({
        description: "Organization on the slide. Max 50 characters",
    }),
    slideNumber: z.string().max(10).default("10").meta({
        description: "Slide number on the slide. Max 10 characters",
    })
})

type DynamicSlideLayoutData = z.infer<typeof Schema>

interface DynamicSlideLayoutProps {
    data?: Partial<DynamicSlideLayoutData>
}

const dynamicSlideLayout: React.FC<DynamicSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="bg-blue-800 text-white text-6xl font-bold font-['Microsoft YaHei'] p-4">
                    {slideData?.title || "交付物列表"}
                </div>
                <div className="absolute top-0 right-0 m-4 bg-gray-200 p-2 rounded">
                    {slideData?.note || "本页由 FO 填写"}
                </div>
                <div className="text-2xl font-['Microsoft YaHei'] text-center my-16">
                    {slideData?.description || "描述该 Story 的交付物列表及交付模式"}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4">
                    <div className="text-gray-600">{slideData?.date || "09/12/2025"}</div>
                    <div className="text-gray-600">{slideData?.organization || "TD Tech"}</div>
                    <div className="text-gray-600">{slideData?.slideNumber || "10"}</div>
                </div>
            </div>
        </>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
