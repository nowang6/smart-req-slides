import React from 'react'
import { z } from 'zod'

const layoutId = "change-log-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a title, main description, and additional details at the bottom."

const Schema = z.object({
    title: z.string().min(1).max(20).default("变更记录").meta({
        description: "Main title of the slide. Max 20 characters",
    }),
    description: z.string().min(10).max(200).default("2025/5/12：周边影响分析 - 空间 章节中，新增文件操作影响分析").meta({
        description: "Main description text of the slide. Max 200 characters",
    }),
    date: z.string().min(1).max(11).default("09/12/2025").meta({
        description: "Date at the bottom left of the slide. Max 11 characters",
    }),
    number: z.string().min(1).max(5).default("18").meta({
        description: "Number at the bottom right of the slide. Max 5 characters",
    })
})

type ChangeLogSlideData = z.infer<typeof Schema>

interface ChangeLogSlideLayoutProps {
    data?: Partial<ChangeLogSlideData>
}

export const dynamicSlideLayout: React.FC<ChangeLogSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <div 
                className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden"
            >
                <div className="bg-blue-800 text-white font-['Microsoft YaHei'] text-5xl p-4">
                    {slideData?.title || "变更记录"}
                </div>
                <div className="font-['Microsoft YaHei'] text-2xl text-center my-8">
                    {slideData?.description || "2025/5/12：周边影响分析 - 空间 章节中，新增文件操作影响分析"}
                </div>
                <div className="absolute bottom-0 left-0 text-blue-800 font-['Microsoft YaHei'] text-xl p-4">
                    {slideData?.date || "09/12/2025"}
                </div>
                <div className="absolute bottom-0 right-0 text-blue-800 font-['Microsoft YaHei'] text-xl p-4">
                    {slideData?.number || "18"}
                </div>
            </div>
        </>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
