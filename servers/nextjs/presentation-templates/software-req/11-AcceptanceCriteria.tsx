import React from 'react'
import { z } from 'zod'

export const layoutId = "验收标准描述"
export const layoutName = "验收标准描述"
export const layoutDescription = "一个用于描述验收标准的简洁幻灯片布局。"

export const Schema = z.object({
    title: z.string().min(1).max(10).default("验收标准").meta({
        description: "幻灯片标题。",
    }),
    subtitle: z.string().min(1).max(50).default("本页由特性 BBT 负责人填写").meta({
        description: "副标题，通常用于显示填写人信息。",
    }),
    description: z.string().min(1).max(200).default("描述验收标准").meta({
        description: "主要描述内容，解释验收标准。",
    }),
    date: z.string().min(1).max(20).default("09/12/2025").meta({
        description: "幻灯片底部左侧的日期。",
    }),
    number: z.string().min(1).max(10).default("11").meta({
        description: "幻灯片底部右侧的页码。",
    })
})

type AcceptanceCriteriaSlideData = z.infer<typeof Schema>

export const dynamicSlideLayout: React.FC<{ data?: Partial<AcceptanceCriteriaSlideData> }> = ({ data }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="bg-blue-900 text-white p-4 font-['Microsoft YaHei'] text-4xl">
                {data?.title || "验收标准"}
            </div>
            <div className="absolute top-4 right-4 bg-blue-200 p-2 rounded font-['Microsoft YaHei'] text-lg">
                {data?.subtitle || "本页由特性 BBT 负责人填写"}
            </div>
            <div className="m-8 font-['Microsoft YaHei'] text-2xl">
                {data?.description || "描述验收标准"}
            </div>
            <div className="absolute bottom-4 left-4 font-['Microsoft YaHei'] text-lg">
                {data?.date || "09/12/2025"}
            </div>
            <div className="absolute bottom-4 right-4 font-['Microsoft YaHei'] text-lg">
                {data?.number || "11"}
            </div>
        </div>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
