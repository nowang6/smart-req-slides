import React from 'react'
import { z } from 'zod'

const layoutId = "specific-implementation-plan-slide"
const layoutName = "Specific Implementation Plan"
const layoutDescription = "A slide with a title, footer note, and main content area for descriptions and diagrams."

const Schema = z.object({
    title: z.string().min(2).max(20).default("具体实现方案").meta({
        description: "Title of the slide. Max 3 words"
    }),
    note: z.string().min(10).max(30).default("本页由对应模块开发人员填写").meta({
        description: "Footer note. Max 5 words"
    }),
    description: z.string().min(10).max(300).default("描述该特性的具体实现方案，流程图、框图、架构图等，由对应模块开发分别完成").meta({
        description: "Main description text explaining the implementation plan. Max 50 words"
    }),
    date: z.string().min(8).max(11).default("09/12/2025").meta({
        description: "Date in the format MM/DD/YYYY. Max 11 characters"
    }),
    slideNumber: z.string().min(1).max(2).default("8").meta({
        description: "Slide number. Max 2 characters"
    })
})

type DynamicSlideLayoutData = z.infer<typeof Schema>

const dynamicSlideLayout: React.FC<Partial<DynamicSlideLayoutData>> = ({ 
    title = "具体实现方案", 
    note = "本页由对应模块开发人员填写",
    description = "描述该特性的具体实现方案，流程图、框图、架构图等，由对应模块开发分别完成",
    date = "09/12/2025",
    slideNumber = "8"
}) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="bg-blue-800 text-white p-4 text-4xl font-semibold font-['Microsoft YaHei']">{title}</div>
            <div className="flex justify-end p-4">
                <div className="bg-blue-200 text-blue-800 p-2 rounded">{note}</div>
            </div>
            <div className="p-8 text-xl font-['Microsoft YaHei']">{description}</div>
            <div className="absolute bottom-0 left-0 text-gray-500 p-4">{date}</div>
            <div className="absolute bottom-0 right-0 text-gray-500 p-4">{slideNumber}</div>
        </div>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
