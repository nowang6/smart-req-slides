import React from 'react'
import { z } from 'zod'

const Schema = z.object({
    title: z.string().min(1).max(100).default("澄清胶片使用说明").meta({
        description: "标题，最多100个字符"
    }),
    content: z.array(z.string().min(1).max(1000)).min(1).max(10).default([
        "需求澄清活动质量由 FO 负责，PL 技术审核；",
        "澄清活动要求特性相关 SE、PL、TE 必须参加；",
        "必填项：开发概要、特性描述、文档澄清、交付件列表、验收标准、具体实现方案；",
        "可裁剪项：维测说明、工具说明、性能影响分析、周边影响分析、遗留问题与风险；",
        "澄清结束后要求完成会签，如有争议可开展二次澄清。"
    ]).meta({
        description: "内容列表，每个最多1000个字符，最少1项，最多10项"
    }),
    note: z.string().min(1).max(300).default("注：需求澄清胶片定稿后归档受控。").meta({
        description: "备注内容，最多300个字符"
    }),
    date: z.string().min(8).max(11).default("09/12/2025").meta({
        description: "日期，格式为MM/DD/YYYY，最多11个字符"
    }),
    slideNumber: z.string().min(1).max(5).default("2").meta({
        description: "幻灯片编号，最多5个字符"
    })
})

type ClarificationSlideData = z.infer<typeof Schema>

interface ClarificationSlideLayoutProps {
    data?: Partial<ClarificationSlideData>
}

const dynamicSlideLayout: React.FC<ClarificationSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <div 
                className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden"
                style={{
                    fontFamily: "'Microsoft YaHei'"
                }}
            >
                <div className="flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-16">
                    <h1 className="text-3xl font-semibold text-blue-800 mb-6">{slideData?.title || "澄清胶片使用说明"}</h1>
                    <ol className="text-lg text-blue-800 space-y-3">
                        {slideData?.content?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                    <p className="text-lg text-blue-800 mt-3">{slideData?.note || "注：需求澄清胶片定稿后归档受控。"}</p>
                </div>
                <div className="absolute bottom-6 left-6 text-lg text-gray-500">{slideData?.date || "09/12/2025"}</div>
                <div className="absolute bottom-6 right-6 text-lg text-gray-500">{slideData?.slideNumber || "2"}</div>
            </div>
        </>
    )
}

export default dynamicSlideLayout
export { Schema, type ClarificationSlideData }