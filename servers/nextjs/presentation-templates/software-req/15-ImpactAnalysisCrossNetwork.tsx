import React from 'react'
import { z } from 'zod'

export const layoutId = "cross-network-influence-analysis"
export const layoutName = "DynamicSlideLayout"
export const layoutDescription = "A slide with a title, description, and footer with date, entity, and slide number."

export const Schema = z.object({
    title: z.string().min(3).max(80).default("周边影响分析 - 跨网元").meta({
        description: "Slide title. Max 20 characters",
    }),
    description: z.string().min(10).max(200).default("是否涉及周边网元配合？版本计划、联调计划、发布计划是否对齐？是否有兼容性问题？").meta({
        description: "Slide description. Max 50 characters",
    }),
    date: z.string().min(8).max(10).default("09/12/2025").meta({
        description: "Footer date. Max 10 characters",
    }),
    entity: z.string().min(1).max(20).default("TD Tech").meta({
        description: "Footer entity. Max 20 characters",
    }),
    slideNumber: z.string().min(1).max(5).default("15").meta({
        description: "Footer slide number. Max 5 characters",
    })
})

type DynamicSlideLayoutData = z.infer<typeof Schema>

interface DynamicSlideLayoutProps {
    data?: Partial<DynamicSlideLayoutData>
}

export const dynamicSlideLayout: React.FC<DynamicSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="p-4 font-[微软雅黑] text-white text-[48px] font-bold bg-blue-800">
                {slideData?.title || "周边影响分析 - 跨网元"}
            </div>
            <div className="p-4 bg-blue-100 rounded-md shadow-md">
                {slideData?.description || "是否涉及周边网元配合？版本计划、联调计划、发布计划是否对齐？是否有兼容性问题？"}
            </div>
            <div className="absolute bottom-0 w-full flex justify-between items-center p-4">
                <div className="text-gray-600">
                    {slideData?.date || "09/12/2025"}
                </div>
                <div className="text-gray-600">
                    {slideData?.entity || "TD Tech"}
                </div>
                <div className="text-gray-600">
                    {slideData?.slideNumber || "15"}
                </div>
            </div>
        </div>
    )
}
