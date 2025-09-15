import React from 'react'
import { z } from 'zod'

export const layoutId = "header-description-slide"
export const layoutName = "DynamicSlideLayout"
export const layoutDescription = "A slide with a header, description, and footer."

export const Schema = z.object({
    header: z.string().min(1).max(100).default("周边影响分析 - 平滑升级").meta({
        description: "Main header of the slide. Max 20 characters"
    }),
    description: z.string().min(1).max(300).default("是否有数据库的修改？该修改是否对平滑升级有影响？有没有知会到版本组的相关同事？").meta({
        description: "Description of the slide. Max 60 characters"
    }),
    footerLeft: z.string().min(1).max(20).default("09/12/2025").meta({
        description: "Footer left text. Max 5 characters"
    }),
    footerRight: z.string().min(1).max(10).default("13").meta({
        description: "Footer right text. Max 5 characters"
    })
})

type DynamicSlideLayoutData = z.infer<typeof Schema>

interface DynamicSlideLayoutProps {
    data?: Partial<DynamicSlideLayoutData>
}

export const dynamicSlideLayout: React.FC<DynamicSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="bg-blue-900 text-white text-[48px] font-bold font-[微软雅黑] p-4">
                    {slideData?.header || "周边影响分析 - 平滑升级"}
                </div>
                <div className="bg-blue-100 p-4 text-blue-900 text-[18px] font-[微软雅黑] border-b-2 border-blue-900">
                    {slideData?.description || "是否有数据库的修改？该修改是否对平滑升级有影响？有没有知会到版本组的相关同事？"}
                </div>
                <div className="absolute bottom-0 left-0 text-gray-600 text-[14px] font-[Arial] p-4">
                    {slideData?.footerLeft || "09/12/2025"}
                </div>
                <div className="absolute bottom-0 right-0 text-gray-600 text-[14px] font-[Arial] p-4">
                    {slideData?.footerRight || "13"}
                </div>
            </div>
        </>
    )
}
